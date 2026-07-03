import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'

export default function VerifyPhonePage() {
  const navigate = useNavigate()
  const location = useLocation()

  const phone =
    location.state?.phone || ''

  const [otp, setOtp] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)

      await axiosInstance.post(
        '/auth/verify-phone/',
        {
          phone,
          otp,
        }
      )

      navigate('/workspace/setup')
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Invalid OTP'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="
      min-h-screen
      bg-[#F7F8F7]
      flex
      items-center
      justify-center
      p-6
    ">
      <div className="
        bg-white
        rounded-[32px]
        p-10
        w-full
        max-w-md
        shadow-sm
      ">
        <h1 className="
          text-4xl
          font-bold
          text-[#111827]
        ">
          Verify Phone
        </h1>

        <p className="
          text-gray-500
          mt-3
        ">
          Enter the OTP sent to
        </p>

        <p className="
          font-semibold
          mt-1
        ">
          {phone}
        </p>

        <form
          onSubmit={handleSubmit}
          className="
            mt-8
            space-y-5
          "
        >
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            className="
              w-full
              border
              rounded-2xl
              p-4
              outline-none
            "
          />

          {error && (
            <p className="
              text-red-500
            ">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="
              w-full
              bg-[#0F766E]
              text-white
              rounded-2xl
              p-4
              font-semibold
            "
          >
            {
              loading
                ? 'Verifying...'
                : 'Verify OTP'
            }
          </button>

          <button
            type="button"
            className="
              w-full
              border
              rounded-2xl
              p-4
            "
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  )
}