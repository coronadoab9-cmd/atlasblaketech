"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Brand from "./Brand";
import { Icon } from "./Icons";

const links = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#dce7f2]/90 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-6">
        <Brand />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive(link.href)
                  ? "bg-[#edf5ff] text-[#0b62d6]"
                  : "text-[#405a75] hover:bg-[#f4f8fc] hover:text-[#071a33]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="px-3 py-3 text-sm font-bold text-[#405a75] transition hover:text-[#0b62d6]">
            Client Login
          </Link>
          <Link href="/contact" className="button-primary button-compact">
            Start a Project<Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-[#dce7f2] text-[#071a33] lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-[#dce7f2] bg-white px-5 py-5 shadow-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-base font-bold ${isActive(link.href) ? "bg-[#edf5ff] text-[#0b62d6]" : "text-[#29445f]"}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-3 grid gap-3 border-t border-[#e5edf5] pt-4 sm:grid-cols-2">
              <Link href="/login" className="button-secondary justify-center">Client Login</Link>
              <Link href="/contact" className="button-primary justify-center">Start a Project<Icon name="arrow" className="h-5 w-5" /></Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
