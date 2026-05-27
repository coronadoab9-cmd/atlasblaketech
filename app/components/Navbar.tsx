"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full border-b border-[#12315F] bg-[#020817]/95 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="AtlasBlake Technologies"
            className="h-16 w-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-10 text-[#F8FAFC] font-medium">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`transition pb-2 ${
                  active
                    ? "text-[#005BFF] border-b-2 border-[#005BFF]"
                    : "hover:text-[#005BFF]"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        <a
          href="/demo"
          className="bg-[#005BFF] hover:bg-[#0047cc] px-7 py-4 rounded-xl font-bold transition shadow-[0_0_30px_rgba(0,91,255,0.45)]"
        >
          Book Demo →
        </a>
      </div>
    </nav>
  );
}