import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">Case Studies</p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Real operational workflows transformed into modern software.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            This page will showcase AtlasBlake Technologies platform examples,
            implementation stories, and operational improvements.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <CaseCard
            title="eTicket Automation"
            text="A digital ticket workflow for capturing customer, order, load, mix, slump, water, truck, and batch information."
          />

          <CaseCard
            title="Dispatch Visibility"
            text="A centralized dispatch dashboard for tracking jobs, deliveries, active loads, and operational progress."
          />

          <CaseCard
            title="Operations Reporting"
            text="A reporting system for monitoring completed loads, delivery history, ticket records, and performance metrics."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CaseCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8 hover:border-[#005BFF] transition">
      <div className="w-14 h-14 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/30 mb-6" />
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-[#B6C2D1] leading-8">{text}</p>
    </div>
  );
}