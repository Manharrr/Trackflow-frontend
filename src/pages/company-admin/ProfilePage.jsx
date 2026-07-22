import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axiosInstance from '../../api/axios'
import toast from 'react-hot-toast'
import { User, Mail, Phone, Camera, Check } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    first_name: user?.user?.first_name || '',
    email: user?.user?.email || '',
    phone: user?.user?.phone || '',
  })

  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user?.user?.first_name || '',
        email: user?.user?.email || '',
        phone: user?.user?.phone || '',
      })
      if (user?.employee?.profile_image) {
        const API_HOST = window.location.hostname
        setPhotoPreview(`http://${API_HOST}:8000${user.employee.profile_image}`)
      }
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhotoFile(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const payload = new FormData()
    payload.append('first_name', formData.first_name)
    payload.append('email', formData.email)
    payload.append('phone', formData.phone)
    if (photoFile) {
      payload.append('photo', photoFile)
    }

    try {
      await axiosInstance.put('/auth/me/', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Profile details updated successfully!')
      
      // Force reload auth user details
      window.location.reload()
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.detail || 'Failed to update profile.'
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 relative overflow-hidden mt-6 animate-fade-in">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10" />

      <div className="flex items-center gap-2 mb-6">
        <div className="bg-teal-600 p-2 rounded-xl text-white shadow-md shadow-teal-600/10">
          <User className="h-5 w-5" />
        </div>
        <span className="text-base font-bold text-slate-900">My Workspace Account</span>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Profile Settings
      </h1>
      <p className="text-slate-500 mb-8 text-sm">
        Update your personal employee profile details and profile picture.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image upload */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-150">
          <div className="relative w-20 h-20 rounded-full bg-slate-200 border-2 border-slate-350 flex items-center justify-center overflow-hidden">
            {photoPreview ? (
              <img src={photoPreview} alt="User Avatar preview" className="w-full h-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-slate-400" />
            )}
            <label className="absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
              <Camera className="h-4 w-4" />
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>
          <div className="text-center sm:text-left">
            <span className="block text-sm font-semibold text-slate-700 mb-1">Avatar Image</span>
            <p className="text-slate-400 text-xs mb-3">Upload a clean square profile picture.</p>
            <label className="bg-white border border-slate-255 text-slate-700 hover:bg-slate-50 active:scale-[0.98] py-1.5 px-3 rounded-lg text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer inline-block">
              Choose Avatar
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name
          </label>
          <div className="relative rounded-2xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <User className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="first_name"
              placeholder="Full Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address
          </label>
          <div className="relative rounded-2xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number
          </label>
          <div className="relative rounded-2xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Phone className="h-5 w-5" />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 transition-all outline-none"
              required
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
              <span>Saving Details...</span>
            </>
          ) : (
            <>
              <Check className="h-5 w-5" />
              <span>Save Profile</span>
            </>
          )}
        </button>
      </form>

      {/* Security Section (MFA Setup Option) */}
      {(user?.role === 'company_admin' || user?.role === 'super_admin') && (
        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in text-left">
          <div>
            <span className="block text-sm font-bold text-slate-800">Multi-Factor Authentication (MFA)</span>
            <p className="text-slate-400 text-xs mt-1">Enhance account security by requiring a 6-digit Google Authenticator code on sign in.</p>
          </div>
          <div>
            {user?.user?.is_mfa_enabled ? (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
                Enabled
              </span>
            ) : (
              <Link
                to="/mfa/setup"
                className="bg-teal-650 hover:bg-teal-750 active:scale-[0.98] text-white py-2.5 px-4 rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 inline-block text-center cursor-pointer"
              >
                Configure MFA
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
