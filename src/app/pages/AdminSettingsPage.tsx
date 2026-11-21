import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Settings,
  ArrowLeft,
  Save,
  Globe,
  Bell,
  Shield,
  Mail,
  MapPin,
  Phone,
  Store,
  Clock,
  CreditCard,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { fetchPaymentSettings, savePaymentSettings } from '../utils/api';

export const AdminSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    razorpayKeyId: '',
    razorpayKeySecret: '',
    simulatedMode: true,
    hasSecret: false,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await fetchPaymentSettings();
        setPaymentSettings({
          razorpayKeyId: settings.razorpayKeyId,
          razorpayKeySecret: '',
          simulatedMode: settings.simulatedMode,
          hasSecret: !!settings.hasSecret,
        });
      } catch (error) {
        console.error('Failed to load payment settings:', error);
        // Fallback to local storage
        setPaymentSettings({
          razorpayKeyId: localStorage.getItem('razorpay_key_id') || '',
          razorpayKeySecret: '',
          simulatedMode: localStorage.getItem('razorpay_simulated_mode') !== 'false',
          hasSecret: false,
        });
      }
    };
    loadSettings();
  }, []);

  // Store Settings
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Shree Krushi Kendra',
    ownerName: 'Mohan Damdhar',
    email: 'aadityadamdhar342006@gmail.com',
    phone: '+91 7219437160',
    whatsapp: '+91 7219437160',
    address: 'Shree Krushi Kendra Jamod, In front of Gajanan Maharaj Mandir ',
    city: 'Jamod',
    state: 'Maharashtra',
    pincode: '443402',
    gstNumber: '',
    description: 'Your trusted partner in agriculture since years.',
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailLowStock: true,
    emailNewUsers: false,
    pushOrders: true,
    pushLowStock: true,
  });

  // Business Hours
  const [businessHours, setBusinessHours] = useState({
    monday: { open: '08:00', close: '21:00', closed: false },
    tuesday: { open: '08:00', close: '21:00', closed: false },
    wednesday: { open: '08:00', close: '21:00', closed: false },
    thursday: { open: '08:00', close: '21:00', closed: false },
    friday: { open: '08:00', close: '21:00', closed: false },
    saturday: { open: '08:00', close: '21:00', closed: false },
    sunday: { open: '08:00', close: '21:00', closed: false },
  });

  const handleSaveStoreSettings = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Store settings saved successfully!');
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Notification settings saved successfully!');
    }, 1000);
  };

  const handleSaveBusinessHours = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Business hours saved successfully!');
    }, 1000);
  };

  const handleSavePaymentSettings = async () => {
    setSaving(true);
    try {
      await savePaymentSettings({
        razorpayKeyId: paymentSettings.razorpayKeyId,
        razorpayKeySecret: paymentSettings.razorpayKeySecret || undefined,
        simulatedMode: paymentSettings.simulatedMode,
      });

      localStorage.setItem('razorpay_key_id', paymentSettings.razorpayKeyId);
      localStorage.setItem('razorpay_simulated_mode', String(paymentSettings.simulatedMode));

      setPaymentSettings((prev) => ({
        ...prev,
        razorpayKeySecret: '',
        hasSecret: paymentSettings.razorpayKeySecret ? true : prev.hasSecret,
      }));

      toast.success('Payment settings saved successfully!');
    } catch (error: any) {
      console.error('Failed to save payment settings:', error);
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="mb-2">Settings</h1>
            <p className="text-gray-600">Manage your store settings and preferences</p>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="store">
              <Store className="h-4 w-4 mr-2" />
              Store Info
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="hours">
              <Clock className="h-4 w-4 mr-2" />
              Business Hours
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Settings
            </TabsTrigger>
          </TabsList>

          {/* Store Information */}
          <TabsContent value="store">
            <Card className="p-6">
              <h3 className="mb-6 flex items-center gap-2">
                <Store className="h-5 w-5 text-green-600" />
                Store Information
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      value={storeSettings.storeName}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, storeName: e.target.value })
                      }
                      placeholder="Shree Krushi Kendra"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      id="ownerName"
                      value={storeSettings.ownerName}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, ownerName: e.target.value })
                      }
                      placeholder="Mohan Damdhar"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={storeSettings.email}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, email: e.target.value })
                      }
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={storeSettings.phone}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, phone: e.target.value })
                      }
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      value={storeSettings.whatsapp}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, whatsapp: e.target.value })
                      }
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gst">GST Number (Optional)</Label>
                    <Input
                      id="gst"
                      value={storeSettings.gstNumber}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, gstNumber: e.target.value })
                      }
                      placeholder="27XXXXX1234X1Z5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Store Address
                  </Label>
                  <Textarea
                    id="address"
                    value={storeSettings.address}
                    onChange={(e) =>
                      setStoreSettings({ ...storeSettings, address: e.target.value })
                    }
                    placeholder="Full address"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={storeSettings.city}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, city: e.target.value })
                      }
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={storeSettings.state}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, state: e.target.value })
                      }
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={storeSettings.pincode}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, pincode: e.target.value })
                      }
                      placeholder="411001"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Store Description</Label>
                  <Textarea
                    id="description"
                    value={storeSettings.description}
                    onChange={(e) =>
                      setStoreSettings({ ...storeSettings, description: e.target.value })
                    }
                    placeholder="About your store..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveStoreSettings}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card className="p-6">
              <h3 className="mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5 text-green-600" />
                Notification Preferences
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Orders</p>
                        <p className="text-sm text-gray-600">
                          Get notified when a new order is placed
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailOrders}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailOrders: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Low Stock Alerts</p>
                        <p className="text-sm text-gray-600">
                          Get notified when products are running low
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailLowStock}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailLowStock: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New User Registrations</p>
                        <p className="text-sm text-gray-600">
                          Get notified when new users sign up
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNewUsers}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNewUsers: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="mb-4">Push Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-600">
                          Real-time notifications for order updates
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushOrders}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushOrders: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Stock Alerts</p>
                        <p className="text-sm text-gray-600">
                          Instant alerts for low stock items
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushLowStock}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushLowStock: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveNotifications}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Business Hours */}
          <TabsContent value="hours">
            <Card className="p-6">
              <h3 className="mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Business Hours
              </h3>
              <div className="space-y-4">
                {Object.entries(businessHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4 py-3 border-b last:border-0">
                    <div className="w-28">
                      <p className="font-medium capitalize">{day}</p>
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                      {hours.closed ? (
                        <span className="text-gray-500">Closed</span>
                      ) : (
                        <>
                          <Input
                            type="time"
                            value={hours.open}
                            onChange={(e) =>
                              setBusinessHours({
                                ...businessHours,
                                [day]: { ...hours, open: e.target.value },
                              })
                            }
                            className="w-32"
                          />
                          <span className="text-gray-500">to</span>
                          <Input
                            type="time"
                            value={hours.close}
                            onChange={(e) =>
                              setBusinessHours({
                                ...businessHours,
                                [day]: { ...hours, close: e.target.value },
                              })
                            }
                            className="w-32"
                          />
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`closed-${day}`}>Closed</Label>
                      <Switch
                        id={`closed-${day}`}
                        checked={hours.closed}
                        onCheckedChange={(checked) =>
                          setBusinessHours({
                            ...businessHours,
                            [day]: { ...hours, closed: checked },
                          })
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-6">
                <Button
                  onClick={handleSaveBusinessHours}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments">
            <Card className="p-6">
              <h3 className="mb-6 flex items-center gap-2 text-green-700 font-semibold text-lg">
                <CreditCard className="h-5 w-5" />
                Payment Gateway Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-4 text-gray-800 font-medium">Razorpay Configuration</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Simulated Payment Mode</p>
                        <p className="text-sm text-gray-600">
                          Toggle between simulating checkout payments and using the real Razorpay checkout overlay.
                        </p>
                        <p className="text-xs text-amber-600 font-medium mt-1">
                          Note: Simulated mode is automatically used if no valid Razorpay Key ID is configured.
                        </p>
                      </div>
                      <Switch
                        id="simulatedMode"
                        checked={paymentSettings.simulatedMode}
                        onCheckedChange={(checked) =>
                          setPaymentSettings({ ...paymentSettings, simulatedMode: checked })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="razorpayKeyId">Razorpay Key ID</Label>
                      <Input
                        id="razorpayKeyId"
                        type="text"
                        value={paymentSettings.razorpayKeyId}
                        onChange={(e) =>
                          setPaymentSettings({ ...paymentSettings, razorpayKeyId: e.target.value })
                        }
                        placeholder="rzp_test_..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Find this key in your Razorpay Dashboard under <strong>Settings &rarr; API Keys</strong>.
                        To test online payments without a real customer account, generate a test key.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="razorpayKeySecret" className="flex items-center gap-2">
                        Razorpay Key Secret
                        {paymentSettings.hasSecret && (
                          <span className="text-xs text-green-600 font-semibold px-2 py-0.5 bg-green-50 border border-green-200 rounded">
                            Secret Configured
                          </span>
                        )}
                      </Label>
                      <Input
                        id="razorpayKeySecret"
                        type="password"
                        value={paymentSettings.razorpayKeySecret}
                        onChange={(e) =>
                          setPaymentSettings({ ...paymentSettings, razorpayKeySecret: e.target.value })
                        }
                        placeholder={paymentSettings.hasSecret ? "••••••••••••••••" : "rzp_test_secret_..."}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter your Razorpay Key Secret. For security reasons, this is stored securely on the backend and never exposed. Leave empty if you do not wish to update the existing secret.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button
                    onClick={handleSavePaymentSettings}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
