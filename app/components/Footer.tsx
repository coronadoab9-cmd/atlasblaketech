export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#05070d] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-3">AtlasBlake Technologies</h3>
          <p className="text-gray-400 max-w-md">
            Building modern dispatch, delivery, eTicket, and operations software for companies that need cleaner workflows and real-time visibility.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Platform</h4>
          <div className="flex flex-col gap-2 text-gray-400">
            <a href="/product" className="hover:text-white">Product</a>
            <a href="/features" className="hover:text-white">Features</a>
            <a href="/pricing" className="hover:text-white">Pricing</a>
            <a href="/demo" className="hover:text-white">Book Demo</a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <div className="flex flex-col gap-2 text-gray-400">
            <a href="/about" className="hover:text-white">About</a>
            <a href="/contact" className="hover:text-white">Contact</a>
            <a href="/support" className="hover:text-white">Support</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 px-6 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AtlasBlake Technologies, LLC. All rights reserved.
      </div>
    </footer>
  );
}