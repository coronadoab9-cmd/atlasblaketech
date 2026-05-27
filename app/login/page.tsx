import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>
            <p className="text-[#005BFF] font-semibold mb-4">
              Client Login
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Secure company access for operational software systems.
            </h1>

            <p className="text-[#B6C2D1] text-xl leading-9 mb-10">
              AtlasBlake Technologies is building a multi-company operational
              software platform where customers can securely access purchased
              modules, dispatch systems, digital tickets, and reporting tools.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">

              <LoginFeature title="Company Workspaces" />

              <LoginFeature title="Role-Based Access" />

              <LoginFeature title="Purchased Modules" />

              <LoginFeature title="Operational Dashboards" />

            </div>
          </div>

          {/* LOGIN CARD */}
          <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-10 shadow-[0_0_60px_rgba(0,91,255,0.12)]">

            <p className="text-[#005BFF] font-semibold mb-4">
              Portal Access
            </p>

            <h2 className="text-4xl font-bold mb-8">
              Sign in to your company portal
            </h2>

            <form className="space-y-6">

              <Input
                type="email"
                placeholder="Work email"
              />

              <Input
                type="password"
                placeholder="Password"
              />

              <button
                type="button"
                className="w-full bg-[#005BFF] hover:bg-[#0047cc] transition py-5 rounded-2xl text-lg font-bold shadow-[0_0_35px_rgba(0,91,255,0.35)]"
              >
                Login Coming Soon →
              </button>

            </form>

            <div className="mt-10 border-t border-[#12315F] pt-6">
              <p className="text-[#B6C2D1] leading-8">
                Future customers will access dispatch systems, eTicket
                workflows, reporting dashboards, operational records,
                and company-specific software environments through this portal.
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-3xl mb-16">
            <p className="text-[#005BFF] font-semibold mb-4">
              Future Access Model
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Built as a scalable multi-company SaaS platform.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              Each company will access only their own operational records,
              dashboards, users, modules, workflows, and reporting systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <AccessCard
              title="Dispatch Module"
              text="Manage active jobs, deliveries, trucks, assignments, and operational movement."
            />

            <AccessCard
              title="eTicket System"
              text="Create and manage digital delivery tickets with operational data and load information."
            />

            <AccessCard
              title="Reporting Dashboard"
              text="Track completed loads, ticket history, operational metrics, and delivery performance."
            />

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

function LoginFeature({
  title,
}: {
  title: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-2xl p-5">
      <div className="w-8 h-8 rounded-lg bg-[#005BFF] mb-4" />

      <p className="font-semibold">
        {title}
      </p>
    </div>
  );
}

function AccessCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8">
      <h3 className="text-2xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-[#B6C2D1] leading-8">
        {text}
      </p>
    </div>
  );
}

function Input({
  type,
  placeholder,
}: {
  type: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-[#020817] border border-[#12315F] rounded-2xl px-5 py-4 outline-none focus:border-[#005BFF] transition"
    />
  );
}