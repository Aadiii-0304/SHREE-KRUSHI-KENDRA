import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ShoppingCart, Star, Minus, Plus, Package, Truck, ShieldCheck, Check, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { ProductSafetyInfo } from '../components/ProductSafetyInfo';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { ProductVariant } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>();

  const product = products.find(p => p.id === id);

  React.useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="mb-4">
          {language === 'en' ? 'Product not found' : language === 'hi' ? 'उत्पाद नहीं मिला' : 'उत्पादन सापडले नाही'}
        </h2>
        <Button onClick={() => navigate('/products')}>
          {language === 'en' ? 'Back to Products' : language === 'hi' ? 'उत्पादों पर वापस जाएं' : 'उत्पादनांवर परत जा'}
        </Button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && (
      p.category === product.category ||
      (p.crops && product.crops && p.crops.some(crop => product.crops.includes(crop)))
    ))
    .slice(0, 4);

  const currentPrice = selectedVariant?.price || product.price;
  const currentOriginalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const currentStock = selectedVariant?.stock || product.stock;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    const variantText = selectedVariant ? ` (${selectedVariant.size}${selectedVariant.unit})` : '';
    const addedMsg = language === 'en'
      ? `${quantity} x ${product.name}${variantText} added to cart!`
      : language === 'hi'
      ? `${quantity} x ${product.name}${variantText} कार्ट में जोड़ा गया!`
      : `${quantity} x ${product.name}${variantText} कार्टमध्ये जोडले गेले!`;
    toast.success(addedMsg);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden p-8"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <div className="flex flex-wrap gap-2 mb-2 items-center">
              <Badge className="capitalize bg-green-600 text-white">{product.category}</Badge>
              {product.subcategory && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {product.subcategory}
                </Badge>
              )}
              {product.npkGrade && (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-300 font-mono font-bold">
                  NPK {product.npkGrade}
                </Badge>
              )}
            </div>
            <h1 className="mb-3 text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 font-semibold">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews} {t('productDetail.reviews')})
              </span>
            </div>
          </div>

          {/* Brand & Technical Specs Card */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 uppercase font-semibold">{t('productDetail.brand')}</p>
              <p className="text-lg font-bold text-green-800">{product.brand}</p>
            </div>
            {product.applicationMethod && (
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">Application Method</p>
                <p className="text-sm font-semibold text-green-800">{product.applicationMethod}</p>
              </div>
            )}
            {product.sku && (
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">SKU</p>
                <p className="text-xs font-mono text-gray-700">{product.sku}</p>
              </div>
            )}
            {product.manufacturer && (
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">Manufacturer</p>
                <p className="text-xs text-gray-800">{product.manufacturer}</p>
              </div>
            )}
          </div>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h3 className="mb-3">
                {language === 'en' ? 'Select Package Size:' : language === 'hi' ? 'पैकेज का आकार चुनें:' : 'पॅकेजचा आकार निवडा:'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.variants.map((variant, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedVariant?.size === variant.size
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{variant.size}{variant.unit}</span>
                      {selectedVariant?.size === variant.size && (
                        <Check className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-green-700 font-semibold">₹{variant.price}</p>
                    {variant.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">₹{variant.originalPrice}</p>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="border-t border-b py-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl text-green-700 font-bold">₹{currentPrice}</span>
              {currentOriginalPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through">
                    ₹{currentOriginalPrice}
                  </span>
                  <Badge className="bg-yellow-500 text-gray-900">
                    {Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Inclusive of all taxes' : language === 'hi' ? 'सभी करों सहित' : 'सर्व करांसह'}
            </p>
            <p className="text-sm text-green-600 mt-2">
              {currentStock > 20 
                ? t('products.inStock') 
                : language === 'en' 
                ? `Only ${currentStock} left in stock!` 
                : language === 'hi' 
                ? `स्टॉक में केवल ${currentStock} बचे हैं!` 
                : `स्टॉकमध्ये फक्त ${currentStock} शिल्लक आहेत!`}
            </p>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="mb-3">
              {language === 'en' ? 'Quantity:' : language === 'hi' ? 'मात्रा:' : 'प्रमाण:'}
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-gray-600">
                {language === 'en' 
                  ? `Max: ${currentStock} units` 
                  : language === 'hi' 
                  ? `अधिकतम: ${currentStock} इकाइयाँ` 
                  : `कमाल: ${currentStock} युनिट्स`}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full gap-2 bg-green-600 hover:bg-green-700"
                disabled={currentStock === 0}
              >
                <ShoppingCart className="h-5 w-5" />
                {t('products.addToCart')}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                size="lg"
                onClick={handleBuyNow}
                className="w-full bg-yellow-50 text-gray-900 hover:bg-yellow-400"
                disabled={currentStock === 0}
              >
                {language === 'en' ? 'Buy Now' : language === 'hi' ? 'अभी खरीदें' : 'आताच खरेदी करा'}
              </Button>
            </motion.div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Genuine Product' : language === 'hi' ? 'प्रामाणिक उत्पाद' : 'अस्सल उत्पादन'}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Fast Delivery' : language === 'hi' ? 'तेज डिलीवरी' : 'जलद वितरण'}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Quality Assured' : language === 'hi' ? 'गुणवत्ता का भरोसा' : 'गुणवत्तेची हमी'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16"
      >
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">{t('productDetail.description')}</TabsTrigger>
            <TabsTrigger value="usage">
              {language === 'en' ? 'Usage & Dosage' : language === 'hi' ? 'उपयोग और खुराक' : 'वापर आणि डोस'}
            </TabsTrigger>
            <TabsTrigger value="crops">
              {language === 'en' ? 'Suitable Crops' : language === 'hi' ? 'उपयुक्त फसलें' : 'योग्य पिके'}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6 bg-white p-6 rounded-lg border">
            <h3 className="mb-4">
              {language === 'en' ? 'Product Description' : language === 'hi' ? 'उत्पाद विवरण' : 'उत्पादन वर्णन'}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">{product.fullDescription}</p>
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h4 className="mb-3">{t('productDetail.benefits')}:</h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          <TabsContent value="usage" className="mt-6 bg-white p-6 rounded-lg border">
            <h3 className="mb-4">
              {language === 'en' ? 'Usage Instructions' : language === 'hi' ? 'उपयोग के निर्देश' : 'वापरण्याच्या सूचना'}
            </h3>
            {product.usage && (
              <div className="mb-6">
                <h4 className="mb-2">{t('productDetail.usage')}:</h4>
                <p className="text-gray-700">{product.usage}</p>
              </div>
            )}
            {product.dosage && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="mb-2 text-yellow-900">
                  {language === 'en' ? 'Recommended Dosage:' : language === 'hi' ? 'अनुशंसित खुराक:' : 'शिफारस केलेला डोस:'}
                </h4>
                <p className="text-yellow-800 font-semibold">{product.dosage}</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="crops" className="mt-6 bg-white p-6 rounded-lg border">
            <h3 className="mb-4">
              {language === 'en' ? 'Suitable for These Crops' : language === 'hi' ? 'इन फसलों के लिए उपयुक्त' : 'या पिकांसाठी योग्य'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {product.crops && product.crops.map(crop => (
                <div
                  key={crop}
                  className="bg-green-50 p-4 rounded-lg border border-green-200 text-center"
                >
                  <p className="font-semibold text-green-700">{crop}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="mb-8">{t('productDetail.relatedProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Dosage & Safety Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mb-8"
      >
        <h2 className="mb-6">
          {language === 'en' ? 'Dosage & Safety Information' : language === 'hi' ? 'खुराक और सुरक्षा जानकारी' : 'डोस आणि सुरक्षितता माहिती'}
        </h2>
        <ProductSafetyInfo category={product.category} />
      </motion.div>

      {/* WhatsApp Consultation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-200 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">
          {language === 'en' ? 'Need More Information?' : language === 'hi' ? 'क्या आपको और जानकारी चाहिए?' : 'तुम्हाला अधिक माहिती हवी आहे का?'}
        </h3>
        <p className="text-gray-700 mb-6 text-lg">
          {language === 'en' 
            ? 'Consult our expert about this product' 
            : language === 'hi' 
            ? 'इस उत्पाद के बारे में हमारे विशेषज्ञ से सलाह लें' 
            : 'या उत्पादनाबद्दल आमच्या तज्ञाचा सल्ला घ्या'}
        </p>
        <WhatsAppButton
          size="lg"
          message={
            language === 'en' 
              ? `Hello, I need information about ${product.name}. Please tell me the correct dosage and usage.` 
              : language === 'hi' 
              ? `नमस्ते, मुझे ${product.name} के बारे में जानकारी चाहिए। कृपया मुझे सही खुराक और उपयोग के बारे में बताएं।` 
              : `नमस्कार, मला ${product.name} बद्दल माहिती हवी आहे. कृपया मला योग्य डोस आणि वापर सांगा.`
          }
        />
      </motion.div>
    </div>
  );
};