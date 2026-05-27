import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#005BFF] font-semibold mb-4">
              Request a Demo
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              See how AtlasBlake Technologies can modernize your operations.
            </h1>

            <p className="text-[#B6C2D1] text-xl leading-9">
              Tell us about your dispatch, delivery, or ticketing workflow.
              We’ll review your operation and show how the platform can help
              reduce manual work, improve visibility, and digitize delivery
              records.
            </p>
          </div>

          <form className="bg-[#071225] border border-[#12315F] rounded-3xl p-8 space-y-5">
            <Input label="Full Name" placeholder="John Smith" />
            <Input label="Company Name" placeholder="ABC Ready Mix" />
            <Input label="Email" placeholder="john@company.com" />
            <Input label="Phone" placeholder="(555) 555-5555" />

            <div>
              <label className="block mb-2 font-semibold">
                What are you trying to improve?
              </label>
              <textarea
                className="w-full min-h-36 rounded-xl bg-[#020817] border border-[#12315F] px-4 py-3 outline-none focus:border-[#005BFF]"
                placeholder="Dispatch, paper tickets, delivery records, reporting, fleet visibility..."
              />
            </div>

            <button
              type="button"
              className="w-full bg-[#005BFF] hover:bg-[#0047cc] transition px-8 py-5 rounded-xl text-lg font-bold shadow-[0_0_35px_rgba(0,91,255,0.35)]"
            >
              Submit Demo Request
            </button>

            <p className="text-[#B6C2D1] text-sm">
              Form connection comes later. For now, this builds the page design.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">{label}</label>
      <input
        className="w-full rounded-xl bg-[#020817] border border-[#12315F] px-4 py-3 outline-none focus:border-[#005BFF]"
        placeholder={placeholder}
      />
    </div>
  );
}