import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type ReportRow = {
  id: string;
  report_name: string;
  module: string;
  period: string;
  status: string;
  last_generated: string;
};

const reports: ReportRow[] = [
  {
    id: "report-001",
    report_name: "Daily Dispatch Summary",
    module: "Dispatch",
    period: "Today",
    status: "Ready",
    last_generated: "Today, 4:15 PM",
  },
  {
    id: "report-002",
    report_name: "Signed eTicket Export",
    module: "eTickets",
    period: "Today",
    status: "Ready",
    last_generated: "Today, 4:10 PM",
  },
  {
    id: "report-003",
    report_name: "Fleet Activity Summary",
    module: "Fleet",
    period: "Today",
    status: "Processing",
    last_generated: "Today, 3:55 PM",
  },
  {
    id: "report-004",
    report_name: "Rejected Delivery Exceptions",
    module: "eTickets",
    period: "This Week",
    status: "Needs Review",
    last_generated: "Today, 2:40 PM",
  },
];

export default function ReportsDashboardPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
              AtlasBlake Reports Center
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Turn dispatch, fleet, and eTicket activity into clean operational reports.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              This page is the start of the AtlasBlake reporting module. It will
              eventually generate daily summaries, ticket exports, fleet activity,
              exception reports, and customer delivery records.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard label="Reports Today" value="4" />
            <StatCard label="Ready" value="2" />
            <StatCard label="Processing" value="1" />
            <StatCard label="Needs Review" value="1" warning />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">Report Library</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Future connection: signed tickets, GPS history, dispatch
                    loads, customer activity, and AI-generated summaries.
                  </p>
                </div>

                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                  Mock Data
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <div className="grid grid-cols-5 bg-[#0B1730] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Report</span>
                  <span>Module</span>
                  <span>Period</span>
                  <span>Status</span>
                  <span>Generated</span>
                </div>

                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="grid grid-cols-5 border-t border-slate-800 px-4 py-4 text-sm"
                  >
                    <span className="font-bold text-white">
                      {report.report_name}
                    </span>
                    <span className="text-slate-300">{report.module}</span>
                    <span className="text-slate-300">{report.period}</span>
                    <span>
                      <StatusBadge status={report.status} />
                    </span>
                    <span className="text-slate-400">
                      {report.last_generated}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <h2 className="text-2xl font-bold">AI Report Assistant</h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                This panel will eventually generate plain-English summaries from
                operational data.
              </p>

              <div className="mt-6 space-y-4">
                <InsightCard
                  title="Daily summary"
                  text="Summarize loads dispatched, tickets signed, rejected deliveries, and active trucks."
                />
                <InsightCard
                  title="Exception report"
                  text="Highlight missing signatures, rejected loads, water added issues, and delayed deliveries."
                />
                <InsightCard
                  title="Customer history"
                  text="Generate customer-specific delivery records and signed ticket history."
                />
              </div>
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Why this page matters</h2>

            <p className="mt-4 max-w-4xl text-slate-300">
              Reports are where the platform becomes valuable to owners,
              managers, dispatchers, accounting, and customers. Once connected,
              AtlasBlake can turn daily work into records, exports, summaries,
              and AI-driven operational insights.
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
  const styles: Record<string, string> = {
    Ready: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    Processing: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    "Needs Review": "border-amber-500/40 bg-amber-500/10 text-amber-300",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] || "border-slate-500/40 bg-slate-500/10 text-slate-300"
      }`}
    >
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