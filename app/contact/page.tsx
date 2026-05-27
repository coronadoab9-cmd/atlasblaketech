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
            Let’s talk about your operational workflows.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            Whether you’re looking to modernize dispatch, digital tickets,
            delivery tracking, or reporting systems, AtlasBlake Technologies is
            building software designed for operational visibility.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div>
            <p className="text-[#005BFF] font-semibold mb-4">
              Contact Information
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-10">
              Start the conversation.
            </h2>

            <div className="space-y-6">
              <ContactCard
                title="General Contact"
                value="contact@atlasblaketech.com"
              />

              <ContactCard
                title="Support"
                value="support@atlasblaketech.com"
              />

              <ContactCard
                title="Demo Requests"
                value="demo@atlasblaketech.com"
              />

              <ContactCard
                title="Website"
                value="atlasblaketech.com"
              />
            </div>
          </div>

          {/* FORM */}
          <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-10 shadow-[0_0_60px_rgba(0,91,255,0.10)]">
            <p className="text-[#005BFF] font-semibold mb-4">
              Inquiry Form
            </p>

            <h2 className="text-4xl font-bold mb-8">
              Send us a message
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
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Tell us about your operation and what you're looking to improve..."
                  className="w-full bg-[#020817] border border-[#12315F] rounded-2xl px-5 py-4 outline-none focus:border-[#005BFF] transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#005BFF] hover:bg-[#0047cc] transition py-5 rounded-2xl text-lg font-bold shadow-[0_0_35px_rgba(0,91,255,0.35)]"
              >
                Submit Inquiry →
              </button>

            </form>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8">
      <p className="text-[#005BFF] font-semibold mb-3">
        {title}
      </p>

      <p className="text-[#F8FAFC] text-lg">
        {value}
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