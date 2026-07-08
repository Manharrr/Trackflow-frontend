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

import ForgotPasswordPage from './pages/auth/ForgotpasswordPage'
import VerifyResetOTPPage from './pages/auth/VerifyResetOTPPage'
import ResetPasswordPage from './pages/auth/ResetpasswordPage'

import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard'
import CompaniesPage from './pages/super-admin/CompaniesPage'
import AnalyticsPage from './pages/super-admin/AnalyticsPage'
import SettingsPage from './pages/super-admin/SettingsPage'

import CompanyDashboard from './pages/company-admin/CompanyDashboard'
import OperationsDashboard from './pages/operations/OperationsDashboard'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import CompanyDetailsPage from './pages/super-admin/CompanyDetailsPage'



function PublicRoute({ children }) {
    const {
        isAuthenticated,
        isLoading,
    } = useAuth()

    if (isLoading) {
        return null
    }

    return isAuthenticated
        ? <Navigate to="/dashboard" replace />
        : children
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

            {/* Protected */}
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
                    path="/super-admin/analytics"
                    element={<AnalyticsPage />}
                />

                <Route
                    path="/super-admin/settings"
                    element={<SettingsPage />}
                />

                {/* Company Admin */}

                <Route
                    path="/dashboard"
                    element={<CompanyDashboard />}
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

            <Route
    path="/super-admin/companies/:id"
    element={<CompanyDetailsPage />}
/>

        </Routes>
    )
}
