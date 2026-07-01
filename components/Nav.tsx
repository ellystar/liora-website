"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cta from "./Cta";

const LINKS = [
  { label: "What we build", href: "#build" },
  { label: "Work", href: "#work" },
  { label: "Atelier", href: "#horizon" },
  { label: "About", href: "#built-by" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Condense on scroll; hide on scroll-down, reveal on scroll-up (Contra-style).
  // Reads window.scrollY, which Lenis drives natively — behaviour is identical.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (open) {
        setHidden(false);
      } else if (y > lastY && y > 140) {
        setHidden(true); // down → hide
      } else {
        setHidden(false); // up → show
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Quiet scrollspy — the active section carries a gold underline.
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-[400ms] ease-liora ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled || open
            ? "border-b border-stone bg-[rgba(242,237,227,0.82)] backdrop-blur-[10px] backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className={`wrap flex items-center justify-between transition-[padding] duration-[400ms] ease-liora ${
            scrolled || open ? "py-[15px]" : "py-6"
          }`}
          aria-label="Primary"
        >
          <Link
            href="#top"
            className="font-display text-[21px] font-normal leading-none tracking-wordmark text-ink"
            aria-label="Liora — home"
          >
            LIORA
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-[30px] min-[960px]:flex">
            <ul className="flex items-center gap-[30px]">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group relative font-ui text-[14px] text-ink/75 transition-opacity duration-300 ease-liora hover:text-ink"
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ease-liora ${
                        active === l.href.slice(1)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            {/* Quiet nav CTA — the soft sibling of the hero's loud primary */}
            <Link
              href="mailto:info@lioralabs.io?subject=Working%20with%20Liora"
              className="group/cta inline-flex items-center gap-2 rounded-[2px] border border-ink bg-transparent px-4 py-2 font-ui text-[13px] font-medium leading-none text-ink transition-colors duration-300 ease-liora hover:border-oxblood hover:bg-oxblood hover:text-white focus-visible:outline-2"
            >
              Get in touch
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-liora group-hover/cta:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] min-[960px]:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ease-liora ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-transform duration-300 ease-liora ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay — kept outside <header> so the header's backdrop-filter
          doesn't create a containing block that traps this fixed element. */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-bone px-[var(--pad)] pt-28 transition-opacity duration-500 ease-liora min-[960px]:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {LINKS.map((l, i) => (
            <li key={l.href} className="border-b border-stone/60">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-5 font-display text-3xl font-light text-ink"
              >
                {l.label}
                <span className="meta">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Cta href="mailto:info@lioralabs.io?subject=Working%20with%20Liora" variant="primary" className="w-full justify-between">
            <span onClick={() => setOpen(false)}>Get in touch</span>
          </Cta>
        </div>
        <p className="meta mt-auto pb-10 pt-12">
          Liora · An AI-native creative systems lab
        </p>
      </div>
    </>
  );
}
