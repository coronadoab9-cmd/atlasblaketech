import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28">
        <div className="max-w-xl mx-auto bg-[#071225] border border-[#12315F] rounded-[32px] p-10 shadow-[0_0_60px_rgba(0,91,255,0.10)]">
          <p className="text-[#005BFF] font-semibold mb-4">Client Portal</p>

          <h1 className="text-4xl font-bold mb-6">
            AtlasBlake Portal
          </h1>

          <p className="text-[#B6C2D1] leading-8 mb-8">
            Client access is coming soon. This portal will support dispatch,
            delivery data, eTickets, reports, and customer operations.
          </p>

          <form className="space-y-5">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-[#020817] border border-[#12315F] rounded-2xl px-5 py-4 outline-none focus:border-[#005BFF]"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-[#020817] border border-[#12315F] rounded-2xl px-5 py-4 outline-none focus:border-[#005BFF]"
            />

            <button
              type="button"
              className="w-full bg-[#005BFF] hover:bg-[#0047cc] transition py-5 rounded-2xl font-bold"
            >
              Login Coming Soon
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}