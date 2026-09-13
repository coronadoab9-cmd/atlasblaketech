"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Brand from "./Brand";
import { Icon } from "./Icons";

const links = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Approach", href: "/approach" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0F1E]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 sm:px-6">
        <Brand inverse />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3.5 py-2.5 text-sm font-semibold transition ${
                isActive(link.href)
                  ? "bg-white/10 text-white"
                  : "text-[#CBD5E1] hover:bg-white/[.06] hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link href="/start-a-project" className="button-primary button-compact">
            Start a Project
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/[.04] text-white lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {menuOpen ? (
        <div className="fixed inset-x-0 top-[70px] z-50 h-[calc(100dvh-70px)] overflow-y-auto border-t border-white/10 bg-[#0A0F1E] px-5 py-6 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-white/10 px-1 py-4 text-lg font-bold ${
                  isActive(link.href) ? "text-[#06B6EF]" : "text-[#E5E7EB]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/start-a-project"
              onClick={() => setMenuOpen(false)}
              className="button-primary mt-6 w-full"
            >
              Start a Project
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a href="mailto:contact@atlasblaketech.com" className="mt-6 text-center text-sm font-medium text-[#94A3B8]">
              contact@atlasblaketech.com
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
