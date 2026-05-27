import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">Industries</p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Built for companies moving materials, managing deliveries, and tracking tickets.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies is designed for operations that depend on dispatch, delivery visibility, accurate ticket data, and real-time reporting.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <IndustryCard
            title="Concrete & Ready Mix"
            text="Digital ticketing, dispatch visibility, load tracking, mix details, customer deliveries, and operational reporting."
          />

          <IndustryCard
            title="Trucking & Logistics"
            text="Fleet activity, driver assignments, delivery records, dispatch workflows, and customer delivery documentation."
          />

          <IndustryCard
            title="Construction Operations"
            text="Jobsite deliveries, material movement, order tracking, ticket history, and field operation visibility."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function IndustryCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8 hover:border-[#005BFF] transition">
      <div className="w-14 h-14 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/30 mb-6" />
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-[#B6C2D1] leading-8">{text}</p>
    </div>
  );
}