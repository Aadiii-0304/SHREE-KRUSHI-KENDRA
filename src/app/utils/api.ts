import { projectId, publicAnonKey } from './supabase/info';
import { Product } from '../types';
import { products as fallbackProducts } from '../data/products';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal
  ? 'http://localhost:8000/make-server-dfeaf20d'
  : `https://${projectId}.supabase.co/functions/v1/make-server-dfeaf20d`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`,
});

// ========== PRODUCTS API ==========

export const fetchProducts = async (params?: {
  category?: string;
  search?: string;
  brand?: string;
  crop?: string;
  limit?: number;
  offset?: number;
}): Promise<{ products: Product[]; total: number }> => {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.append('category', params.category);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.brand) queryParams.append('brand', params.brand);
  if (params?.crop) queryParams.append('crop', params.crop);
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.offset) queryParams.append('offset', params.offset.toString());

  const url = `${API_BASE_URL}/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  try {
    const response = await fetch(url, {
      headers: getHeaders(),
    });

    if (response.ok) {
      const data = await response.json();
      const hasFilters = params?.category || params?.search || params?.brand || params?.crop;

      if (data.products && data.products.length > 0 && (hasFilters || data.products.length >= fallbackProducts.length)) {
        return data;
      }

      // Auto-sync missing/new products into backend store
      console.log('[API] Auto-syncing product catalog with backend database...');
      try {
        await bulkImportProducts(fallbackProducts);
        const retryResponse = await fetch(url, { headers: getHeaders() });
        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          if (retryData.products && retryData.products.length > 0) {
            return retryData;
          }
        }
      } catch (seedError) {
        console.warn('[API] Auto-sync encountered an issue:', seedError);
      }
    } else {
      console.error('[API] Fetch products endpoint returned status:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('[API] Error calling fetchProducts:', error);
  }

  // Fallback to existing products dataset
  let result = [...fallbackProducts];
  if (params?.category && params.category !== 'all') {
    result = result.filter(p => p.category === params.category);
  }
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    result = result.filter(p =>
      p.name?.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower) ||
      p.brand?.toLowerCase().includes(searchLower)
    );
  }
  if (params?.brand) {
    result = result.filter(p => p.brand === params.brand);
  }
  if (params?.crop) {
    result = result.filter(p => p.crops && p.crops.includes(params.crop));
  }

  const total = result.length;
  const startIndex = params?.offset || 0;
  const endIndex = params?.limit ? startIndex + params.limit : total;

  return {
    products: result.slice(startIndex, endIndex),
    total
  };
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  return response.json();
};

export const createProduct = async (product: Partial<Product>): Promise<{ success: boolean; product: Product }> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create product');
  }

  return response.json();
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<{ success: boolean; product: Product }> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update product');
  }

  return response.json();
};

export const deleteProduct = async (id: string): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }

  return response.json();
};

export const bulkImportProducts = async (products: Partial<Product>[]): Promise<{ success: boolean; imported: number; total: number }> => {
  const response = await fetch(`${API_BASE_URL}/products/bulk-import`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ products }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to import products');
  }

  return response.json();
};

export const fetchProductStats = async (): Promise<{
  totalProducts: number;
  byCategory: Record<string, number>;
  byBrand: Record<string, number>;
  totalValue: number;
  lowStock: number;
}> => {
  const response = await fetch(`${API_BASE_URL}/products/stats/summary`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product stats');
  }

  return response.json();
};

// ========== ORDERS API ==========

export const createOrder = async (order: {
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }>;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  totalAmount: number;
  paymentMethod: string;
}): Promise<{ success: boolean; order: any }> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create order');
  }

  return response.json();
};

