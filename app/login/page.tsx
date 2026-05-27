import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#005BFF] font-semibold mb-4">
              Client Portal
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Company access for purchased software modules.
            </h1>

            <p className="text-[#B6C2D1] text-xl leading-9 mb-10">
              The AtlasBlake Technologies portal will allow each customer to log
              in to their own company workspace and access the modules they have
              purchased.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              <PortalFeature title="Company Workspaces" />
              <PortalFeature title="User Roles" />
              <PortalFeature title="Purchased Modules" />
              <PortalFeature title="Secure Access" />
            </div>
          </div>

          <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-10 shadow-[0_0_60px_rgba(0,91,255,0.10)]">
            <p className="text-[#005BFF] font-semibold mb-4">
              Portal Login
            </p>

            <h2 className="text-4xl font-bold mb-6">
              Sign in to your company account
            </h2>

            <p className="text-[#B6C2D1] leading-8 mb-8">
              Login access is coming soon. Future customers will use this portal
              to manage dispatch, eTickets, reporting, customer data, and
              operational workflows.
            </p>

            <form className="space-y-5">
              <input
                type="email"
                placeholder="Work email"
                className="w-full bg-[#020817] border border-[#12315F] rounded-2xl px-5 py-4 outline-none focus:border-[#005BFF]"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#020817] border border-[#12315F] rounded-2xl px-5 py-4 outline-none focus:border-[#005BFF]"
              />

              <button
                type="button"
                className="w-full bg-[#005BFF] hover:bg-[#0047cc] transition py-5 rounded-2xl font-bold shadow-[0_0_35px_rgba(0,91,255,0.35)]"
              >
                Login Coming Soon →
              </button>
            </form>

            <div className="mt-8 border-t border-[#12315F] pt-6">
              <p className="text-[#B6C2D1] text-sm">
                Future portal access will be based on company account,
                subscription plan, user role, and purchased modules.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[#005BFF] font-semibold mb-4">
              Future Access Model
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Each company gets its own connected software environment.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              Customers will only see the data, tools, and modules connected to
              their company account.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AccessCard
              title="Dispatch Module"
              text="Manage active jobs, assignments, delivery progress, and daily dispatch activity."
            />

            <AccessCard
              title="eTicket Module"
              text="Create, store, and manage digital tickets with delivery and load information."
            />

            <AccessCard
              title="Reporting Module"
              text="View completed loads, ticket history, operational metrics, and customer reports."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PortalFeature({ title }: { title: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-2xl p-5">
      <div className="w-8 h-8 rounded-lg bg-[#005BFF] mb-4" />
      <p className="font-semibold">{title}</p>
    </div>
  );
}

function AccessCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-[#B6C2D1] leading-8">{text}</p>
    </div>
  );
}