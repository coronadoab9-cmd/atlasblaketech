import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getDispatchLoads, getDispatchStats } from "../../lib/platform-api";

export default async function DispatchDashboardPage() {
  const [loads, stats] = await Promise.all([
    getDispatchLoads(),
    getDispatchStats(),
  ]);

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
              AtlasBlake Dispatch Center
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Dispatch, loads, trucks, tickets, and delivery movement in one view.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              This page now reads through the AtlasBlake platform API layer.
              For now, it still uses mock data behind the scenes. Later, this
              same page can switch to live orders, loads, trucks, plants, drivers,
              and eTickets.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard label="Scheduled Loads" value={stats.scheduled_loads} />
            <StatCard label="Dispatched" value={stats.dispatched} />
            <StatCard label="On Site" value={stats.on_site} />
            <StatCard
              label="Needs Attention"
              value={stats.needs_attention}
              warning
            />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">Today’s Dispatch Board</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    API source path: dispatch loads → trucks → eTickets → reports.
                  </p>
                </div>

                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                  API Layer
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <div className="grid grid-cols-9 bg-[#0B1730] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Time</span>
                  <span>Order</span>
                  <span>Customer</span>
                  <span>Job</span>
                  <span>Truck</span>
                  <span>Mix</span>
                  <span>Qty</span>
                  <span>Ticket</span>
                  <span>Status</span>
                </div>

                {loads.map((load) => (
                  <div
                    key={load.id}
                    className="grid grid-cols-9 border-t border-slate-800 px-4 py-4 text-sm"
                  >
                    <span className="font-bold text-white">
                      {load.scheduled_time}
                    </span>

                    <span className="text-slate-300">
                      {load.order_number}
                    </span>

                    <span className="text-slate-300">
                      {load.customer_name}
                    </span>

                    <span className="text-slate-300">{load.job_number}</span>

                    <span className="text-slate-300">
                      {load.truck_number}
                    </span>

                    <span className="text-slate-300">{load.mix}</span>

                    <span className="text-slate-300">{load.quantity}</span>

                    <span className="text-blue-300">
                      #{load.ticket_number || "-"}
                    </span>

                    <span>
                      <StatusBadge status={load.status} />
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <h2 className="text-2xl font-bold">Dispatch Intelligence</h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                This panel will eventually detect dispatch problems before they
                become bigger issues.
              </p>

              <div className="mt-6 space-y-4">
                <InsightCard
                  title="Truck assignment check"
                  text={`${loads.length} active load${
                    loads.length === 1 ? " is" : "s are"
                  } visible through the API layer.`}
                />

                <InsightCard
                  title="Ticket readiness"
                  text="Dispatch loads can connect directly to customer-facing eTicket tokens."
                />

                <InsightCard
                  title="Plant activity"
                  text="Compare scheduled load times against real GPS, ticket events, and driver activity."
                />
              </div>
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Why this page matters</h2>

            <p className="mt-4 max-w-4xl text-slate-300">
              Dispatch is the center of the system. Now this page is connected
              through the same API layer as the command center, fleet, and
              eTicket pages.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StatCard({
  label,
  value,
  warning = false,
}: {
  label: string;
  value: string | number;
  warning?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#12315F] bg-[#071225] p-5">
      <p className="text-sm text-slate-400">{label}</p>

      <p
        className={`mt-3 text-3xl font-bold ${
          warning ? "text-amber-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
      {status}
    </span>
  );
}

function InsightCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-4">
      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}