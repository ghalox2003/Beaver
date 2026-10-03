import { LoaderCircle } from 'lucide-react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { dashboardPathForRole, useAuth } from '../features/auth'
import type { UserRole } from '../features/auth'

type ProtectedRouteProps = {
  allowedRoles?: UserRole[]
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation()
  const { user, status } = useAuth()

  if (status === 'loading') {
    return (
      <div
        role="status"
        aria-label="Loading"
        className="flex min-h-screen items-center justify-center bg-cream text-forest-700"
      >
        <LoaderCircle className="animate-spin" size={28} />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={dashboardPathForRole(user.role)} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
