import { buildEticketPdfUrl } from "../../lib/api";
import { getETicketByToken } from "../../lib/platform-api";
import type { ETicket } from "../../types/eticket";

type PageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function PublicETicketPage({ params }: PageProps) {
  const { token } = await params;

  const ticket = await getETicketByToken(token);

  if (!ticket) {
    return (
      <main className="min-h-screen bg-[#020817] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-500/30 bg-red-500/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-300">
            Ticket Not Found
          </p>

          <h1 className="mt-4 text-4xl font-bold">Invalid eTicket link</h1>

          <p className="mt-4 leading-7 text-slate-300">
            This ticket token could not be found. Please contact the dispatcher
            or office that sent you this link.
          </p>
        </div>
      </main>
    );
  }

  const pdfUrl = buildEticketPdfUrl(ticket.token);

  return (
    <main className="min-h-screen bg-[#020817] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20 md:p-8">
          <div className="flex flex-col justify-between gap-5 border-b border-slate-800 pb-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
                AtlasBlake eTicket
              </p>

              <h1 className="mt-4 text-4xl font-bold">
                Ticket #{ticket.ticket_number}
              </h1>

              <p className="mt-3 text-slate-400">
                Customer-facing delivery ticket powered by AtlasBlake Technologies.
              </p>
            </div>

            <StatusBadge status={ticket.status} />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoPanel title="Customer">
              <InfoRow label="Customer" value={ticket.customer_name} />
              <InfoRow label="Email" value={ticket.customer_email || "-"} />
              <InfoRow label="Job Number" value={ticket.job_number || "-"} />
              <InfoRow label="Order Number" value={ticket.order_number || "-"} />
              <InfoRow label="Address" value={ticket.address || "-"} />
            </InfoPanel>

            <InfoPanel title="Delivery">
              <InfoRow label="Truck" value={ticket.truck_number} />
              <InfoRow label="Driver" value={ticket.driver_name || "-"} />
              <InfoRow label="Plant" value={ticket.plant || "-"} />
              <InfoRow label="Load Time" value={ticket.load_time || "-"} />
              <InfoRow label="Signed At" value={ticket.signed_at || "-"} />
            </InfoPanel>

            <InfoPanel title="Material">
              <InfoRow label="Product" value={ticket.product || "-"} />
              <InfoRow label="Mix Number" value={ticket.mix_number || "-"} />
              <InfoRow
                label="Mix Description"
                value={ticket.mix_description || "-"}
              />
              <InfoRow
                label="Quantity"
                value={
                  typeof ticket.quantity === "number"
                    ? `${ticket.quantity}`
                    : "-"
                }
              />
              <InfoRow
                label="Order Total"
                value={
                  typeof ticket.order_total === "number"
                    ? `${ticket.order_total}`
                    : "-"
                }
              />
            </InfoPanel>

            <InfoPanel title="Acceptance">
              <InfoRow
                label="Ticket Acceptance"
                value={ticket.ticket_acceptance || "-"}
              />
              <InfoRow
                label="Rejection Reason"
                value={ticket.rejection_reason || "-"}
              />
              <InfoRow
                label="Water Allowed"
                value={
                  typeof ticket.water_allowed === "number"
                    ? `${ticket.water_allowed}`
                    : "-"
                }
              />
              <InfoRow
                label="QC Water Added"
                value={
                  typeof ticket.qc_water_added === "number"
                    ? `${ticket.qc_water_added}`
                    : "-"
                }
              />
              <InfoRow
                label="Customer Water Added"
                value={
                  typeof ticket.customer_water_added === "number"
                    ? `${ticket.customer_water_added}`
                    : "-"
                }
              />
            </InfoPanel>
          </div>

          <section className="mt-8 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6">
            <h2 className="text-2xl font-bold">Customer Action Area</h2>

            <p className="mt-3 leading-7 text-slate-300">
              This public page now reads through the AtlasBlake platform API
              layer. For now, it still uses mock tickets behind the scenes.
              Later, this is where customers will review delivery details, sign
              tickets, accept or reject deliveries, add water notes, capture GPS,
              and generate final PDFs.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={pdfUrl}
                className="rounded-full bg-[#005BFF] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-500"
              >
                View PDF
              </a>

              <button className="rounded-full border border-blue-500/50 px-5 py-3 text-sm font-bold text-blue-200">
                Signature Workflow Coming Soon
              </button>
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-[#12315F] bg-[#0B1730] p-6">
            <h2 className="text-2xl font-bold">System Connection</h2>

            <p className="mt-3 leading-7 text-slate-300">
              Token used for this public ticket:
            </p>

            <code className="mt-4 block overflow-x-auto rounded-2xl border border-slate-800 bg-[#020817] p-4 text-sm text-blue-300">
              {ticket.token}
            </code>
          </section>
        </section>
      </div>
    </main>
  );
}

function InfoPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-[#0B1730] p-6">
      <h2 className="text-xl font-bold">{title}</h2>

      <div className="mt-5 space-y-3">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-between gap-1 border-b border-slate-800 pb-3 last:border-b-0 md:flex-row">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="font-semibold text-white md:text-right">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: ETicket["status"] }) {
  const styles: Record<string, string> = {
    pending: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    signed: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    rejected: "border-red-500/40 bg-red-500/10 text-red-300",
    archived: "border-slate-500/40 bg-slate-500/10 text-slate-300",
    completed: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  };

  return (
    <span
      className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold capitalize ${
        styles[status] || "border-blue-500/40 bg-blue-500/10 text-blue-300"
      }`}
    >
      {status}
    </span>
  );
}