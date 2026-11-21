import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import {
  Package,
  User,
  MapPin,
  LogOut,
  BarChart3,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Separator } from "../components/ui/separator";
import { fetchUserOrders } from "../utils/api";

export const DashboardPage: React.FC = () => {
  const { user, orders: localOrders, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<
    string | null
  >(null);
  const [backendOrders, setBackendOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [useBackend, setUseBackend] = useState(true);

  // Fetch orders from backend
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    const loadOrders = async () => {
      if (!user?.email || !useBackend) return;

      try {
        setLoadingOrders(true);
        const data = await fetchUserOrders(user.email);
        setBackendOrders(data.orders);
      } catch (error) {
        console.error(
          "Error loading orders from backend:",
          error,
        );
        setUseBackend(false);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, [user, navigate, useBackend]);

  // Show nothing while redirecting
  if (!user) {
    return null;
  }

  // Combine backend and local orders
  const orders =
    useBackend && backendOrders.length > 0
      ? backendOrders
      : localOrders;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const userOrders = orders.filter(
    (order) => order.userId === user.id,
  );
  const pendingOrders = userOrders.filter(
    (o) => o.status === "pending" || o.status === "processing",
  );
  const completedOrders = userOrders.filter(
    (o) => o.status === "delivered",
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="mb-2">My Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user.name}!
          </p>
        </div>
        <div className="flex gap-3">
          {user.email === "aadityadamdhar342006@gmail.com" && (
            <>
              <Link to="/admin/products">
                <Button variant="outline" className="gap-2">
                  <Package className="h-4 w-4" />
                  Manage Products
                </Button>
              </Link>
              <Link to="/admin/analytics">
                <Button variant="outline" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Button>
              </Link>
            </>
          )}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - User Profile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card className="p-6 space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="mb-1">{user.name}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {user.email}
              </p>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                Member
              </Badge>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Mobile
                </p>
                <p className="font-semibold">{user.mobile}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Address
                </p>
                <p className="text-sm">{user.address}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {userOrders.length}
                </p>
                <p className="text-sm text-gray-600">
                  Total Orders
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingOrders.length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="orders">
                My Orders
              </TabsTrigger>
              <TabsTrigger value="tracking">
                Order Tracking
              </TabsTrigger>
              <TabsTrigger value="profile">
                Profile Settings
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card className="p-6">
                <h3 className="mb-6">Order History</h3>
                {userOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      No orders yet
                    </p>
                    <Link to="/products">
                      <Button className="bg-green-600 hover:bg-green-700">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-semibold">
                              Order #{order.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(
                                order.date,
                              ).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <Badge
                            className={`${getStatusColor(order.status)} border flex items-center gap-1`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status
                              .charAt(0)
                              .toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="space-y-3 mb-4">
                          {order.items.map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex gap-3"
                            >
                              <ImageWithFallback
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium">
                                  {item.product.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Qty: {item.quantity}{" "}
                                  {item.selectedVariant &&
                                    `× ${item.selectedVariant.size}${item.selectedVariant.unit}`}
                                </p>
                              </div>
                              <p className="font-semibold">
                                ₹
                                {(
                                  (item.selectedVariant
                                    ?.price ||
                                    item.product.price) *
                                  item.quantity
                                ).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                          <div>
                            <p className="text-sm text-gray-600">
                              Total Amount
                            </p>
                            <p className="text-xl font-bold text-green-600">
                              ₹{order.total.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setSelectedOrder(order.id)
                              }
                            >
                              Track Order
                            </Button>
                            {order.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Order Tracking Tab */}
            <TabsContent value="tracking">
              <Card className="p-6">
                <h3 className="mb-6">Track Your Order</h3>
                {selectedOrder ? (
                  <div>
                    {(() => {
                      const order = userOrders.find(
                        (o) => o.id === selectedOrder,
                      );
                      if (!order) return <p>Order not found</p>;

                      const trackingSteps = [
                        {
                          status: "Order Placed",
                          completed: true,
                          date: order.date,
                        },
                        {
                          status: "Processing",
                          completed: order.status !== "pending",
                          date: order.date,
                        },
                        {
                          status: "Shipped",
                          completed:
                            order.status === "shipped" ||
                            order.status === "delivered",
                          date: order.date,
                        },
                        {
                          status: "Delivered",
                          completed:
                            order.status === "delivered",
                          date: order.date,
                        },
                      ];

                      return (
                        <div>
                          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">
                              Order ID
                            </p>
                            <p className="font-semibold text-lg">
                              #{order.id}
                            </p>
                            {order.trackingNumber && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">
                                  Tracking Number
                                </p>
                                <p className="font-mono">
                                  {order.trackingNumber}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="relative">
                            {trackingSteps.map(
                              (step, index) => (
                                <div
                                  key={index}
                                  className="flex gap-4 pb-8 last:pb-0"
                                >
                                  <div className="flex flex-col items-center">
                                    <div
                                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        step.completed
                                          ? "bg-green-600 text-white"
                                          : "bg-gray-200 text-gray-500"
                                      }`}
                                    >
                                      {step.completed ? (
                                        <CheckCircle className="h-5 w-5" />
                                      ) : (
                                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                      )}
                                    </div>
                                    {index <
                                      trackingSteps.length -
                                        1 && (
                                      <div
                                        className={`w-0.5 h-full ${
                                          step.completed
                                            ? "bg-green-600"
                                            : "bg-gray-200"
                                        }`}
                                        style={{
                                          minHeight: "40px",
                                        }}
                                      ></div>
                                    )}
                                  </div>
                                  <div className="flex-1 pb-4">
                                    <p className="font-semibold">
                                      {step.status}
                                    </p>
                                    {step.completed && (
                                      <p className="text-sm text-gray-600">
                                        {new Date(
                                          step.date,
                                        ).toLocaleString(
                                          "en-IN",
                                        )}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Truck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Select an order to track
                    </p>
                    <p className="text-sm text-gray-500">
                      Go to "My Orders" tab and click "Track
                      Order"
                    </p>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Profile Settings Tab */}
            <TabsContent value="profile">
              <Card className="p-6">
                <h3 className="mb-6">Profile Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">
                        Full Name
                      </label>
                      <p className="font-semibold p-2 bg-gray-50 rounded">
                        {user.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">
                        Email
                      </label>
                      <p className="font-semibold p-2 bg-gray-50 rounded">
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">
                        Mobile
                      </label>
                      <p className="font-semibold p-2 bg-gray-50 rounded">
                        {user.mobile}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-600 mb-1 block">
                        Address
                      </label>
                      <p className="font-semibold p-2 bg-gray-50 rounded">
                        {user.address}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      To update your profile information, please
                      contact our support team.
                    </p>
                    <Link to="/contact">
                      <Button variant="outline">
                        Contact Support
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};
