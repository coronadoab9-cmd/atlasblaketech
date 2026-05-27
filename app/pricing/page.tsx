import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto text-center">

          <p className="text-[#005BFF] font-semibold mb-4">
            Pricing
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Flexible software plans for operational teams.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl mx-auto">
            AtlasBlake Technologies is building scalable operational software
            with modular access based on company size, workflows, users,
            and purchased systems.
          </p>

        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

          <PricingCard
            title="Starter"
            subtitle="Small operations"
            features={[
              "Basic dispatch visibility",
              "Digital ticket workflows",
              "Limited users",
              "Basic reporting",
              "Email support",
            ]}
          />

          <FeaturedPricingCard
            title="Operations"
            subtitle="Growing companies"
            features={[
              "Dispatch management",
              "eTicket system",
              "Fleet visibility",
              "Operational reporting",
              "Role-based users",
              "Priority support",
            ]}
          />

          <PricingCard
            title="Enterprise"
            subtitle="Large operations"
            features={[
              "Custom workflows",
              "Advanced reporting",
              "Multi-location support",
              "Enterprise onboarding",
              "Custom integrations",
              "Dedicated support",
            ]}
          />

        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-3xl mb-16">
            <p className="text-[#005BFF] font-semibold mb-4">
              Modular Platform
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Customers only pay for the modules they need.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              Future customers will be able to purchase dispatch,
              eTicket, reporting, workflow automation, and operational
              modules independently based on company requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <ModuleCard
              title="Dispatch Center"
              text="Manage jobs, deliveries, truck assignments, and operational workflows."
            />

            <ModuleCard
              title="Digital eTickets"
              text="Create and manage digital delivery tickets with operational records and load information."
            />

            <ModuleCard
              title="Reporting Dashboard"
              text="Track operational metrics, completed loads, ticket history, and performance data."
            />

          </div>

        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#020817]">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-[#005BFF] font-semibold mb-4">
            Future Platform Access
          </p>

          <h2 className="text-5xl font-bold leading-tight mb-8">
            Built for scalable multi-company operational environments.
          </h2>

          <p className="text-[#B6C2D1] text-xl leading-9">
            Future customers will receive company-specific workspaces,
            role-based users, purchased modules, operational dashboards,
            and secure platform access.
          </p>

        </div>
      </section>

      <Footer />
    </main>
  );
}

function PricingCard({
  title,
  subtitle,
  features,
}: {
  title: string;
  subtitle: string;
  features: string[];
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-10">

      <p className="text-[#005BFF] font-semibold mb-3">
        {subtitle}
      </p>

      <h2 className="text-4xl font-bold mb-8">
        {title}
      </h2>

      <div className="space-y-5 mb-10">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-4"
          >
            <div className="w-3 h-3 rounded-full bg-[#005BFF]" />

            <p className="text-[#B6C2D1]">
              {feature}
            </p>
          </div>
        ))}
      </div>

      <a
        href="/demo"
        className="block text-center bg-[#0B1730] hover:bg-[#12203A] transition py-4 rounded-2xl font-bold border border-[#12315F]"
      >
        Contact Sales →
      </a>

    </div>
  );
}

function FeaturedPricingCard({
  title,
  subtitle,
  features,
}: {
  title: string;
  subtitle: string;
  features: string[];
}) {
  return (
    <div className="relative bg-[#071225] border-2 border-[#005BFF] rounded-[32px] p-10 shadow-[0_0_60px_rgba(0,91,255,0.18)]">

      <div className="absolute top-5 right-5 bg-[#005BFF] px-4 py-2 rounded-full text-sm font-bold">
        Most Popular
      </div>

      <p className="text-[#005BFF] font-semibold mb-3">
        {subtitle}
      </p>

      <h2 className="text-4xl font-bold mb-8">
        {title}
      </h2>

      <div className="space-y-5 mb-10">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-4"
          >
            <div className="w-3 h-3 rounded-full bg-[#005BFF]" />

            <p className="text-[#B6C2D1]">
              {feature}
            </p>
          </div>
        ))}
      </div>

      <a
        href="/demo"
        className="block text-center bg-[#005BFF] hover:bg-[#0047cc] transition py-4 rounded-2xl font-bold shadow-[0_0_35px_rgba(0,91,255,0.35)]"
      >
        Book a Demo →
      </a>

    </div>
  );
}

function ModuleCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8 hover:border-[#005BFF] transition">

      <div className="w-14 h-14 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/30 mb-6" />

      <h3 className="text-2xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-[#B6C2D1] leading-8">
        {text}
      </p>

    </div>
  );
}