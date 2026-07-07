import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'

export default function VerifyResetOTPPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const phone =
    location.state?.phone

  const [otp, setOtp] =
    useState('')

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleSubmit =
    async (e) => {
      e.preventDefault()
      setError('')

      try {
        setLoading(true)

        await axiosInstance.post(
          '/auth/verify-reset-otp/',
          {
            phone,
            otp,
          }
        )

        navigate(
          '/reset-password',
          {
            state: {
              phone,
            },
          }
        )
      }

      catch (err) {
        setError(
          err.response?.data?.message ||
          'Invalid OTP'
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
          Verify OTP
        </h1>

        <p className="text-gray-500 mb-8">
          Enter OTP sent to
          <br />
          {phone}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
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
                ? 'Verifying...'
                : 'Verify OTP'
            }
          </button>

        </form>

      </div>

    </div>
  )
}