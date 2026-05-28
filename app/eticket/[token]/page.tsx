import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { buildEticketPdfUrl } from "../../lib/api";
import { mockETickets } from "../../data/mock-platform";
import type { ETicket } from "../../types/eticket";

type PageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function PublicETicketPage({ params }: PageProps) {
  const { token } = await params;

  const ticket =
    mockETickets.find((item) => item.token === token) || createFallbackTicket(token);

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
              AtlasBlake Digital eTicket
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Customer delivery confirmation.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              This public eTicket route is now reading from the shared AtlasBlake
              platform data layer. Later, this same page will pull real ticket
              records from the backend.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    Ticket #{ticket.ticket_number}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Token: {ticket.token}
                  </p>
                </div>

                <StatusBadge status={ticket.status} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <InfoCard label="Customer" value={ticket.customer_name} />
                <InfoCard label="Job Number" value={ticket.job_number || "-"} />
                <InfoCard label="Truck" value={ticket.truck_number} />
                <InfoCard label="Driver" value={ticket.driver_name || "-"} />
                <InfoCard label="Mix Number" value={ticket.mix_number || "-"} />
                <InfoCard
                  label="Mix Description"
                  value={ticket.mix_description || "-"}
                />
                <InfoCard
                  label="Quantity"
                  value={`${ticket.quantity || 0} yd³`}
                />
                <InfoCard label="Load Time" value={ticket.load_time || "-"} />
              </div>

              <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
                <h3 className="font-bold text-white">Water Added</h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Future workflow: the customer and driver will be able to review
                  water added, QC water, and customer water added before signing.
                </p>

                <p className="mt-3 text-sm text-blue-300">
                  Water allowed: {ticket.water_allowed ?? 0} gallons per yard
                </p>
              </div>

              {ticket.rejection_reason && (
                <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
                  <h3 className="font-bold text-red-200">Rejection Reason</h3>
                  <p className="mt-2 text-sm text-red-100">
                    {ticket.rejection_reason}
                  </p>
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <h2 className="text-2xl font-bold">Signature Workflow</h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                This placeholder will become the full customer signing screen
                from your BTC system, rebranded and upgraded for AtlasBlake.
              </p>

              <div className="mt-6 rounded-2xl border border-dashed border-slate-600 bg-[#0B1730] p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Signature Box
                </p>
                <p className="mt-4 text-slate-300">
                  Customer signature canvas will go here.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-slate-600 bg-[#0B1730] p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Photo Capture
                </p>
                <p className="mt-4 text-slate-300">
                  Delivery photo/camera capture will go here.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                <button className="rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500">
                  Accept Delivery
                </button>

                <button className="rounded-full border border-red-500/40 bg-red-500/10 px-6 py-4 text-sm font-bold text-red-300 transition hover:bg-red-500/20">
                  Reject Delivery
                </button>
              </div>

              <a
                href={buildEticketPdfUrl(ticket.token)}
                className="mt-5 block text-center text-sm font-semibold text-blue-300 hover:text-blue-200"
              >
                View future signed PDF link
              </a>
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Why this page matters</h2>

            <p className="mt-4 max-w-4xl text-slate-300">
              The dashboard and public eTicket page now share the same ticket
              source. This is the same pattern we will use when we replace mock
              data with real backend API data.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function createFallbackTicket(token: string): ETicket {
  return {
    id: 0,
    token,
    ticket_number: "Unknown",
    customer_name: "Ticket Not Found",
    job_number: "-",
    truck_number: "-",
    driver_name: "-",
    mix_number: "-",
    mix_description: "-",
    quantity: 0,
    status: "pending",
    load_time: "-",
    water_allowed: 0,
  };
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-bold text-white">{value}</p>
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
      className={`rounded-full border px-4 py-2 text-sm font-semibold ${
        statusStyles[status] ||
        "border-blue-500/40 bg-blue-500/10 text-blue-300"
      }`}
    >
      {status}
    </span>
  );
}