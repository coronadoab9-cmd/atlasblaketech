export default function Footer() {
  return (
    <footer className="border-t border-[#12315F] bg-[#020817]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-14">
          <div className="lg:col-span-2">
            <img
              src="/logo.png"
              alt="AtlasBlake Technologies"
              className="h-20 w-auto mb-6"
            />

            <p className="text-[#B6C2D1] text-lg leading-8 max-w-xl">
              AtlasBlake Technologies builds modern dispatch, delivery, eTicket,
              and operations software for concrete, trucking, and construction
              companies.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Platform</h3>

            <div className="flex flex-col gap-4 text-[#B6C2D1]">
              <FooterLink href="/product" label="Product" />
              <FooterLink href="/features" label="Features" />
              <FooterLink href="/industries" label="Industries" />
              <FooterLink href="/pricing" label="Pricing" />
              <FooterLink href="/demo" label="Book Demo" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Company</h3>

            <div className="flex flex-col gap-4 text-[#B6C2D1]">
              <FooterLink href="/about" label="About" />
              <FooterLink href="/case-studies" label="Case Studies" />
              <FooterLink href="/contact" label="Contact" />
              <FooterLink href="/support" label="Support" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms" />
            </div>
          </div>
        </div>

        <div className="border-t border-[#12315F] mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[#B6C2D1]">
          <p>© {new Date().getFullYear()} AtlasBlake Technologies. All rights reserved.</p>
          <p>Built for modern operations.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="hover:text-[#005BFF] transition">
      {label}
    </a>
  );
}