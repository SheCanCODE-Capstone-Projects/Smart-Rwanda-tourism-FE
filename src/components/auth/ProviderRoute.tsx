import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProviderRouteProps {
  children: ReactNode;
}

/**
 * Guards `/provider/dashboard`.
 * - Guests (no session) -> redirected to /login, returning here after auth.
 * - Authenticated tourists -> redirected home (dashboard is provider-only).
 * - Authenticated providers -> full access.
 */
export default function ProviderRoute({ children }: ProviderRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (user.role !== 'provider') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
