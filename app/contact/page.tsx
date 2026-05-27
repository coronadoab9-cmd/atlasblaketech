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
            Let’s talk about your operations.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            Tell us about your dispatch, delivery, fleet, or eTicket workflows
            and we’ll show you how AtlasBlake Technologies can help modernize
            your operations.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Get in touch
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
                title="Industry Focus"
                value="Concrete, trucking, logistics & construction operations"
              />
            </div>
          </div>

          {/* FORM */}
          <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-10 shadow-[0_0_60px_rgba(0,91,255,0.08)]">
            <form className="space-y-6">
              
              <Input label="Full Name" type="text" />
              
              <Input label="Company" type="text" />

              <Input label="Email Address" type="email" />

              <Input label="Phone Number" type="text" />

              <div>
                <label className="block text-sm text-[#B6C2D1] mb-3">
                  Message
                </label>

                <textarea
                  rows={6}
                  className="w-full bg-[#020817] border border-[#12315F] rounded-2xl px-5 py-4 outline-none focus:border-[#005BFF] transition resize-none"
                  placeholder="Tell us about your operations..."
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

function InfoCard({
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

      <p className="text-[#F8FAFC] text-xl leading-8">
        {value}
      </p>
    </div>
  );
}

function Input({
  label,
  type,
}: {
  label: string;
  type: string;
}) {
  return (
    <div>
      <label className="block text-sm text-[#B6C2D1] mb-3">
        {label}
      </label>

      <input
        type={type}
        className="w-full bg-[#020817] border border-[#12315F] rounded-2xl px-5 py-4 outline-none focus:border-[#005BFF] transition"
      />
    </div>
  );
}