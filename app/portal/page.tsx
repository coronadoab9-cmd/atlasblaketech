import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">Portal</p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            A future client portal for company-specific software access.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies is designed to support customer workspaces,
            purchased modules, secure users, roles, dispatch tools, eTickets,
            and reporting dashboards.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <PortalCard
            title="Company Workspaces"
            text="Each customer will have a dedicated company environment with their own users, data, modules, and settings."
          />

          <PortalCard
            title="Module-Based Access"
            text="Customers will access only the software modules they purchase, such as dispatch, eTickets, reporting, or workflow automation."
          />

          <PortalCard
            title="Role-Based Users"
            text="Admins, dispatchers, managers, and drivers can have different permissions inside the platform."
          />

          <PortalCard
            title="Secure Customer Data"
            text="Company data will remain separated by account so each customer only sees their own records."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PortalCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-10">
      <h2 className="text-3xl font-bold mb-5">{title}</h2>
      <p className="text-[#B6C2D1] text-lg leading-8">{text}</p>
    </div>
  );
}