import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            Contact
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Let’s modernize your operations.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            Whether you're looking to improve dispatch workflows,
            digital tickets, delivery visibility, or operational reporting,
            AtlasBlake Technologies is ready to help.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">
              <InfoCard
                title="Email"
                value="contact@atlasblaketech.com"
              />

              <InfoCard
                title="Website"
                value="atlasblaketech.com"
              />

              <InfoCard
                title="Location"
                value="Texas, USA"
              />

              <InfoCard
                title="Support"
                value="Available for demos and onboarding"
              />
            </div>
          </div>

          <form className="bg-[#071225] border border-[#12315F] rounded-3xl p-8 space-y-5">
            <Input label="Full Name" placeholder="John Smith" />
            <Input label="Company Name" placeholder="ABC Ready Mix" />
            <Input label="Email" placeholder="john@company.com" />
            <Input label="Phone" placeholder="(555) 555-5555" />

            <div>
              <label className="block mb-2 font-semibold">
                Message
              </label>

              <textarea
                className="w-full min-h-40 rounded-xl bg-[#020817] border border-[#12315F] px-4 py-3 outline-none focus:border-[#005BFF]"
                placeholder="Tell us about your operation and what you're looking to improve..."
              />
            </div>

            <button
              type="button"
              className="w-full bg-[#005BFF] hover:bg-[#0047cc] transition px-8 py-5 rounded-xl text-lg font-bold shadow-[0_0_35px_rgba(0,91,255,0.35)]"
            >
              Send Message →
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block mb-2 font-semibold">
        {label}
      </label>

      <input
        className="w-full rounded-xl bg-[#020817] border border-[#12315F] px-4 py-3 outline-none focus:border-[#005BFF]"
        placeholder={placeholder}
      />
    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-2xl p-6">
      <p className="text-[#005BFF] font-semibold mb-2">
        {title}
      </p>

      <p className="text-[#B6C2D1] text-lg">
        {value}
      </p>
    </div>
  );
}