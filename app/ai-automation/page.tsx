import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AIAutomationPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            AI & Automation
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-6xl mb-8">
            Future-ready operations intelligence powered by automation and AI.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies is designed to go beyond basic dispatch and
            ticketing. The platform is being built to help companies identify
            issues, automate reporting, simplify workflows, and make smarter
            operational decisions.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#005BFF] font-semibold mb-4">
              Operations Intelligence
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-8">
              Advanced underneath. Simple for users.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9 mb-10">
              The goal is not to make users feel like they are using complicated
              AI software. The goal is to make dispatchers, drivers, managers,
              and customers feel like the system simply makes their work easier.
            </p>

            <div className="space-y-5">
              <Point text="Cleaner workflows with less manual entry" />
              <Point text="AI-assisted reporting and summaries" />
              <Point text="Smart alerts for missing or unusual data" />
              <Point text="Real-time visibility across operations" />
              <Point text="Company-specific intelligence and insights" />
            </div>
          </div>

          <div className="relative bg-[#071225] border border-[#12315F] rounded-[32px] p-8 shadow-[0_0_80px_rgba(0,91,255,0.12)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,91,255,0.18),transparent_55%)] rounded-[32px]" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              <p className="text-[#005BFF] font-semibold mb-4">
                AI Operations Assistant
              </p>

              <div className="space-y-4">
                <AssistantPrompt text="Show me all late deliveries today." />
                <AssistantPrompt text="Which tickets are missing load times?" />
                <AssistantPrompt text="Generate a daily dispatch summary." />
                <AssistantPrompt text="Find customer orders with quantity mismatches." />
                <AssistantPrompt text="Summarize completed loads by truck." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[#005BFF] font-semibold mb-4">
              Future Capabilities
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Built to keep improving as technology advances.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              AtlasBlake Technologies is being positioned as a modern operations
              platform that can grow with AI, automation, real-time data,
              integrations, and predictive tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <CapabilityCard
              title="AI Operations Assistant"
              text="Ask operational questions in plain language and get answers from dispatch, ticket, delivery, and reporting data."
            />

            <CapabilityCard
              title="Smart eTicket Workflows"
              text="Reduce manual entry by helping generate tickets from customer records, order data, truck information, and load details."
            />

            <CapabilityCard
              title="Exception Detection"
              text="Automatically flag missing load times, duplicate tickets, unusual quantities, incomplete records, and workflow issues."
            />

            <CapabilityCard
              title="Automated Reporting"
              text="Generate daily summaries, customer reports, delivery recaps, truck performance reports, and ticket exception lists."
            />

            <CapabilityCard
              title="Predictive Visibility"
              text="Future tools can help identify late deliveries, underused trucks, quantity issues, route delays, and operational bottlenecks."
            />

            <CapabilityCard
              title="Connected Integrations"
              text="Designed to eventually connect with dispatch systems, accounting tools, customer portals, ticket feeds, and operational APIs."
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#020817]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#005BFF] font-semibold mb-4">
              Simple User Experience
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-8">
              Futuristic does not have to mean complicated.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              The platform should feel familiar to operational teams while using
              advanced technology behind the scenes. Users should be able to log
              in, see what matters, act quickly, and trust the system.
            </p>
          </div>

          <div className="grid gap-5">
            <WorkflowStep number="01" title="Log in to company workspace" />
            <WorkflowStep number="02" title="View today’s operation" />
            <WorkflowStep number="03" title="Create or review tickets" />
            <WorkflowStep number="04" title="Track deliveries and exceptions" />
            <WorkflowStep number="05" title="Generate reports or ask AI" />
          </div>
        </div>
      </section>

      <section className="px-6 py-32 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#005BFF] font-semibold mb-6">
            The Future Direction
          </p>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
            AtlasBlake Technologies is not just building software. It is
            building operational intelligence.
          </h2>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl mx-auto mb-12">
            The long-term vision is a platform where dispatch, delivery,
            tickets, reporting, automation, AI insights, and customer-specific
            workflows all work together.
          </p>

          <a
            href="/demo"
            className="inline-block bg-[#005BFF] hover:bg-[#0047cc] transition px-10 py-5 rounded-2xl text-lg font-bold shadow-[0_0_35px_rgba(0,91,255,0.35)]"
          >
            Book a Demo →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Point({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-3 h-3 rounded-full bg-[#005BFF]" />
      <p className="text-[#B6C2D1] text-lg">{text}</p>
    </div>
  );
}

function AssistantPrompt({ text }: { text: string }) {
  return (
    <div className="bg-[#020817] border border-[#12315F] rounded-2xl p-5">
      <p className="text-[#B6C2D1]">{text}</p>
    </div>
  );
}

function CapabilityCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8 hover:border-[#005BFF] transition">
      <div className="w-14 h-14 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/30 mb-6" />

      <h3 className="text-2xl font-bold mb-4">{title}</h3>

      <p className="text-[#B6C2D1] leading-8">{text}</p>
    </div>
  );
}

function WorkflowStep({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-6 flex items-center gap-6">
      <div className="text-[#005BFF] font-bold text-2xl">{number}</div>
      <div className="text-xl font-semibold">{title}</div>
    </div>
  );
}