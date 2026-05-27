import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-28 border-b border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#005BFF] font-semibold mb-4">Product</p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-8">
            One platform for dispatch, delivery data, and digital eTickets.
          </h1>

          <p className="text-[#B6C2D1] text-xl leading-9 max-w-3xl">
            AtlasBlake Technologies is building operations software that helps
            companies move from paper tickets, manual updates, and disconnected
            systems into one connected digital workflow.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <ProductFeature
            title="Dispatch Management"
            text="Manage active jobs, truck assignments, delivery progress, customer details, and order information from one connected workspace."
          />

          <ProductFeature
            title="Digital eTicket Creation"
            text="Create digital tickets using ticket number, customer, address, order number, mix, load size, slump, water allowed, batch weights, and load time."
          />

          <ProductFeature
            title="Delivery Documentation"
            text="Store delivery records digitally so dispatch, drivers, management, and customers can access accurate information."
          />

          <ProductFeature
            title="Operations Dashboard"
            text="View real-time activity, completed loads, pending tickets, truck status, order progress, and delivery performance."
          />
        </div>
      </section>

      <section className="px-6 py-24 border-t border-[#12315F] bg-[#030B1C]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[#005BFF] font-semibold mb-4">
              Platform Modules
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Built to grow with each customer’s operation.
            </h2>

            <p className="text-[#B6C2D1] text-xl leading-9">
              Customers will be able to access only the modules they purchase,
              including dispatch, eTickets, reporting, and workflow automation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Module title="Dispatch Center" />
            <Module title="eTicket System" />
            <Module title="Fleet Operations" />
            <Module title="Customer Records" />
            <Module title="Reporting Dashboard" />
            <Module title="Admin Console" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductFeature({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-10 hover:border-[#005BFF] transition">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-[#B6C2D1] text-lg leading-8">{text}</p>
    </div>
  );
}

function Module({ title }: { title: string }) {
  return (
    <div className="bg-[#071225] border border-[#12315F] rounded-3xl p-8">
      <div className="w-12 h-12 rounded-xl bg-[#005BFF] mb-6" />
      <h3 className="text-2xl font-bold">{title}</h3>
    </div>
  );
}