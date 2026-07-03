import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
// import DashboardPage from './pages/DashboardPage'
import DashboardPage from "./pages/dashboard/DashboardPage";
import DashboardLayout from './layouts/DashboardLayout'
import VerifyPhonePage from './pages/VerifyPhonePage'
import WorkspaceSetupPage from './pages/WorkspaceSetupPage'
import PendingApprovalPage from './pages/PendingApprovalPage'

import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard'
import CompaniesPage from './pages/super-admin/CompaniesPage'
import AnalyticsPage from './pages/super-admin/AnalyticsPage'
import SettingsPage from './pages/super-admin/SettingsPage'
import MFAPage from './pages/MFAPage'


// import DashboardLayout from './layouts/DashboardLayout'
// import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard'
import CompanyDashboard from './pages/company-admin/CompanyDashboard'
import OperationsDashboard from './pages/operations/OperationsDashboard'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'


function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return null
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      {/* <Route path="/dashboard"element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/> */}
      {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />
      <Route
        path="/verify-phone"
        element={
          <VerifyPhonePage />
        }
      />

      <Route
        path="/workspace/setup"
        element={
          <WorkspaceSetupPage />
        }
      />
      <Route
        path="/pending-approval"
        element={
          <PendingApprovalPage />
        }
      />

      <Route path="/super-admin" element={<SuperAdminDashboard />} />

      <Route
        path="/super-admin/companies"
        element={<CompaniesPage />}
      />

      <Route
        path="/super-admin/analytics"
        element={<AnalyticsPage />}
      />

      <Route
        path="/super-admin/settings"
        element={<SettingsPage />}
      />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/super-admin"
          element={
            <SuperAdminDashboard />
          }
        />

        <Route
          path="/super-admin/companies"
          element={
            <CompaniesPage />
          }
        />

        <Route
          path="/super-admin/analytics"
          element={
            <AnalyticsPage />
          }
        />

        <Route
          path="/super-admin/settings"
          element={
            <SettingsPage />
          }
        />

        <Route
          path="/dashboard"
          element={
            <CompanyDashboard />
          }
        />

        <Route
          path="/operations"
          element={
            <OperationsDashboard />
          }
        />

        <Route
          path="/employee"
          element={
            <EmployeeDashboard />
          }
        />
      </Route>
      <Route
  path="/mfa"
  element={<MFAPage />}
/>
    </Routes>
  )
}