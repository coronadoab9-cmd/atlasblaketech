import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardPage() {
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
              This dashboard is the future home of the AtlasBlake customer portal.
              BTC will become the first working company workspace, then future
              customers can use the same core system with their own data, users,
              trucks, tickets, and modules.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <MetricCard label="Companies" value="1" subtext="BTC first workspace" />
            <MetricCard label="Modules" value="4" subtext="Fleet, eTickets, reports, AI" />
            <MetricCard label="Status" value="Build" subtext="Platform foundation" />
            <MetricCard label="Mode" value="Mock" subtext="Backend connection next" />
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
              href="/dashboard"
              status="Planned"
            />

            <ModuleCard
              title="AI Operations"
              description="Exception detection, missing ticket alerts, late delivery insights, and automatic daily summaries."
              href="/ai-automation"
              status="Planned"
            />

            <ModuleCard
              title="Company Admin"
              description="Company users, drivers, devices, trucks, module access, settings, and customer workspace controls."
              href="/dashboard"
              status="Planned"
            />
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
                  tracking, and eTicket workflow become the foundation. AtlasBlake
                  turns that into a repeatable system that can serve multiple
                  companies.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-6">
                <h3 className="text-xl font-bold">Future Workspace Model</h3>

                <div className="mt-5 space-y-4">
                  <WorkspaceRow
                    company="Big Town Concrete"
                    modules="Fleet, eTickets, GPS, Reports"
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
}: {
  label: string;
  value: string;
  subtext: string;
}) {
  return (
    <div className="rounded-2xl border border-[#12315F] bg-[#071225] p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
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
          <p className="mt-1 text-sm text-slate-400">{modules}</p>
        </div>

        <span className="w-fit rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
          {status}
        </span>
      </div>
    </div>
  );
}