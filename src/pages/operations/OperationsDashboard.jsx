import { useAuth } from "../../contexts/AuthContext";

export default function OperationsDashboard() {
  const { user } = useAuth();
  const employeeName = user?.employee?.full_name || user?.user?.first_name || "Operations Manager";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
        Operations Manager Dashboard
      </h1>
      <p className="text-slate-500 text-lg">
        Welcome, <span className="font-bold text-[#0F6E56]">{employeeName}</span>
      </p>
    </div>
  );
}