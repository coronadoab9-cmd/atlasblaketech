import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            Demo Request
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Schedule a walkthrough of the AtlasBlake Technologies platform.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            Learn how AtlasBlake Technologies can help modernize dispatch,
            delivery tracking, eTicket workflows, reporting, and operational
            visibility for your company.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div>
            <p className="text-[#005BFF] font-semibold mb-4">
              Platform Demo
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-8">
              See how the platform can fit your operation.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9 mb-10">
              Future demos will walk through:
            </p>

            <div className="space-y-5">
              <DemoFeature text="Dispatch workflows" />
              <DemoFeature text="Digital eTicket creation" />
              <DemoFeature text="Delivery visibility" />
              <DemoFeature text="Fleet activity tracking" />
              <DemoFeature text="Operational reporting dashboards" />
              <DemoFeature text="Company-specific portal access" />
            </div>
          </div>

          {/* FORM */}
          <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-10 shadow-[0_0_60px_rgba(0,91,255,0.10)]">
            <p className="text-[#005BFF] font-semibold mb-4">
              Request a Demo
            </p>

            <h2 className="text-4xl font-bold mb-8">
              Let’s talk about your workflow
            </h2>

            <form className="space-y-6">

              <Input
                label="Full Name"
                type="text"
                placeholder="John Smith"
              />

              <Input
                label="Company Name"
                type="text"
                placeholder="ABC Ready Mix"
              />

              <Input
                label="Work Email"
                type="email"
                placeholder="john@company.com"
              />

              <Input
                label="Phone Number"
                type="text"
                placeholder="(555) 555-5555"
              />

              <div>
                <label className="block text-sm text-[#B6C2D1] mb-3">
                  What are you looking to improve?
                </label>

                <textarea
                  rows={6}
                  placeholder="Tell us about your dispatch, ticketing, reporting, or delivery workflow..."
                  className="w-full bg-[#020817] border border-[#12315F] rounded-2xl px-5 py-4 outline-none focus:border-[#005BFF] transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#005BFF] hover:bg-[#0047cc] transition py-5 rounded-2xl text-lg font-bold shadow-[0_0_35px_rgba(0,91,255,0.35)]"
              >
                Request Demo →
              </button>

            </form>
          </div>

        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">

            <BenefitCard
              title="Operational Visibility"
              text="Track dispatch activity, deliveries, tickets, and workflows in one connected platform."
            />

            <BenefitCard
              title="Digital Documentation"
              text="Replace paper tickets and disconnected operational records with digital workflows."
            />

            <BenefitCard
              title="Scalable Platform"
              text="Future customers will be able to add modules and users as their operation grows."
            />

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function DemoFeature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-3 h-3 rounded-full bg-[#005BFF]" />

      <p className="text-[#B6C2D1] text-lg">
        {text}
      </p>
    </div>
  );
}

function BenefitCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8">
      <h3 className="text-2xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-[#B6C2D1] leading-8">
        {text}
      </p>
    </div>
  );
}

function Input({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm text-[#B6C2D1] mb-3">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#020817] border border-[#12315F] rounded-2xl px-5 py-4 outline-none focus:border-[#005BFF] transition"
      />
    </div>
  );
}