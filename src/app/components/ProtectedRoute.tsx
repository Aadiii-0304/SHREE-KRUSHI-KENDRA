import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // If route requires admin and user is not authenticated
  if (requireAdmin && !isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // If route requires admin but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  // If route requires authentication but user is not authenticated
  if (!requireAdmin && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
