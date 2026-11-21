export interface ProductVariant {
  size: string;
  unit: string;
  price: number;
  originalPrice?: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'pesticide' | 'fertilizer' | 'seed';
  subcategory?: string;
  npkGrade?: string;
  applicationMethod?: string;
  mrp?: number;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  fullDescription: string;
  crops: string[];
  brand: string;
  stock: number;
  rating: number;
  reviews: number;
  usage?: string;
  dosage?: string;
  benefits?: string[];
  variants?: ProductVariant[];
  sku?: string;
  availability?: string;
  manufacturer?: string;
  technicalSpecs?: string;
  source?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  role: 'ADMIN' | 'USER';
}

export interface OrderTracking {
  status: string;
  date: string;
  description: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  trackingNumber?: string;
  tracking?: OrderTracking[];
}
