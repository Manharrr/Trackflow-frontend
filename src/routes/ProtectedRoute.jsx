import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Centralized permission map matching exact paths and patterns using RegExp
const ROUTE_PERMISSIONS = {
  super_admin: [
    /^\/super-admin(\/.*)?$/,
    /^\/profile$/,
    /^\/change-password$/,
    /^\/mfa\/setup$/,
    /^\/chat(\/.*)?$/
  ],
  company_admin: [
    /^\/dashboard(\/.*)?$/,
    /^\/profile$/,
    /^\/settings$/,
    /^\/change-password$/,
    /^\/mfa\/setup$/,
    /^\/chat(\/.*)?$/
  ],
  operations_manager: [
    /^\/operations(\/.*)?$/,
    /^\/orders\/create$/,
    /^\/dashboard\/orders(\/.*)?$/,
    /^\/dashboard\/employees(\/.*)?$/,
    /^\/profile$/,
    /^\/settings$/,
    /^\/change-password$/,
    /^\/mfa\/setup$/,
    /^\/chat(\/.*)?$/
  ],
  employee: [
    /^\/employee(\/.*)?$/,
    // Matches detail view with UUID pattern, forbids lists /edit
    /^\/dashboard\/orders\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/,
    /^\/profile$/,
    /^\/settings$/,
    /^\/change-password$/,
    /^\/mfa\/setup$/,
    /^\/chat(\/.*)?$/
  ]
};

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // Pending Company Approval Check
  if (user?.company_status === 'pending') {
    if (location.pathname !== '/pending-approval') {
      return <Navigate to="/pending-approval" replace />
    }
    return children
  }

  // Role Routing Access Authorization Check
  const path = location.pathname
  const role = user?.role || 'employee'

  const allowedRoutes = ROUTE_PERMISSIONS[role] || [];
  const isAuthorized = allowedRoutes.some(regex => regex.test(path));

  if (!isAuthorized) {
    // Redirect to default dashboard
    if (role === 'super_admin') return <Navigate to="/super-admin" replace />;
    if (role === 'company_admin') return <Navigate to="/dashboard" replace />;
    if (role === 'operations_manager') return <Navigate to="/operations" replace />;
    return <Navigate to="/employee" replace />;
  }

  return children
}