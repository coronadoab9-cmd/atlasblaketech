import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { mockFleetStats, mockTrucks } from "../../data/mock-platform";

export default function FleetDashboardPage() {
  const stats = mockFleetStats;
  const trucks = mockTrucks;

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
              AtlasBlake Fleet Command
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Live fleet visibility built from your BTC foundation.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              This page is the beginning of the AtlasBlake fleet dashboard. It
              will eventually connect to the same GPS, truck, driver, and eTicket
              data already running inside your BTC system.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-5">
            <StatCard label="Active Trucks" value={stats.active_trucks} />
            <StatCard label="Active Loads" value={stats.active_loads} />
            <StatCard label="En Route" value={stats.en_route} />
            <StatCard label="Pouring" value={stats.pouring} />
            <StatCard label="Exceptions" value={stats.exceptions} warning />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">Live Truck Board</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Future connection: Android tablet GPS → backend API → this
                    dashboard.
                  </p>
                </div>

                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                  Shared Mock Data
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <div className="grid grid-cols-6 bg-[#0B1730] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Truck</span>
                  <span>Driver</span>
                  <span>Status</span>
                  <span>Job</span>
                  <span>Speed</span>
                  <span>Updated</span>
                </div>

                {trucks.map((truck) => (
                  <div
                    key={truck.truck_number}
                    className="grid grid-cols-6 border-t border-slate-800 px-4 py-4 text-sm"
                  >
                    <span className="font-bold text-white">
                      {truck.truck_number}
                    </span>
                    <span className="text-slate-300">{truck.driver_name}</span>
                    <span>
                      <StatusBadge status={truck.status} />
                    </span>
                    <span className="text-slate-300">{truck.job_number}</span>
                    <span className="text-slate-300">
                      {truck.speed_mph ?? 0} mph
                    </span>
                    <span className="text-slate-400">{truck.last_updated}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <h2 className="text-2xl font-bold">Future AI Operations Panel</h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                This is where AtlasBlake will turn fleet and ticket data into
                alerts, summaries, and recommendations.
              </p>

              <div className="mt-6 space-y-4">
                <InsightCard
                  title="Possible late delivery"
                  text="Truck BTS-003 has been on site longer than expected."
                />
                <InsightCard
                  title="Missing ticket signature"
                  text="One active load has GPS activity but no completed eTicket."
                />
                <InsightCard
                  title="Daily dispatch summary"
                  text="Generate a simple report for active trucks, loads, and exceptions."
                />
              </div>
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Why this page matters</h2>

            <p className="mt-4 max-w-4xl text-slate-300">
              Your Android app already sends truck GPS data to the backend. This
              fleet dashboard is where we will display that information inside
              the AtlasBlake platform, then connect it to eTickets, dispatch,
              reports, and AI automation.
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