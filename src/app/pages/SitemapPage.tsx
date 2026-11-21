import React from 'react';
import { Link } from 'react-router';
import { 
  Home, ShoppingBag, Package, User, ShoppingCart, CreditCard, 
  Sprout, MessageCircle, Info, Phone, HelpCircle, FileText, 
  Shield, Truck, LogIn, LayoutDashboard, Settings 
} from 'lucide-react';
import { Card } from '../components/ui/card';

interface PageLink {
  name: string;
  nameHindi: string;
  path: string;
  icon: React.ReactNode;
  description: string;
  category: 'main' | 'shop' | 'help' | 'account' | 'legal' | 'admin';
}

const allPages: PageLink[] = [
  // Main Pages
  {
    name: 'Home',
    nameHindi: 'होम',
    path: '/',
    icon: <Home className="h-8 w-8" />,
    description: 'Main homepage with hero section, crop finder, and featured products',
    category: 'main',
  },
  {
    name: 'About Us',
    nameHindi: 'हमारे बारे में',
    path: '/about',
    icon: <Info className="h-8 w-8" />,
    description: 'Learn about Shree Krushi Kendra and owner Mohan Damdhar',
    category: 'main',
  },
  {
    name: 'Contact',
    nameHindi: 'संपर्क करें',
    path: '/contact',
    icon: <Phone className="h-8 w-8" />,
    description: 'Contact form, address, phone, email, and Google Maps location',
    category: 'main',
  },

  // Shopping Pages
  {
    name: 'All Products',
    nameHindi: 'सभी उत्पाद',
    path: '/products',
    icon: <ShoppingBag className="h-8 w-8" />,
    description: 'Browse all products with filters by category, crop, and brand',
    category: 'shop',
  },
  {
    name: 'Shopping Cart',
    nameHindi: 'कार्ट',
    path: '/cart',
    icon: <ShoppingCart className="h-8 w-8" />,
    description: 'View and manage items in your shopping cart',
    category: 'shop',
  },
  {
    name: 'Checkout',
    nameHindi: 'चेकआउट',
    path: '/checkout',
    icon: <CreditCard className="h-8 w-8" />,
    description: 'Complete your order with delivery and payment details',
    category: 'shop',
  },

  // Help & Solutions
  {
    name: 'Crop Solutions',
    nameHindi: 'फसल समाधान',
    path: '/crop-solutions',
    icon: <Sprout className="h-8 w-8" />,
    description: 'Get crop-specific product recommendations for your problems',
    category: 'help',
  },
  {
    name: 'Expert Help',
    nameHindi: 'विशेषज्ञ मदद',
    path: '/expert-help',
    icon: <MessageCircle className="h-8 w-8" />,
    description: 'Chat with experts, upload crop photos, and get guidance',
    category: 'help',
  },
  {
    name: 'FAQ',
    nameHindi: 'सामान्य प्रश्न',
    path: '/faq',
    icon: <HelpCircle className="h-8 w-8" />,
    description: 'Frequently asked questions and answers',
    category: 'help',
  },

  // Account Pages
  {
    name: 'Login / Signup',
    nameHindi: 'लॉगिन',
    path: '/login',
    icon: <LogIn className="h-8 w-8" />,
    description: 'Sign in to your account or create a new account',
    category: 'account',
  },
  {
    name: 'My Profile',
    nameHindi: 'मेरी प्रोफाइल',
    path: '/profile',
    icon: <User className="h-8 w-8" />,
    description: 'View and edit your profile, order history, and saved items',
    category: 'account',
  },
  {
    name: 'My Dashboard',
    nameHindi: 'डैशबोर्ड',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-8 w-8" />,
    description: 'Manage your orders, track shipments, and view order details',
    category: 'account',
  },

  // Legal Pages
  {
    name: 'Privacy Policy',
    nameHindi: 'गोपनीयता नीति',
    path: '/privacy-policy',
    icon: <Shield className="h-8 w-8" />,
    description: 'How we collect, use, and protect your personal information',
    category: 'legal',
  },
  {
    name: 'Terms & Conditions',
    nameHindi: 'नियम और शर्तें',
    path: '/terms-conditions',
    icon: <FileText className="h-8 w-8" />,
    description: 'Terms of service and conditions for using our website',
    category: 'legal',
  },
  {
    name: 'Shipping Policy',
    nameHindi: 'शिपिंग नीति',
    path: '/shipping-policy',
    icon: <Truck className="h-8 w-8" />,
    description: 'Delivery areas, shipping charges, and estimated delivery times',
    category: 'legal',
  },

  // Admin Pages
  {
    name: 'Admin Dashboard',
    nameHindi: 'एडमिन डैशबोर्ड',
    path: '/admin/analytics',
    icon: <LayoutDashboard className="h-8 w-8" />,
    description: 'Admin analytics and business metrics',
    category: 'admin',
  },
  {
    name: 'Product Management',
    nameHindi: 'उत्पाद प्रबंधन',
    path: '/admin/products',
    icon: <Settings className="h-8 w-8" />,
    description: 'Manage products, inventory, and pricing',
    category: 'admin',
  },
];

