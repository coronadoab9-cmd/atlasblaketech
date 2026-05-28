import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PLATFORM_API_CONTRACT } from "../../lib/platform-api-contract";

export default function DeveloperDashboardPage() {
  const groups = Array.from(
    new Set(PLATFORM_API_CONTRACT.map((endpoint) => endpoint.group))
  );

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
              AtlasBlake Developer Center
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Backend API contract for the AtlasBlake platform.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              This page lists every backend route the current AtlasBlake
              dashboard expects. It gives us a clean checklist for connecting the
              existing BTC backend to the new Next.js platform.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard
              label="Total Endpoints"
              value={PLATFORM_API_CONTRACT.length}
            />

            <StatCard label="API Groups" value={groups.length} />

            <StatCard label="Method" value="GET" />

            <StatCard label="Mode" value="Contract" />
          </div>

          <div className="mt-10 space-y-8">
            {groups.map((group) => {
              const endpoints = PLATFORM_API_CONTRACT.filter(
                (endpoint) => endpoint.group === group
              );

              return (
                <section
                  key={group}
                  className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20"
                >
                  <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <h2 className="text-2xl font-bold">{group}</h2>

                      <p className="mt-2 text-sm text-slate-400">
                        {endpoints.length} endpoint
                        {endpoints.length === 1 ? "" : "s"} required by this
                        platform area.
                      </p>
                    </div>

                    <span className="w-fit rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                      API Contract
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-800">
                    <div className="grid grid-cols-[0.6fr_1.3fr_2fr_1.5fr] bg-[#0B1730] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <span>Method</span>
                      <span>Path</span>
                      <span>Description</span>
                      <span>Used By</span>
                    </div>

                    {endpoints.map((endpoint) => (
                      <div
                        key={`${endpoint.method}-${endpoint.path}`}
                        className="grid grid-cols-[0.6fr_1.3fr_2fr_1.5fr] border-t border-slate-800 px-4 py-4 text-sm"
                      >
                        <span>
                          <MethodBadge method={endpoint.method} />
                        </span>

                        <code className="break-all rounded-xl border border-slate-800 bg-[#020817] px-3 py-2 text-xs text-blue-300">
                          {endpoint.path}
                        </code>

                        <span className="leading-6 text-slate-300">
                          {endpoint.description}
                        </span>

                        <div className="flex flex-wrap gap-2">
                          {endpoint.usedBy.map((route) => (
                            <span
                              key={route}
                              className="rounded-full border border-slate-700 bg-[#020817] px-3 py-1 text-xs text-slate-300"
                            >
                              {route}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <section className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Why this page matters</h2>

            <p className="mt-4 max-w-4xl text-slate-300">
              This gives AtlasBlake Technologies a clean bridge between the
              frontend dashboard and the backend. The current pages can keep
              using mock data, while the backend can be built route by route
              until the platform is ready to switch to live mode.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-[#12315F] bg-[#071225] p-5">
      <p className="text-sm text-slate-400">{label}</p>

      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  return (
    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
      {method}
    </span>
  );
}