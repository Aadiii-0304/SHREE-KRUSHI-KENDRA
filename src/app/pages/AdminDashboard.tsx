import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BarChart3, Users, ShoppingCart, Package, TrendingUp, Eye, DollarSign, Activity, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Visitors',
      value: '12,453',
      change: '+12.5%',
      icon: Eye,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Users',
      value: '3,421',
      change: '+8.2%',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: '842',
      change: '+23.1%',
      icon: ShoppingCart,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Revenue',
      value: '₹4,52,380',
      change: '+15.3%',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
  ];

  const recentOrders = [
    { id: 'ORD-1234', customer: 'Rajesh Patil', product: 'Monocil 250ml', amount: '₹385', status: 'Delivered', date: '2025-11-01' },
    { id: 'ORD-1235', customer: 'Santosh Kamble', product: 'NPK 18:18:10', amount: '₹1,380', status: 'Pending', date: '2025-11-01' },
    { id: 'ORD-1236', customer: 'Prakash Jadhav', product: 'Bayer Nativo', amount: '₹1,850', status: 'Shipped', date: '2025-11-02' },
    { id: 'ORD-1237', customer: 'Vijay Shinde', product: 'Round Up 500ml', amount: '₹525', status: 'Delivered', date: '2025-11-02' },
    { id: 'ORD-1238', customer: 'Anil Deshmukh', product: 'Urea 50kg', amount: '₹268', status: 'Processing', date: '2025-11-02' },
  ];

  const topProducts = [
    { name: 'Monocil 250ml', sales: 342, revenue: '₹1,31,670' },
    { name: 'NPK 18:18:10', sales: 289, revenue: '₹3,98,820' },
    { name: 'Round Up 500ml', sales: 267, revenue: '₹1,40,175' },
    { name: 'Blue Copper', sales: 234, revenue: '₹66,690' },
    { name: 'Urea 50kg', sales: 198, revenue: '₹53,064' },
  ];

  const pageViews = [
    { page: 'Homepage', views: 5234, bounce: '42%' },
    { page: 'Products Page', views: 4521, bounce: '35%' },
    { page: 'Product Details', views: 3842, bounce: '28%' },
    { page: 'Cart Page', views: 1234, bounce: '55%' },
    { page: 'About Us', views: 876, bounce: '38%' },
  ];

  const trafficSources = [
    { source: 'Google Search', visitors: 6234, percentage: 50 },
    { source: 'Direct', visitors: 3118, percentage: 25 },
    { source: 'Social Media', visitors: 1871, percentage: 15 },
    { source: 'Referral', visitors: 1247, percentage: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <h1 className="mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor your website performance and visitor insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                    <h2 className="text-3xl mb-2">{stat.value}</h2>
                    <span className="text-green-600 text-sm">{stat.change} from last month</span>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="products">Top Products</TabsTrigger>
            <TabsTrigger value="pages">Page Views</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          </TabsList>

          {/* Recent Orders */}
          <TabsContent value="orders">
            <Card className="p-6">
              <h3 className="mb-6">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-3 px-4">Order ID</th>
                      <th className="text-left pb-3 px-4">Customer</th>
                      <th className="text-left pb-3 px-4">Product</th>
                      <th className="text-left pb-3 px-4">Amount</th>
                      <th className="text-left pb-3 px-4">Status</th>
                      <th className="text-left pb-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">{order.id}</td>
                        <td className="py-4 px-4">{order.customer}</td>
                        <td className="py-4 px-4">{order.product}</td>
                        <td className="py-4 px-4">{order.amount}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Top Products */}
          <TabsContent value="products">
            <Card className="p-6">
              <h3 className="mb-6">Top Selling Products</h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.sales} units sold</div>
                      </div>
                    </div>
                    <div className="text-green-700">{product.revenue}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Page Views */}
          <TabsContent value="pages">
            <Card className="p-6">
              <h3 className="mb-6">Most Visited Pages</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-3 px-4">Page</th>
                      <th className="text-left pb-3 px-4">Views</th>
                      <th className="text-left pb-3 px-4">Bounce Rate</th>
                      <th className="text-left pb-3 px-4">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageViews.map((page, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">{page.page}</td>
                        <td className="py-4 px-4">{page.views.toLocaleString()}</td>
                        <td className="py-4 px-4">{page.bounce}</td>
                        <td className="py-4 px-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(page.views / 5234) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Traffic Sources */}
          <TabsContent value="traffic">
            <Card className="p-6">
              <h3 className="mb-6">Traffic Sources</h3>
              <div className="space-y-6">
                {trafficSources.map((source, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{source.source}</span>
                      <span className="text-gray-600">{source.visitors.toLocaleString()} visitors ({source.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Real-time Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Active users now</span>
                <span className="text-green-600">127 online</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Page views (last hour)</span>
                <span className="text-gray-900">1,234</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Cart additions (last hour)</span>
                <span className="text-gray-900">42</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Checkouts (last hour)</span>
                <span className="text-gray-900">18</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Growth Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">User growth (this month)</span>
                <span className="text-green-600">+18.5%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Revenue growth (this month)</span>
                <span className="text-green-600">+24.2%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Conversion rate</span>
                <span className="text-gray-900">3.8%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Average order value</span>
                <span className="text-gray-900">₹537</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

