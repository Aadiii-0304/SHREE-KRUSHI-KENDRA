import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import crypto from "node:crypto";

declare const Deno: any;

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-dfeaf20d/health", (c: any) => {
  return c.json({ status: "ok" });
});

// ========== PRODUCTS API ==========

// Get all products with optional filtering
app.get("/make-server-dfeaf20d/products", async (c: any) => {
  try {
    const { category, search, brand, crop, limit, offset } = c.req.query();

    let products = await kv.getByPrefix("product:");

    // Filter by category
    if (category) {
      products = products.filter(p => p.category === category);
    }

    // Filter by brand
    if (brand) {
      products = products.filter(p => p.brand === brand);
    }

    // Filter by crop
    if (crop) {
      products = products.filter(p => p.crops && p.crops.includes(crop));
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p =>
        p.name?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.brand?.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const total = products.length;
    const startIndex = offset ? parseInt(offset) : 0;
    const endIndex = limit ? startIndex + parseInt(limit) : products.length;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return c.json({
      products: paginatedProducts,
      total,
      offset: startIndex,
      limit: limit ? parseInt(limit) : total
    });
  } catch (error: any) {
    console.log("Error fetching products:", error);
    return c.json({ error: "Failed to fetch products", details: error.message }, 500);
  }
});

// Get single product by ID
app.get("/make-server-dfeaf20d/products/:id", async (c: any) => {
  try {
    const id = c.req.param("id");
    const product = await kv.get(`product:${id}`);

    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }

    return c.json(product);
  } catch (error: any) {
    console.log("Error fetching product:", error);
    return c.json({ error: "Failed to fetch product", details: error.message }, 500);
  }
});

// Create new product (Admin only)
app.post("/make-server-dfeaf20d/products", async (c: any) => {
  try {
    const product = await c.req.json();

    // Validate required fields
    if (!product.id || !product.name || !product.category || !product.price) {
      return c.json({ error: "Missing required fields: id, name, category, price" }, 400);
    }

    // Add timestamps
    product.createdAt = new Date().toISOString();
    product.updatedAt = new Date().toISOString();

    await kv.set(`product:${product.id}`, product);

    return c.json({ success: true, product });
  } catch (error: any) {
    console.log("Error creating product:", error);
    return c.json({ error: "Failed to create product", details: error.message }, 500);
  }
});

// Update product (Admin only)
app.put("/make-server-dfeaf20d/products/:id", async (c: any) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();

    const existingProduct = await kv.get(`product:${id}`);
    if (!existingProduct) {
      return c.json({ error: "Product not found" }, 404);
    }

    const updatedProduct = {
      ...existingProduct,
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    await kv.set(`product:${id}`, updatedProduct);

    return c.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.log("Error updating product:", error);
    return c.json({ error: "Failed to update product", details: error.message }, 500);
  }
});

// Delete product (Admin only)
app.delete("/make-server-dfeaf20d/products/:id", async (c: any) => {
  try {
    const id = c.req.param("id");
    await kv.del(`product:${id}`);

    return c.json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    console.log("Error deleting product:", error);
    return c.json({ error: "Failed to delete product", details: error.message }, 500);
  }
});

// Bulk import products (Admin only)
app.post("/make-server-dfeaf20d/products/bulk-import", async (c: any) => {
  try {
    const { products } = await c.req.json();

    if (!Array.isArray(products)) {
      return c.json({ error: "Products must be an array" }, 400);
    }

    const keys = [];
    const values = [];
    const timestamp = new Date().toISOString();

    for (const product of products) {
      if (!product.id || !product.name || !product.category || !product.price) {
        continue; // Skip invalid products
      }

      keys.push(`product:${product.id}`);
      values.push({
        ...product,
        createdAt: product.createdAt || timestamp,
        updatedAt: timestamp
      });
    }

    if (keys.length > 0) {
      await kv.mset(keys, values);
    }

    return c.json({
      success: true,
      imported: keys.length,
      total: products.length
    });
  } catch (error: any) {
    console.log("Error bulk importing products:", error);
    return c.json({ error: "Failed to import products", details: error.message }, 500);
  }
});

