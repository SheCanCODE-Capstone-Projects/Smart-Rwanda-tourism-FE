import { Navigate, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../../hooks/useAuth'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  if (!isLoggedIn()) {
    const redirectTo = `${location.pathname}${location.search}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirectTo)}`} replace />
  }

  return <>{children}</>
}
