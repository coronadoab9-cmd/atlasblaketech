import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            Support
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Support for dispatch, delivery, and operational workflows.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies is building a platform focused on helping
            operations teams manage dispatch, digital tickets, reporting, and
            delivery visibility more efficiently.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          <SupportCard
            title="Demo Assistance"
            text="Questions about platform capabilities, operational workflows, or future modules can be discussed during a product walkthrough."
          />

          <SupportCard
            title="Future Onboarding"
            text="Future customers will receive onboarding support for dispatch workflows, tickets, users, reporting, and company setup."
          />

          <SupportCard
            title="Platform Questions"
            text="AtlasBlake Technologies will support operational teams using dispatch, eTicket, reporting, and workflow modules."
          />

        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-[#005BFF] font-semibold mb-4">
            Future Support Model
          </p>

          <h2 className="text-5xl font-bold leading-tight mb-8">
            Built to support company-specific operational systems.
          </h2>

          <p className="text-[#B6C2D1] text-xl leading-9">
            Future support workflows will include company accounts,
            role-based users, module access, onboarding assistance,
            and operational software guidance.
          </p>

        </div>
      </section>

      <Footer />
    </main>
  );
}

function SupportCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8 hover:border-[#005BFF] transition">
      <div className="w-14 h-14 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/30 mb-6" />

      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      <p className="text-[#B6C2D1] leading-8">
        {text}
      </p>
    </div>
  );
}