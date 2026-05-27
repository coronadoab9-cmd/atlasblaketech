import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type DispatchLoad = {
  id: string;
  order_number: string;
  customer_name: string;
  job_number: string;
  plant: string;
  truck_number: string;
  driver_name: string;
  mix: string;
  quantity: number;
  status: string;
  scheduled_time: string;
};

const loads: DispatchLoad[] = [
  {
    id: "load-1001",
    order_number: "ORD-2048",
    customer_name: "Customer Site",
    job_number: "JOB-1048",
    plant: "BTS-01A",
    truck_number: "BTS-01A",
    driver_name: "Driver Assigned",
    mix: "3000 PSI",
    quantity: 10,
    status: "En Route",
    scheduled_time: "8:15 AM",
  },
  {
    id: "load-1002",
    order_number: "ORD-2051",
    customer_name: "Commercial Pour",
    job_number: "JOB-1051",
    plant: "BTS-002",
    truck_number: "BTS-002",
    driver_name: "Driver Assigned",
    mix: "3500 PSI",
    quantity: 9,
    status: "Loading",
    scheduled_time: "9:05 AM",
  },
  {
    id: "load-1003",
    order_number: "ORD-2054",
    customer_name: "Project Location",
    job_number: "JOB-1054",
    plant: "BTS-003",
    truck_number: "BTS-003",
    driver_name: "Driver Assigned",
    mix: "4000 PSI",
    quantity: 11,
    status: "On Site",
    scheduled_time: "10:20 AM",
  },
];

export default function DispatchDashboardPage() {
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
              This page is the start of the AtlasBlake dispatch module. It will
              eventually connect customer orders, plant activity, truck
              assignments, live GPS, and eTicket creation into one operational
              command center.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard label="Scheduled Loads" value="12" />
            <StatCard label="Dispatched" value="7" />
            <StatCard label="On Site" value="3" />
            <StatCard label="Needs Attention" value="1" warning />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">Today’s Dispatch Board</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Future connection: orders → truck assignment → GPS movement →
                    eTicket creation.
                  </p>
                </div>

                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                  Mock Data
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <div className="grid grid-cols-8 bg-[#0B1730] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Time</span>
                  <span>Order</span>
                  <span>Customer</span>
                  <span>Job</span>
                  <span>Truck</span>
                  <span>Mix</span>
                  <span>Qty</span>
                  <span>Status</span>
                </div>

                {loads.map((load) => (
                  <div
                    key={load.id}
                    className="grid grid-cols-8 border-t border-slate-800 px-4 py-4 text-sm"
                  >
                    <span className="font-bold text-white">
                      {load.scheduled_time}
                    </span>
                    <span className="text-slate-300">{load.order_number}</span>
                    <span className="text-slate-300">{load.customer_name}</span>
                    <span className="text-slate-300">{load.job_number}</span>
                    <span className="text-slate-300">{load.truck_number}</span>
                    <span className="text-slate-300">{load.mix}</span>
                    <span className="text-slate-300">{load.quantity}</span>
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
                This panel will eventually detect dispatch issues before they
                become bigger problems.
              </p>

              <div className="mt-6 space-y-4">
                <InsightCard
                  title="Truck assignment check"
                  text="One scheduled load has no confirmed truck assignment."
                />
                <InsightCard
                  title="Ticket readiness"
                  text="Create eTickets automatically when a load is dispatched."
                />
                <InsightCard
                  title="Plant activity"
                  text="Compare scheduled load times against real GPS and ticket events."
                />
              </div>
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Why this page matters</h2>

            <p className="mt-4 max-w-4xl text-slate-300">
              Dispatch is the center of the system. Once this connects to the
              backend, it can create eTickets, track trucks, monitor job progress,
              and power AI alerts from one place.
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