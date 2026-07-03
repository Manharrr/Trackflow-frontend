export default function SuperAdminDashboard() {
  return (
    <div>
      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Super Admin Dashboard
      </h1>

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <Card
          title="Companies"
          value="15"
        />

        <Card
          title="Pending"
          value="3"
        />

        <Card
          title="Active"
          value="10"
        />

        <Card
          title="Rejected"
          value="2"
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
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      <p className="text-gray-500">
        {title}
      </p>

      <h2
        className="
          text-4xl
          font-bold
          mt-4
        "
      >
        {value}
      </h2>
    </div>
  )
}