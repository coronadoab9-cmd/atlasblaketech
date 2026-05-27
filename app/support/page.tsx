import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">Support</p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Support for modern operations teams.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            Get help with onboarding, demos, platform questions, and future
            AtlasBlake Technologies software support.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <SupportCard
            title="Demo Support"
            text="Need help understanding if the platform fits your operation? Request a demo and we’ll walk through your workflow."
          />

          <SupportCard
            title="Onboarding"
            text="Future customers will receive setup support for users, workflows, ticket data, and operational processes."
          />

          <SupportCard
            title="Technical Help"
            text="For website or platform questions, contact AtlasBlake Technologies support directly."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SupportCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-[#B6C2D1] leading-8">{text}</p>
    </div>
  );
}