import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import toast from 'react-hot-toast'
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const phone = location.state?.phone || ''
  const otp = location.state?.otp || ''

  const [formData, setFormData] = useState({
    password: '',
    confirm_password: '',
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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

    setLoading(true)

    try {
      await axiosInstance.post('/auth/reset-password/', {
        phone,
        otp, // Satisfies backend validation
        password: formData.password,
        confirm_password: formData.confirm_password,
      })

      toast.success('Password updated successfully! Please log in.')
      navigate('/login')
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.detail || 'Unable to update password. Reset request may have expired.'
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 sm:p-12 w-full max-w-md shadow-xl border border-slate-100 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500 rounded-full blur-3xl opacity-10 -mr-5 -mt-5" />

        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6 text-teal-600 shadow-inner">
          <CheckCircle2 className="h-7 w-7" />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 text-center tracking-tight mb-2">
          Reset Password
        </h1>
        <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed">
          Create a secure, new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              New Password
            </label>
            <div className="relative rounded-2xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
                className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
                required
                aria-label="New Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Confirm Password
            </label>
            <div className="relative rounded-2xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
                required
                aria-label="Confirm Password"
              />
            </div>
          </div>

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
                <span>Updating Password...</span>
              </>
            ) : (
              'Update Password'
            )}
          </button>

          <div className="flex justify-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}