"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Brand from "./Brand";
import { Icon } from "./Icons";

const links = [
  { name: "Services", href: "/services" },
  { name: "Our Work", href: "/work" },
  { name: "Approach", href: "/approach" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);


  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#dce7f2]/90 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-6">
        <Brand />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${
                isActive(link.href)
                  ? "bg-[#edf5ff] text-[#1d5fd0]"
                  : "text-[#405a75] hover:bg-[#f4f8fc] hover:text-[#071a33]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link href="/start-a-project" className="button-primary button-compact">
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
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-extrabold ${isActive(link.href) ? "bg-[#edf5ff] text-[#1d5fd0]" : "text-[#29445f]"}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-3 border-t border-[#e5edf5] pt-4">
              <Link href="/start-a-project" onClick={() => setMenuOpen(false)} className="button-primary w-full justify-center">Start a Project<Icon name="arrow" className="h-5 w-5" /></Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
