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
    if (!menuOpen) return;

    const body = document.body;
    const html = document.documentElement;

    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;
    const previousOverscroll = html.style.overscrollBehavior;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    const stopScroll = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", stopScroll, { passive: false });
    window.addEventListener("touchmove", stopScroll, { passive: false });

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
      html.style.overscrollBehavior = previousOverscroll;

      window.removeEventListener("wheel", stopScroll);
      window.removeEventListener("touchmove", stopScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[200] border-b border-white/10 bg-[#0A0F1E]/[.985] text-white shadow-[0_8px_28px_rgba(10,15,30,.18)] backdrop-blur-xl">
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
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/[.04] text-white transition hover:border-white/25 hover:bg-white/[.08] lg:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div aria-hidden="true" className="h-[70px]" />

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-x-0 bottom-0 top-[70px] z-[180] bg-[#0A0F1E]/25 backdrop-blur-[1px] lg:hidden"
          />

          <div
            id="mobile-navigation"
            className="fixed left-4 right-4 top-[78px] z-[210] overflow-hidden rounded-2xl border border-white/10 bg-[#0A0F1E] shadow-[0_22px_60px_rgba(0,0,0,.34)] sm:left-auto sm:right-6 sm:w-[340px] lg:hidden"
          >
            <nav className="p-2" aria-label="Mobile navigation">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-bold transition ${
                    isActive(link.href)
                      ? "bg-[#2563EB]/15 text-[#06B6EF]"
                      : "text-[#E5E7EB] hover:bg-white/[.06] hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  <Icon name="arrow" className="h-4 w-4 opacity-55" />
                </Link>
              ))}

              <div className="my-2 border-t border-white/10" />

              <Link
                href="/start-a-project"
                onClick={() => setMenuOpen(false)}
                className="button-primary w-full"
              >
                Start a Project
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </>
  );
}
