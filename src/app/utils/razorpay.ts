// Razorpay Payment Integration Utility
import { toast } from 'sonner';
import { createRealRazorpayOrder, verifyRealPaymentSignature, fetchPaymentSettings } from './api';

export const cleanRazorpayKey = (key: string): string => {
  if (!key) return '';
  // Remove any spaces or whitespace
  let cleaned = key.replace(/\s+/g, '');
  // If it is a placeholder key/secret, treat it as empty
  if (cleaned.includes('YOUR_KEY') || cleaned.includes('YOUR_SECRET')) {
    return '';
  }
  // If it has a duplicate prefix like rzp_test_rzp_test_, trim it
  if (cleaned.startsWith('rzp_test_rzp_test_')) {
    cleaned = cleaned.substring(9);
  } else if (cleaned.startsWith('rzp_live_rzp_live_')) {
    cleaned = cleaned.substring(9);
  }
  return cleaned;
};

// NOTE: In production, these keys should be stored in environment variables
// For demo purposes, using test keys or localStorage fallback
export const getRazorpayKeyId = (): string => {
  const key = localStorage.getItem('razorpay_key_id') ||
    import.meta.env.VITE_RAZORPAY_KEY_ID ||
    'rzp_test_YOUR_KEY_ID';
  return cleanRazorpayKey(key);
};

export const isSimulatedMode = (): boolean => {
  const simulated = localStorage.getItem('razorpay_simulated_mode');
  if (simulated !== null) {
    return simulated === 'true';
  }

  // Default to simulated mode if no valid key is configured
  const keyId = getRazorpayKeyId();
  return !keyId ||
    keyId === 'rzp_test_YOUR_KEY_ID' ||
    keyId === 'rzp_test_YOUR_KEY_ID_HERE' ||
    keyId.includes('YOUR_KEY_ID');
};

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

interface PaymentOptions {
  key?: string;
  amount: number;
  currency?: string;
  name: string;
  description?: string;
  orderId?: string;
  method?: string; // Prefilled method (e.g. 'upi' | 'netbanking' | 'card' | 'wallet')
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess: (response: RazorpaySuccessResponse) => void;
  onFailure?: (error: any) => void;
}

export const initiateRazorpayPayment = async (options: PaymentOptions): Promise<void> => {
  let activeKeyId = options.key || getRazorpayKeyId();

  try {
    const settings = await fetchPaymentSettings();
    if (settings.razorpayKeyId) {
      activeKeyId = options.key || cleanRazorpayKey(settings.razorpayKeyId);
    }
  } catch (error) {
    console.warn('Failed to fetch payment settings from backend, falling back to local/env:', error);
  }

  // Ensure valid Key ID is available
  if (!activeKeyId || activeKeyId.includes('YOUR_KEY') || !activeKeyId.startsWith('rzp_')) {
    const err = new Error('Razorpay Key ID is not configured. Please set VITE_RAZORPAY_KEY_ID in .env or backend settings.');
    toast.error(err.message);
    if (options.onFailure) {
      options.onFailure(err);
    }
    return;
  }

  const isLoaded = await loadRazorpayScript();

  if (!isLoaded) {
    const err = new Error('Failed to load Razorpay Checkout SDK. Please check your internet connection.');
    if (options.onFailure) {
      options.onFailure(err);
    }
    return;
  }

  const razorpayOptions: RazorpayOptions = {
    key: activeKeyId,
    amount: Math.round(options.amount * 100), // Convert to paise (INR)
    currency: options.currency || 'INR',
    name: 'Shree Krushi Kendra',
    description: options.description || 'Agricultural Inputs Payment',
    image: '/logo.png',
    order_id: options.orderId,
    handler: options.onSuccess,
    prefill: {
      name: options.prefill?.name || '',
      email: options.prefill?.email || '',
      contact: options.prefill?.contact || '',
      ...(options.method ? { method: options.method } : {}),
    },
    notes: {
      merchant: 'Shree Krushi Kendra',
      address: 'Jamod, Maharashtra 443402',
    },
    theme: {
      color: '#16a34a', // Brand green matching Shree Krushi Kendra
    },
    modal: {
      ondismiss: () => {
        if (options.onFailure) {
          options.onFailure(new Error('Payment cancelled by user'));
        }
      },
    },
  };

  const razorpayInstance = new window.Razorpay(razorpayOptions);

  // Capture payment failure callback from Razorpay
  if (razorpayInstance.on) {
    razorpayInstance.on('payment.failed', function (response: any) {
      const errorMsg =
        response?.error?.description ||
        response?.error?.reason ||
        'Payment failed on gateway';
      console.warn('[Razorpay] Payment failed event:', response?.error);
      if (options.onFailure) {
        options.onFailure(new Error(errorMsg));
      }
    });
  }

  razorpayInstance.open();
};

export interface RazorpayOrderResponse {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  key: string;
  simulated?: boolean;
}

export const createRazorpayOrder = async (
  amount: number,
  items?: any[],
  customerInfo?: { name?: string; email?: string; phone?: string; address?: string }
): Promise<RazorpayOrderResponse> => {
  try {
    const response = await createRealRazorpayOrder(amount, items, customerInfo);
    if (!response || !response.id) {
      throw new Error('Invalid order response from backend');
    }
    return response;
  } catch (error: any) {
    console.error('Failed to create Razorpay order:', error);
    throw new Error(error.message || 'Failed to create payment order. Please ensure the backend is running.');
  }
};

export const verifyPaymentSignature = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> => {
  try {
    const response = await verifyRealPaymentSignature(orderId, paymentId, signature);
    return response.verified;
  } catch (error: any) {
    console.error('Failed to verify payment signature on backend:', error);
    throw new Error(error.message || 'Payment verification failed. Please check backend logs.');
  }
};