import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

import ProtectedRoute from './routes/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MFAPage from './pages/MFAPage'

import VerifyPhonePage from './pages/VerifyPhonePage'
import PendingApprovalPage from './pages/PendingApprovalPage'
import WorkspaceSetupPage from './pages/WorkspaceSetupPage'

import ForgotPasswordPage from './pages/auth/ForgotpasswordPage'
import VerifyResetOTPPage from './pages/auth/VerifyResetOTPPage'
import ResetPasswordPage from './pages/auth/ResetpasswordPage'

import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard'
import CompaniesPage from './pages/super-admin/CompaniesPage'
import AnalyticsPage from './pages/super-admin/AnalyticsPage'
// import SettingsPage from './pages/super-admin/SettingsPage'

import CompanyDashboard from './pages/company-admin/CompanyDashboard'
import CompanySetupPage from './pages/company-admin/CompanySetupPage'
import ProfilePage from './pages/company-admin/ProfilePage'
import CompanySettingsPage from './pages/company-admin/SettingsPage'
import Changepassword from './pages/auth/Changepassword'
import MFASetupPage from './pages/auth/MFASetupPage'

import OperationsDashboard from './pages/operations/OperationsDashboard'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import CompanyDetailsPage from './pages/super-admin/CompanyDetailsPage'

import OrdersPage from './pages/company-admin/OrderPage'



function PublicRoute({ children }) {
    const {
        isAuthenticated,
        isLoading,
        user,
    } = useAuth()

    if (isLoading) {
        return null
    }

    if (isAuthenticated) {
        const role = user?.role || user?.user?.role
        if (role === 'super_admin') {
            return <Navigate to="/super-admin" replace />
        } else if (role === 'company_admin') {
            return <Navigate to="/dashboard" replace />
        } else if (role === 'operations_manager') {
            return <Navigate to="/operations" replace />
        } else {
            return <Navigate to="/employee" replace />
        }
    }

    return children
}

export default function App() {
    return (
        <Routes>

            {/* Landing */}
            <Route
                path="/"
                element={<HomePage />}
            />

            {/* Public */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                }
            />

            <Route
                path="/mfa"
                element={<MFAPage />}
            />

            <Route
                path="/verify-phone"
                element={<VerifyPhonePage />}
            />

            <Route
                path="/workspace/setup"
                element={<WorkspaceSetupPage />}
            />

            <Route
                path="/pending-approval"
                element={<PendingApprovalPage />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPasswordPage />}
            />

            <Route
                path="/verify-reset-otp"
                element={<VerifyResetOTPPage />}
            />

            <Route
                path="/reset-password"
                element={<ResetPasswordPage />}
            />

            {/* Standalone Protected Routes (No Layout Frame) */}
            <Route
                path="/company/setup"
                element={
                    <ProtectedRoute>
                        <CompanySetupPage />
                    </ProtectedRoute>
                }
            />

            {/* Protected Layout Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                {/* Super Admin */}

                <Route
                    path="/super-admin"
                    element={<SuperAdminDashboard />}
                />

                <Route
                    path="/super-admin/companies"
                    element={<CompaniesPage />}
                />

                <Route
                    path="/super-admin/companies/:id"
                    element={<CompanyDetailsPage />}
                />

                <Route
                    path="/super-admin/analytics"
                    element={<AnalyticsPage />}
                />

                {/* <Route
                    path="/super-admin/settings"
                    element={<SettingsPage />}
                /> */}

                {/* Company Admin & User Options */}

                <Route
                    path="/dashboard"
                    element={<CompanyDashboard />}
                />

                <Route
    path="/dashboard/orders"
    element={<OrdersPage />}
/>

<Route
    path="/dashboard/employees"
    element={<CompanyDashboard />}
/>

<Route
    path="/dashboard/analytics"
    element={<CompanyDashboard />}
/>

                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />

                <Route
                    path="/settings"
                    element={<CompanySettingsPage />}
                />

                <Route
                    path="/change-password"
                    element={<Changepassword />}
                />

                <Route
                    path="/mfa/setup"
                    element={<MFASetupPage />}
                />

                {/* Operations */}

                <Route
                    path="/operations"
                    element={<OperationsDashboard />}
                />

                {/* Employee */}

                <Route
                    path="/employee"
                    element={<EmployeeDashboard />}
                />

            </Route>

            {/* 404 */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

        </Routes>
    )
}
