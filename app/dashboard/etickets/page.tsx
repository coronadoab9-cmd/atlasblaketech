import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { mockETickets } from "../../data/mock-platform";

export default function ETicketsDashboardPage() {
  const tickets = mockETickets;

  const pendingCount = tickets.filter(
    (ticket) => ticket.status === "pending"
  ).length;

  const signedCount = tickets.filter(
    (ticket) => ticket.status === "signed"
  ).length;

  const rejectedCount = tickets.filter(
    (ticket) => ticket.status === "rejected"
  ).length;

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
              AtlasBlake eTicket Command
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Digital ticket visibility built from your BTC eTicket system.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              This page is the beginning of the AtlasBlake eTicket dashboard. It
              will eventually connect to the ticket creation, signing, PDF, QR,
              GPS, and camera workflows already created in your BTC platform.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard label="Total Tickets" value={tickets.length} />
            <StatCard label="Pending Signature" value={pendingCount} warning />
            <StatCard label="Signed Tickets" value={signedCount} />
            <StatCard label="Rejected Tickets" value={rejectedCount} danger />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">Ticket Board</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Future connection: backend eTickets → signed PDFs → customer
                    delivery records.
                  </p>
                </div>

                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                  Shared Mock Data
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <div className="grid grid-cols-7 bg-[#0B1730] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Ticket</span>
                  <span>Customer</span>
                  <span>Truck</span>
                  <span>Job</span>
                  <span>Mix</span>
                  <span>Qty</span>
                  <span>Status</span>
                </div>

                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="grid grid-cols-7 border-t border-slate-800 px-4 py-4 text-sm"
                  >
                    <span className="font-bold text-white">
                      #{ticket.ticket_number}
                    </span>
                    <span className="text-slate-300">
                      {ticket.customer_name}
                    </span>
                    <span className="text-slate-300">
                      {ticket.truck_number}
                    </span>
                    <span className="text-slate-300">
                      {ticket.job_number}
                    </span>
                    <span className="text-slate-300">
                      {ticket.mix_number}
                    </span>
                    <span className="text-slate-300">
                      {ticket.quantity}
                    </span>
                    <span>
                      <StatusBadge status={ticket.status} />
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <h2 className="text-2xl font-bold">Ticket Intelligence</h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                This panel will eventually show missing signatures, rejected
                deliveries, water added exceptions, GPS/photo issues, and daily
                ticket summaries.
              </p>

              <div className="mt-6 space-y-4">
                <InsightCard
                  title="Pending signature"
                  text="Ticket #1001 is still waiting for customer acceptance."
                />
                <InsightCard
                  title="Rejected delivery"
                  text="Ticket #1003 was rejected with reason: Slump."
                />
                <InsightCard
                  title="PDF workflow"
                  text="Signed tickets will generate customer-facing PDF delivery records."
                />
              </div>
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Why this page matters</h2>

            <p className="mt-4 max-w-4xl text-slate-300">
              Your BTC system already has eTicket signing, GPS capture, photo
              capture, QR links, and PDF generation. This AtlasBlake page will
              become the control center where office users manage those tickets
              across BTC and future customer companies.
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
          warning
            ? "text-amber-300"
            : danger
              ? "text-red-300"
              : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    pending: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    signed: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    rejected: "border-red-500/40 bg-red-500/10 text-red-300",
    archived: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        statusStyles[status] ||
        "border-blue-500/40 bg-blue-500/10 text-blue-300"
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