// Get product statistics (Admin)
app.get("/make-server-dfeaf20d/products/stats/summary", async (c: any) => {
  try {
    const products = await kv.getByPrefix("product:");

    const stats = {
      totalProducts: products.length,
      byCategory: {} as Record<string, number>,
      byBrand: {} as Record<string, number>,
      totalValue: 0,
      lowStock: 0
    };

    products.forEach(p => {
      // Count by category
      stats.byCategory[p.category] = (stats.byCategory[p.category] || 0) + 1;

      // Count by brand
      if (p.brand) {
        stats.byBrand[p.brand] = (stats.byBrand[p.brand] || 0) + 1;
      }

      // Calculate total value
      stats.totalValue += (p.price || 0) * (p.stock || 0);

      // Low stock check
      if (p.stock && p.stock < 50) {
        stats.lowStock++;
      }
    });

    return c.json(stats);
  } catch (error: any) {
    console.log("Error fetching product stats:", error);
    return c.json({ error: "Failed to fetch stats", details: error.message }, 500);
  }
});

// ========== ORDERS API ==========

// Create new order
app.post("/make-server-dfeaf20d/orders", async (c: any) => {
  try {
    const order = await c.req.json();

    // Validate required fields
    if (!order.items || !order.customerInfo) {
      return c.json({ error: "Missing required fields: items, customerInfo" }, 400);
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newOrder = {
      ...order,
      id: orderId,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`order:${orderId}`, newOrder);

    // Update product stock
    for (const item of order.items) {
      const product = await kv.get(`product:${item.productId}`);
      if (product && product.stock) {
        product.stock -= item.quantity;
        product.updatedAt = new Date().toISOString();
        await kv.set(`product:${item.productId}`, product);
      }
    }

    return c.json({ success: true, order: newOrder });
  } catch (error: any) {
    console.log("Error creating order:", error);
    return c.json({ error: "Failed to create order", details: error.message }, 500);
  }
});

// Get user orders
app.get("/make-server-dfeaf20d/orders/user/:email", async (c: any) => {
  try {
    const email = c.req.param("email");
    const allOrders = await kv.getByPrefix("order:");

    const userOrders = allOrders.filter(order =>
      order.customerInfo?.email === email
    );

    // Sort by date (newest first)
    userOrders.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ orders: userOrders });
  } catch (error: any) {
    console.log("Error fetching user orders:", error);
    return c.json({ error: "Failed to fetch orders", details: error.message }, 500);
  }
});

// Get single order
app.get("/make-server-dfeaf20d/orders/:id", async (c: any) => {
  try {
    const id = c.req.param("id");
    const order = await kv.get(`order:${id}`);

    if (!order) {
      return c.json({ error: "Order not found" }, 404);
    }

    return c.json(order);
  } catch (error: any) {
    console.log("Error fetching order:", error);
    return c.json({ error: "Failed to fetch order", details: error.message }, 500);
  }
});

// Update order status (Admin)
app.put("/make-server-dfeaf20d/orders/:id/status", async (c: any) => {
  try {
    const id = c.req.param("id");
    const { status } = await c.req.json();

    const order = await kv.get(`order:${id}`);
    if (!order) {
      return c.json({ error: "Order not found" }, 404);
    }

    order.status = status;
    order.updatedAt = new Date().toISOString();

    await kv.set(`order:${id}`, order);

    return c.json({ success: true, order });
  } catch (error: any) {
    console.log("Error updating order status:", error);
    return c.json({ error: "Failed to update order", details: error.message }, 500);
  }
});

// ========== PAYMENT SETTINGS & RAZORPAY API ==========

