import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRole }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If role does not match allowed role, redirect to appropriate role dashboard
  if (allowedRole && currentUser.role !== allowedRole) {
    const defaultDashboard = `/${currentUser.role.toLowerCase()}/dashboard`;
    return <Navigate to={defaultDashboard} replace />;
  }

  return children ? children : <Outlet />;
}
