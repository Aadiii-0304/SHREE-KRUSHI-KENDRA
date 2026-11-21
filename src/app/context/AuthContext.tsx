import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Order } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, mobile: string, address: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  orders: Order[];
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize default admin user
const initializeDefaultAdmin = () => {
  const savedUsers = localStorage.getItem('users');
  const users = savedUsers ? JSON.parse(savedUsers) : [];
  
  // Check if admin already exists
  const adminExists = users.find((u: any) => u.email === 'contactshreekrushikendra@gmail.com');
  
  if (!adminExists) {
    const defaultAdmin = {
      id: 'admin-001',
      name: 'Mohan Damdhar',
      email: 'contactshreekrushikendra@gmail.com',
      mobile: '9730724497',
      address: 'Shree Krushi Kendra, Maharashtra',
      password: '@shree_0508', // In production, this should be hashed
      role: 'ADMIN',
    };
    users.push(defaultAdmin);
    localStorage.setItem('users', JSON.stringify(users));
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize admin on first load
  useEffect(() => {
    initializeDefaultAdmin();
  }, []);

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        return true;
      }
    }
    return false;
  };

  const signup = async (
    name: string,
    email: string,
    mobile: string,
    address: string,
    password: string
  ): Promise<boolean> => {
    // Mock signup - in real app, this would call an API
    const savedUsers = localStorage.getItem('users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      mobile,
      address,
      password,
      role: 'USER' as const, // All new signups are users by default
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        orders,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
