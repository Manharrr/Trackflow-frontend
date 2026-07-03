import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'

export default function MFAPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const res = await axiosInstance.post(
        '/auth/mfa/login/',
        {
          email,
          code,
        }
      )

      const token = res.data.access

      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`

      const role = res.data.user.role

      if (role === 'super_admin') {
        navigate('/super-admin')
      } else if (role === 'company_admin') {
        navigate('/dashboard')
      } else if (
        role === 'operations_manager'
      ) {
        navigate('/operations')
      } else {
        navigate('/employee')
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Invalid code'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8F7] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-sm">

        <h1 className="text-4xl font-bold text-center mb-3">
          Two-Factor Authentication
        </h1>

        <p className="text-gray-500 text-center mb-10">
          Enter the 6-digit code from
          Microsoft Authenticator
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) =>
              setCode(e.target.value)
            }
            placeholder="123456"
            className="w-full border rounded-2xl p-4 text-center text-2xl tracking-[10px]"
          />

          {error && (
            <p className="text-red-500 text-center">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-[#0F766E] text-white p-4 rounded-2xl"
          >
            {loading
              ? 'Verifying...'
              : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  )
}