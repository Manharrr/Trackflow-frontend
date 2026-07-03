import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'

export default function WorkspaceSetupPage() {
  const navigate =
    useNavigate()

  const [formData,
    setFormData
  ] = useState({
    company_name: '',
    subdomain: '',
    phone: '',
  })

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

      try {
        await axiosInstance.post(
          '/auth/register-company/',
          formData
        )

        navigate(
          '/pending-approval'
        )

      } catch (err) {
        console.log(err)
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
        max-w-lg
        shadow-sm
      ">
        <h1 className="
          text-4xl
          font-bold
        ">
          Create Workspace
        </h1>

        <p className="
          text-gray-500
          mt-3
        ">
          Setup your company
          workspace.
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="
            mt-8
            space-y-5
          "
        >
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            value={
              formData.company_name
            }
            onChange={
              handleChange
            }
            className="
              w-full
              border
              rounded-2xl
              p-4
            "
          />

          <input
            type="text"
            name="subdomain"
            placeholder="Subdomain"
            value={
              formData.subdomain
            }
            onChange={
              handleChange
            }
            className="
              w-full
              border
              rounded-2xl
              p-4
            "
          />

          <input
            type="text"
            name="phone"
            placeholder="Company Phone"
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
            className="
              w-full
              border
              rounded-2xl
              p-4
            "
          />

          <button
            className="
              w-full
              bg-[#0F766E]
              text-white
              rounded-2xl
              p-4
            "
          >
            Submit For Approval
          </button>
        </form>
      </div>
    </div>
  )
}