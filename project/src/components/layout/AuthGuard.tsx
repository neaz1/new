import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, location]);

  return <>{children}</>;
}