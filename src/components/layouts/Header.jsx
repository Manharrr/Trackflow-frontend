import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Bell, User, Settings, Lock, LogOut, ChevronDown } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const API_HOST = window.location.hostname
  const tenantLogo = user?.tenant?.logo ? `http://${API_HOST}:8000${user.tenant.logo}` : null
  const tenantName = user?.tenant?.name || 'TrackFlow AI'
  const userEmail = user?.user?.email || ''
  const userRole = user?.role || 'Guest'
  const userFullName = user?.employee?.full_name || user?.user?.first_name || 'User Profile'
  const userAvatar = user?.employee?.profile_image ? `http://${API_HOST}:8000${user.employee.profile_image}` : null

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-6 sm:px-8 flex items-center justify-between shadow-sm sticky top-0 z-30">
      
      {/* Company representation */}
      <div className="flex items-center gap-3">
        {tenantLogo ? (
          <img
            src={tenantLogo}
            alt={tenantName}
            className="w-8 h-8 rounded-lg object-cover border border-slate-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-bold border border-teal-100">
            {tenantName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="font-bold text-slate-800 text-sm sm:text-base tracking-tight leading-none">
            {tenantName}
          </h1>
          <span className="text-slate-400 text-xxs font-medium tracking-wider uppercase mt-1 block">
            {userRole.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Action items */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* Notification Bell */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all duration-200">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>

        {/* Profile Avatar Trigger */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-150 text-left"
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userFullName}
                className="w-8 h-8 rounded-lg object-cover border border-slate-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-semibold text-sm">
                {userFullName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="hidden sm:block leading-none">
              <span className="block text-sm font-bold text-slate-800 tracking-tight">
                {userFullName}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <>
              {/* Back drop click handler */}
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              
              <div className="absolute right-0 mt-2.5 w-56 bg-white border border-slate-150 rounded-2xl shadow-xl z-50 py-2 animate-fade-in origin-top-right">
                <div className="px-4 py-2 border-b border-slate-100">
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Account profile</span>
                  <span className="block text-sm font-bold text-slate-800 truncate mt-1">{userFullName}</span>
                  <span className="block text-xxs text-slate-400 truncate font-mono mt-0.5">{userEmail}</span>
                </div>

                <div className="p-1.5 space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-teal-900 hover:bg-teal-50/50 rounded-xl transition-colors"
                  >
                    <User className="h-4.5 w-4.5 text-slate-400 group-hover:text-teal-600" />
                    My Profile
                  </Link>

                  {userRole === 'company_admin' && (
                    <Link
                      to="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-teal-900 hover:bg-teal-50/50 rounded-xl transition-colors"
                    >
                      <Settings className="h-4.5 w-4.5 text-slate-400" />
                      Company Settings
                    </Link>
                  )}

                  <Link
                    to="/change-password"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-teal-900 hover:bg-teal-50/50 rounded-xl transition-colors"
                  >
                    <Lock className="h-4.5 w-4.5 text-slate-400" />
                    Change Password
                  </Link>
                </div>

                <div className="border-t border-slate-100 p-1.5">
                  <button
                    onClick={() => {
                      setDropdownOpen(false)
                      logout()
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="h-4.5 w-4.5 text-rose-500" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  )
}