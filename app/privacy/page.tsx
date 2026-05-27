import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">Privacy Policy</p>

          <h1 className="text-5xl font-bold mb-8">Privacy Policy</h1>

          <div className="space-y-8 text-[#B6C2D1] text-lg leading-8">
            <p>
              AtlasBlake Technologies respects your privacy. This policy explains
              how we may collect, use, and protect information submitted through
              our website or software platform.
            </p>

            <p>
              We may collect contact details, company information, demo requests,
              and operational information voluntarily submitted by users.
            </p>

            <p>
              We use this information to respond to inquiries, provide software
              services, improve our platform, and support customer operations.
            </p>

            <p>
              We do not sell personal information. Data may be shared only with
              service providers necessary to operate our website, software, or
              business systems.
            </p>

            <p>
              For privacy questions, contact us at contact@atlasblaketech.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}