const categoryInfo = {
  main: { title: 'Main Pages', titleHindi: 'मुख्य पृष्ठ', color: 'green' },
  shop: { title: 'Shopping', titleHindi: 'खरीदारी', color: 'blue' },
  help: { title: 'Help & Solutions', titleHindi: 'मदद और समाधान', color: 'yellow' },
  account: { title: 'My Account', titleHindi: 'मेरा खाता', color: 'purple' },
  legal: { title: 'Legal & Policies', titleHindi: 'कानूनी और नीतियां', color: 'gray' },
  admin: { title: 'Admin Area', titleHindi: 'एडमिन क्षेत्र', color: 'red' },
};

export const SitemapPage: React.FC = () => {
  const categories = ['main', 'shop', 'help', 'account', 'legal', 'admin'] as const;

  return (
    <div className="pb-20 md:pb-0 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            साइट मैप / Site Map
          </h1>
          <p className="text-xl text-center text-green-100 max-w-3xl mx-auto">
            सभी पृष्ठों की पूरी सूची / Complete list of all pages
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 text-center border-2 border-green-100">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {allPages.length}
            </div>
            <div className="text-sm text-gray-600">Total Pages</div>
          </Card>
          <Card className="p-6 text-center border-2 border-blue-100">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {allPages.filter(p => p.category === 'shop').length}
            </div>
            <div className="text-sm text-gray-600">Shopping Pages</div>
          </Card>
          <Card className="p-6 text-center border-2 border-yellow-100">
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              {allPages.filter(p => p.category === 'help').length}
            </div>
            <div className="text-sm text-gray-600">Help Pages</div>
          </Card>
          <Card className="p-6 text-center border-2 border-purple-100">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {allPages.filter(p => p.category === 'account').length}
            </div>
            <div className="text-sm text-gray-600">Account Pages</div>
          </Card>
        </div>

        {/* Pages by Category */}
        {categories.map((category) => {
          const categoryPages = allPages.filter(p => p.category === category);
          const info = categoryInfo[category];
          
          return (
            <div key={category} className="mb-12">
              <h2 className="text-3xl font-bold mb-6">
                <span className={`text-${info.color}-600`}>
                  {info.title}
                </span>
                <span className="text-gray-600 ml-4">/ {info.titleHindi}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPages.map((page) => (
                  <Link key={page.path} to={page.path}>
                    <Card className="p-6 border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all h-full group">
                      <div className="flex items-start gap-4">
                        <div className={`bg-${info.color}-100 p-3 rounded-lg text-${info.color}-600 group-hover:scale-110 transition-transform`}>
                          {page.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1 group-hover:text-green-600 transition-colors">
                            {page.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {page.nameHindi}
                          </p>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {page.description}
                          </p>
                          <div className="mt-3 text-xs text-green-600 font-semibold">
                            {page.path} →
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            Need Help Finding Something?
          </h3>
          <p className="text-green-100 mb-6">
            कुछ खोजने में मदद चाहिए? हमसे संपर्क करें
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Contact Us
              </button>
            </Link>
            <Link to="/expert-help">
              <button className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Get Expert Help
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
