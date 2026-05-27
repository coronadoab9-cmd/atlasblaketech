import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            Case Studies
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Operational workflows transformed into modern digital systems.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies is focused on helping operations teams move
            from disconnected processes into centralized digital workflows.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          <CaseStudyCard
            title="Digital eTicket Workflow"
            text="A connected digital workflow for capturing delivery records, ticket information, mix details, load data, and operational timestamps."
          />

          <CaseStudyCard
            title="Dispatch Visibility"
            text="A centralized dispatch dashboard for tracking active jobs, deliveries, pending loads, and fleet activity."
          />

          <CaseStudyCard
            title="Operational Reporting"
            text="A reporting workflow for monitoring completed loads, delivery history, operational metrics, and ticket records."
          />

        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-3xl mb-16">
            <p className="text-[#005BFF] font-semibold mb-4">
              Future Customer Stories
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Built for scalable operational environments.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              Future case studies will showcase customer implementations,
              dispatch workflows, digital ticket systems, reporting dashboards,
              and company-specific operational environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <HighlightCard
              title="Multi-Company Platform"
              text="Future customers will operate inside their own dedicated company workspaces with separate users, records, workflows, and software modules."
            />

            <HighlightCard
              title="Modular Software Access"
              text="Customers will be able to purchase dispatch, eTicket, reporting, workflow automation, and operational modules independently."
            />

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

function CaseStudyCard({
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

function HighlightCard({
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