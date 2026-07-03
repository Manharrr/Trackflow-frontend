import { Link } from 'react-router-dom'

export default function PendingApprovalPage() {
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
        p-12
        max-w-2xl
        w-full
        shadow-sm
        text-center
      ">
        <div className="
          w-20
          h-20
          rounded-full
          bg-emerald-100
          flex
          items-center
          justify-center
          mx-auto
          mb-8
        ">
          <span className="
            text-4xl
          ">
            ⏳
          </span>
        </div>

        <h1 className="
          text-4xl
          font-bold
          text-gray-900
        ">
          Registration Submitted
        </h1>

        <p className="
          text-gray-500
          text-lg
          mt-5
          leading-8
        ">
          Your company registration request
          has been submitted successfully.
        </p>

        <p className="
          text-gray-500
          text-lg
          mt-2
          leading-8
        ">
          Please wait while the Super Admin
          reviews and approves your workspace.
        </p>

        <Link
          to="/login"
          className="
            inline-block
            mt-10
            bg-[#0F766E]
            text-white
            px-8
            py-4
            rounded-2xl
            font-semibold
          "
        >
          Back To Login
        </Link>
      </div>
    </div>
  )
}