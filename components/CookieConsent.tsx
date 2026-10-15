"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const KEY = "liora-cookie-consent"; // "accepted" | "essential"

// Mounted once in the root layout, so the language comes from the path.
const COPY = {
  en: {
    aria: "Cookie preferences",
    body: "We use essential cookies to make this site work. With your consent we may also use analytics to understand what resonates — decline and nothing is lost.",
    privacy: "Privacy Policy",
    essential: "Essential only",
    accept: "Accept",
  },
  tr: {
    aria: "Çerez tercihleri",
    body: "Bu sitenin çalışması için zorunlu çerezleri kullanıyoruz. İzin verirseniz neyin ilgi gördüğünü anlamak için analiz çerezlerini de kullanabiliriz; reddederseniz hiçbir şey eksilmez.",
    privacy: "Gizlilik Politikası",
    essential: "Yalnızca zorunlu",
    accept: "Kabul et",
  },
};

/**
 * A quiet, editorial cookie-consent bar. The site currently sets no tracking
 * cookies — this records the visitor's choice (in localStorage) so analytics
 * can be gated on it the day we add any. Privacy-preserving by default:
 * "Essential only" is offered with equal weight to "Accept".
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const pathname = usePathname() ?? "";
  const t = COPY[pathname === "/tr" || pathname.startsWith("/tr/") ? "tr" : "en"];

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
      aria-label={t.aria}
      className="consent-banner fixed inset-x-0 bottom-0 z-[200] border-t border-white/10 bg-ink text-on-dark"
    >
      <div className="wrap flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="body-s max-w-2xl !text-on-dark-mut">
          {t.body}{" "}
          <Link
            href="/gizlilik"
            className="text-on-dark underline decoration-gold underline-offset-2 transition-colors duration-300 ease-liora hover:text-gold"
          >
            {t.privacy}
          </Link>
          .
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-[2px] border border-white/25 px-4 py-2.5 font-ui text-[13px] leading-none text-on-dark transition-colors duration-300 ease-liora hover:border-on-dark focus-visible:outline-2"
          >
            {t.essential}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-[2px] border border-bone bg-bone px-4 py-2.5 font-ui text-[13px] font-medium leading-none text-ink transition-colors duration-300 ease-liora hover:border-oxblood hover:bg-oxblood hover:text-bone focus-visible:outline-2"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
