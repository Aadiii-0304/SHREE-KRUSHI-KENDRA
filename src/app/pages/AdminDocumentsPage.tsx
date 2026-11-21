import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  FileText,
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Calendar,
  Building2,
  Hash,
  StickyNote,
  Download,
  Upload,
  Eye,
  FileBadge,
  Leaf,
  Wheat,
  Droplets,
  Shield,
  Store,
  FileCheck,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

type DocStatus = 'valid' | 'expiring' | 'expired' | 'pending';

interface Document {
  id: string;
  name: string;
  type: string;
  licenseNumber: string;
  issuedBy: string;
  issueDate: string;
  expiryDate: string;
  status: DocStatus;
  notes: string;
  fileUrl: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
}

const defaultDocuments: Document[] = [
  {
    id: '1',
    name: 'Pesticide Dealer License',
    type: 'pesticide_license',
    licenseNumber: '',
    issuedBy: 'Department of Agriculture, Maharashtra',
    issueDate: '',
    expiryDate: '',
    status: 'pending',
    notes: 'Required under Insecticides Act, 1968',
    fileUrl: '',
    icon: Droplets,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: '2',
    name: 'Fertilizer Dealer License',
    type: 'fertilizer_license',
    licenseNumber: '',
    issuedBy: 'Department of Agriculture, Maharashtra',
    issueDate: '',
    expiryDate: '',
    status: 'pending',
    notes: 'Required under Fertilizer Control Order, 1985',
    fileUrl: '',
    icon: Leaf,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: '3',
    name: 'Seed Dealer License',
    type: 'seed_license',
    licenseNumber: '',
    issuedBy: 'Department of Agriculture, Maharashtra',
    issueDate: '',
    expiryDate: '',
    status: 'pending',
    notes: 'Required under Seeds Act, 1966',
    fileUrl: '',
    icon: Wheat,
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    id: '4',
    name: 'GST Registration Certificate',
    type: 'gst',
    licenseNumber: '',
    issuedBy: 'GST Council, Government of India',
    issueDate: '',
    expiryDate: '',
    status: 'pending',
    notes: 'Goods and Services Tax registration',
    fileUrl: '',
    icon: FileBadge,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: '5',
    name: 'Shop & Establishment Certificate',
    type: 'shop_establishment',
    licenseNumber: '',
    issuedBy: 'Municipal Corporation, Maharashtra',
    issueDate: '',
    expiryDate: '',
    status: 'pending',
    notes: 'Shops and Establishments Act registration',
    fileUrl: '',
    icon: Store,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: '6',
    name: 'Business / Trade License (Dukan Parwana)',
    type: 'trade_license',
    licenseNumber: '',
    issuedBy: 'Gram Panchayat / Municipality',
    issueDate: '',
    expiryDate: '',
    status: 'pending',
    notes: 'Local body trade license',
    fileUrl: '',
    icon: Building2,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: '7',
    name: 'FSSAI License',
    type: 'fssai',
    licenseNumber: '',
    issuedBy: 'Food Safety and Standards Authority of India',
    issueDate: '',
    expiryDate: '',
    status: 'pending',
    notes: 'Food safety license (if selling any food products)',
    fileUrl: '',
    icon: Shield,
    iconColor: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
];

const statusConfig: Record<DocStatus, { label: string; color: string; icon: React.ElementType; badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  valid: { label: 'Valid', color: 'text-green-700', icon: CheckCircle, badgeVariant: 'default' },
  expiring: { label: 'Expiring Soon', color: 'text-yellow-700', icon: AlertTriangle, badgeVariant: 'secondary' },
  expired: { label: 'Expired', color: 'text-red-700', icon: XCircle, badgeVariant: 'destructive' },
  pending: { label: 'Not Added', color: 'text-gray-500', icon: FileText, badgeVariant: 'outline' },
};

function getStatusFromDates(issueDate: string, expiryDate: string): DocStatus {
  if (!issueDate || !expiryDate) return 'pending';
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) return 'expired';
  if (daysLeft <= 60) return 'expiring';
  return 'valid';
}

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: FileCheck, label: 'Payments', path: '/admin/payments' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: FileText, label: 'Documents', path: '/admin/documents' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export const AdminDocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [documents, setDocuments] = useState<Document[]>(defaultDocuments);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddCustomOpen, setIsAddCustomOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [newCustomDoc, setNewCustomDoc] = useState({
    name: '',
    issuedBy: '',
    notes: '',
  });

  const handleEdit = (doc: Document) => {
    setEditingDoc({ ...doc });
    setIsDialogOpen(true);
  };

  const handleView = (doc: Document) => {
    setViewingDoc(doc);
    setIsViewOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingDoc) return;
    const updatedStatus = getStatusFromDates(editingDoc.issueDate, editingDoc.expiryDate);
    const updated = { ...editingDoc, status: updatedStatus };
    setDocuments(docs => docs.map(d => d.id === updated.id ? updated : d));
    setIsDialogOpen(false);
    setEditingDoc(null);
    toast.success(`"${updated.name}" updated successfully!`);
  };

  const handleDelete = (id: string) => {
    const doc = documents.find(d => d.id === id);
    setDocuments(docs => docs.filter(d => d.id !== id));
    setDeleteConfirmId(null);
    toast.success(`"${doc?.name}" removed.`);
  };

  const handleAddCustom = () => {
    if (!newCustomDoc.name.trim()) {
      toast.error('Please enter a document name.');
      return;
    }
    const newDoc: Document = {
      id: Date.now().toString(),
      name: newCustomDoc.name,
      type: 'custom',
      licenseNumber: '',
      issuedBy: newCustomDoc.issuedBy,
      issueDate: '',
      expiryDate: '',
      status: 'pending',
      notes: newCustomDoc.notes,
      fileUrl: '',
      icon: FileCheck,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    };
    setDocuments(docs => [...docs, newDoc]);
    setNewCustomDoc({ name: '', issuedBy: '', notes: '' });
    setIsAddCustomOpen(false);
    toast.success('Custom document added! Click Edit to fill in the details.');
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const filteredDocs = filterStatus === 'all'
    ? documents
    : documents.filter(d => d.status === filterStatus);

  const counts = {
    valid: documents.filter(d => d.status === 'valid').length,
    expiring: documents.filter(d => d.status === 'expiring').length,
    expired: documents.filter(d => d.status === 'expired').length,
    pending: documents.filter(d => d.status === 'pending').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 fixed h-full z-50`}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-bold text-sm">Admin Panel</p>
                <p className="text-xs text-gray-400">SKK Management</p>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg">
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.path === '/admin/documents'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-slate-800'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/admin/dashboard')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FileText className="h-6 w-6 text-green-600" />
                License & Documents
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage all your business licenses and certificates</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsAddCustomOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Document
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Status Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'all', label: 'Total Documents', count: documents.length, color: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
              { key: 'valid', label: 'Valid', count: counts.valid, color: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
              { key: 'expiring', label: 'Expiring Soon', count: counts.expiring, color: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
              { key: 'expired', label: 'Expired', count: counts.expired, color: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setFilterStatus(s.key)}
                className={`${s.color} border ${s.border} rounded-xl p-4 text-left transition-all hover:shadow-md ${filterStatus === s.key ? 'ring-2 ring-green-500' : ''}`}
              >
                <p className={`text-2xl font-bold ${s.text}`}>{s.count}</p>
                <p className={`text-sm font-medium ${s.text} mt-0.5`}>{s.label}</p>
              </button>
            ))}
          </div>

          {/* Pending Warning */}
          {counts.pending > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">
                  {counts.pending} document{counts.pending > 1 ? 's' : ''} need{counts.pending === 1 ? 's' : ''} details
                </p>
                <p className="text-sm text-amber-700 mt-0.5">
                  Click the Edit button on each document to fill in license numbers, dates, and issuing authority.
                </p>
              </div>
            </div>
          )}

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredDocs.map(doc => {
              const StatusIcon = statusConfig[doc.status].icon;
              const DocIcon = doc.icon;
              return (
                <Card key={doc.id} className="p-5 hover:shadow-md transition-shadow border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`${doc.bgColor} p-2.5 rounded-lg`}>
                        <DocIcon className={`h-5 w-5 ${doc.iconColor}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm leading-tight">{doc.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{doc.issuedBy || 'Issuing authority not set'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <StatusIcon className={`h-4 w-4 ${statusConfig[doc.status].color}`} />
                    <span className={`text-xs font-medium ${statusConfig[doc.status].color}`}>
                      {statusConfig[doc.status].label}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Hash className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{doc.licenseNumber || <span className="text-gray-400 italic">License no. not added</span>}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      {doc.issueDate ? (
                        <span>Issued: {new Date(doc.issueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      ) : (
                        <span className="text-gray-400 italic">Issue date not set</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      {doc.expiryDate ? (
                        <span className={doc.status === 'expired' ? 'text-red-600 font-medium' : doc.status === 'expiring' ? 'text-yellow-600 font-medium' : ''}>
                          Expires: {new Date(doc.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Expiry date not set</span>
                      )}
                    </div>
                    {doc.notes && (
                      <div className="flex items-start gap-2 text-xs text-gray-500">
                        <StickyNote className="h-3 w-3 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{doc.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-xs h-8" onClick={() => handleView(doc)}>
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1 gap-1.5 text-xs h-8 bg-green-600 hover:bg-green-700" onClick={() => handleEdit(doc)}>
                      <Edit2 className="h-3 w-3" />
                      Edit
                    </Button>
                    {doc.type === 'custom' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={() => setDeleteConfirmId(doc.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {/* Edit Document Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) { setIsDialogOpen(false); setEditingDoc(null); } }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="h-5 w-5 text-green-600" />
              Edit — {editingDoc?.name}
            </DialogTitle>
          </DialogHeader>
          {editingDoc && (
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="licenseNumber">
                  <Hash className="h-4 w-4 inline mr-1" />
                  License / Certificate Number
                </Label>
                <Input
                  id="licenseNumber"
                  value={editingDoc.licenseNumber}
                  onChange={e => setEditingDoc({ ...editingDoc, licenseNumber: e.target.value })}
                  placeholder="e.g. MH/AGR/PD/2024/001234"
                />
              </div>

              <div>
                <Label htmlFor="issuedBy">
                  <Building2 className="h-4 w-4 inline mr-1" />
                  Issued By (Authority)
                </Label>
                <Input
                  id="issuedBy"
                  value={editingDoc.issuedBy}
                  onChange={e => setEditingDoc({ ...editingDoc, issuedBy: e.target.value })}
                  placeholder="e.g. Department of Agriculture, Maharashtra"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="issueDate">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Issue Date
                  </Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={editingDoc.issueDate}
                    onChange={e => setEditingDoc({ ...editingDoc, issueDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Expiry Date
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={editingDoc.expiryDate}
                    onChange={e => setEditingDoc({ ...editingDoc, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fileUrl">
                  <Upload className="h-4 w-4 inline mr-1" />
                  Document File URL (optional)
                </Label>
                <Input
                  id="fileUrl"
                  value={editingDoc.fileUrl}
                  onChange={e => setEditingDoc({ ...editingDoc, fileUrl: e.target.value })}
                  placeholder="Paste a Google Drive / cloud link to the scanned document"
                />
                <p className="text-xs text-gray-500 mt-1">Paste a link to your scanned document stored in Google Drive or any cloud storage.</p>
              </div>

              <div>
                <Label htmlFor="notes">
                  <StickyNote className="h-4 w-4 inline mr-1" />
                  Notes (optional)
                </Label>
                <Textarea
                  id="notes"
                  value={editingDoc.notes}
                  onChange={e => setEditingDoc({ ...editingDoc, notes: e.target.value })}
                  placeholder="Add any additional notes or reminders..."
                  rows={3}
                />
              </div>

              {/* Live status preview */}
              {editingDoc.issueDate && editingDoc.expiryDate && (() => {
                const previewStatus = getStatusFromDates(editingDoc.issueDate, editingDoc.expiryDate);
                const cfg = statusConfig[previewStatus];
                const PreviewIcon = cfg.icon;
                return (
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${previewStatus === 'valid' ? 'bg-green-50 border border-green-200' : previewStatus === 'expiring' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
                    <PreviewIcon className={`h-4 w-4 ${cfg.color}`} />
                    <span className={`text-sm font-medium ${cfg.color}`}>Status will be: {cfg.label}</span>
                  </div>
                );
              })()}
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setIsDialogOpen(false); setEditingDoc(null); }}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              {viewingDoc?.name}
            </DialogTitle>
          </DialogHeader>
          {viewingDoc && (() => {
            const DocIcon = viewingDoc.icon;
            const StatusIcon = statusConfig[viewingDoc.status].icon;
            return (
              <div className="space-y-4">
                <div className={`${viewingDoc.bgColor} rounded-xl p-4 flex items-center gap-3`}>
                  <DocIcon className={`h-8 w-8 ${viewingDoc.iconColor}`} />
                  <div>
                    <p className="font-semibold text-gray-800">{viewingDoc.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <StatusIcon className={`h-4 w-4 ${statusConfig[viewingDoc.status].color}`} />
                      <span className={`text-sm font-medium ${statusConfig[viewingDoc.status].color}`}>
                        {statusConfig[viewingDoc.status].label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-medium">License Number</span>
                    <span className="text-gray-800 font-semibold">{viewingDoc.licenseNumber || '—'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-medium">Issued By</span>
                    <span className="text-gray-800 text-right max-w-[60%]">{viewingDoc.issuedBy || '—'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-medium">Issue Date</span>
                    <span className="text-gray-800">{viewingDoc.issueDate ? new Date(viewingDoc.issueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-medium">Expiry Date</span>
                    <span className={`font-medium ${viewingDoc.status === 'expired' ? 'text-red-600' : viewingDoc.status === 'expiring' ? 'text-yellow-600' : 'text-gray-800'}`}>
                      {viewingDoc.expiryDate ? new Date(viewingDoc.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'}
                    </span>
                  </div>
                  {viewingDoc.notes && (
                    <div className="py-2 border-b border-gray-100">
                      <p className="text-gray-500 font-medium mb-1">Notes</p>
                      <p className="text-gray-700">{viewingDoc.notes}</p>
                    </div>
                  )}
                  {viewingDoc.fileUrl && (
                    <div className="py-2">
                      <p className="text-gray-500 font-medium mb-2">Document File</p>
                      <a
                        href={viewingDoc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium underline"
                      >
                        <Download className="h-4 w-4" />
                        Open / Download Document
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => { setIsViewOpen(false); if (viewingDoc) handleEdit(viewingDoc); }}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Custom Document Dialog */}
      <Dialog open={isAddCustomOpen} onOpenChange={setIsAddCustomOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-green-600" />
              Add Custom Document
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="customName">Document Name *</Label>
              <Input
                id="customName"
                value={newCustomDoc.name}
                onChange={e => setNewCustomDoc({ ...newCustomDoc, name: e.target.value })}
                placeholder="e.g. Pollution NOC, Fire Safety Certificate"
              />
            </div>
            <div>
              <Label htmlFor="customAuthority">Issuing Authority</Label>
              <Input
                id="customAuthority"
                value={newCustomDoc.issuedBy}
                onChange={e => setNewCustomDoc({ ...newCustomDoc, issuedBy: e.target.value })}
                placeholder="e.g. Maharashtra Pollution Control Board"
              />
            </div>
            <div>
              <Label htmlFor="customNotes">Notes</Label>
              <Textarea
                id="customNotes"
                value={newCustomDoc.notes}
                onChange={e => setNewCustomDoc({ ...newCustomDoc, notes: e.target.value })}
                placeholder="Purpose or notes about this document..."
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCustomOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCustom} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Remove Document?
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-sm">
            Are you sure you want to remove <strong>{documents.find(d => d.id === deleteConfirmId)?.name}</strong>? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

