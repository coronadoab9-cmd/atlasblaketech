import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            Privacy Policy
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Privacy & data handling.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9">
            AtlasBlake Technologies is committed to protecting customer,
            operational, and company information.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto space-y-16">

          <PolicySection
            title="Information Collection"
            text="AtlasBlake Technologies may collect contact details, company information, operational workflow information, and platform usage details submitted through the website or future software platform."
          />

          <PolicySection
            title="Operational Data"
            text="Future platform customers may store dispatch records, eTickets, delivery information, customer records, reporting data, and operational workflows inside company-specific environments."
          />

          <PolicySection
            title="Company-Specific Access"
            text="Future software architecture is intended to separate operational data by company account so customers only access their own information."
          />

          <PolicySection
            title="Security"
            text="AtlasBlake Technologies intends to implement authentication, role-based permissions, secure hosting, and protected operational workflows for future customer platforms."
          />

          <PolicySection
            title="Third-Party Services"
            text="Future platform services may use infrastructure providers, hosting providers, analytics systems, authentication services, payment systems, and operational integrations when necessary."
          />

          <PolicySection
            title="Policy Updates"
            text="This privacy policy may change as the AtlasBlake Technologies platform, services, and operational systems evolve."
          />

        </div>
      </section>

      <Footer />
    </main>
  );
}

function PolicySection({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-[32px] p-10">
      <h2 className="text-3xl font-bold mb-5">
        {title}
      </h2>

      <p className="text-[#B6C2D1] text-lg leading-9">
        {text}
      </p>
    </div>
  );
}