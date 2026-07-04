import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">

        <div className="flex flex-col justify-center">

          <span className="bg-green-100 text-[#0F766E] px-4 py-2 rounded-full w-fit mb-6">
            AI Powered Multi-Tenant Logistics Platform
          </span>

          <h1 className="text-6xl font-bold leading-tight">
            Modern Logistics
            Operations Platform
          </h1>

          <p className="text-gray-500 text-xl mt-8 leading-9">
            Manage orders, employees,
            deliveries and analytics
            from one secure workspace.
          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/register"
              className="bg-[#0F766E] text-white px-8 py-4 rounded-2xl"
            >
              Start Free
            </Link>

            <Link
              to="/login"
              className="border px-8 py-4 rounded-2xl"
            >
              Login
            </Link>

          </div>

        </div>

        <div className="flex items-center">

          <div className="bg-white rounded-3xl p-10 shadow-lg w-full">

            <div className="grid grid-cols-2 gap-6">

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-4xl font-bold">
                  245
                </h3>
                <p className="text-gray-500">
                  Orders
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-4xl font-bold">
                  32
                </h3>
                <p className="text-gray-500">
                  Employees
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-4xl font-bold">
                  ₹2.4L
                </h3>
                <p className="text-gray-500">
                  Revenue
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-4xl font-bold">
                  98%
                </h3>
                <p className="text-gray-500">
                  Performance
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}