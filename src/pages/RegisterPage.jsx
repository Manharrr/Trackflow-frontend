import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axiosInstance from '../api/axios'
import toast from 'react-hot-toast'
import { ShieldCheck, User, Building2, Mail, Phone, Globe, Lock, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        admin_name: '',
        company_name: '',
        email: '',
        phone: '',
        subdomain: '',
        password: '',
        confirm_password: '',
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirm_password) {
            toast.error('Passwords do not match.')
            return
        }

        try {
            setLoading(true)

            // Maps subdomain field to backend's workspace_code variable
            const payload = {
                admin_name: formData.admin_name,
                company_name: formData.company_name,
                email: formData.email,
                phone: formData.phone,
                workspace_code: formData.subdomain,
                password: formData.password,
                confirm_password: formData.confirm_password,
            }

            await axiosInstance.post('/auth/register/', payload)

            toast.success('Registration submitted! Verification code dispatched.')

            navigate('/verify-phone', {
                state: {
                    phone: formData.phone,
                    email: formData.email,
                },
            })
        } catch (err) {
            const errData = err.response?.data
            if (errData) {
                // Parse specific validation failures
                const firstErrorKey = Object.keys(errData)[0]
                const firstErrorVal = errData[firstErrorKey]
                const detailMsg = Array.isArray(firstErrorVal) ? firstErrorVal[0] : firstErrorVal
                toast.error(`${firstErrorKey}: ${detailMsg}`)
            } else {
                toast.error('Registration failed. Please review your workspace details.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid lg:grid-cols-12 min-h-[700px]">
                
                {/* Left Form Column */}
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
                    <div className="max-w-xl w-full mx-auto">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-teal-600 p-2 rounded-lg text-white">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <span className="text-lg font-bold text-slate-900">TrackFlow AI</span>
                        </div>

                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                            Launch Your Workspace
                        </h1>
                        <p className="text-slate-500 mb-8">
                            Get started by configuring your isolated multi-tenant company environment.
                        </p>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Company Admin Name
                                </label>
                                <div className="relative rounded-2xl">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        name="admin_name"
                                        placeholder="John Doe"
                                        value={formData.admin_name}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
                                        required
                                        aria-label="Admin Name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Company Name
                                </label>
                                <div className="relative rounded-2xl">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Building2 className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        name="company_name"
                                        placeholder="Acme Logistics"
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
                                        required
                                        aria-label="Company Name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Company Subdomain
                                </label>
                                <div className="relative rounded-2xl">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Globe className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        name="subdomain"
                                        placeholder="acme-logistics"
                                        value={formData.subdomain}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
                                        required
                                        aria-label="Workspace Code Subdomain"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Admin Email
                                </label>
                                <div className="relative rounded-2xl">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="admin@acme.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
                                        required
                                        aria-label="Admin Email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative rounded-2xl">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+91 9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
                                        required
                                        aria-label="Phone Number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Password
                                </label>
                                <div className="relative rounded-2xl">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
                                        required
                                        aria-label="Password"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative rounded-2xl">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        placeholder="••••••••"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
                                        required
                                        aria-label="Confirm Password"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2 mt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white py-4 px-6 rounded-2xl font-semibold shadow-lg shadow-teal-600/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Creating Workspace...</span>
                                        </>
                                    ) : (
                                        'Create Workspace'
                                    )}
                                </button>
                            </div>
                        </form>

                        <p className="text-center mt-8 text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Features Column */}
                <div className="hidden lg:col-span-5 bg-slate-900 p-12 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-950/40 to-slate-950 opacity-90 z-0" />
                    
                    <div className="relative z-10 flex items-center gap-2">
                        <span className="text-lg font-bold tracking-tight">TrackFlow Enterprise</span>
                    </div>

                    <div className="relative z-10 space-y-8 my-auto">
                        <div className="flex gap-4">
                            <CheckCircle2 className="h-6 w-6 text-teal-400 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg text-white">Your Own Dedicated Subdomain</h3>
                                <p className="text-slate-400 text-sm mt-1">Every registration auto-spawns an isolated Postgres tenant schema and dedicated workspace.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle2 className="h-6 w-6 text-teal-400 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg text-white">Secure Access Validation</h3>
                                <p className="text-slate-400 text-sm mt-1">Includes Twilio SMS OTP verification and optional multi-factor authenticator setup.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle2 className="h-6 w-6 text-teal-400 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg text-white">Role-Based Team Control</h3>
                                <p className="text-slate-400 text-sm mt-1">Dedicated portals for Company Admins, Operations Managers, and Field Employees.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-xs text-slate-500">
                        <span>© 2026 TrackFlow AI Inc. All rights reserved.</span>
                    </div>
                </div>

            </div>
        </div>
    )
}