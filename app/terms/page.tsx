import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">Terms</p>

          <h1 className="text-5xl font-bold mb-8">Terms of Use</h1>

          <div className="space-y-8 text-[#B6C2D1] text-lg leading-8">
            <p>
              By using this website or requesting access to AtlasBlake
              Technologies software, you agree to use the services responsibly
              and in accordance with applicable laws.
            </p>

            <p>
              Website content, software concepts, branding, designs, and platform
              materials are owned by AtlasBlake Technologies unless otherwise
              stated.
            </p>

            <p>
              Our software and website may change over time as features,
              services, and platform capabilities evolve.
            </p>

            <p>
              AtlasBlake Technologies is not responsible for losses caused by
              misuse of the website, inaccurate submitted information, or
              unauthorized access caused by user negligence.
            </p>

            <p>
              For questions about these terms, contact us at
              contact@atlasblaketech.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}