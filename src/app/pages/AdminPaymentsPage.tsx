import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  CreditCard,
  ArrowLeft,
  Search,
  Filter,
  RefreshCw,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Eye,
  TrendingUp,
  Wallet,
  Building2,
  Smartphone,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

type PaymentStatus = 'success' | 'failed' | 'pending' | 'refunded';
type PaymentMethod = 'upi' | 'netbanking' | 'card' | 'wallet' | 'cod';

interface Payment {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paymentId: string;
  date: string;
  time: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    orderId: 'ORD-1234',
    customerName: 'Rajesh Patil',
    customerEmail: 'rajesh.patil@example.com',
    amount: 1850,
    method: 'upi',
    status: 'success',
    paymentId: 'pay_MHx3nCZ5K2zJnY',
    date: '2024-11-01',
    time: '10:30 AM',
  },
  {
    id: '2',
    orderId: 'ORD-1235',
    customerName: 'Santosh Kamble',
    customerEmail: 'santosh.k@example.com',
    amount: 1380,
    method: 'netbanking',
    status: 'success',
    paymentId: 'pay_MHx4nCZ5K2zJnZ',
    date: '2024-11-01',
    time: '11:15 AM',
  },
  {
    id: '3',
    orderId: 'ORD-1236',
    customerName: 'Prakash Jadhav',
    customerEmail: 'prakash.j@example.com',
    amount: 2450,
    method: 'card',
    status: 'success',
    paymentId: 'pay_MHx5nCZ5K2zJoa',
    date: '2024-11-02',
    time: '09:45 AM',
  },
  {
    id: '4',
    orderId: 'ORD-1237',
    customerName: 'Vijay Shinde',
    customerEmail: 'vijay.s@example.com',
    amount: 525,
    method: 'wallet',
    status: 'failed',
    paymentId: 'pay_MHx6nCZ5K2zJob',
    date: '2024-11-02',
    time: '02:20 PM',
  },
  {
    id: '5',
    orderId: 'ORD-1238',
    customerName: 'Anil Deshmukh',
    customerEmail: 'anil.d@example.com',
    amount: 3200,
    method: 'upi',
    status: 'success',
    paymentId: 'pay_MHx7nCZ5K2zJoc',
    date: '2024-11-02',
    time: '03:50 PM',
  },
  {
    id: '6',
    orderId: 'ORD-1239',
    customerName: 'Sunita Sharma',
    customerEmail: 'sunita.s@example.com',
    amount: 890,
    method: 'cod',
    status: 'pending',
    paymentId: '-',
    date: '2024-11-02',
    time: '04:30 PM',
  },
];

const statusConfig: Record<PaymentStatus, { label: string; color: string; icon: React.ElementType; badgeClass: string }> = {
  success: { label: 'Success', color: 'text-green-700', icon: CheckCircle, badgeClass: 'bg-green-100 text-green-700' },
  failed: { label: 'Failed', color: 'text-red-700', icon: XCircle, badgeClass: 'bg-red-100 text-red-700' },
  pending: { label: 'Pending', color: 'text-yellow-700', icon: Clock, badgeClass: 'bg-yellow-100 text-yellow-700' },
  refunded: { label: 'Refunded', color: 'text-purple-700', icon: TrendingUp, badgeClass: 'bg-purple-100 text-purple-700' },
};

const methodConfig: Record<PaymentMethod, { label: string; icon: React.ElementType; color: string }> = {
  upi: { label: 'UPI', icon: Smartphone, color: 'text-purple-600' },
  netbanking: { label: 'Net Banking', icon: Building2, color: 'text-blue-600' },
  card: { label: 'Card', icon: CreditCard, color: 'text-green-600' },
  wallet: { label: 'Wallet', icon: Wallet, color: 'text-pink-600' },
  cod: { label: 'COD', icon: DollarSign, color: 'text-orange-600' },
};

export const AdminPaymentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [payments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch =
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Calculate stats
  const totalAmount = payments.reduce((sum, p) => sum + (p.status === 'success' ? p.amount : 0), 0);
  const successfulPayments = payments.filter(p => p.status === 'success').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;
  const pendingAmount = payments.reduce((sum, p) => sum + (p.status === 'pending' ? p.amount : 0), 0);

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailOpen(true);
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-green-700">
                <CreditCard className="h-8 w-8" />
                Payment Transactions
              </h1>
              <p className="text-gray-600 mt-1">Monitor and manage all payment transactions</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-green-700">₹{totalAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Successful</p>
                <p className="text-2xl font-bold text-blue-700">{successfulPayments}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Failed</p>
                <p className="text-2xl font-bold text-red-700">{failedPayments}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending COD</p>
                <p className="text-2xl font-bold text-yellow-700">₹{pendingAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by Order ID, Customer, Payment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterMethod} onValueChange={setFilterMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="netbanking">Net Banking</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="wallet">Wallet</SelectItem>
                <SelectItem value="cod">COD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Payments Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => {
                  const StatusIcon = statusConfig[payment.status].icon;
                  const MethodIcon = methodConfig[payment.method].icon;

                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm font-medium">{payment.orderId}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{payment.customerName}</div>
                          <div className="text-sm text-gray-500">{payment.customerEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-900">₹{payment.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <MethodIcon className={`h-4 w-4 ${methodConfig[payment.method].color}`} />
                          <span className="text-sm">{methodConfig[payment.method].label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={statusConfig[payment.status].badgeClass}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[payment.status].label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{payment.date}</div>
                        <div className="text-xs text-gray-400">{payment.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(payment)}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No payment transactions found</p>
            </div>
          )}
        </Card>

        {/* Payment Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono font-bold">{selectedPayment.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment ID</p>
                    <p className="font-mono text-sm">{selectedPayment.paymentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer Name</p>
                    <p className="font-medium">{selectedPayment.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-sm">{selectedPayment.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-2xl font-bold text-green-700">₹{selectedPayment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium">{methodConfig[selectedPayment.method].label}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className={statusConfig[selectedPayment.status].badgeClass}>
                      {statusConfig[selectedPayment.status].label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="text-sm">{selectedPayment.date} {selectedPayment.time}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