const cleanKey = (key: string): string => {
  if (!key) return "";
  // Remove any spaces or whitespace
  let cleaned = key.replace(/\s+/g, "");
  // If it is a placeholder key/secret, treat it as empty
  if (cleaned.includes("YOUR_KEY") || cleaned.includes("YOUR_SECRET")) {
    return "";
  }
  // If it has a duplicate prefix, trim it
  if (cleaned.startsWith("rzp_test_rzp_test_")) {
    cleaned = cleaned.substring(9);
  } else if (cleaned.startsWith("rzp_live_rzp_live_")) {
    cleaned = cleaned.substring(9);
  }
  return cleaned;
};

// Get payment gateway settings
app.get("/make-server-dfeaf20d/settings/payment", async (c: any) => {
  try {
    const settings = await kv.get("settings:payment");
    const envKeyId = cleanKey(Deno.env.get("RAZORPAY_KEY_ID") || Deno.env.get("VITE_RAZORPAY_KEY_ID") || "");
    const envKeySecret = cleanKey(Deno.env.get("RAZORPAY_KEY_SECRET") || "");

    if (!settings) {
      return c.json({
        razorpayKeyId: envKeyId,
        simulatedMode: !envKeyId || !envKeySecret,
        hasSecret: !!envKeySecret
      });
    }

    const rawKeyId = settings.razorpayKeyId || envKeyId;
    const rawKeySecret = settings.razorpayKeySecret || envKeySecret;
    const keyId = cleanKey(rawKeyId);
    const keySecret = cleanKey(rawKeySecret);

    return c.json({
      razorpayKeyId: keyId,
      simulatedMode: settings.simulatedMode === true || !keyId || !keySecret,
      hasSecret: !!keySecret
    });
  } catch (error: any) {
    return c.json({ error: "Failed to fetch settings", details: error.message }, 500);
  }
});

// Update payment gateway settings
app.post("/make-server-dfeaf20d/settings/payment", async (c: any) => {
  try {
    const reqData = await c.req.json();
    const existing = await kv.get("settings:payment") || {};

    // If keySecret is not sent, retain the old secret
    const razorpayKeySecret = reqData.razorpayKeySecret !== undefined
      ? reqData.razorpayKeySecret
      : existing.razorpayKeySecret;

    const newSettings = {
      razorpayKeyId: cleanKey(reqData.razorpayKeyId || ""),
      razorpayKeySecret: cleanKey(razorpayKeySecret || ""),
      simulatedMode: reqData.simulatedMode === true,
      updatedAt: new Date().toISOString()
    };

    await kv.set("settings:payment", newSettings);
    return c.json({ success: true, message: "Payment settings updated successfully" });
  } catch (error: any) {
    return c.json({ error: "Failed to update settings", details: error.message }, 500);
  }
});

// Create Razorpay Order
app.post("/make-server-dfeaf20d/razorpay/create-order", async (c: any) => {
  try {
    const { amount } = await c.req.json();
    if (!amount || isNaN(amount)) {
      return c.json({ error: "Invalid amount" }, 400);
    }

    const settings = await kv.get("settings:payment") || {};
    const rawKeyId = settings.razorpayKeyId || Deno.env.get("RAZORPAY_KEY_ID") || Deno.env.get("VITE_RAZORPAY_KEY_ID") || "";
    const rawKeySecret = settings.razorpayKeySecret || Deno.env.get("RAZORPAY_KEY_SECRET") || "";
    const keyId = cleanKey(rawKeyId);
    const keySecret = cleanKey(rawKeySecret);
    const simulated = settings.simulatedMode === true || !keyId || !keySecret;

    if (simulated) {
      // Return a simulated order ID
      const orderId = `order_mock_${Math.random().toString(36).substring(2, 11)}`;
      return c.json({
        id: orderId,
        amount: Math.round(amount * 100),
        currency: "INR",
        simulated: true
      });
    }

    // Call real Razorpay REST API
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(keyId + ":" + keySecret)}`
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // convert to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Razorpay API responded with ${response.status}: ${errorText}`);
    }

    const orderData = await response.json();
    return c.json(orderData);
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return c.json({ error: "Failed to create payment order", details: error.message }, 500);
  }
});

