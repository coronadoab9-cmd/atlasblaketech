import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FadeIn from "./components/FadeIn";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC] overflow-hidden">
      <Navbar />

      <FadeIn>
        <section className="relative border-b border-[#12315F] min-h-[780px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(0,91,255,0.28),transparent_38%),linear-gradient(180deg,#020817_0%,#030B1C_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:90px_90px]" />
          <div className="absolute right-0 top-32 w-[55%] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,91,255,0.35),transparent_65%)] blur-2xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[#005BFF] text-lg font-semibold mb-6">
                AtlasBlake Technologies
              </p>

              <h1 className="text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
                Modern Dispatch,
                <br />
                Delivery & eTicket
                <br />
                Operations Software
              </h1>

              <p className="text-[#B6C2D1] text-xl leading-9 max-w-2xl mb-10">
                AtlasBlake Technologies helps concrete, trucking, and
                construction companies modernize dispatch, delivery visibility,
                digital ticket workflows, and operational reporting through one
                connected platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <a
                  href="/demo"
                  className="bg-[#005BFF] hover:bg-[#0047cc] transition px-8 py-5 rounded-xl text-lg font-bold shadow-[0_0_35px_rgba(0,91,255,0.45)]"
                >
                  Book a Demo →
                </a>

                <a
                  href="/product"
                  className="border border-[#005BFF] hover:bg-[#005BFF]/10 transition px-8 py-5 rounded-xl text-lg font-bold bg-[#071225]/70"
                >
                  View Product →
                </a>
              </div>
            </div>

            <div className="relative hidden lg:flex items-center justify-center">
              <div className="absolute w-[520px] h-[520px] rounded-full bg-[#005BFF]/25 blur-[130px]" />

              <div className="relative w-full max-w-xl bg-[#071225]/90 border border-[#12315F] rounded-3xl backdrop-blur-xl shadow-[0_0_80px_rgba(0,91,255,0.18)] overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-[#12315F] bg-[#0B1730]">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <DashboardCard title="Active Loads" value="148" />
                    <DashboardCard title="Fleet Status" value="24" />
                    <DashboardCard title="eTickets" value="1,284" />
                  </div>

                  <div className="bg-[#0B1730] border border-[#12315F] rounded-2xl p-6">
                    <div className="flex justify-between mb-6">
                      <span className="text-[#B6C2D1]">Dispatch Activity</span>
                      <span className="text-[#005BFF]">Live</span>
                    </div>

                    <div className="space-y-4">
                      <Line />
                      <Line width="80%" />
                      <Line width="60%" />
                      <Line width="90%" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <MiniCard title="Load Time" />
                    <MiniCard title="Delivery Data" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="py-24 px-6 bg-[#020817]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Operational Visibility"
              text="Track dispatch activity, ticket workflows, and delivery progress from one connected platform."
            />

            <FeatureCard
              title="Automated eTickets"
              text="Capture load data, mix details, slump, water allowance, timestamps, and customer delivery records."
            />

            <FeatureCard
              title="Real-Time Operations"
              text="Give dispatchers, drivers, and management instant visibility into delivery activity and job progress."
            />
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="py-32 px-6 border-t border-[#12315F] bg-[#030B1C]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-20">
              <p className="text-[#005BFF] font-semibold mb-4">
                Platform Overview
              </p>

              <h2 className="text-5xl font-bold leading-tight mb-6">
                Built for real-world dispatch and delivery operations.
              </h2>

              <p className="text-[#B6C2D1] text-xl leading-9">
                AtlasBlake Technologies centralizes dispatch activity, delivery
                workflows, digital tickets, operational reporting, and load
                tracking into one modern software platform.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <ProductCard
                title="Dispatch Management"
                text="Monitor active jobs, deliveries, drivers, trucks, and scheduling activity in real time."
              />

              <ProductCard
                title="Digital eTickets"
                text="Generate digital delivery tickets with load details, timestamps, mix data, customer information, and delivery records."
              />

              <ProductCard
                title="Operational Reporting"
                text="Track delivery progress, load counts, completed jobs, ticket history, and operational performance metrics."
              />

              <ProductCard
                title="Fleet Visibility"
                text="View truck activity, delivery status, dispatch assignments, and operational movement from one connected dashboard."
              />
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="py-32 px-6 border-t border-[#12315F] bg-[#020817]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-20">
              <p className="text-[#005BFF] font-semibold mb-4">
                Platform Interface
              </p>

              <h2 className="text-5xl font-bold leading-tight mb-6">
                A cleaner way to manage dispatch and delivery operations.
              </h2>

              <p className="text-[#B6C2D1] text-xl leading-9">
                Built to give dispatchers, operations teams, and management
                real-time visibility into deliveries, loads, tickets, and
                operational activity.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-[#12315F] bg-[#071225] shadow-[0_0_80px_rgba(0,91,255,0.12)]">
              <div className="flex items-center gap-2 px-6 py-5 border-b border-[#12315F] bg-[#0B1730]">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />

                <div className="ml-6 text-sm text-[#B6C2D1]">
                  AtlasBlake Platform Dashboard
                </div>
              </div>

              <div className="grid lg:grid-cols-[260px_1fr] min-h-[650px]">
                <div className="border-r border-[#12315F] p-6 bg-[#08111F]">
                  <div className="space-y-4">
                    <SidebarItem title="Dashboard" active />
                    <SidebarItem title="Dispatch" />
                    <SidebarItem title="eTickets" />
                    <SidebarItem title="Deliveries" />
                    <SidebarItem title="Fleet Activity" />
                    <SidebarItem title="Reporting" />
                    <SidebarItem title="Customers" />
                    <SidebarItem title="Settings" />
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-4 gap-5 mb-8">
                    <StatCard title="Active Loads" value="148" />
                    <StatCard title="Completed" value="1,284" />
                    <StatCard title="Drivers" value="42" />
                    <StatCard title="Pending Tickets" value="18" />
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    <LargeCard title="Dispatch Activity" />
                    <LargeCard title="Delivery Performance" />
                    <LargeCard title="Load Tracking" />
                  </div>

                  <div className="bg-[#0B1730] border border-[#12315F] rounded-3xl p-8">
                    <div className="flex justify-between mb-8">
                      <h3 className="text-2xl font-bold">Recent Deliveries</h3>
                      <span className="text-[#005BFF]">Live Updates</span>
                    </div>

                    <div className="space-y-5">
                      <DeliveryRow
                        job="TX-1048"
                        customer="Metro Concrete"
                        status="Delivered"
                      />

                      <DeliveryRow
                        job="TX-1052"
                        customer="StoneBridge"
                        status="In Transit"
                      />

                      <DeliveryRow
                        job="TX-1061"
                        customer="Pioneer Materials"
                        status="Loading"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <Footer />
    </main>
  );
}

