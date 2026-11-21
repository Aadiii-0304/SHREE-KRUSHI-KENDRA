import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  RefreshCw,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { useAuth } from '../context/AuthContext';

export const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { users } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock users data - in production, this would come from backend
  const mockUsers = [
    {
      id: '1',
      name: 'Aditya Damdhar',
      email: 'aadityadamdhar342006@gmail.com',
      mobile: '+91 9730724497',
      role: 'admin',
      joinedDate: '2024-01-15',
      status: 'active',
      orders: 0,
    },
    {
      id: '2',
      name: 'Rajesh Patil',
      email: 'rajesh.patil@example.com',
      mobile: '+91 9876543210',
      role: 'customer',
      joinedDate: '2024-02-20',
      status: 'active',
      orders: 12,
    },
    {
      id: '3',
      name: 'Santosh Kamble',
      email: 'santosh.k@example.com',
      mobile: '+91 9876543211',
      role: 'customer',
      joinedDate: '2024-03-10',
      status: 'active',
      orders: 8,
    },
    {
      id: '4',
      name: 'Prakash Jadhav',
      email: 'prakash.j@example.com',
      mobile: '+91 9876543212',
      role: 'customer',
      joinedDate: '2024-03-15',
      status: 'active',
      orders: 15,
    },
  ];

  const [allUsers, setAllUsers] = useState(mockUsers);

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
            <h1 className="mb-2">User Management</h1>
            <p className="text-gray-600">
              Manage registered users ({allUsers.length} total users)
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Users</p>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{allUsers.length}</p>
            <p className="text-sm text-green-600 mt-1">+12% this month</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Active Users</p>
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">
              {allUsers.filter((u) => u.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Currently active</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Customers</p>
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">
              {allUsers.filter((u) => u.role === 'customer').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Regular customers</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Admins</p>
              <ShieldCheck className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold">
              {allUsers.filter((u) => u.role === 'admin').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Admin accounts</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="customer">Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Users Table */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-12 w-12 animate-spin mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <Card className="p-12 text-center">
            <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="mb-2">No users found</h3>
            <p className="text-gray-600">
              {searchTerm || filterRole !== 'all'
                ? 'Try adjusting your filters'
                : 'No registered users yet'}
            </p>
          </Card>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                              {user.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">{user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-sm text-gray-900">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {user.mobile}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={user.role === 'admin' ? 'destructive' : 'default'}
                        >
                          {user.role === 'admin' && (
                            <ShieldCheck className="h-3 w-3 mr-1" />
                          )}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          {new Date(user.joinedDate).toLocaleDateString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {user.orders}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={user.status === 'active' ? 'default' : 'secondary'}
                          className={
                            user.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : ''
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>View Orders</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
