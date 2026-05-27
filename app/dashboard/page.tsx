import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-10 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-2">
            Future Client Dashboard
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            AtlasBlake Operations Command Center
          </h1>

          <p className="text-[#B6C2D1] text-lg leading-8 max-w-3xl mt-6">
            This dashboard represents the future customer portal where each
            company will access its own dispatch, eTicket, reporting, fleet,
            customer, and AI-powered operations tools.
          </p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="bg-[#071225] border border-[#12315F] rounded-[32px] p-6 h-fit">
            <div className="space-y-4">
              <SidebarItem title="Overview" active />
              <SidebarItem title="Dispatch" />
              <SidebarItem title="eTickets" />
              <SidebarItem title="Fleet Activity" />
              <SidebarItem title="Customers" />
              <SidebarItem title="Reports" />
              <SidebarItem title="AI Assistant" />
              <SidebarItem title="Settings" />
            </div>
          </aside>

          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard title="Active Loads" value="148" />
              <StatCard title="Open Tickets" value="32" />
              <StatCard title="Completed Today" value="1,284" />
              <StatCard title="Exceptions" value="18" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <DashboardPanel
                title="Dispatch Activity"
                text="Live operational movement across active jobs, trucks, and delivery workflows."
              />

              <DashboardPanel
                title="eTicket Status"
                text="Track completed, pending, missing, and flagged digital ticket records."
              />

              <DashboardPanel
                title="AI Insights"
                text="Future assistant-powered summaries, alerts, exceptions, and operational recommendations."
              />
            </div>

            <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-[#005BFF] font-semibold mb-2">
                    Live Operations
                  </p>

                  <h2 className="text-3xl font-bold">
                    Recent Delivery Activity
                  </h2>
                </div>

                <span className="text-[#B6C2D1]">
                  Company-specific data will appear here
                </span>
              </div>

              <div className="space-y-5">
                <DeliveryRow
                  ticket="TX-1048"
                  customer="Metro Concrete"
                  status="Delivered"
                />

                <DeliveryRow
                  ticket="TX-1052"
                  customer="StoneBridge Materials"
                  status="In Transit"
                />

                <DeliveryRow
                  ticket="TX-1061"
                  customer="Pioneer Construction"
                  status="Loading"
                />

                <DeliveryRow
                  ticket="TX-1068"
                  customer="Lone Star Ready Mix"
                  status="Pending Review"
                />
              </div>
            </div>

            <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-8">
              <p className="text-[#005BFF] font-semibold mb-4">
                AI Operations Assistant
              </p>

              <h2 className="text-3xl font-bold mb-6">
                Ask operational questions in plain language.
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <Prompt text="Which tickets are missing load times?" />
                <Prompt text="Show late deliveries from today." />
                <Prompt text="Generate a customer delivery summary." />
                <Prompt text="Find unusual quantity mismatches." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SidebarItem({
  title,
  active = false,
}: {
  title: string;
  active?: boolean;
}) {
  return (
    <div
      className={`px-5 py-4 rounded-2xl font-semibold transition ${
        active
          ? "bg-[#005BFF] text-white"
          : "bg-[#0B1730] text-[#B6C2D1]"
      }`}
    >
      {title}
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-6">
      <p className="text-[#B6C2D1] mb-3">{title}</p>
      <h3 className="text-4xl font-bold">{value}</h3>
    </div>
  );
}

function DashboardPanel({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8">
      <div className="w-14 h-14 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/30 mb-6" />

      <h3 className="text-2xl font-bold mb-4">{title}</h3>

      <p className="text-[#B6C2D1] leading-8">{text}</p>
    </div>
  );
}

function DeliveryRow({
  ticket,
  customer,
  status,
}: {
  ticket: string;
  customer: string;
  status: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#020817] border border-[#12315F] rounded-2xl px-6 py-5">
      <div>
        <h4 className="font-bold">{ticket}</h4>
        <p className="text-[#B6C2D1]">{customer}</p>
      </div>

      <span className="text-[#005BFF] font-semibold">{status}</span>
    </div>
  );
}

function Prompt({ text }: { text: string }) {
  return (
    <div className="bg-[#020817] border border-[#12315F] rounded-2xl p-5 text-[#B6C2D1]">
      {text}
    </div>
  );
}