function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#0B1730] border border-[#12315F] rounded-2xl p-4">
      <p className="text-[#B6C2D1] text-sm mb-2">{title}</p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}

function MiniCard({ title }: { title: string }) {
  return (
    <div className="bg-[#0B1730] border border-[#12315F] rounded-2xl p-5">
      <div className="h-2 bg-[#005BFF] rounded-full w-1/2 mb-4" />
      <p className="text-[#B6C2D1]">{title}</p>
    </div>
  );
}

function Line({ width = "100%" }: { width?: string }) {
  return (
    <div
      className="h-3 rounded-full bg-gradient-to-r from-[#005BFF] to-[#0A66FF]"
      style={{ width }}
    />
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#071225]/80 border border-[#12315F] rounded-3xl p-8 backdrop-blur shadow-[0_0_40px_rgba(0,91,255,0.08)]">
      <div className="w-14 h-14 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/30 mb-6" />

      <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>

      <p className="text-[#B6C2D1] leading-8">{text}</p>
    </div>
  );
}

function ProductCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="group relative overflow-hidden bg-[#071225]/90 border border-[#12315F] rounded-3xl p-10 hover:border-[#005BFF] transition duration-300">
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#005BFF]/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />

      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/20 mb-8 flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-[#005BFF]" />
        </div>

        <h3 className="text-3xl font-bold mb-5">{title}</h3>

        <p className="text-[#B6C2D1] text-lg leading-8">{text}</p>
      </div>
    </div>
  );
}

function SidebarItem({
  title,
  active = false,
}: {
  title: string;
  active?: boolean;
}) {
  return (
    <div
      className={`px-5 py-4 rounded-2xl transition ${
        active ? "bg-[#005BFF] text-white" : "bg-[#0B1730] text-[#B6C2D1]"
      }`}
    >
      {title}
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#0B1730] border border-[#12315F] rounded-2xl p-6">
      <p className="text-[#B6C2D1] mb-3">{title}</p>
      <h3 className="text-4xl font-bold">{value}</h3>
    </div>
  );
}

function LargeCard({ title }: { title: string }) {
  return (
    <div className="bg-[#0B1730] border border-[#12315F] rounded-3xl p-6 h-52">
      <div className="flex justify-between mb-8">
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="text-[#005BFF]">Live</span>
      </div>

      <div className="space-y-4">
        <div className="h-3 rounded-full bg-[#005BFF] w-[90%]" />
        <div className="h-3 rounded-full bg-[#005BFF]/80 w-[65%]" />
        <div className="h-3 rounded-full bg-[#005BFF]/60 w-[80%]" />
        <div className="h-3 rounded-full bg-[#005BFF]/40 w-[45%]" />
      </div>
    </div>
  );
}

function DeliveryRow({
  job,
  customer,
  status,
}: {
  job: string;
  customer: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between bg-[#08111F] border border-[#12315F] rounded-2xl px-6 py-5">
      <div>
        <h4 className="font-bold">{job}</h4>
        <p className="text-[#B6C2D1]">{customer}</p>
      </div>

      <div className="text-[#005BFF] font-semibold">{status}</div>
    </div>
  );
}