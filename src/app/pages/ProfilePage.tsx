import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, Edit2, Save, ShoppingBag, Heart, LogOut, Package, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Farmer Name',
    email: user?.email || 'farmer@example.com',
    phone: '+91 1234567890',
    address: 'Village, Taluka, District, Maharashtra',
  });

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Here you would typically update the user profile in your backend
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully!');
  };

  // Mock order data
  const recentOrders = [
    {
      id: 'ORD-001',
      date: '15 Jan 2026',
      items: 3,
      total: 2450,
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-700',
    },
    {
      id: 'ORD-002',
      date: '10 Jan 2026',
      items: 2,
      total: 1800,
      status: 'In Transit',
      statusColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'ORD-003',
      date: '5 Jan 2026',
      items: 1,
      total: 650,
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-700',
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pb-20 md:pb-0 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-green-600 hover:text-white gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">मेरी प्रोफाइल / My Profile</h1>
          <p className="text-center text-green-100">अपनी जानकारी देखें और प्रबंधित करें / View and manage your information</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 text-center border-2 border-green-100">
              {/* Profile Photo */}
              <div className="mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 mx-auto flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Name */}
              <h2 className="text-2xl font-bold mb-1">{formData.name}</h2>
              <p className="text-gray-600 mb-6">{formData.email}</p>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="w-full border-2 border-green-600 text-green-700 hover:bg-green-50"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-2 border-red-600 text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-green-600">{recentOrders.length}</div>
                    <div className="text-sm text-gray-600">Orders</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">0</div>
                    <div className="text-sm text-gray-600">Wishlist</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Content - Profile Details & Orders */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="p-6 border-2 border-green-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">व्यक्तिगत जानकारी / Personal Information</h3>
                {isEditing && (
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User className="h-4 w-4" />
                    नाम / Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`h-12 text-base ${isEditing ? 'border-2 border-green-300' : 'bg-gray-50'}`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="h-4 w-4" />
                    ईमेल / Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`h-12 text-base ${isEditing ? 'border-2 border-green-300' : 'bg-gray-50'}`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="h-4 w-4" />
                    फोन / Phone Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`h-12 text-base ${isEditing ? 'border-2 border-green-300' : 'bg-gray-50'}`}
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="h-4 w-4" />
                    पता / Address
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`h-12 text-base ${isEditing ? 'border-2 border-green-300' : 'bg-gray-50'}`}
                  />
                </div>
              </div>
            </Card>

            {/* Order History */}
            <Card className="p-6 border-2 border-green-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">ऑर्डर इतिहास / Order History</h3>
                <Button onClick={() => navigate('/dashboard')} variant="ghost" className="text-green-600">
                  View All Orders
                </Button>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Package className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{order.id}</h4>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-600">{order.items} items</span>
                      <span className="text-lg font-bold text-green-600">₹{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>

              {recentOrders.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-4">No orders yet</p>
                  <Button onClick={() => navigate('/products')} className="bg-green-600 hover:bg-green-700">
                    Start Shopping
                  </Button>
                </div>
              )}
            </Card>

            {/* Saved Items */}
            <Card className="p-6 border-2 border-green-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">सहेजे गए उत्पाद / Saved Items</h3>
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-4">No saved items yet</p>
                <Button onClick={() => navigate('/products')} variant="outline" className="border-2 border-green-600 text-green-700">
                  Browse Products
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