// Verify Payment Signature
app.post("/make-server-dfeaf20d/razorpay/verify", async (c: any) => {
  try {
    const { orderId, paymentId, signature } = await c.req.json();
    if (!orderId || !paymentId) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const settings = await kv.get("settings:payment") || {};
    const rawKeyId = settings.razorpayKeyId || Deno.env.get("RAZORPAY_KEY_ID") || Deno.env.get("VITE_RAZORPAY_KEY_ID") || "";
    const rawKeySecret = settings.razorpayKeySecret || Deno.env.get("RAZORPAY_KEY_SECRET") || "";
    const keyId = cleanKey(rawKeyId);
    const keySecret = cleanKey(rawKeySecret);
    const simulated = settings.simulatedMode === true || !keyId || !keySecret;

    if (simulated) {
      return c.json({ verified: true, simulated: true });
    }

    if (!signature) {
      return c.json({ verified: false, error: "Missing signature for verification" });
    }

    const text = orderId + "|" + paymentId;
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(text)
      .digest("hex");

    const verified = generatedSignature === signature;
    return c.json({ verified });
  } catch (error: any) {
    console.error("Error verifying payment signature:", error);
    return c.json({ error: "Failed to verify signature", details: error.message }, 500);
  }
});

// ========== STANDARD RAZORPAY BACKEND API ==========

