export default function Modules() {
  return (
    <section
      id="modules"
      className="py-28"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-20">
          Modules
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            'Orders',
            'Employees',
            'Couriers',
            'Analytics',
            'Reports',
            'AI Assistant',
          ].map((item) => (
            <div
              key={item}
              className="border p-10 rounded-3xl"
            >
              <h3 className="text-2xl font-semibold">
                {item}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}