import React from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Star, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    const addedMsg = language === 'en' 
      ? `${product.name} added to cart!` 
      : language === 'hi' 
      ? `${product.name} कार्ट में जोड़ा गया!` 
      : `${product.name} कार्टमध्ये जोडले गेले!`;
    toast.success(addedMsg);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text =
      language === 'en'
        ? `Hello Shree Krushi Kendra, I want to order this product:\n📦 Product: ${product.name}\n💰 Price: ₹${product.price}\nPlease confirm availability and delivery.`
        : language === 'hi'
        ? `नमस्ते, मुझे श्री कृषि केंद्र से यह उत्पाद मंगाना है:\n📦 उत्पाद: ${product.name}\n💰 कीमत: ₹${product.price}\nकृपया उपलब्धता और डिलीवरी बताएं।`
        : `नमस्कार, मला श्री कृषी केंद्राकडून हे उत्पादन मागवायचे आहे:\n📦 नाव: ${product.name}\n💰 दर: ₹${product.price}\nकृपया उपलब्धता व डिलिव्हरी सांगा.`;

    window.open(`https://wa.me/917219437160?text=${encodeURIComponent(text)}`, '_blank');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pesticide':
        return 'bg-red-100 text-red-700';
      case 'fertilizer':
        return 'bg-green-100 text-green-700';
      case 'seed':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
        whileHover={{ 
          y: -12,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm">
              {language === 'en' ? 'Save' : language === 'hi' ? 'बचत' : 'बचत'} ₹{product.originalPrice - product.price}
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge className={getCategoryColor(product.category)}>
              {product.category.toUpperCase()}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
          </div>

          {/* Brand & NPK Grade */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">
              {product.brand}
            </span>
            {product.npkGrade && (
              <Badge variant="outline" className="text-xs border-green-600 text-green-700 bg-green-50 font-mono">
                NPK {product.npkGrade}
              </Badge>
            )}
          </div>

          <h3 className="mb-1 font-semibold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>

          {/* Subcategory & Application method tags */}
          {product.subcategory && (
            <div className="mb-2">
              <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {product.subcategory}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1 mb-3">
            {product.crops && product.crops.slice(0, 3).map((crop) => (
              <Badge key={crop} variant="outline" className="text-xs">
                {crop}
              </Badge>
            ))}
            {product.crops && product.crops.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.crops.length - 3}
              </Badge>
            )}
          </div>

          <div className="mt-auto">
            {product.variants && product.variants.length > 0 ? (
              <div className="text-xs text-gray-600 mb-2">
                {language === 'en' 
                  ? `Available in ${product.variants.length} sizes` 
                  : language === 'hi' 
                  ? `${product.variants.length} आकारों में उपलब्ध` 
                  : `${product.variants.length} आकारांमध्ये उपलब्ध`}
              </div>
            ) : product.usage ? (
              <div className="text-[11px] text-gray-500 mb-2 truncate">
                📦 Pack: {product.usage.split(';')[0] || product.usage}
              </div>
            ) : null}

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-lg font-bold text-green-700">₹{product.price}</span>
              {(product.originalPrice || product.mrp) && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice || product.mrp}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 border-green-600 text-green-700 hover:bg-green-50 text-xs py-2 px-2 h-9 font-semibold"
                title={language === 'en' ? 'Add to Cart' : language === 'hi' ? 'कार्ट में जोड़ें' : 'कार्टमध्ये जोडा'}
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1 shrink-0" />
                <span className="truncate">
                  {language === 'en' ? 'Add' : language === 'hi' ? 'कार्ट' : 'कार्ट'}
                </span>
              </Button>

              <Button
                onClick={handleWhatsAppOrder}
                className="flex-1 bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs py-2 px-2 h-9 font-bold shadow-sm"
                title={language === 'en' ? 'Order on WhatsApp' : language === 'hi' ? 'WhatsApp पर मंगाएं' : 'WhatsApp वर मागवा'}
              >
                <MessageCircle className="h-3.5 w-3.5 mr-1 shrink-0" />
                <span className="truncate">WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
