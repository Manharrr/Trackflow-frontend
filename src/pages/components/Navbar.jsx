import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link
          to="/"
          className="text-3xl font-bold text-[#0F766E]"
        >
          TrackFlow AI
        </Link>

        <div className="hidden md:flex items-center gap-10 text-gray-600">

          <a href="#features">Features</a>

          <a href="#modules">Modules</a>

          <a href="#pricing">Pricing</a>

          <a href="#faq">FAQ</a>

        </div>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-6 py-3 rounded-2xl border"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-2xl bg-[#0F766E] text-white"
          >
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  )
}