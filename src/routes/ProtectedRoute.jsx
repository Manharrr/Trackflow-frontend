import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()
  console.log("PROTECTED ROUTE", location.pathname)
  console.log("IS AUTHENTICATED", isAuthenticated)
  console.log("USER", user)
  console.log("ROLE", user?.role)
  console.log("TENANT", user?.tenant)

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
  const role = user?.role

  if (role === 'super_admin') {
    // Super admin must reside in paths starting with /super-admin, profile, settings, or setup
    const isSuperPath = path.startsWith('/super-admin') || path === '/profile' || path === '/change-password' || path === '/mfa/setup'
    if (!isSuperPath) {
      return <Navigate to="/super-admin" replace />
    }
  } else if (role === 'company_admin') {
    // Company admin stays in dashboard and company management pages
    const isForbidden = path.startsWith('/super-admin') || path.startsWith('/operations') || path.startsWith('/employee')
    if (isForbidden) {
      return <Navigate to="/dashboard" replace />
    }
  } else if (role === 'operations_manager') {
    const isForbidden = path.startsWith('/super-admin') || path.startsWith('/dashboard') || path.startsWith('/employee')
    if (isForbidden) {
      return <Navigate to="/operations" replace />
    }
  } else {
    // Normal Employee
    const isForbidden = path.startsWith('/super-admin') || path.startsWith('/dashboard') || path.startsWith('/operations')
    if (isForbidden) {
      return <Navigate to="/employee" replace />
    }
  }

  return children
}