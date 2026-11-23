// Supabase Edge Function: create-razorpay-order
// Creates a validated order with Razorpay Orders API
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
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
    
    // Clean keys
    const keyId = rawKeyId.trim().replace(/\s+/g, "");
    const keySecret = rawKeySecret.trim().replace(/\s+/g, "");

    if (!keyId || !keySecret || keyId.includes("YOUR_KEY") || keySecret.includes("YOUR_SECRET")) {
      return new Response(
        JSON.stringify({
          error: "Razorpay credentials not configured on server",
          details: "Please configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Supabase secrets."
        }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { amount, currency = "INR", receipt, customerInfo, items } = body;

    // Validate and calculate authoritative amount
    let calculatedTotal = 0;
    if (Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        let itemPrice = Number(item.price);
        // If product ID available, check authoritative price from database
        if (item.productId) {
          const dbProduct = await kv.get(`product:${item.productId}`);
          if (dbProduct) {
            if (item.selectedVariant?.size && Array.isArray(dbProduct.variants)) {
              const matchedVariant = dbProduct.variants.find(
                (v: any) => String(v.size) === String(item.selectedVariant.size)
              );
              if (matchedVariant && matchedVariant.price) {
                itemPrice = Number(matchedVariant.price);
              }
            } else if (dbProduct.price) {
              itemPrice = Number(dbProduct.price);
            }
          }
        }
        const qty = Math.max(1, parseInt(item.quantity) || 1);
        calculatedTotal += itemPrice * qty;
      }
    }

    // Determine final amount in INR
    const finalAmountInINR = calculatedTotal > 0 ? calculatedTotal : Number(amount);
    if (!finalAmountInINR || isNaN(finalAmountInINR) || finalAmountInINR <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid order amount. Amount must be greater than 0." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Convert to paise (Razorpay standard: INR 1 = 100 paise)
    const amountInPaise = Math.round(finalAmountInINR * 100);
    if (amountInPaise < 100) {
      return new Response(
        JSON.stringify({ error: "Minimum transaction amount is ₹1 (100 paise)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const orderReceipt = receipt || `rcpt_${Date.now().toString(36)}`;

    // Call Razorpay Orders API
    const authHeader = "Basic " + btoa(`${keyId}:${keySecret}`);
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: currency || "INR",
        receipt: orderReceipt,
        notes: {
          merchant: "Shree Krushi Kendra",
          customer_name: customerInfo?.name || "Customer",
          customer_phone: customerInfo?.phone || "",
          customer_email: customerInfo?.email || "",
          address: customerInfo?.address ? String(customerInfo.address).substring(0, 100) : "",
        },
      }),
    });

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error("Razorpay API Error:", razorpayResponse.status, errorText);
      return new Response(
        JSON.stringify({
          error: "Failed to create order on Razorpay",
          details: errorText,
          status: razorpayResponse.status,
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const orderData = await razorpayResponse.json();

    // Cache order details in KV store for signature and amount verification later
    await kv.set(`razorpay_order:${orderData.id}`, {
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      receipt: orderReceipt,
      customerInfo,
      items,
      status: "created",
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        id: orderData.id,
        order_id: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        key: keyId,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("create-razorpay-order Exception:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error during order creation", details: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
