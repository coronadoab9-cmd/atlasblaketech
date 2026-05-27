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
            Flexible software plans built for operations teams.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl mx-auto">
            AtlasBlake Technologies will offer scalable pricing based on
            company size, operational workflows, users, and purchased modules.
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
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#005BFF] font-semibold mb-4">
            Modular Platform
          </p>

          <h2 className="text-5xl font-bold leading-tight mb-8">
            Only pay for the modules your company needs.
          </h2>

          <p className="text-[#B6C2D1] text-xl leading-9">
            Future customers will be able to purchase dispatch,
            eTicket, reporting, workflow automation, and operational
            modules independently based on their business requirements.
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