import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">About</p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            Building software for real-world operations.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies focuses on helping companies replace manual
            workflows, paper tickets, and disconnected systems with modern
            operational software.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-[#B6C2D1] text-lg leading-9">
              Our mission is to build practical software that helps dispatchers,
              drivers, managers, and operations teams work faster, reduce manual
              errors, and gain better visibility into daily activity.
            </p>
          </div>

          <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-10">
            <h3 className="text-3xl font-bold mb-6">What We Build</h3>

            <div className="space-y-4 text-[#B6C2D1] text-lg">
              <p>✓ Dispatch and delivery platforms</p>
              <p>✓ Digital eTicket systems</p>
              <p>✓ Operations dashboards</p>
              <p>✓ Reporting and workflow automation</p>
              <p>✓ Custom software for field operations</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}