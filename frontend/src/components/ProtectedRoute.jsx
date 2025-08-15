import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // ✅ hook inside component
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};
