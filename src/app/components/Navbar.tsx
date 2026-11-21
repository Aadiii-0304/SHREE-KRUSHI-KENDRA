import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { ShoppingCart, User, Search, Menu, X, Leaf, LogOut, Phone, Mail, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Navbar: React.FC = () => {
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = getCartCount();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-green-100">
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs">
            {/* Contact Information */}
            <div className="flex items-center gap-4">
              <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">+91 9730724497</span>
              </a>
              <a href="mailto:contact@shreekrishi.com" className="hidden md:flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <Mail className="h-3 w-3" />
                <span>aadityadamdhar342006@gmail.com</span>
              </a>
              <Link to="/contact" className="hidden lg:flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <MapPin className="h-3 w-3" />
                <span>Visit Our Store</span>
              </Link>
            </div>

            {/* Right Side - Language & Login */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 px-2 py-1 hover:bg-white/20 rounded transition-colors">
                    <User className="h-3.5 w-3.5" />
                    <span className="hidden xl:inline text-xs">{user?.name}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      {t('nav.dashboard')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      {t('nav.profile')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <button className="flex items-center gap-1 px-2 py-1 hover:bg-white/20 rounded transition-colors text-xs">
                    <User className="h-3.5 w-3.5" />
                    <span className="hidden xl:inline">{t('nav.login')}</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-green-700 font-bold text-base sm:text-lg">Shree Krushi Kendra</div>
              <div className="text-xs text-gray-600 hidden sm:block">By <span className="text-red-600 font-bold">Mohan Damdhar</span></div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 mx-4">
            <Link to="/" className={`px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors ${isActive('/') ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700'}`}>
              {t('nav.home')}
            </Link>
            <Link to="/products" className={`px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors ${isActive('/products') ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700'}`}>
              {t('nav.products')}
            </Link>
            <Link to="/crop-solutions" className={`px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors ${isActive('/crop-solutions') ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700'}`}>
              {t('nav.cropSolutions')}
            </Link>
            <Link to="/expert-help" className={`px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors ${isActive('/expert-help') ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700'}`}>
              {t('nav.expertHelp')}
            </Link>
            <Link to="/contact" className={`px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors ${isActive('/contact') ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700'}`}>
              {t('nav.contact')}
            </Link>
            <Link to="/about" className={`px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors ${isActive('/about') ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700'}`}>
              {t('nav.about')}
            </Link>
          </div>

          {/* Desktop Search & Cart */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <form onSubmit={handleSearch} className="w-64">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('nav.search')}
                  className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-1.5 rounded hover:bg-green-700"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Cart & Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-green-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-green-700" /> : <Menu className="h-6 w-6 text-green-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden py-3 border-t border-gray-100">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('nav.search')}
              className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-500 text-base"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2.5 rounded-lg hover:bg-green-700"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className={`w-full justify-start text-base h-12 ${isActive('/') ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                🏠 {t('nav.home')}
              </Button>
            </Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className={`w-full justify-start text-base h-12 ${isActive('/products') ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                🛒 {t('nav.products')}
              </Button>
            </Link>
            <Link to="/crop-solutions" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className={`w-full justify-start text-base h-12 ${isActive('/crop-solutions') ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                🌱 {t('nav.cropSolutions')}
              </Button>
            </Link>
            <Link to="/expert-help" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className={`w-full justify-start text-base h-12 ${isActive('/expert-help') ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                💬 {t('nav.expertHelp')}
              </Button>
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className={`w-full justify-start text-base h-12 ${isActive('/contact') ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                📞 {t('nav.contact')}
              </Button>
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className={`w-full justify-start text-base h-12 ${isActive('/about') ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                ℹ️ {t('nav.about')}
              </Button>
            </Link>
            
            {isAuthenticated && (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className={`w-full justify-start text-base h-12 ${isActive('/dashboard') ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                    📊 {t('nav.dashboard')}
                  </Button>
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className={`w-full justify-start text-base h-12 ${isActive('/profile') ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                    👤 {t('nav.profile')}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-base h-12"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  {t('nav.logout')}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