const createOrderHandler = async (c: any) => {
  try {
    const body = await c.req.json();
    const { amount, currency = "INR", receipt, customerInfo, items } = body;

    const settings = await kv.get("settings:payment") || {};
    const rawKeyId = settings.razorpayKeyId || Deno.env.get("RAZORPAY_KEY_ID") || Deno.env.get("VITE_RAZORPAY_KEY_ID") || "";
    const rawKeySecret = settings.razorpayKeySecret || Deno.env.get("RAZORPAY_KEY_SECRET") || "";
    const keyId = cleanKey(rawKeyId);
    const keySecret = cleanKey(rawKeySecret);

    if (!keyId || !keySecret) {
      return c.json({
        error: "Razorpay credentials not configured",
        details: "Please configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server environment."
      }, 401);
    }

    // Server-side amount validation against product catalog / KV store
    let serverCalculatedTotalINR = 0;
    if (Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        let itemPrice = Number(item.price);
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
        serverCalculatedTotalINR += itemPrice * qty;
      }
    }

    // Determine final amount in INR and paise
    let finalAmountPaise: number;
    if (serverCalculatedTotalINR > 0) {
      finalAmountPaise = Math.round(serverCalculatedTotalINR * 100);
    } else if (amount !== undefined && amount !== null && !isNaN(amount)) {
      // If amount passed is >= 100 and likely already in paise
      finalAmountPaise = Math.round(Number(amount));
      // If amount is small, e.g. 50 (which would be ₹50), check if it meant INR or paise
      if (finalAmountPaise < 100) {
        finalAmountPaise = Math.round(finalAmountPaise * 100);
      }
    } else {
      return c.json({ error: "Missing or invalid amount" }, 400);
    }

    if (finalAmountPaise < 100) {
      return c.json({ error: "Amount must be at least ₹1 (100 paise)" }, 400);
    }

    const orderReceipt = receipt || `receipt_${Date.now().toString(36)}`;

    // Call official Razorpay Orders API
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(keyId + ":" + keySecret)}`
      },
      body: JSON.stringify({
        amount: finalAmountPaise,
        currency: currency || "INR",
        receipt: orderReceipt,
        notes: {
          merchant: "Shree Krushi Kendra",
          customer_name: customerInfo?.name || "Customer",
          customer_phone: customerInfo?.phone || "",
          customer_email: customerInfo?.email || "",
          address: customerInfo?.address ? String(customerInfo.address).substring(0, 100) : ""
        }
      })
    });

    if (response.status === 401) {
      return c.json({ error: "Razorpay authentication failed. Please check your Key ID and Secret." }, 401);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Razorpay API error response:", errorText);
      return c.json({ error: "Failed to create order via Razorpay API", details: errorText }, 502);
    }

    const orderData = await response.json();

    // Cache order in KV store
    await kv.set(`razorpay_order:${orderData.id}`, {
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      receipt: orderReceipt,
      customerInfo,
      items,
      status: "created",
      createdAt: new Date().toISOString()
    });

    return c.json({
      success: true,
      id: orderData.id,
      order_id: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      key: keyId
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return c.json({ error: "Internal Server Error", details: error.message }, 500);
  }
};

const verifyPaymentHandler = async (c: any) => {
  try {
    const body = await c.req.json();
    const {
      order_id, razorpay_order_id, orderId,
      payment_id, razorpay_payment_id, paymentId,
      signature, razorpay_signature
    } = body;

    const finalOrderId = order_id || razorpay_order_id || orderId;
    const finalPaymentId = payment_id || razorpay_payment_id || paymentId;
    const finalSignature = signature || razorpay_signature;

    if (!finalOrderId || !finalPaymentId || !finalSignature) {
      return c.json({
        error: "Missing required verification fields",
        details: "order_id, payment_id, and signature are required."
      }, 400);
    }

    const settings = await kv.get("settings:payment") || {};
    const rawKeyId = settings.razorpayKeyId || Deno.env.get("RAZORPAY_KEY_ID") || Deno.env.get("VITE_RAZORPAY_KEY_ID") || "";
    const rawKeySecret = settings.razorpayKeySecret || Deno.env.get("RAZORPAY_KEY_SECRET") || "";
    const keyId = cleanKey(rawKeyId);
    const keySecret = cleanKey(rawKeySecret);

    if (!keyId || !keySecret) {
      return c.json({ error: "Razorpay credentials not configured" }, 401);
    }

    // 1. Verify HMAC SHA256 Signature
    const text = finalOrderId + "|" + finalPaymentId;
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(text)
      .digest("hex");

    const genBuf = Buffer.from(generatedSignature);
    const sigBuf = Buffer.from(finalSignature);

    if (genBuf.length !== sigBuf.length || !crypto.timingSafeEqual(genBuf, sigBuf)) {
      console.warn(`[Verify] Signature mismatch for order: ${finalOrderId}, payment: ${finalPaymentId}`);
      return c.json({ error: "Signature mismatch", verified: false }, 400);
    }

    // 2. Prevent duplicate processing
    const existingPayment = await kv.get(`payment:${finalPaymentId}`);
    if (existingPayment && existingPayment.verified) {
      return c.json({
        success: true,
        verified: true,
        alreadyProcessed: true,
        orderId: finalOrderId,
        paymentId: finalPaymentId,
        status: "paid"
      });
    }

    // 3. Confirm payment with Razorpay API
    let paymentStatus = "captured";
    try {
      const authHeader = "Basic " + btoa(`${keyId}:${keySecret}`);
      const checkRes = await fetch(`https://api.razorpay.com/v1/payments/${finalPaymentId}`, {
        headers: { "Authorization": authHeader }
      });
      if (checkRes.ok) {
        const pData = await checkRes.json();
        paymentStatus = pData.status;
      }
    } catch (e) {
      console.warn("Could not query Razorpay payments API directly:", e);
    }

    // 4. Update order record in database
    const cachedOrder = await kv.get(`razorpay_order:${finalOrderId}`);
    if (cachedOrder) {
      cachedOrder.status = "PAID";
      cachedOrder.paymentId = finalPaymentId;
      cachedOrder.paidAt = new Date().toISOString();
      await kv.set(`razorpay_order:${finalOrderId}`, cachedOrder);
    }

    await kv.set(`payment:${finalPaymentId}`, {
      paymentId: finalPaymentId,
      orderId: finalOrderId,
      verified: true,
      status: paymentStatus,
      verifiedAt: new Date().toISOString()
    });

    return c.json({
      success: true,
      verified: true,
      orderId: finalOrderId,
      paymentId: finalPaymentId,
      status: "paid"
    });
  } catch (error: any) {
    console.error("Error verifying payment signature:", error);
    return c.json({ error: "Internal Server Error", details: error.message }, 500);
  }
};

