import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            About
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Building modern operational software for real-world industries.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies is focused on modernizing dispatch,
            delivery, eTicket, and operational workflows for companies that
            depend on accurate field data and real-time visibility.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-[#005BFF] font-semibold mb-4">
              Our Mission
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-8">
              Replace disconnected operational systems with one connected platform.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              AtlasBlake Technologies is building software that helps
              dispatchers, operations teams, drivers, and management reduce
              manual work, improve visibility, and centralize delivery data.
            </p>
          </div>

          <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-10">
            <p className="text-[#005BFF] font-semibold mb-6">
              Platform Goals
            </p>

            <div className="space-y-5">
              <Goal text="Modern dispatch management" />
              <Goal text="Digital eTicket workflows" />
              <Goal text="Operational reporting dashboards" />
              <Goal text="Real-time delivery visibility" />
              <Goal text="Company-specific software portals" />
              <Goal text="Workflow automation" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[#005BFF] font-semibold mb-4">
              Long-Term Vision
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Multi-company operational software built for scalable growth.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              Future customers will access their own company workspaces,
              purchased modules, dashboards, reporting systems, and operational
              tools through a secure portal environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <VisionCard
              title="Company Workspaces"
              text="Separate operational environments for each customer account."
            />

            <VisionCard
              title="Role-Based Access"
              text="Different permissions for dispatchers, managers, admins, and drivers."
            />

            <VisionCard
              title="Modular Platform"
              text="Customers access only the software modules they purchase."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Goal({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-3 h-3 rounded-full bg-[#005BFF]" />

      <p className="text-[#B6C2D1] text-lg">
        {text}
      </p>
    </div>
  );
}

function VisionCard({
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