import React from 'react';
import { Link } from 'react-router';
import { 
  Home, ShoppingBag, User, ShoppingCart, Sprout, MessageCircle, 
  Info, Phone, HelpCircle, Shield, FileText, Truck, Map 
} from 'lucide-react';

interface PageCard {
  name: string;
  nameHindi: string;
  path: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const mainPages: PageCard[] = [
  {
    name: 'Home',
    nameHindi: 'होम',
    path: '/',
    icon: <Home className="h-10 w-10" />,
    color: 'green',
    description: 'Hero, Crop Finder, Featured Products',
  },
  {
    name: 'Products',
    nameHindi: 'उत्पाद',
    path: '/products',
    icon: <ShoppingBag className="h-10 w-10" />,
    color: 'blue',
    description: 'Browse 500+ Products with Filters',
  },
  {
    name: 'My Profile',
    nameHindi: 'प्रोफाइल',
    path: '/profile',
    icon: <User className="h-10 w-10" />,
    color: 'purple',
    description: 'Account Info & Order History',
  },
  {
    name: 'About Us',
    nameHindi: 'हमारे बारे में',
    path: '/about',
    icon: <Info className="h-10 w-10" />,
    color: 'green',
    description: 'Meet Mohan Damdhar & Our Story',
  },
  {
    name: 'Contact',
    nameHindi: 'संपर्क',
    path: '/contact',
    icon: <Phone className="h-10 w-10" />,
    color: 'blue',
    description: 'Form, Map, Phone, WhatsApp',
  },
  {
    name: 'Cart',
    nameHindi: 'कार्ट',
    path: '/cart',
    icon: <ShoppingCart className="h-10 w-10" />,
    color: 'yellow',
    description: 'View & Manage Your Cart',
  },
  {
    name: 'Crop Solutions',
    nameHindi: 'फसल समाधान',
    path: '/crop-solutions',
    icon: <Sprout className="h-10 w-10" />,
    color: 'green',
    description: 'Crop-Specific Recommendations',
  },
  {
    name: 'Expert Help',
    nameHindi: 'विशेषज्ञ मदद',
    path: '/expert-help',
    icon: <MessageCircle className="h-10 w-10" />,
    color: 'blue',
    description: 'Chat & Photo Upload',
  },
  {
    name: 'FAQ',
    nameHindi: 'प्रश्न',
    path: '/faq',
    icon: <HelpCircle className="h-10 w-10" />,
    color: 'purple',
    description: 'Common Questions Answered',
  },
  {
    name: 'Privacy',
    nameHindi: 'गोपनीयता',
    path: '/privacy-policy',
    icon: <Shield className="h-10 w-10" />,
    color: 'gray',
    description: 'Privacy & Data Protection',
  },
  {
    name: 'Terms',
    nameHindi: 'नियम',
    path: '/terms-conditions',
    icon: <FileText className="h-10 w-10" />,
    color: 'gray',
    description: 'Terms & Conditions',
  },
  {
    name: 'Shipping',
    nameHindi: 'शिपिंग',
    path: '/shipping-policy',
    icon: <Truck className="h-10 w-10" />,
    color: 'gray',
    description: 'Delivery & Shipping Info',
  },
];

export const AllPagesShowcase: React.FC = () => {
  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; hover: string; border: string } } = {
      green: { bg: 'bg-green-100', text: 'text-green-700', hover: 'hover:bg-green-200', border: 'border-green-300' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-700', hover: 'hover:bg-blue-200', border: 'border-blue-300' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', hover: 'hover:bg-yellow-200', border: 'border-yellow-300' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-700', hover: 'hover:bg-purple-200', border: 'border-purple-300' },
      gray: { bg: 'bg-gray-100', text: 'text-gray-700', hover: 'hover:bg-gray-200', border: 'border-gray-300' },
    };
    return colors[color] || colors.green;
  };

  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <Map className="h-5 w-5" />
            <span className="font-semibold">All Pages / सभी पृष्ठ</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Explore Our Complete Website
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            हमारी वेबसाइट के सभी पृष्ठों को देखें / Browse all {mainPages.length}+ pages of our website
          </p>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {mainPages.map((page) => {
            const colorClasses = getColorClasses(page.color);
            return (
              <Link
                key={page.path}
                to={page.path}
                className="group"
              >
                <div className={`
                  ${colorClasses.bg} ${colorClasses.hover}
                  border-2 ${colorClasses.border}
                  rounded-2xl p-6 h-full
                  transition-all duration-300
                  hover:shadow-xl hover:scale-105
                  flex flex-col items-center text-center
                `}>
                  {/* Icon */}
                  <div className={`${colorClasses.text} mb-4 group-hover:scale-110 transition-transform`}>
                    {page.icon}
                  </div>
                  
                  {/* Name */}
                  <h3 className={`text-lg font-bold ${colorClasses.text} mb-1`}>
                    {page.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {page.nameHindi}
                  </p>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {page.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/sitemap">
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-2">
                <Map className="h-6 w-6" />
                <span>View Complete Sitemap / पूरा साइट मैप देखें</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
