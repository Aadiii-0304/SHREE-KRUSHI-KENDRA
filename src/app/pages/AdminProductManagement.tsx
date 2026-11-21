import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Upload, Plus, Search, Edit, Trash2, Package, Download, Filter, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { fetchProducts, createProduct, updateProduct, deleteProduct, bulkImportProducts } from '../utils/api';
import { Product } from '../types';
import { products as sampleProducts } from '../data/products';

export const AdminProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [csvImporting, setCsvImporting] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'pesticide',
    price: 0,
    stock: 0,
    brand: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching Admin products from database...');
      const data = await fetchProducts({});
      console.log('Admin products fetched:', data.products);
      console.log('Admin product count:', data.products?.length);
      setProducts(data.products);
      
      if (!data.products || data.products.length === 0) {
        console.warn('No products returned for Admin Product Management');
      }
    } catch (error) {
      console.error('Admin product fetch error:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const productId = `p${Date.now()}`;
      await createProduct({
        ...newProduct,
        id: productId,
        rating: 4.5,
        reviews: 0,
        crops: [],
      });

      toast.success('Product created successfully!');
      setIsAddDialogOpen(false);
      setNewProduct({
        name: '',
        category: 'pesticide',
        price: 0,
        stock: 0,
        brand: '',
        description: '',
        image: '',
      });
      loadProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      await updateProduct(editingProduct.id, editingProduct);
      toast.success('Product updated successfully!');
      setIsEditDialogOpen(false);
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully!');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleImportSampleData = async () => {
    if (!confirm(`This will import ${sampleProducts.length} sample products. Continue?`)) return;

    try {
      setCsvImporting(true);
      const result = await bulkImportProducts(sampleProducts);
      toast.success(`Successfully imported ${result.imported} products!`);
      loadProducts();
    } catch (error) {
      console.error('Error importing products:', error);
      toast.error('Failed to import products');
    } finally {
      setCsvImporting(false);
    }
  };

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setCsvImporting(true);
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());

        const productsToImport: Partial<Product>[] = [];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = lines[i].split(',').map(v => v.trim());
          const product: any = {};

          headers.forEach((header, index) => {
            const value = values[index];
            
            // Map CSV columns to product properties
            if (header === 'price' || header === 'stock' || header === 'originalPrice') {
              product[header] = parseFloat(value) || 0;
            } else if (header === 'crops') {
              product[header] = value ? value.split(';').map(c => c.trim()) : [];
            } else {
              product[header] = value;
            }
          });

          if (product.name && product.category && product.price) {
            product.id = product.id || `p${Date.now()}-${i}`;
            product.rating = product.rating || 4.5;
            product.reviews = product.reviews || 0;
            productsToImport.push(product);
          }
        }

        if (productsToImport.length > 0) {
          const result = await bulkImportProducts(productsToImport);
          toast.success(`Successfully imported ${result.imported} products from CSV!`);
          loadProducts();
        } else {
          toast.error('No valid products found in CSV file');
        }
      } catch (error) {
        console.error('Error parsing CSV:', error);
        toast.error('Failed to parse CSV file. Please check the format.');
      } finally {
        setCsvImporting(false);
        event.target.value = ''; // Reset file input
      }
    };

    reader.readAsText(file);
  };

  const downloadSampleCSV = () => {
    const csvContent = `id,name,category,price,originalPrice,stock,brand,description,image,crops
p1,Sample Pesticide,pesticide,500,600,100,Bayer,Sample pesticide description,https://images.unsplash.com/photo-1621331462282-0c890b7c933b,Cotton;Wheat;Rice
f1,Sample Fertilizer,fertilizer,1200,1400,150,IFFCO,Sample fertilizer description,https://images.unsplash.com/photo-1597066371673-2088a5c19802,Cotton;Rice;Wheat
s1,Sample Seed,seed,800,950,200,Mahyco,Sample seed description,https://images.unsplash.com/photo-1560493676-04071c5f467b,Cotton;Soybean`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-products.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="mb-2">Product Management</h1>
          <p className="text-gray-600">
            Manage your product catalog ({products.length} products)
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={loadProducts} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={downloadSampleCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Sample CSV
          </Button>
          <label>
            <Button variant="outline" disabled={csvImporting} className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              {csvImporting ? 'Importing...' : 'Import CSV'}
            </Button>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVImport}
              className="hidden"
            />
          </label>
          <Button onClick={handleImportSampleData} variant="outline" disabled={csvImporting}>
            <Package className="h-4 w-4 mr-2" />
            Import Sample Data
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="e.g., Monocil 250ml"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pesticide">Pesticide</SelectItem>
                        <SelectItem value="fertilizer">Fertilizer</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                      placeholder="e.g., Bayer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={newProduct.originalPrice || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: parseFloat(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Product description..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProduct} className="bg-green-600 hover:bg-green-700">
                    Create Product
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="pesticide">Pesticides</SelectItem>
                <SelectItem value="fertilizer">Fertilizers</SelectItem>
                <SelectItem value="seed">Seeds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Products Table */}
      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="h-12 w-12 animate-spin mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <Card className="p-12 text-center">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterCategory !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by adding your first product or importing sample data'}
          </p>
          {products.length === 0 && (
            <div className="flex gap-2 justify-center">
              <Button onClick={handleImportSampleData} disabled={csvImporting}>
                Import Sample Data
              </Button>
              <Button onClick={() => setIsAddDialogOpen(true)} variant="outline">
                Add Product
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={
                        product.category === 'pesticide' ? 'destructive' :
                        product.category === 'fertilizer' ? 'default' : 'secondary'
                      }>
                        {product.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">₹{product.originalPrice}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${
                        (product.stock || 0) < 50 ? 'text-red-600 font-medium' : 'text-gray-900'
                      }`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(product);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Product Dialog */}
      {editingProduct && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Product Name</Label>
                  <Input
                    id="edit-name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={editingProduct.category}
                    onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pesticide">Pesticide</SelectItem>
                      <SelectItem value="fertilizer">Fertilizer</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-brand">Brand</Label>
                  <Input
                    id="edit-brand"
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-price">Price (₹)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-originalPrice">Original Price / MRP (₹)</Label>
                  <Input
                    id="edit-originalPrice"
                    type="number"
                    value={editingProduct.originalPrice || editingProduct.mrp || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: parseFloat(e.target.value), mrp: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-stock">Stock Quantity</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-subcategory">Subcategory</Label>
                  <Input
                    id="edit-subcategory"
                    value={editingProduct.subcategory || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subcategory: e.target.value })}
                    placeholder="e.g. Water-Soluble NPK Fertilizers"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-npkGrade">NPK Grade / Composition</Label>
                  <Input
                    id="edit-npkGrade"
                    value={editingProduct.npkGrade || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, npkGrade: e.target.value })}
                    placeholder="e.g. 19:19:19"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-usage">Pack Size / Pack Info</Label>
                  <Input
                    id="edit-usage"
                    value={editingProduct.usage || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, usage: e.target.value })}
                    placeholder="e.g. 1 kg Pouch; 5 kg Bag"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-applicationMethod">Application Method</Label>
                  <Input
                    id="edit-applicationMethod"
                    value={editingProduct.applicationMethod || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, applicationMethod: e.target.value })}
                    placeholder="e.g. Foliar Spray / Drip"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateProduct} className="bg-green-600 hover:bg-green-700">
                  Update Product
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
