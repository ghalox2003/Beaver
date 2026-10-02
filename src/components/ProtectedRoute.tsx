import { Navigate, Outlet, useLocation } from 'react-router-dom'

type UserRole = 'client' | 'professional' | 'admin'

type ProtectedRouteProps = {
  allowedRoles?: UserRole[]
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation()
  const isAuthenticated =
    localStorage.getItem('beaver:authenticated') === 'true'
  const role = localStorage.getItem('beaver:role') as UserRole | null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
