export default function CompanyDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Company Dashboard
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card
          title="Orders"
          value="250"
        />

        <Card
          title="Employees"
          value="18"
        />

        <Card
          title="Couriers"
          value="12"
        />

        <Card
          title="Revenue"
          value="₹1.2L"
        />

      </div>
    </div>
  )
}

function Card({
  title,
  value,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-4">
        {value}
      </h2>
    </div>
  )
}