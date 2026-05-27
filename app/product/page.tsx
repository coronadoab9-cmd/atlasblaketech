import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">
            Product
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            One platform for dispatch, delivery data, and digital eTickets.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies is building operations software that helps companies move from paper tickets, manual updates, and disconnected systems into one connected digital workflow.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <ProductFeature
            title="Dispatch Activity"
            text="Manage job activity, truck movement, delivery progress, customer details, and order information in one place."
          />

          <ProductFeature
            title="Digital Ticket Creation"
            text="Generate clean eTickets using ticket number, customer, address, order number, mix, load size, slump, water allowed, batch weights, and load time."
          />

          <ProductFeature
            title="Delivery Documentation"
            text="Store delivery records digitally so dispatch, drivers, management, and customers have access to accurate information."
          />

          <ProductFeature
            title="Operations Dashboard"
            text="View real-time activity, completed loads, pending tickets, truck status, order progress, and delivery performance."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductFeature({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-10">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-[#B6C2D1] text-lg leading-8">{text}</p>
    </div>
  );
}