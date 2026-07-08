import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axiosInstance from '../api/axios'

export default function RegisterPage() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        admin_name: '',
        company_name: '',
        email: '',
        phone: '',
        subdomain: '',
        password: '',
        confirm_password: '',
    })

    const [loading, setLoading] =
        useState(false)

    const [error, setError] =
        useState('')

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setError('')

        if (
            formData.password !==
            formData.confirm_password
        ) {

            setError(
                'Passwords do not match'
            )

            return

        }

        try {

            setLoading(true)

            await axiosInstance.post(
                '/auth/register/',
                formData
            )

            navigate(
                '/verify-phone',
                {
                    state: {
                        phone:
                            formData.phone,
                    },
                }
            )

        } catch (err) {

            setError(
                err.response?.data?.message ||
                err.response?.data?.detail ||
                'Registration failed'
            )

        } finally {

            setLoading(false)

        }

    }

    return (

        <div className="min-h-screen bg-[#F7F8F7] grid lg:grid-cols-2">

            <div className="flex items-center justify-center p-10">

                <div className="w-full max-w-md">

                    <h1 className="text-5xl font-bold mb-3">
                        Company Admin Registration
                    </h1>

                    <p className="text-gray-500 mb-10">
                        Create your company workspace.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <input
                            type="text"
                            name="admin_name"
                            placeholder="Admin Name"
                            value={formData.admin_name}
                            onChange={handleChange}
                            className="w-full border rounded-2xl p-4"
                            required
                        />

                        <input
                            type="text"
                            name="company_name"
                            placeholder="Company Name"
                            value={formData.company_name}
                            onChange={handleChange}
                            className="w-full border rounded-2xl p-4"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Company Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-2xl p-4"
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="+91 9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border rounded-2xl p-4"
                            required
                        />

                        <input
                            type="text"
                            name="subdomain"
                            placeholder="Workspace Name (example: abc-logistics)"
                            value={formData.subdomain}
                            onChange={handleChange}
                            className="w-full border rounded-2xl p-4"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-2xl p-4"
                            required
                        />

                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            className="w-full border rounded-2xl p-4"
                            required
                        />

                        {error && (

                            <p className="text-red-500">
                                {error}
                            </p>

                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0F766E] text-white p-4 rounded-2xl"
                        >

                            {
                                loading
                                    ? 'Creating Workspace...'
                                    : 'Create Workspace'
                            }

                        </button>

                    </form>

                    <p className="text-center mt-8 text-gray-500">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-[#0F766E]"
                        >
                            Sign In
                        </Link>

                    </p>

                </div>

            </div>

            <div className="hidden lg:flex items-center justify-center p-16">

                <div className="space-y-8">

                    <div>

                        <h3 className="text-2xl font-semibold">
                            Your Own Workspace
                        </h3>

                        <p className="text-gray-500">
                            Every company gets its own secure workspace.
                        </p>

                    </div>

                    <div>

                        <h3 className="text-2xl font-semibold">
                            Secure Authentication
                        </h3>

                        <p className="text-gray-500">
                            Phone verification, MFA and Google Sign-In supported.
                        </p>

                    </div>

                    <div>

                        <h3 className="text-2xl font-semibold">
                            Multi-Tenant Platform
                        </h3>

                        <p className="text-gray-500">
                            Each company has its own isolated environment.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    )

}

// import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import axiosInstance from '../api/axios'

// export default function RegisterPage() {
//   const navigate = useNavigate()

//   const [formData, setFormData] = useState({
//     username: '',
//     phone: '',
//     password: '',
//     confirm_password: '',
//   })

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')

//     if (
//       formData.password !==
//       formData.confirm_password
//     ) {
//       return setError(
//         'Passwords do not match'
//       )
//     }

//     try {
//       setLoading(true)

//       await axiosInstance.post(
//         '/auth/register/',
//         formData
//       )

//       navigate('/verify-phone', {
//         state: {
//           phone: formData.phone,
//         },
//       })
//     } catch (err) {
//       setError(
//         err.response?.data?.detail ||
//           'Registration failed'
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#F7F8F7] grid lg:grid-cols-2">

//       <div className="flex items-center justify-center p-10">

//         <div className="w-full max-w-md">

//           <h1 className="text-5xl font-bold mb-3">
//             Company Admin Registration
//           </h1>

//           <p className="text-gray-500 mb-10">
//             Launch your private workspace in minutes.
//           </p>

//           {/* <button
//             type="button"
//             className="w-full border rounded-2xl p-4 mb-8"
//           >
//             Continue with Google
//           </button> */}
//           {/* <div className="flex justify-center mb-8">
//     <GoogleLoginButton />
// </div> */}

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5"
//           >

//             <input
//               type="text"
//               name="username"
//               placeholder="Full Name"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full border rounded-2xl p-4"
//               required
//             />

//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full border rounded-2xl p-4"
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border rounded-2xl p-4"
//               required
//             />

//             <input
//               type="password"
//               name="confirm_password"
//               placeholder="Confirm Password"
//               value={formData.confirm_password}
//               onChange={handleChange}
//               className="w-full border rounded-2xl p-4"
//               required
//             />

//             {error && (
//               <p className="text-red-500">
//                 {error}
//               </p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#0F766E] text-white p-4 rounded-2xl"
//             >
//               {loading
//                 ? 'Creating...'
//                 : 'Create Account'}
//             </button>

//           </form>

//           <p className="text-center mt-8 text-gray-500">
//             Already have an account?{' '}
//             <Link
//               to="/login"
//               className="text-[#0F766E]"
//             >
//               Sign In
//             </Link>
//           </p>

//         </div>

//       </div>

//       <div className="hidden lg:flex items-center justify-center p-16">

//         <div className="space-y-8">

//           <div>
//             <h3 className="text-2xl font-semibold">
//               Your own subdomain
//             </h3>

//             <p className="text-gray-500">
//               Launch instantly with your own
//               workspace.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold">
//               Employee Portals
//             </h3>

//             <p className="text-gray-500">
//               Secure dashboards for your team.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold">
//               AI Workflow Automation
//             </h3>

//             <p className="text-gray-500">
//               Automate logistics operations.
//             </p>
//           </div>

//         </div>

//       </div>

//     </div>
//   )
// }