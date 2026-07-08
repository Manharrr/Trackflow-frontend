import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axiosInstance from '../api/axios'
import { useAuth } from '../contexts/AuthContext'
import GoogleLoginButton from '../components/auth/GoogleLoginButton'

export default function LoginPage() {
    const navigate = useNavigate()
    const { login, googleLogin } = useAuth()

    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    })

    const [loading, setLoading] =
        useState(false)

    const [error, setError] =
        useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            setLoading(true)



            const data = await login(
                formData.phone,
                formData.password
            )

            if (
                data.phone_verify
            ) {
                navigate(
                    '/verify-phone',
                    {
                        state: {
                            email:
                                data.email,
                        },
                    }
                )

                return
            }

            if (
                data.pending
            ) {
                navigate(
                    '/pending-approval'
                )

                return
            }


            // MFA required
            if (data.mfa_required) {
                navigate('/mfa', {
                    state: {
                        email: data.email,
                    },
                })

                return
            }

            // Normal Login
            const role = data.user.role

            if (role === 'super_admin') {
                navigate('/super-admin')
            }

            else if (role === 'company_admin') {
                navigate('/dashboard')
            }

            else if (
                role === 'operations_manager'
            ) {
                navigate('/operations')
            }

            else {
                navigate('/employee')
            }

        } catch (err) {
            setError(
                err.response?.data?.error ||
                'Login failed'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F7F8F7] grid lg:grid-cols-2">

            <div className="flex items-center justify-center p-10">

                <div className="w-full max-w-md">

                    <h1 className="text-5xl font-bold text-[#0F172A] mb-3">
                        Welcome
                    </h1>

                    <p className="text-gray-500 mb-10">
                        Sign in to access your workspace.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block mb-2 font-medium">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 9876543210"
                                className="w-full border rounded-2xl p-4"
                                required
                            />

                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full border rounded-2xl p-4"
                                required
                            />

                            <div className="text-right">

                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-[#0F766E] hover:underline"
                                >
                                    Forgot Password?
                                </Link>

                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500">
                                {error}
                            </p>
                        )}

                        <button
                            disabled={loading}
                            className="w-full bg-[#0F766E] text-white p-4 rounded-2xl"
                        >
                            {
                                loading
                                    ? 'Signing In...'
                                    : 'Sign In'
                            }
                        </button>

                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-gray-400">
                            or
                        </span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <div className="flex justify-center">
                        <GoogleLoginButton />
                    </div>

                    <p className="text-center mt-8 text-gray-500">
                        Don't have a company account?{" "}
                        <Link
                            to="/register"
                            className="text-[#0F766E]"
                        >
                            Register Company
                        </Link>
                    </p>

                </div>

            </div>

            <div className="hidden lg:flex items-center justify-center p-16">

                <div className="bg-white p-10 rounded-3xl w-full max-w-xl">

                    <h3 className="text-3xl font-semibold mb-5">
                        TrackFlow AI
                    </h3>

                    <p className="text-gray-500 text-lg leading-8">
                        Manage logistics operations,
                        employees, deliveries and analytics
                        from one secure multi-tenant platform.
                    </p>

                </div>

            </div>

        </div>
    )
}