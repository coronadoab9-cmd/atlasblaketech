import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            Client Portal
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Company-specific software access built for operational teams.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies is building a secure client portal where
            customers can access their purchased modules, operational records,
            dispatch systems, eTickets, reporting dashboards, and company users.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          <PortalCard
            title="Company Workspaces"
            text="Each customer will operate inside their own dedicated company environment with separate operational records and workflows."
          />

          <PortalCard
            title="Purchased Modules"
            text="Customers will access only the software systems they purchase, including dispatch, eTickets, reporting, and operational workflows."
          />

          <PortalCard
            title="Role-Based Access"
            text="Dispatchers, managers, admins, drivers, and operational users can have different permissions inside the platform."
          />

          <PortalCard
            title="Operational Visibility"
            text="Future customers will be able to monitor deliveries, tickets, fleet activity, reporting, and operational performance from one connected dashboard."
          />

        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-3xl mb-16">
            <p className="text-[#005BFF] font-semibold mb-4">
              Future Platform Architecture
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Designed as a scalable multi-company software platform.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              Future customers will securely manage users, workflows,
              operational records, reporting systems, and software modules
              through centralized company portals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <ArchitectureCard
              title="Dispatch Systems"
              text="Track active loads, jobs, trucks, drivers, and operational movement."
            />

            <ArchitectureCard
              title="Digital eTickets"
              text="Store delivery records, load details, timestamps, customer information, and operational data."
            />

            <ArchitectureCard
              title="Operational Reporting"
              text="Generate dashboards, ticket history, completed load reports, and performance tracking."
            />

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

function PortalCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-10">
      <h2 className="text-3xl font-bold mb-5">
        {title}
      </h2>

      <p className="text-[#B6C2D1] text-lg leading-9">
        {text}
      </p>
    </div>
  );
}

function ArchitectureCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8 hover:border-[#005BFF] transition">
      <div className="w-14 h-14 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/30 mb-6" />

      <h3 className="text-2xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-[#B6C2D1] leading-8">
        {text}
      </p>
    </div>
  );
}