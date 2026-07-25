import { ClipboardList, Users, Milestone, Coins } from 'lucide-react'

export default function CompanyDashboard() {
  return (
    <div className="text-left space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-dark-text tracking-tight">
          Company Dashboard
        </h1>
        <p className="text-muted-gray mt-1.5 text-sm">
          Overview of company workspaces telemetry, dispatch orders, and staff.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card
          title="Orders"
          value="250"
          icon={<ClipboardList className="w-5 h-5 text-indigo-600" />}
          bgClass="bg-indigo-50/70 border-indigo-100/50"
        />

        <Card
          title="Employees"
          value="18"
          icon={<Users className="w-5 h-5 text-blue-600" />}
          bgClass="bg-blue-50/70 border-blue-100/50"
        />

        <Card
          title="Couriers"
          value="12"
          icon={<Milestone className="w-5 h-5 text-amber-600" />}
          bgClass="bg-amber-50/70 border-amber-100/50"
        />

        <Card
          title="Revenue"
          value="₹1.2L"
          icon={<Coins className="w-5 h-5 text-primary-dark" />}
          bgClass="bg-primary/10 border-primary/20"
        />

      </div>
    </div>
  )
}

function Card({
  title,
  value,
  icon,
  bgClass
}) {
  return (
    <div className="bg-white rounded-3xl border border-border-light p-6 flex items-center justify-between shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
      <div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
          {title}
        </p>

        <h2 className="text-3xl font-black text-dark-text mt-2 tracking-tight">
          {value}
        </h2>
      </div>
      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm ${bgClass}`}>
        {icon}
      </div>
    </div>
  )
}