export const fetchUserOrders = async (email: string): Promise<{ orders: any[] }> => {
  const response = await fetch(`${API_BASE_URL}/orders/user/${encodeURIComponent(email)}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user orders');
  }

  return response.json();
};

export const fetchOrderById = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }

  return response.json();
};

export const updateOrderStatus = async (id: string, status: string): Promise<{ success: boolean; order: any }> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update order status');
  }

  return response.json();
};

// ========== PAYMENT SETTINGS & RAZORPAY API ==========

export interface PaymentSettings {
  razorpayKeyId: string;
  razorpayKeySecret?: string;
  simulatedMode: boolean;
  hasSecret?: boolean;
}

export const fetchPaymentSettings = async (): Promise<PaymentSettings> => {
  const response = await fetch(`${API_BASE_URL}/settings/payment`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch payment settings');
  }
  return response.json();
};

export const savePaymentSettings = async (settings: PaymentSettings): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/settings/payment`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(settings),
  });
  if (!response.ok) {
    throw new Error('Failed to save payment settings');
  }
  return response.json();
};

export const createRealRazorpayOrder = async (
  amount: number,
  items?: any[],
  customerInfo?: { name?: string; email?: string; phone?: string; address?: string }
): Promise<{ id: string; order_id: string; amount: number; currency: string; key: string; simulated?: boolean }> => {
  const url = `${API_BASE_URL}/create-razorpay-order`;
  let response: Response;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        amount: Math.round(amount * 100), // paise
        currency: 'INR',
        receipt: `rcpt_${Date.now().toString(36)}`,
        items,
        customerInfo,
      }),
    });
  } catch (netErr: any) {
    // If /create-razorpay-order direct path had issue, try fallback path
    try {
      response = await fetch(`${API_BASE_URL}/api/create-order`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          amount: Math.round(amount * 100),
          currency: 'INR',
          receipt: `rcpt_${Date.now().toString(36)}`,
          items,
          customerInfo,
        }),
      });
    } catch {
      throw new Error('Cannot connect to payment backend server. Please verify the server is running on port 8000.');
    }
  }

  if (!response.ok) {
    let errMsg = 'Failed to create Razorpay order';
    try {
      const err = await response.json();
      errMsg = err.details || err.error || errMsg;
    } catch {
      errMsg = `Payment server returned error (${response.status}: ${response.statusText})`;
    }
    throw new Error(errMsg);
  }

  const data = await response.json();
  return {
    ...data,
    id: data.order_id || data.id,
    order_id: data.order_id || data.id,
  };
};

export const verifyRealPaymentSignature = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<{ verified: boolean; simulated?: boolean; message?: string }> => {
  const url = `${API_BASE_URL}/verify-razorpay-payment`;
  let response: Response;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        order_id: orderId,
        payment_id: paymentId,
        signature: signature,
      }),
    });
  } catch {
    // Fallback path attempt
    try {
      response = await fetch(`${API_BASE_URL}/api/verify-payment`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          order_id: orderId,
          payment_id: paymentId,
          signature: signature,
        }),
      });
    } catch {
      throw new Error('Connection failed during payment signature verification. Please contact support.');
    }
  }

  if (!response.ok) {
    let errMsg = 'Payment signature verification failed';
    try {
      const err = await response.json();
      errMsg = err.details || err.error || errMsg;
    } catch {
      errMsg = `Verification failed (${response.status}: ${response.statusText})`;
    }
    throw new Error(errMsg);
  }

  return response.json();
};

export interface UpiQrResponse {
  success: boolean;
  qrId: string;
  qrRef: string;
  qrString: string;
  amount: number;
  simulated?: boolean;
  status: string;
}

export const createUpiQrOrder = async (
  amount: number,
  customerName?: string,
  customerPhone?: string
): Promise<UpiQrResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/create-upi-qr`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      amount,
      customerName,
      customerPhone,
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to generate UPI QR code');
  }
  return response.json();
};

export const verifyUpiPayment = async (
  qrId: string,
  qrRef?: string
): Promise<{ verified: boolean; paymentId: string; simulated?: boolean; message?: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/verify-upi`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      qrId,
      qrRef,
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'UPI Payment verification failed');
  }
  return response.json();
};

export const checkUpiQrStatus = async (
  qrId: string
): Promise<{ status: string; paymentId?: string; simulated?: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/api/qr-status/${encodeURIComponent(qrId)}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch QR status');
  }
  return response.json();
};



