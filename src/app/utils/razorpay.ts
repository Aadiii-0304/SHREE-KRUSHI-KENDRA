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
  let simulated = isSimulatedMode();

  try {
    const settings = await fetchPaymentSettings();
    if (settings.razorpayKeyId) {
      activeKeyId = options.key || cleanRazorpayKey(settings.razorpayKeyId);
      simulated = settings.simulatedMode;
    }
  } catch (error) {
    console.warn('Failed to fetch payment settings from backend, falling back to local:', error);
  }

  // Only use simulated mock flow if we absolutely have no real/test key configured
  const hasRealKey = activeKeyId && activeKeyId !== 'rzp_test_YOUR_KEY_ID' && activeKeyId.startsWith('rzp_');

  if (simulated && !hasRealKey) {
    console.log('Using mock payment flow because simulated payment mode is active and no real/test key is configured.');
    toast.info('Razorpay Key not configured. Using simulated payment...');

    // Simulate a brief delay for payment processing
    setTimeout(() => {
      options.onSuccess({
        razorpay_payment_id: `pay_mock_${Math.random().toString(36).substring(2, 11)}`,
        razorpay_order_id: options.orderId || `order_mock_${Math.random().toString(36).substring(2, 11)}`,
        razorpay_signature: `sig_mock_${Math.random().toString(36).substring(2, 11)}`
      });
    }, 1500);
    return;
  }

  const isLoaded = await loadRazorpayScript();

  if (!isLoaded) {
    if (options.onFailure) {
      options.onFailure(new Error('Failed to load Razorpay SDK'));
    }
    return;
  }

  const razorpayOptions: RazorpayOptions = {
    key: activeKeyId,
    amount: Math.round(options.amount * 100), // Convert to paise (INR)
    currency: options.currency || 'INR',
    name: 'Shree Krushi Kendra',
    description: options.description || 'Secure Payment',
    image: '/logo.png',
    order_id: options.orderId,
    handler: options.onSuccess,
    prefill: {
      ...(options.prefill || {}),
      method: options.method, // Pass pre-selected method
    },
    notes: {
      merchant: 'Shree Krushi Kendra',
      address: 'Jamod, Maharashtra 443402',
    },
    theme: {
      color: '#16a34a', // Green color matching the theme
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

export const createRazorpayOrder = async (amount: number): Promise<RazorpayOrderResponse> => {
  try {
    const response = await createRealRazorpayOrder(amount);
    if (!response || !response.id) {
      throw new Error('Invalid order response from backend');
    }
    return response;
  } catch (error: any) {
    console.error('Failed to create real Razorpay order:', error);
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