const features = [
  'Multi Tenant Workspaces',
  'Role Based Access',
  'Microsoft Authenticator MFA',
  'Employee Management',
  'Courier Management',
  'AI Insights'
]

export default function Features() {
  return (
    <section
      id="features"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-20">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item) => (
            <div
              key={item}
              className="p-10 rounded-3xl border hover:shadow-lg transition"
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