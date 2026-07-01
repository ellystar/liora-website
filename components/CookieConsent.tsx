"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "liora-cookie-consent"; // "accepted" | "essential"

/**
 * A quiet, editorial cookie-consent bar. The site currently sets no tracking
 * cookies — this records the visitor's choice (in localStorage) so analytics
 * can be gated on it the day we add any. Privacy-preserving by default:
 * "Essential only" is offered with equal weight to "Accept".
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      /* storage blocked — show the bar, choice just won't persist */
    }
    if (!stored) {
      const t = setTimeout(() => setShow(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  // Let the footer "Cookie settings" link re-open the bar to change a choice.
  useEffect(() => {
    const open = () => setShow(true);
    window.addEventListener("liora:cookie-settings", open);
    return () => window.removeEventListener("liora:cookie-settings", open);
  }, []);

  const choose = (value: "accepted" | "essential") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="consent-banner fixed inset-x-0 bottom-0 z-[200] border-t border-white/10 bg-ink text-on-dark"
    >
      <div className="wrap flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="body-s max-w-2xl !text-on-dark-mut">
          We use essential cookies to make this site work. With your consent we
          may also use analytics to understand what resonates — decline and
          nothing is lost.{" "}
          <Link
            href="/privacy"
            className="text-on-dark underline decoration-gold underline-offset-2 transition-colors duration-300 ease-liora hover:text-gold"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-[2px] border border-white/25 px-4 py-2.5 font-ui text-[13px] leading-none text-on-dark transition-colors duration-300 ease-liora hover:border-on-dark focus-visible:outline-2"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-[2px] border border-bone bg-bone px-4 py-2.5 font-ui text-[13px] font-medium leading-none text-ink transition-colors duration-300 ease-liora hover:border-oxblood hover:bg-oxblood hover:text-bone focus-visible:outline-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
