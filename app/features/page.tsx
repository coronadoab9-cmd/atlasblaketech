import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">Features</p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Connected features for dispatch, delivery, and digital ticket workflows.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            Built for teams that need cleaner delivery data, better visibility,
            digital documentation, and fewer manual processes.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              text={feature.text}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

const features = [
  {
    title: "Dispatch Dashboard",
    text: "View active jobs, assigned trucks, ticket status, load progress, and operational activity from one screen.",
  },
  {
    title: "Digital eTickets",
    text: "Create tickets with customer, address, order, mix, slump, water, batch weight, load time, and truck details.",
  },
  {
    title: "Delivery Tracking",
    text: "Monitor delivery progress, completed loads, pending loads, and job movement throughout the day.",
  },
  {
    title: "Customer Records",
    text: "Keep customer, jobsite, order, and delivery history organized for faster lookup and cleaner reporting.",
  },
  {
    title: "Operational Reports",
    text: "Track load counts, ticket history, order totals, delivered quantities, and performance metrics.",
  },
  {
    title: "PDF Ticket Output",
    text: "Generate professional digital ticket records that can be stored, shared, or sent to customers.",
  },
];

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8 hover:border-[#005BFF] transition">
      <div className="w-14 h-14 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/30 mb-6" />
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-[#B6C2D1] leading-8">{text}</p>
    </div>
  );
}