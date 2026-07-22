import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  LayoutDashboard,
  Building2,
  BarChart3,
  Settings,
  Package,
  Users,
  User,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react'

export default function Sidebar() {
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  let menu = []

  if (user?.role === 'super_admin') {
    menu = [
      { name: 'Dashboard', path: '/super-admin', icon: LayoutDashboard },
      { name: 'Companies', path: '/super-admin/companies', icon: Building2 },
      { name: 'Analytics', path: '/super-admin/analytics', icon: BarChart3 },
      // { name: 'Settings', path: '/super-admin/settings', icon: Settings },
      { name: 'Profile', path: '/profile', icon: User },
    ]
  } else if (user?.role === 'company_admin') {
    menu = [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Orders', path: '/dashboard/orders', icon: Package },
      { name: 'Employees', path: '/dashboard/employees', icon: Users },
      { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    ]
  } else if (user?.role === 'operations_manager') {
    menu = [
      { name: 'Dashboard', path: '/operations', icon: LayoutDashboard },
      { name: 'Orders', path: '/operations/orders', icon: Package },
      { name: 'Employees', path: '/operations/employees', icon: Users },
    ]
  } else {
    menu = [
      { name: 'Dashboard', path: '/employee', icon: LayoutDashboard },
      { name: 'Assigned Orders', path: '/employee/orders', icon: Package },
      { name: 'Profile', path: '/employee/profile', icon: User },
    ]
  }

  return (
    <aside
      className={`bg-white border-r border-slate-100 flex flex-col justify-between transition-all duration-300 relative z-20 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          {!collapsed && (
            <h1 className="text-2xl font-black text-teal-600 tracking-tight flex items-center gap-2">
              <span className="bg-teal-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-lg">T</span>
              TrackFlow
            </h1>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-extrabold text-lg mx-auto">
              T
            </div>
          )}
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg border border-slate-150 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors absolute right-[-15px] top-7 bg-white shadow-sm"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4.5 w-4.5" /> : <ChevronLeft className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Sidebar NavLinks */}
        <nav className="p-4 space-y-1.5 mt-4">
          {menu.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 shadow-sm shadow-teal-600/5'
                      : 'text-slate-550 hover:bg-slate-50 hover:text-slate-800'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Sidebar Footer Logout Button */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all duration-200 cursor-pointer ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}