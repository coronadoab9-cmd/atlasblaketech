import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">Pricing</p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Flexible pricing for operations teams ready to modernize.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            Start with the tools your operation needs today and expand as your dispatch, delivery, and ticketing workflows grow.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          <Plan
            name="Starter"
            price="Custom"
            description="For small teams moving away from paper tickets and manual updates."
            features={[
              "Digital ticket records",
              "Basic dispatch visibility",
              "Customer and job records",
              "PDF ticket output",
            ]}
          />

          <Plan
            name="Operations"
            price="Custom"
            featured
            description="For growing companies that need real-time dispatch and delivery visibility."
            features={[
              "Everything in Starter",
              "Operations dashboard",
              "Load and delivery tracking",
              "Reporting tools",
              "Multi-user access",
            ]}
          />

          <Plan
            name="Enterprise"
            price="Custom"
            description="For companies that need custom integrations, workflows, and advanced reporting."
            features={[
              "Everything in Operations",
              "Custom integrations",
              "Advanced reporting",
              "API workflows",
              "Dedicated setup support",
            ]}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Plan({
  name,
  price,
  description,
  features,
  featured = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl p-8 border ${
        featured
          ? "bg-[#005BFF] border-[#005BFF] shadow-[0_0_60px_rgba(0,91,255,0.35)]"
          : "bg-[#071225] border-[#12315F]"
      }`}
    >
      <h2 className="text-3xl font-bold mb-3">{name}</h2>
      <p className={featured ? "text-white/80 mb-8" : "text-[#B6C2D1] mb-8"}>
        {description}
      </p>

      <div className="text-5xl font-bold mb-8">{price}</div>

      <a
        href="/demo"
        className={`block text-center rounded-xl px-6 py-4 font-bold mb-8 ${
          featured
            ? "bg-white text-[#005BFF]"
            : "bg-[#005BFF] text-white"
        }`}
      >
        Request Demo
      </a>

      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature} className="flex gap-3">
            <span>✓</span>
            <span className={featured ? "text-white" : "text-[#B6C2D1]"}>
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}