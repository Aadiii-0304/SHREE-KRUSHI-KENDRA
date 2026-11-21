import React from 'react';
import { Link, useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const deliveryCharge = getCartTotal() >= 1000 ? 0 : 50;
  const finalTotal = getCartTotal() + deliveryCharge;

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
      >
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h2 className="mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link to="/products">
          <Button className="bg-green-600 hover:bg-green-700" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((item, index) => {
              const price = item.selectedVariant?.price || item.product.price;
              const originalPrice = item.selectedVariant?.originalPrice || item.product.originalPrice;
              const stock = item.selectedVariant?.stock || item.product.stock;
              const variantKey = item.selectedVariant?.size || item.product.id;

              return (
                <motion.div
                  key={`${item.product.id}-${variantKey}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <Link to={`/product/${item.product.id}`}>
                            <h3 className="hover:text-green-600 line-clamp-2 pr-4">
                              {item.product.name}
                            </h3>
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.product.id, item.selectedVariant?.size)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-5 w-5" />
                          </motion.button>
                        </div>

                        {item.selectedVariant && (
                          <p className="text-sm text-gray-600 mb-2">
                            Size: {item.selectedVariant.size}{item.selectedVariant.unit}
                          </p>
                        )}

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-semibold text-green-700">₹{price}</span>
                          {originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{originalPrice}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 border-2 border-gray-200 rounded-lg">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.size)}
                              className="p-2 hover:bg-gray-100 rounded-l-lg"
                            >
                              <Minus className="h-4 w-4" />
                            </motion.button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.size)}
                              disabled={item.quantity >= stock}
                              className="p-2 hover:bg-gray-100 rounded-r-lg disabled:opacity-50"
                            >
                              <Plus className="h-4 w-4" />
                            </motion.button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-600">Subtotal</p>
                            <p className="text-lg font-bold text-green-700">
                              ₹{(price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/products">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="p-6 sticky top-24">
            <h3 className="mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charges</span>
                <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}
                </span>
              </div>
              {getCartTotal() < 1000 && (
                <p className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg">
                  Add ₹{(1000 - getCartTotal()).toFixed(2)} more for FREE delivery!
                </p>
              )}
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-green-700">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full bg-green-600 hover:bg-green-700 gap-2"
                size="lg"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="bg-green-100 p-2 rounded">
                  <ShoppingBag className="h-4 w-4 text-green-600" />
                </div>
                <span>100% Genuine Products</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="bg-green-100 p-2 rounded">
                  <ArrowRight className="h-4 w-4 text-green-600" />
                </div>
                <span>Fast & Secure Delivery</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
