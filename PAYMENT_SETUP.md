# Payment Integration Setup Guide

This e-commerce website has integrated **Razorpay** payment gateway for secure online payments, along with Cash on Delivery (COD) option.

## 🚀 Features

- ✅ Multiple payment methods:
  - Cash on Delivery (COD)
  - UPI (Google Pay, PhonePe, Paytm, BHIM)
  - Net Banking (All major banks)
  - Credit/Debit Cards (Visa, Mastercard, RuPay, Amex)
  - Mobile Wallets (Paytm, Amazon Pay, Mobikwik)

- ✅ Secure payment processing via Razorpay
- ✅ Order confirmation page with order details
- ✅ Payment verification and tracking
- ✅ Responsive payment UI
- ✅ Real-time payment status updates

## 📋 Prerequisites

1. A Razorpay account (Sign up at https://razorpay.com)
2. Razorpay API keys (Test and Live)

## 🔧 Setup Instructions

### Step 1: Create a Razorpay Account

1. Go to [https://razorpay.com](https://razorpay.com)
2. Click on "Sign Up" and create a free account
3. Complete the KYC verification (required for live payments)

### Step 2: Get Your API Keys

1. Login to your Razorpay dashboard
2. Navigate to **Settings** → **API Keys**
3. Generate your API keys:
   - **Test Key**: For testing (starts with `rzp_test_`)
   - **Live Key**: For production (starts with `rzp_live_`)

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` file and add your Razorpay Key ID:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
   ```

3. For production, use your live key:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID_HERE
   ```

### Step 4: Backend Integration (Important!)

⚠️ **Security Note**: The current implementation includes frontend-only payment integration for demonstration purposes.

For **production use**, you MUST implement backend API endpoints:

#### Required Backend Endpoints:

1. **Create Razorpay Order**
   ```
   POST /api/payment/create-order
   Body: { amount: number, currency: string }
   Response: { orderId: string, amount: number }
   ```

2. **Verify Payment Signature**
   ```
   POST /api/payment/verify
   Body: { orderId: string, paymentId: string, signature: string }
   Response: { verified: boolean }
   ```

#### Backend Code Example (Node.js + Razorpay SDK):

```javascript
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order
app.post('/api/payment/create-order', async (req, res) => {
  const { amount, currency } = req.body;
  
  const options = {
    amount: amount * 100, // Convert to paise
    currency: currency || 'INR',
    receipt: `receipt_${Date.now()}`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Payment
app.post('/api/payment/verify', (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');
  
  const isVerified = expectedSignature === signature;
  res.json({ verified: isVerified });
});
```

### Step 5: Update Frontend API Calls

Update `src/app/utils/razorpay.ts` to call your backend APIs:

```typescript
export const createRazorpayOrder = async (amount: number): Promise<string> => {
  const response = await fetch('/api/payment/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency: 'INR' })
  });
  const data = await response.json();
  return data.orderId;
};

export const verifyPaymentSignature = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> => {
  const response = await fetch('/api/payment/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, paymentId, signature })
  });
  const data = await response.json();
  return data.verified;
};
```

## 🧪 Testing

### Test Mode

Use Razorpay's test credentials for testing:

**Test Card Numbers:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

**Test UPI IDs:**
- UPI ID: `success@razorpay`
- UPI ID: `failure@razorpay` (to test payment failure)

### Test Payment Flow:

1. Add products to cart
2. Go to checkout
3. Select any online payment method
4. Click "Pay & Place Order"
5. Use test credentials in Razorpay checkout
6. Verify order appears in dashboard

## 📱 Payment Flow

1. **User adds products to cart**
2. **User proceeds to checkout**
3. **User selects payment method**
4. **For Online Payment:**
   - Frontend calls backend to create Razorpay order
   - Razorpay checkout opens with order details
   - User completes payment
   - Razorpay sends payment response
   - Backend verifies payment signature
   - Order is confirmed and saved
5. **For COD:**
   - Order is created directly
   - Payment status is "pending"

## 🔒 Security Best Practices

1. **Never expose your Razorpay Key Secret** in frontend code
2. Always verify payment signatures on the backend
3. Use HTTPS in production
4. Store API keys in environment variables
5. Implement rate limiting on payment endpoints
6. Log all payment transactions for audit
7. Validate order amounts on backend before creating Razorpay order

## 📊 Webhook Integration (Optional)

For automatic payment status updates, configure Razorpay webhooks:

1. Go to Razorpay Dashboard → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Subscribe to events: `payment.captured`, `payment.failed`
4. Verify webhook signature in your backend

## 💡 Production Checklist

- [ ] Replace test keys with live keys
- [ ] Complete Razorpay KYC verification
- [ ] Implement backend order creation API
- [ ] Implement backend payment verification API
- [ ] Set up webhook handlers
- [ ] Test payment flow with real transactions (small amounts)
- [ ] Enable payment logging and monitoring
- [ ] Set up payment failure alerts
- [ ] Configure SSL certificate (HTTPS)
- [ ] Review and test refund process

## 📞 Support

- Razorpay Documentation: https://razorpay.com/docs/
- Razorpay Support: https://razorpay.com/support/
- Integration Issues: support@razorpay.com

## 🎯 Current Implementation Status

✅ Frontend payment UI
✅ Multiple payment methods
✅ Razorpay checkout integration
✅ Order confirmation page
✅ Payment status tracking
⚠️ Backend verification (needs implementation)
⚠️ Webhook integration (optional, recommended)

---

**Note**: This integration uses Razorpay SDK which is widely used and trusted in India. All major banks, UPI apps, and wallets are supported.
