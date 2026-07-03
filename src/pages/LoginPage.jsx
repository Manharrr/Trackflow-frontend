import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axiosInstance from '../api/axios'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
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
                formData.email,
                formData.password
            )

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
                        Welcome back
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
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
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

                    <button
                        type="button"
                        className="w-full border rounded-2xl p-4"
                    >
                        Continue with Google
                    </button>

                    <p className="text-center mt-8 text-gray-500">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-[#0F766E]"
                        >
                            Create one
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