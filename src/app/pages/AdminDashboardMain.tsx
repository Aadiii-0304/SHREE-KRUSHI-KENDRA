import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Clock,
  Menu,
  X,
  FileText,
  CreditCard,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';

export const AdminDashboardMain: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockProducts = products.filter(p => p.stock < 10).length;
  const categories = {
    pesticides: products.filter(p => p.category === 'pesticide').length,
    fertilizers: products.filter(p => p.category === 'fertilizer').length,
    seeds: products.filter(p => p.category === 'seed').length,
  };

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Total Stock',
      value: totalStock,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Low Stock Items',
      value: lowStockProducts,
      icon: Clock,
      color: 'bg-orange-500',
      change: '-5%',
    },
    {
      title: 'Categories',
      value: 3,
      icon: LayoutDashboard,
      color: 'bg-purple-500',
      change: '0%',
    },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', active: true },
    { icon: Package, label: 'Products', path: '/admin/products', active: false },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders', active: false },
    { icon: Users, label: 'Users', path: '/admin/users', active: false },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments', active: false },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics', active: false },
    { icon: FileText, label: 'Documents', path: '/admin/documents', active: false },
    { icon: Settings, label: 'Settings', path: '/admin/settings', active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 fixed h-full z-50`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-green-500" />
              <div>
                <h2 className="font-bold">Admin Panel</h2>
                <p className="text-xs text-gray-400">SKK Management</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-slate-800'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Product Categories</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Pesticides</p>
                      <p className="text-sm text-gray-500">{categories.pesticides} products</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/admin/products?category=pesticide')}
                  >
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Fertilizers</p>
                      <p className="text-sm text-gray-500">{categories.fertilizers} products</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/admin/products?category=fertilizer')}
                  >
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Seeds</p>
                      <p className="text-sm text-gray-500">{categories.seeds} products</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/admin/products?category=seed')}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start gap-3 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => navigate('/admin/products/add')}
                >
                  <Package className="h-5 w-5" />
                  Add New Product
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => navigate('/admin/products')}
                >
                  <Package className="h-5 w-5" />
                  Manage Products
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => navigate('/admin/orders')}
                >
                  <ShoppingCart className="h-5 w-5" />
                  View Orders
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => navigate('/admin/users')}
                >
                  <Users className="h-5 w-5" />
                  Manage Users
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => navigate('/admin/documents')}
                >
                  <FileText className="h-5 w-5" />
                  Licenses & Documents
                </Button>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          {lowStockProducts > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-orange-800 mb-1">Low Stock Alert</h3>
                  <p className="text-sm text-orange-700 mb-4">
                    {lowStockProducts} product(s) are running low on stock. Please restock soon.
                  </p>
                  <Button
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={() => navigate('/admin/products?filter=low-stock')}
                  >
                    View Low Stock Items
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
