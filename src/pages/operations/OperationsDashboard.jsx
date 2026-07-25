import { useAuth } from "../../contexts/AuthContext";
import { UserCheck } from 'lucide-react'

export default function OperationsDashboard() {
  const { user } = useAuth();
  const employeeName = user?.employee?.full_name || user?.user?.first_name || "Operations Manager";

  return (
    <div className="bg-white rounded-[2rem] border border-border-light shadow-md p-8 sm:p-12 max-w-2xl mx-auto mt-10 hover:border-primary/10 transition-all duration-300 text-left relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-40 -mr-5 -mt-5" />

      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary-dark shadow-sm">
        <UserCheck className="h-6 w-6" />
      </div>

      <h1 className="text-3xl font-extrabold text-dark-text tracking-tight mb-4">
        Operations Manager Dashboard
      </h1>
      <p className="text-muted-gray text-base sm:text-lg">
        Welcome back, <span className="font-extrabold text-primary-dark font-mono">{employeeName}</span>. Manage logistics queues, order allocation, and employee status.
      </p>
    </div>
  );
}