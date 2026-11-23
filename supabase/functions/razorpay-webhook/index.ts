// Supabase Edge Function: razorpay-webhook
// Securely receives and processes Razorpay webhook notifications
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import crypto from "node:crypto";
import * as kv from "../server/kv_store.tsx";

declare const Deno: any;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-razorpay-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const webhookSecret =
      Deno.env.get("RAZORPAY_WEBHOOK_SECRET") ||
      Deno.env.get("RAZORPAY_KEY_SECRET") ||
      "";

    if (!webhookSecret) {
      console.error("[Webhook] No webhook secret configured on server.");
      return new Response(
        JSON.stringify({ error: "Webhook secret not configured on server" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const receivedSignature = req.headers.get("x-razorpay-signature") || "";
    const rawBody = await req.text();

    if (!receivedSignature) {
      return new Response(
        JSON.stringify({ error: "Missing x-razorpay-signature header" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const expBuf = Buffer.from(expectedSignature);
    const recBuf = Buffer.from(receivedSignature);

    if (expBuf.length !== recBuf.length || !crypto.timingSafeEqual(expBuf, recBuf)) {
      console.warn("[Webhook] Invalid webhook signature detected!");
      return new Response(
        JSON.stringify({ error: "Invalid webhook signature" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const event = JSON.parse(rawBody);
    const eventId = event.event_id || event.id || `${event.event}_${Date.now()}`;

    // Prevent duplicate processing
    const processed = await kv.get(`webhook_event:${eventId}`);
    if (processed) {
      console.log(`[Webhook] Event ${eventId} already processed, skipping.`);
      return new Response(
        JSON.stringify({ received: true, alreadyProcessed: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const eventType = event.event;
    console.log(`[Webhook] Processing event: ${eventType} (ID: ${eventId})`);

    switch (eventType) {
      case "payment.captured": {
        const payment = event.payload?.payment?.entity;
        if (payment) {
          const orderId = payment.order_id;
          const paymentId = payment.id;

          // Record payment
          await kv.set(`payment:${paymentId}`, {
            paymentId,
            orderId,
            amount: payment.amount,
            status: "captured",
            method: payment.method,
            email: payment.email,
            contact: payment.contact,
            verified: true,
            capturedAt: new Date().toISOString(),
          });

          // Update cached order if found
          if (orderId) {
            const cachedOrder = await kv.get(`razorpay_order:${orderId}`);
            if (cachedOrder) {
              cachedOrder.status = "PAID";
              cachedOrder.paymentId = paymentId;
              cachedOrder.updatedAt = new Date().toISOString();
              await kv.set(`razorpay_order:${orderId}`, cachedOrder);
            }
          }
        }
        break;
      }

      case "payment.failed": {
        const payment = event.payload?.payment?.entity;
        if (payment) {
          const orderId = payment.order_id;
          const paymentId = payment.id;
          const reason = payment.error_description || payment.error_code || "Payment failed";

          console.warn(`[Webhook] Payment ${paymentId} failed: ${reason}`);
          if (orderId) {
            const cachedOrder = await kv.get(`razorpay_order:${orderId}`);
            if (cachedOrder) {
              cachedOrder.status = "FAILED";
              cachedOrder.failureReason = reason;
              cachedOrder.updatedAt = new Date().toISOString();
              await kv.set(`razorpay_order:${orderId}`, cachedOrder);
            }
          }
        }
        break;
      }

      case "order.paid": {
        const order = event.payload?.order?.entity;
        if (order) {
          const orderId = order.id;
          const cachedOrder = await kv.get(`razorpay_order:${orderId}`);
          if (cachedOrder) {
            cachedOrder.status = "PAID";
            cachedOrder.amountPaid = order.amount_paid;
            cachedOrder.updatedAt = new Date().toISOString();
            await kv.set(`razorpay_order:${orderId}`, cachedOrder);
          }
        }
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${eventType}`);
        break;
    }

    // Mark event as processed
    await kv.set(`webhook_event:${eventId}`, {
      eventId,
      event: eventType,
      processedAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ received: true, event: eventType }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[Webhook] Processing exception:", err);
    return new Response(
      JSON.stringify({ error: "Webhook processing error", details: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
