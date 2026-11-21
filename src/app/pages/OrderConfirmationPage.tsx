import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { CheckCircle, Package, Truck, Home, ArrowRight, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { motion } from 'motion/react';

export const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state as {
    orderId: string;
    total: number;
    paymentMethod: string;
    paymentId?: string;
    items: any[];
  };

  useEffect(() => {
    // If no order data, redirect to home
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const isOnlinePayment = orderData.paymentMethod !== 'cod';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-green-700 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for your order. We've received it and will process it soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 mb-6">
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Order ID</span>
                <span className="font-mono font-bold text-lg">{orderData.orderId}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl text-green-700">₹{orderData.total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">
                  {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' :
                   orderData.paymentMethod === 'upi' ? 'UPI Payment' :
                   orderData.paymentMethod === 'netbanking' ? 'Net Banking' :
                   orderData.paymentMethod === 'card' ? 'Credit/Debit Card' :
                   orderData.paymentMethod === 'wallet' ? 'Mobile Wallet' : 'Online Payment'}
                </span>
              </div>
              {isOnlinePayment && orderData.paymentId && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-600">Payment ID</span>
                  <span className="font-mono text-sm">{orderData.paymentId}</span>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h3 className="font-semibold mb-3">Order Items</h3>
              <div className="space-y-2">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">
                    {isOnlinePayment ? 'Payment Successful' : 'Order Confirmed'}
                  </p>
                  <p className="text-sm text-green-600">
                    {isOnlinePayment
                      ? 'Your payment has been received and verified'
                      : 'Pay cash when the order is delivered to your address'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* What's Next */}
          <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-4">What happens next?</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Order Processing</h4>
                  <p className="text-sm text-gray-600">
                    We're preparing your order for shipment. You'll receive a confirmation email shortly.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Shipping</h4>
                  <p className="text-sm text-gray-600">
                    Your order will be shipped within 1-2 business days. Track your order from your dashboard.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Home className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Delivery</h4>
                  <p className="text-sm text-gray-600">
                    Expected delivery in 3-5 business days. Our team will contact you before delivery.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
            >
              View Order Status
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => navigate('/products')}
              variant="outline"
              className="flex-1 gap-2"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Download Invoice */}
          <div className="mt-6 text-center">
            <Button variant="ghost" className="gap-2 text-gray-600">
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
          </div>
        </motion.div>

        {/* Contact Support */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Need help with your order?</p>
          <a href="/contact" className="text-green-600 hover:text-green-700 font-medium">
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
};

