import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, ProductVariant } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantSize?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1, variant?: ProductVariant) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.product.id === product.id && 
        item.selectedVariant?.size === variant?.size
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id && item.selectedVariant?.size === variant?.size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity, selectedVariant: variant }];
    });
  };

  const removeFromCart = (productId: string, variantSize?: string) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.product.id === productId && 
        (!variantSize || item.selectedVariant?.size === variantSize))
    ));
  };

  const updateQuantity = (productId: string, quantity: number, variantSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantSize);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId && 
        (!variantSize || item.selectedVariant?.size === variantSize)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.selectedVariant?.price || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

