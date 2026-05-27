"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full border-b border-[#12315F] bg-[#020817]/95 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="AtlasBlake Technologies"
            className="h-20 w-auto object-contain"
          />
        </a>

        {/* DESKTOP NAV */}
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

        {/* DESKTOP BUTTON */}
        <a
          href="/demo"
          className="hidden md:flex bg-[#005BFF] hover:bg-[#0047cc] px-7 py-4 rounded-xl font-bold transition shadow-[0_0_30px_rgba(0,91,255,0.45)]"
        >
          Book Demo →
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-7 h-[3px] bg-white rounded-full" />
          <span className="w-7 h-[3px] bg-white rounded-full" />
          <span className="w-7 h-[3px] bg-white rounded-full" />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#12315F] bg-[#071225]">
          <div className="flex flex-col px-6 py-6 gap-6">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg transition ${
                    active
                      ? "text-[#005BFF]"
                      : "text-white hover:text-[#005BFF]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <a
              href="/demo"
              className="bg-[#005BFF] hover:bg-[#0047cc] transition px-6 py-4 rounded-xl font-bold text-center shadow-[0_0_30px_rgba(0,91,255,0.35)]"
            >
              Book Demo →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}