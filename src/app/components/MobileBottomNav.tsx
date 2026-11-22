import React from 'react';
import { Link, useLocation } from 'react-router';
import { Home, Grid3x3, Leaf, Phone, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { getCartCount } = useCart();
  const { language, t } = useLanguage();
  const itemCount = getCartCount();

  const tabs = [
    {
      icon: Home,
      label: language === 'en' ? 'Home' : language === 'hi' ? 'होम' : 'मुख्य',
      path: '/',
    },
    {
      icon: Grid3x3,
      label: language === 'en' ? 'Products' : language === 'hi' ? 'उत्पाद' : 'उत्पादने',
      path: '/products',
    },
    {
      icon: Leaf,
      label: language === 'en' ? 'Crops' : language === 'hi' ? 'फसल' : 'पीक उपाय',
      path: '/crop-solutions',
    },
    {
      icon: Phone,
      label: language === 'en' ? 'Help' : language === 'hi' ? 'सहायता' : 'मदत',
      path: '/expert-help',
    },
    {
      icon: ShoppingCart,
      label: language === 'en' ? 'Cart' : language === 'hi' ? 'कार्ट' : 'कार्ट',
      path: '/cart',
      badge: itemCount,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 z-50 pb-safe md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
                isActive 
                  ? 'text-green-600' 
                  : 'text-gray-600 active:text-green-600'
              }`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
