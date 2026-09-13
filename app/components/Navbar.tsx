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
    <header className="sticky top-0 z-50 border-b border-[#e1e9f1]/90 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-6">
        <Brand />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3.5 py-2.5 text-sm font-extrabold transition ${
                isActive(link.href)
                  ? "bg-[#f0f5fb] text-[#0b1f33]"
                  : "text-[#526b83] hover:bg-[#f7f9fc] hover:text-[#0b1f33]"
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
          className="grid h-10 w-10 place-items-center rounded-lg border border-[#dbe5ee] bg-white text-[#07182c] lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {menuOpen ? (
        <div className="fixed inset-x-0 top-[68px] z-50 h-[calc(100dvh-68px)] overflow-y-auto border-t border-[#e1e9f1] bg-white px-5 py-6 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-[#edf1f5] px-1 py-4 text-lg font-black ${
                  isActive(link.href) ? "text-[#176bff]" : "text-[#18324d]"
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
            <a href="mailto:contact@atlasblaketech.com" className="mt-6 text-center text-sm font-bold text-[#667b90]">
              contact@atlasblaketech.com
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
