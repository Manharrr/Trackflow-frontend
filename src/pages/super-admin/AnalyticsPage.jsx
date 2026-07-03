export default function AnalyticsPage() {
  return (
    <div>
      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Analytics
      </h1>

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          "
        >
          <p className="text-gray-500">
            Total Companies
          </p>

          <h2
            className="
              text-4xl
              font-bold
              mt-4
            "
          >
            15
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          "
        >
          <p className="text-gray-500">
            Pending Requests
          </p>

          <h2
            className="
              text-4xl
              font-bold
              mt-4
            "
          >
            3
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          "
        >
          <p className="text-gray-500">
            Active Companies
          </p>

          <h2
            className="
              text-4xl
              font-bold
              mt-4
            "
          >
            10
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          "
        >
          <p className="text-gray-500">
            Rejected Companies
          </p>

          <h2
            className="
              text-4xl
              font-bold
              mt-4
            "
          >
            2
          </h2>
        </div>
      </div>
    </div>
  )
}