import { useAuth } from '../../contexts/AuthContext'

export default function Header() {
  const { user } =
    useAuth()

  return (
    <header
      className="
        bg-white
        p-6
        shadow-sm
        flex
        justify-between
        items-center
      "
    >
      <h2
        className="
          text-2xl
          font-semibold
        "
      >
        Dashboard
      </h2>

      <div>
        <p
          className="
            font-semibold
          "
        >
          {
            user?.email
          }
        </p>

        <p
          className="
            text-gray-500
            text-sm
          "
        >
          {
            user?.role
          }
        </p>
      </div>
    </header>
  )
}
// import { Bell, UserCircle } from 'lucide-react'

// export default function Header() {
//   return (
//     <header
//       className="
//         h-20
//         bg-white
//         border-b
//         border-gray-200
//         px-6
//         flex
//         items-center
//         justify-between
//       "
//     >
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">
//           Dashboard
//         </h1>
//       </div>

//       <div className="flex items-center gap-6">
//         <button>
//           <Bell size={24} />
//         </button>

//         <button className="flex items-center gap-2">
//           <UserCircle size={34} />
//           <span className="font-medium">
//             Company Admin
//           </span>
//         </button>
//       </div>
//     </header>
//   )
// }