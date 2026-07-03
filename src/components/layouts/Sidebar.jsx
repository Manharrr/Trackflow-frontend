import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Sidebar() {
  const { user, logout } =
    useAuth()

  let menu = []

  if (
    user?.role ===
    'super_admin'
  ) {
    menu = [
      {
        name:
          'Dashboard',
        path:
          '/super-admin',
      },
      {
        name:
          'Companies',
        path:
          '/super-admin/companies',
      },
      {
        name:
          'Analytics',
        path:
          '/super-admin/analytics',
      },
      {
        name:
          'Settings',
        path:
          '/super-admin/settings',
      },
    ]
  }

  else if (
    user?.role ===
    'company_admin'
  ) {
    menu = [
      {
        name:
          'Dashboard',
        path:
          '/dashboard',
      },
      {
        name:
          'Orders',
        path:
          '/dashboard/orders',
      },
      {
        name:
          'Employees',
        path:
          '/dashboard/employees',
      },
      {
        name:
          'Analytics',
        path:
          '/dashboard/analytics',
      },
    ]
  }

  else if (
    user?.role ===
    'operations_manager'
  ) {
    menu = [
      {
        name:
          'Dashboard',
        path:
          '/operations',
      },
      {
        name:
          'Orders',
        path:
          '/operations/orders',
      },
      {
        name:
          'Employees',
        path:
          '/operations/employees',
      },
    ]
  }

  else {
    menu = [
      {
        name:
          'Dashboard',
        path:
          '/employee',
      },
      {
        name:
          'Assigned Orders',
        path:
          '/employee/orders',
      },
      {
        name:
          'Profile',
        path:
          '/employee/profile',
      },
    ]
  }

  return (
    <aside
      className="
        w-72
        bg-white
        p-8
        shadow-sm
      "
    >
      <h1
        className="
          text-3xl
          font-bold
          text-[#0F766E]
          mb-10
        "
      >
        TrackFlow AI
      </h1>

      <nav className="space-y-4">
        {menu.map(
          (item) => (
            <NavLink
              key={
                item.path
              }
              to={
                item.path
              }
              className="
                block
                p-4
                rounded-2xl
                hover:bg-gray-100
              "
            >
              {item.name}
            </NavLink>
          )
        )}

        <button
          onClick={
            logout
          }
          className="
            w-full
            mt-8
            p-4
            rounded-2xl
            bg-red-500
            text-white
          "
        >
          Logout
        </button>
      </nav>
    </aside>
  )
}

// import {
//   LayoutDashboard,
//   Users,
//   Package,
//   BarChart3,
//   Settings,
// } from 'lucide-react'

// export default function Sidebar() {
//   return (
//     <aside className="
//       w-72
//       bg-white
//       border-r
//       border-gray-200
//       p-6
//     ">
//       <h1 className="
//         text-2xl
//         font-bold
//         text-emerald-700
//       ">
//         TrackFlow
//       </h1>

//       <nav className="
//         mt-10
//         space-y-3
//       ">
//         <button className="
//           flex
//           items-center
//           gap-3
//         ">
//           <LayoutDashboard />
//           Dashboard
//         </button>

//         <button className="
//           flex
//           items-center
//           gap-3
//         ">
//           <Package />
//           Orders
//         </button>

//         <button className="
//           flex
//           items-center
//           gap-3
//         ">
//           <Users />
//           Employees
//         </button>

//         <button className="
//           flex
//           items-center
//           gap-3
//         ">
//           <BarChart3 />
//           Analytics
//         </button>

//         <button className="
//           flex
//           items-center
//           gap-3
//         ">
//           <Settings />
//           Settings
//         </button>
//       </nav>
//     </aside>
//   )
// }