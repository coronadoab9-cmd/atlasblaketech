import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  mockAIInsights,
  mockAlerts,
  mockCompany,
  mockETickets,
  mockModules,
  mockRecentActivity,
  mockTrucks,
} from "../data/mock-platform";

export default function DashboardPage() {
  const pendingTickets = mockETickets.filter(
    (ticket) => ticket.status === "pending"
  ).length;

  const activeTrucks = mockTrucks.length;
  const moduleCount = mockModules.length;
  const alertCount = mockAlerts.length;
  const aiInsightCount = mockAIInsights.length;

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
              AtlasBlake Command Center
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              One operational home for dispatch, fleet, eTickets, reports, and AI.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              This dashboard is now reading from the shared AtlasBlake platform
              data layer. BTC is the first company workspace, and future
              customers can use the same core system with separate data, users,
              trucks, tickets, and modules.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <MetricCard
              label="Company"
              value={mockCompany.name}
              subtext="First workspace"
            />
            <MetricCard
              label="Modules"
              value={moduleCount.toString()}
              subtext="Purchased platform modules"
            />
            <MetricCard
              label="Active Trucks"
              value={activeTrucks.toString()}
              subtext="Fleet data source"
            />
            <MetricCard
              label="Pending Tickets"
              value={pendingTickets.toString()}
              subtext="Needs signature"
              warning
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ModuleCard
              title="Fleet Command"
              description="Live trucks, GPS tracking, driver sessions, job status, and dispatch visibility."
              href="/dashboard/fleet"
              status="Started"
            />

            <ModuleCard
              title="eTicket Command"
              description="Ticket creation, customer signatures, rejection reasons, signed PDFs, QR links, and archive workflows."
              href="/dashboard/etickets"
              status="Started"
            />

            <ModuleCard
              title="Dispatch Center"
              description="Orders, loads, assignments, delivery progress, plant activity, and dispatch visibility."
              href="/dashboard/dispatch"
              status="Started"
            />

            <ModuleCard
              title="Reports"
              description="Daily summaries, ticket exports, fleet performance, customer history, and operational records."
              href="/dashboard/reports"
              status="Started"
            />

            <ModuleCard
              title="AI Operations"
              description="Exception detection, missing ticket alerts, late delivery insights, and automatic daily summaries."
              href="/dashboard/ai"
              status="Started"
            />

            <ModuleCard
              title="Company Admin"
              description="Company users, drivers, devices, trucks, module access, settings, and customer workspace controls."
              href="/dashboard/admin"
              status="Started"
            />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">Platform Alerts</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Shared alerts across fleet, eTickets, dispatch, and reports.
                  </p>
                </div>

                <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                  {alertCount} alerts
                </span>
              </div>

              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    title={alert.title}
                    message={alert.message}
                    module={alert.module || "platform"}
                    severity={alert.severity}
                    createdAt={alert.created_at || "-"}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">Recent Activity</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    A simple timeline of operational movement.
                  </p>
                </div>

                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                  Shared data
                </span>
              </div>

              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    title={activity.title}
                    description={activity.description || ""}
                    module={activity.module || "platform"}
                    actor={activity.actor_name || "System"}
                    createdAt={activity.created_at || "-"}
                  />
                ))}
              </div>
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-[#12315F] bg-[#071225] p-8 shadow-2xl shadow-blue-950/20">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
                  Platform Direction
                </p>

                <h2 className="text-3xl font-bold">
                  BTC becomes the first real company workspace.
                </h2>

                <p className="mt-4 leading-7 text-slate-300">
                  Your existing BTC backend, frontend, Android tablet app, GPS
                  tracking, and eTicket workflow become the foundation.
                  AtlasBlake turns that into a repeatable system that can serve
                  multiple companies.
                </p>

                <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                    AI Signal
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {aiInsightCount} AI insights are available from the shared
                    data layer.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-6">
                <h3 className="text-xl font-bold">Future Workspace Model</h3>

                <div className="mt-5 space-y-4">
                  <WorkspaceRow
                    company={mockCompany.name}
                    modules={mockModules.join(", ").replaceAll("_", " ")}
                    status="First Workspace"
                  />
                  <WorkspaceRow
                    company="Future Customer A"
                    modules="Purchased modules only"
                    status="Future"
                  />
                  <WorkspaceRow
                    company="Future Customer B"
                    modules="Purchased modules only"
                    status="Future"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function MetricCard({
  label,
  value,
  subtext,
  warning = false,
}: {
  label: string;
  value: string;
  subtext: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#12315F] bg-[#071225] p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p
        className={`mt-3 text-2xl font-bold ${
          warning ? "text-amber-300" : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="mt-2 text-xs text-slate-500">{subtext}</p>
    </div>
  );
}

function ModuleCard({
  title,
  description,
  href,
  status,
}: {
  title: string;
  description: string;
  href: string;
  status: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/10 transition hover:-translate-y-1 hover:border-blue-500/60 hover:bg-[#0B1730]"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
          {status}
        </span>
      </div>

      <p className="leading-7 text-slate-400">{description}</p>

      <p className="mt-6 text-sm font-semibold text-blue-300 group-hover:text-blue-200">
        Open module →
      </p>
    </Link>
  );
}

function AlertCard({
  title,
  message,
  module,
  severity,
  createdAt,
}: {
  title: string;
  message: string;
  module: string;
  severity: string;
  createdAt: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
            {module}
          </p>
          <h3 className="mt-2 font-bold text-white">{title}</h3>
        </div>

        <span className="w-fit rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
          {severity}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">{message}</p>
      <p className="mt-3 text-xs text-slate-500">{createdAt}</p>
    </div>
  );
}

function ActivityCard({
  title,
  description,
  module,
  actor,
  createdAt,
}: {
  title: string;
  description: string;
  module: string;
  actor: string;
  createdAt: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
        {module}
      </p>
      <h3 className="mt-2 font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
      <p className="mt-3 text-xs text-slate-500">
        {actor} • {createdAt}
      </p>
    </div>
  );
}

function WorkspaceRow({
  company,
  modules,
  status,
}: {
  company: string;
  modules: string;
  status: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#071225] p-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="font-bold text-white">{company}</p>
          <p className="mt-1 text-sm capitalize text-slate-400">{modules}</p>
        </div>

        <span className="w-fit rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
          {status}
        </span>
      </div>
    </div>
  );
}