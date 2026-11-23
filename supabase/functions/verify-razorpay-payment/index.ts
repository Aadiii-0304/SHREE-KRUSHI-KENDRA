// Supabase Edge Function: verify-razorpay-payment
// Cryptographically verifies Razorpay payment signature & confirms payment on Razorpay
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import crypto from "node:crypto";
import * as kv from "../server/kv_store.tsx";

declare const Deno: any;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const rawKeyId = Deno.env.get("RAZORPAY_KEY_ID") || Deno.env.get("VITE_RAZORPAY_KEY_ID") || "";
    const rawKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET") || "";

    const keyId = rawKeyId.trim().replace(/\s+/g, "");
    const keySecret = rawKeySecret.trim().replace(/\s+/g, "");

    if (!keyId || !keySecret || keyId.includes("YOUR_KEY") || keySecret.includes("YOUR_SECRET")) {
      return new Response(
        JSON.stringify({ error: "Razorpay server credentials not configured" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const orderId = body.order_id || body.razorpay_order_id || body.orderId;
    const paymentId = body.payment_id || body.razorpay_payment_id || body.paymentId;
    const signature = body.signature || body.razorpay_signature;

    if (!orderId || !paymentId || !signature) {
      return new Response(
        JSON.stringify({
          error: "Missing required verification fields",
          details: "order_id, payment_id, and signature are required."
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Verify HMAC SHA256 Signature
    const dataToSign = `${orderId}|${paymentId}`;
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(dataToSign)
      .digest("hex");

    const genBuf = Buffer.from(generatedSignature);
    const sigBuf = Buffer.from(signature);

    if (genBuf.length !== sigBuf.length || !crypto.timingSafeEqual(genBuf, sigBuf)) {
      console.error(`[Verify] Signature mismatch for order: ${orderId}, payment: ${paymentId}`);
      return new Response(
        JSON.stringify({
          success: false,
          verified: false,
          error: "Invalid payment signature. Verification failed."
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Prevent Duplicate Payment Processing (Idempotency)
    const existingPayment = await kv.get(`payment:${paymentId}`);
    if (existingPayment && existingPayment.verified) {
      return new Response(
        JSON.stringify({
          success: true,
          verified: true,
          alreadyProcessed: true,
          orderId,
          paymentId,
          message: "Payment already verified and processed."
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Confirm Payment Details via Razorpay Payments API
    const authHeader = "Basic " + btoa(`${keyId}:${keySecret}`);
    let razorpayPaymentStatus = "unknown";
    let capturedAmount = 0;

    try {
      const paymentCheckRes = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
        headers: {
          "Authorization": authHeader,
        },
      });

      if (paymentCheckRes.ok) {
        const paymentData = await paymentCheckRes.json();
        razorpayPaymentStatus = paymentData.status; // 'captured', 'authorized', etc.
        capturedAmount = paymentData.amount;
      }
    } catch (apiErr) {
      console.warn("[Verify] Could not query Razorpay payment endpoint directly:", apiErr);
    }

    // 4. Update Order Record in Database
    const cachedOrder = await kv.get(`razorpay_order:${orderId}`);
    if (cachedOrder) {
      cachedOrder.status = "PAID";
      cachedOrder.paymentId = paymentId;
      cachedOrder.razorpayStatus = razorpayPaymentStatus;
      cachedOrder.paidAt = new Date().toISOString();
      await kv.set(`razorpay_order:${orderId}`, cachedOrder);
    }

    // Record verified payment
    await kv.set(`payment:${paymentId}`, {
      paymentId,
      orderId,
      amount: capturedAmount,
      verified: true,
      verifiedAt: new Date().toISOString(),
      status: razorpayPaymentStatus,
    });

    return new Response(
      JSON.stringify({
        success: true,
        verified: true,
        orderId,
        paymentId,
        status: "paid",
        message: "Payment successfully verified."
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("verify-razorpay-payment Exception:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error during payment verification", details: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
