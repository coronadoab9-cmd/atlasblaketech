import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            Industries
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Built for operations that depend on dispatch, delivery, and ticket workflows.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies is focused on helping operational industries
            modernize workflows, improve visibility, and centralize delivery data.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          <IndustryCard
            title="Concrete & Ready Mix"
            text="Digital ticket workflows, dispatch visibility, mix tracking, load records, delivery documentation, and operational reporting."
          />

          <IndustryCard
            title="Trucking & Logistics"
            text="Fleet movement, dispatch operations, customer deliveries, reporting systems, and operational visibility tools."
          />

          <IndustryCard
            title="Construction Operations"
            text="Jobsite deliveries, operational coordination, ticket tracking, material movement, and reporting workflows."
          />

        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-3xl mb-16">
            <p className="text-[#005BFF] font-semibold mb-4">
              Platform Focus
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Modern operational software for real-world workflows.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              AtlasBlake Technologies is designed for companies that need
              better operational visibility, digital workflows, delivery data,
              and centralized reporting systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <FocusCard
              title="Operational Visibility"
              text="Track jobs, tickets, deliveries, loads, fleet activity, and operational progress from one connected platform."
            />

            <FocusCard
              title="Company-Specific Software"
              text="Future customers will access their own company workspaces, purchased modules, operational records, and reporting environments."
            />

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

function IndustryCard({
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

function FocusCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-10">
      <h3 className="text-3xl font-bold mb-5">
        {title}
      </h3>

      <p className="text-[#B6C2D1] text-lg leading-9">
        {text}
      </p>
    </div>
  );
}