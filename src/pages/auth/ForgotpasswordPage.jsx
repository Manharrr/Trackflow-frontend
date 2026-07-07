import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()

  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)

      await axiosInstance.post(
        '/auth/forgot-password/',
        { phone }
      )

      navigate(
        '/verify-reset-otp',
        {
          state: { phone }
        }
      )
    }

    catch (err) {
      setError(
        err.response?.data?.message ||
        'Something went wrong'
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
          Forgot Password
        </h1>

        <p className="text-gray-500 mb-8">
          Enter your phone number
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
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
                ? 'Sending OTP...'
                : 'Send OTP'
            }
          </button>

        </form>

      </div>

    </div>
  )
}