const webhookHandler = async (c: any) => {
  try {
    const webhookSecret =
      Deno.env.get("RAZORPAY_WEBHOOK_SECRET") ||
      Deno.env.get("RAZORPAY_KEY_SECRET") ||
      "";

    if (!webhookSecret) {
      return c.json({ error: "Webhook secret not configured on server" }, 500);
    }

    const receivedSignature = c.req.header("x-razorpay-signature") || "";
    const rawBody = await c.req.text();

    if (!receivedSignature) {
      return c.json({ error: "Missing x-razorpay-signature header" }, 400);
    }

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const expBuf = Buffer.from(expectedSignature);
    const recBuf = Buffer.from(receivedSignature);

    if (expBuf.length !== recBuf.length || !crypto.timingSafeEqual(expBuf, recBuf)) {
      return c.json({ error: "Invalid webhook signature" }, 400);
    }

    const event = JSON.parse(rawBody);
    const eventId = event.event_id || event.id || `${event.event}_${Date.now()}`;

    // Prevent duplicate processing
    const processed = await kv.get(`webhook_event:${eventId}`);
    if (processed) {
      return c.json({ received: true, alreadyProcessed: true });
    }

    const eventType = event.event;
    if (eventType === "payment.captured") {
      const payment = event.payload?.payment?.entity;
      if (payment?.order_id) {
        const cachedOrder = await kv.get(`razorpay_order:${payment.order_id}`);
        if (cachedOrder) {
          cachedOrder.status = "PAID";
          cachedOrder.paymentId = payment.id;
          cachedOrder.updatedAt = new Date().toISOString();
          await kv.set(`razorpay_order:${payment.order_id}`, cachedOrder);
        }
      }
    } else if (eventType === "payment.failed") {
      const payment = event.payload?.payment?.entity;
      if (payment?.order_id) {
        const cachedOrder = await kv.get(`razorpay_order:${payment.order_id}`);
        if (cachedOrder) {
          cachedOrder.status = "FAILED";
          cachedOrder.failureReason = payment.error_description || "Payment failed";
          cachedOrder.updatedAt = new Date().toISOString();
          await kv.set(`razorpay_order:${payment.order_id}`, cachedOrder);
        }
      }
    }

    await kv.set(`webhook_event:${eventId}`, {
      eventId,
      event: eventType,
      processedAt: new Date().toISOString()
    });

    return c.json({ received: true, event: eventType });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return c.json({ error: "Webhook processing error", details: error.message }, 500);
  }
};

// Mount create-order endpoints
app.post("/create-razorpay-order", createOrderHandler);
app.post("/make-server-dfeaf20d/create-razorpay-order", createOrderHandler);
app.post("/api/create-order", createOrderHandler);
app.post("/make-server-dfeaf20d/api/create-order", createOrderHandler);

// Mount verify-payment endpoints
app.post("/verify-razorpay-payment", verifyPaymentHandler);
app.post("/make-server-dfeaf20d/verify-razorpay-payment", verifyPaymentHandler);
app.post("/api/verify-payment", verifyPaymentHandler);
app.post("/make-server-dfeaf20d/api/verify-payment", verifyPaymentHandler);

// Mount webhook endpoints
app.post("/razorpay-webhook", webhookHandler);
app.post("/make-server-dfeaf20d/razorpay-webhook", webhookHandler);

Deno.serve(app.fetch);