declare global {
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id?: string;
    handler: (response: RazorpaySuccessResponse) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
      method?: string;
    };
    notes?: {
      [key: string]: string;
    };
    theme?: {
      color?: string;
    };
    modal?: {
      ondismiss?: () => void;
    };
  }

  interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }

  interface RazorpayInstance {
    open(): void;
    on(event: string, callback: (response: any) => void): void;
  }

  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

declare module 'razorpay' {
  export default class Razorpay {
    constructor(config: { key_id: string; key_secret: string });
    orders: {
      create(params: {
        amount: number;
        currency: string;
        receipt?: string;
        notes?: { [key: string]: string };
      }): Promise<{
        id: string;
        entity: string;
        amount: number;
        currency: string;
        receipt: string;
        status: string;
      }>;
    };
  }
}

