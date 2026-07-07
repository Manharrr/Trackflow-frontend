import { useState } from 'react'
import {
  useNavigate,
  useLocation
} from 'react-router-dom'
import axiosInstance from '../../api/axios'

export default function ResetPasswordPage() {
  const navigate =
    useNavigate()

  const location =
    useLocation()

  const phone =
    location.state?.phone

  const [formData,
    setFormData] =
    useState({
      password: '',
      confirm_password: '',
    })

  const [loading,
    setLoading] =
    useState(false)

  const [error,
    setError] =
    useState('')

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      })
    }

  const handleSubmit =
    async (e) => {
      e.preventDefault()
      setError('')

      try {
        setLoading(true)

        await axiosInstance.post(
          '/auth/reset-password/',
          {
            phone,
            ...formData,
          }
        )

        navigate('/login')
      }

      catch (err) {
        setError(
          err.response?.data?.message ||
          'Unable to reset password'
        )
      }

      finally {
        setLoading(false)
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8F7] p-6">

      <div className="bg-white w-full max-w-md rounded-3xl p-10 shadow">

        <h1 className="text-4xl font-bold mb-3">
          Reset Password
        </h1>

        <p className="text-gray-500 mb-8">
          Create a new password
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-2xl p-4"
            required
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={
              formData.confirm_password
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-2xl p-4"
            required
          />

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-[#0F766E] text-white rounded-2xl p-4"
          >
            {
              loading
                ? 'Updating...'
                : 'Update Password'
            }
          </button>

        </form>

      </div>

    </div>
  )
}