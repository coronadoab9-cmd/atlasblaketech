import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type AIInsight = {
  id: string;
  title: string;
  category: string;
  severity: "Info" | "Warning" | "Critical" | "Success";
  summary: string;
  recommended_action: string;
  created_at: string;
};

const insights: AIInsight[] = [
  {
    id: "ai-001",
    title: "Possible late delivery",
    category: "Fleet",
    severity: "Warning",
    summary:
      "Truck BTS-003 has been on site longer than the normal delivery window.",
    recommended_action:
      "Review job status and confirm whether the ticket has been signed.",
    created_at: "2 min ago",
  },
  {
    id: "ai-002",
    title: "Missing customer signature",
    category: "eTickets",
    severity: "Critical",
    summary:
      "Ticket #1001 has GPS activity and delivery progress but no customer signature yet.",
    recommended_action:
      "Notify the driver or dispatcher to complete the customer eTicket workflow.",
    created_at: "5 min ago",
  },
  {
    id: "ai-003",
    title: "Daily dispatch summary ready",
    category: "Reports",
    severity: "Success",
    summary:
      "AtlasBlake can summarize today’s dispatched loads, signed tickets, rejected tickets, and active fleet activity.",
    recommended_action:
      "Generate the daily operations summary for management review.",
    created_at: "Today",
  },
];

const prompts = [
  "Show me all unsigned tickets from today.",
  "Which trucks have been idle too long?",
  "Summarize rejected deliveries this week.",
  "Find loads with missing GPS or photo capture.",
  "Create a daily dispatch report.",
  "Show tickets where water was added.",
];

export default function AIOperationsDashboardPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
              AtlasBlake AI Operations
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              AI-powered visibility for dispatch, fleet, tickets, and reports.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              This page is the future AI command layer for AtlasBlake. It will
              turn real operational data from BTC and future companies into
              alerts, summaries, exception detection, and plain-English answers.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard label="Insights Today" value="3" />
            <StatCard label="Warnings" value="1" warning />
            <StatCard label="Critical" value="1" danger />
            <StatCard label="Reports Ready" value="1" />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Operations Insights</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Future connection: live GPS, eTickets, dispatch loads, driver
                  activity, customer records, and reports.
                </p>
              </div>

              <div className="space-y-4">
                {insights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <h2 className="text-2xl font-bold">Ask AtlasBlake AI</h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                This will eventually become a real assistant where users can ask
                questions about company operations.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0B1730] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Example Prompt
                </p>

                <p className="mt-4 text-lg font-semibold text-white">
                  “Show me every ticket missing a signature today.”
                </p>

                <div className="mt-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
                  <p className="text-sm leading-6 text-slate-300">
                    Future response: AtlasBlake would search today’s eTickets,
                    identify unsigned records, show related trucks, and recommend
                    follow-up actions.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-white">Prompt Library</h3>

                <div className="mt-4 grid gap-3">
                  {prompts.map((prompt) => (
                    <div
                      key={prompt}
                      className="rounded-2xl border border-slate-800 bg-[#0B1730] p-4 text-sm text-slate-300"
                    >
                      {prompt}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Why this page matters</h2>

            <p className="mt-4 max-w-4xl text-slate-300">
              AI is what can make AtlasBlake feel powerful beyond a normal
              dashboard. Instead of only showing data, the platform can explain
              what needs attention, summarize the day, find missing records, and
              help users make faster operational decisions.
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
  danger = false,
}: {
  label: string;
  value: string | number;
  warning?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#12315F] bg-[#071225] p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p
        className={`mt-3 text-3xl font-bold ${
          danger ? "text-red-300" : warning ? "text-amber-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InsightCard({ insight }: { insight: AIInsight }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-5">
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
            {insight.category}
          </p>
          <h3 className="mt-2 text-xl font-bold text-white">{insight.title}</h3>
        </div>

        <SeverityBadge severity={insight.severity} />
      </div>

      <p className="leading-7 text-slate-300">{insight.summary}</p>

      <div className="mt-4 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
          Recommended Action
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {insight.recommended_action}
        </p>
      </div>

      <p className="mt-4 text-xs text-slate-500">{insight.created_at}</p>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: AIInsight["severity"] }) {
  const styles: Record<AIInsight["severity"], string> = {
    Info: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    Warning: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    Critical: "border-red-500/40 bg-red-500/10 text-red-300",
    Success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  };

  return (
    <span
      className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${styles[severity]}`}
    >
      {severity}
    </span>
  );
}