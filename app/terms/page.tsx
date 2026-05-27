import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            Terms of Use
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Platform and website usage terms.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9">
            These terms outline the intended use of the AtlasBlake Technologies
            website, platform concepts, and future operational software systems.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto space-y-16">

          <TermsSection
            title="Website Usage"
            text="Visitors may browse AtlasBlake Technologies content, request demos, submit inquiries, and review platform information for business evaluation purposes."
          />

          <TermsSection
            title="Future Software Platform"
            text="Future customer access may include company workspaces, dispatch systems, eTicket workflows, reporting modules, operational dashboards, and role-based software access."
          />

          <TermsSection
            title="Company Accounts"
            text="Future software customers may receive company-specific access, user accounts, permissions, and purchased software modules."
          />

          <TermsSection
            title="Operational Responsibility"
            text="Customers are responsible for maintaining accurate operational data, user access management, and internal workflow usage inside their company environment."
          />

          <TermsSection
            title="Platform Availability"
            text="AtlasBlake Technologies may modify platform features, workflows, modules, pricing structures, or operational systems as the software evolves."
          />

          <TermsSection
            title="Intellectual Property"
            text="Website content, branding, software concepts, platform workflows, interface designs, and operational systems are owned by AtlasBlake Technologies unless otherwise stated."
          />

        </div>
      </section>

      <Footer />
    </main>
  );
}

function TermsSection({
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