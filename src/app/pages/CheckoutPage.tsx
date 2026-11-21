import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { createOrder } from '../utils/api';
import { initiateRazorpayPayment, createRazorpayOrder, verifyPaymentSignature } from '../utils/razorpay';
import {
  Loader2,
  Lock,
  CreditCard,
  Building2,
  Wallet,
  Truck,
  ShieldCheck,
  ArrowLeft,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';

type PaymentMethodType = 'airtel' | 'card' | 'netbanking' | 'wallet' | 'cod';

export const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated, addOrder } = useAuth();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('airtel');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    mobile: user?.mobile || '',
    email: user?.email || '',
    address: user?.address || '',
  });

  const totalAmount = getCartTotal();

  // Redirect if cart is empty or unauthenticated
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to proceed to checkout');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Helper to finalize order record
  const finalizeOrder = async (
    paymentMethod: string,
    paymentStatus: string,
    paymentId: string | null,
    orderReference: string
  ) => {
    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.selectedVariant?.price || item.product.price,
          name: item.product.name,
          selectedVariant: item.selectedVariant,
        })),
        customerInfo: {
          name: formData.name,
          email: formData.email || user?.email || '',
          phone: formData.mobile,
          address: formData.address,
        },
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        paymentId: paymentId,
        orderId: orderReference,
        paymentStatus: paymentStatus,
      };

      const result = await createOrder(orderData);

      const localOrder = {
        id: result.order.id,
        userId: user?.id || 'guest',
        items: cart,
        total: totalAmount,
        status: 'pending' as const,
        date: new Date().toISOString(),
        shippingAddress: formData.address,
        paymentMethod: paymentMethod,
        paymentStatus: (paymentStatus === 'paid' ? 'completed' : 'pending') as 'completed' | 'pending',
        paymentId: paymentId,
        orderId: orderReference,
      };

      addOrder(localOrder);

      const orderItems = cart.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }));

      clearCart();
      setProcessing(false);

      toast.success('Order placed successfully!');

      navigate('/order-success', {
        state: {
          orderId: result.order.id,
          total: totalAmount,
          paymentMethod: paymentMethod,
          paymentId: paymentId,
          items: orderItems,
        },
      });
    } catch (error) {
      setProcessing(false);
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  // Submit checkout form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.address) {
      toast.error('Please fill in all required shipping fields');
      return;
    }

    if (selectedMethod === 'cod') {
      setProcessing(true);
      await finalizeOrder('COD', 'pending', null, `ORD-COD-${Date.now()}`);
      return;
    }

    // Online Payments via Razorpay Checkout (Cards, Netbanking, Airtel, Wallets)
    setProcessing(true);

    try {
      const orderResponse = await createRazorpayOrder(totalAmount);
      const { order_id, key } = orderResponse;

      const methodMap: Record<string, string> = {
        airtel: 'netbanking',
        card: 'card',
        netbanking: 'netbanking',
        wallet: 'wallet',
      };

      await initiateRazorpayPayment({
        key: key,
        amount: totalAmount,
        name: 'Shree Krushi Kendra',
        description: 'Secure Payment',
        orderId: order_id,
        method: methodMap[selectedMethod] || undefined,
        prefill: {
          name: formData.name,
          email: formData.email || user?.email || '',
          contact: formData.mobile,
        },
        onSuccess: async (response) => {
          try {
            const isVerified = await verifyPaymentSignature(
              response.razorpay_order_id || order_id,
              response.razorpay_payment_id,
              response.razorpay_signature || ''
            );

            if (isVerified) {
              await finalizeOrder(
                selectedMethod,
                'paid',
                response.razorpay_payment_id,
                response.razorpay_order_id || order_id
              );
            } else {
              setProcessing(false);
              toast.error('Payment verification failed.');
            }
          } catch (err) {
            setProcessing(false);
            toast.error('Payment verification error.');
          }
        },
        onFailure: (error) => {
          setProcessing(false);
          if (error && error.message === 'Payment cancelled by user') {
            toast.error('Payment cancelled');
          } else {
            toast.error('Payment failed. Please try again.');
          }
        },
      });
    } catch (error) {
      setProcessing(false);
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment. Please try again.');
    }
  };

  if (cart.length === 0 || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28 md:pb-12">
      {/* Green Header Banner matching Shree Krushi Kendra branding */}
      <div className="bg-[#16A34A] text-white py-6 px-4 shadow-md mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-green-100 text-sm font-medium mb-1">
              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Cart
              </button>
              <span>•</span>
              <span>Shree Krushi Kendra</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-7 w-7 text-yellow-300" />
              Checkout & Payment
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-green-700/60 px-4 py-2 rounded-lg border border-green-500/40 text-sm">
            <Lock className="h-4 w-4 text-green-200" />
            <span>256-bit SSL Encrypted Payments</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">1</span>
                    Shipping & Delivery Information
                  </h2>
                  <span className="text-xs text-gray-500">* Required</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="md:col-span-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="mobile" className="text-gray-700 font-medium">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-gray-700 font-medium">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House No., Street, Village/Town, District, State, Pincode"
                      rows={3}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="border-b pb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">2</span>
                    Payment Options
                  </h2>
                  <span className="text-xs text-green-700 font-medium bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                    Secure Gateway
                  </span>
                </div>

                {/* Recommended Airtel Option */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Recommended Option</p>
                  <div
                    onClick={() => setSelectedMethod('airtel')}
                    className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                      selectedMethod === 'airtel'
                        ? 'border-green-600 bg-green-50/50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-red-100 text-red-700 font-bold text-xs uppercase">
                          Airtel
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Airtel Payments Bank</div>
                          <div className="text-xs text-gray-500">Fast & Secure Netbanking Solution</div>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="payment_method"
                        checked={selectedMethod === 'airtel'}
                        onChange={() => setSelectedMethod('airtel')}
                        className="h-5 w-5 text-green-600 focus:ring-green-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* All Payment Options Section */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">All Payment Options</p>

                  {/* 1. Cards */}
                  <div
                    onClick={() => setSelectedMethod('card')}
                    className={`cursor-pointer rounded-xl border p-4 transition-all flex items-center justify-between ${
                      selectedMethod === 'card'
                        ? 'border-green-600 bg-green-50/40 font-medium'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">Credit / Debit Cards</div>
                        <div className="text-xs text-gray-500">Visa, Mastercard, RuPay, Amex</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === 'card'}
                      onChange={() => setSelectedMethod('card')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                  </div>

                  {/* 2. Net Banking */}
                  <div
                    onClick={() => setSelectedMethod('netbanking')}
                    className={`cursor-pointer rounded-xl border p-4 transition-all flex items-center justify-between ${
                      selectedMethod === 'netbanking'
                        ? 'border-green-600 bg-green-50/40 font-medium'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">Net Banking</div>
                        <div className="text-xs text-gray-500">All major banks (SBI, HDFC, ICICI, Axis)</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === 'netbanking'}
                      onChange={() => setSelectedMethod('netbanking')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                  </div>

                  {/* 3. Mobile Wallets */}
                  <div
                    onClick={() => setSelectedMethod('wallet')}
                    className={`cursor-pointer rounded-xl border p-4 transition-all flex items-center justify-between ${
                      selectedMethod === 'wallet'
                        ? 'border-green-600 bg-green-50/40 font-medium'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-pink-50 text-pink-600">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">Mobile Wallets</div>
                        <div className="text-xs text-gray-500">Paytm, Amazon Pay, Mobikwik</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === 'wallet'}
                      onChange={() => setSelectedMethod('wallet')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                  </div>

                  {/* 4. Cash on Delivery */}
                  <div
                    onClick={() => setSelectedMethod('cod')}
                    className={`cursor-pointer rounded-xl border p-4 transition-all flex items-center justify-between ${
                      selectedMethod === 'cod'
                        ? 'border-green-600 bg-green-50/40 font-medium'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">Cash on Delivery (COD)</div>
                        <div className="text-xs text-gray-500">Pay cash when order is delivered</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === 'cod'}
                      onChange={() => setSelectedMethod('cod')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24 space-y-6">
                <h2 className="text-lg font-bold text-gray-900 border-b pb-3 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs font-normal text-gray-500">{cart.length} item(s)</span>
                </h2>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm py-1 border-b border-gray-50">
                      <div className="pr-2">
                        <span className="font-medium text-gray-800 line-clamp-1">{item.product.name}</span>
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-semibold text-gray-900 whitespace-nowrap">
                        ₹{((item.selectedVariant?.price || item.product.price) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Charges</span>
                    <span className="text-green-600 font-semibold uppercase text-xs bg-green-50 px-2 py-0.5 rounded">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-base text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-green-700">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Primary Desktop Action Button */}
                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full h-12 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl font-semibold flex items-center justify-center transition-colors shadow-md disabled:opacity-50"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : selectedMethod === 'cod' ? (
                    <>
                      <Truck className="h-5 w-5 mr-2" />
                      Place COD Order
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Pay ₹{totalAmount.toLocaleString('en-IN')}
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/products')}
                    className="text-xs text-gray-600 hover:text-green-700 flex items-center gap-1"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" /> Continue Shopping
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500 space-y-1 pt-2 border-t">
                  <p className="flex items-center justify-center gap-1 text-green-700 font-medium">
                    <ShieldCheck className="h-4 w-4" /> 100% Safe & Secure Checkout
                  </p>
                  <p>Shree Krushi Kendra Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Mobile Sticky Bottom Payment Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div>
            <div className="text-xs text-gray-500">Total Amount</div>
            <div className="text-lg font-bold text-green-700">
              ₹{totalAmount.toLocaleString('en-IN')}
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={processing}
            className="flex-1 max-w-xs bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold h-11 rounded-lg flex items-center justify-center gap-2 shadow"
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : selectedMethod === 'cod' ? (
              <>
                <Truck className="h-4 w-4" />
                Confirm Order
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Pay Now
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
