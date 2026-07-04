export default function HowItWorks() {
  return (
    <section className="py-28 bg-[#F7F8F7]">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-20">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {[
            'Register',
            'Verify Phone',
            'Create Workspace',
            'Manage Operations'
          ].map((step) => (
            <div
              key={step}
              className="bg-white rounded-3xl p-10 text-center"
            >
              <h3 className="text-2xl font-semibold">
                {step}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  )
}