// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token] = useLocalStorage<boolean>("token", false);

  return token ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
