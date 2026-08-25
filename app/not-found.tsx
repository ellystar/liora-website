import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col bg-bone">
      <header className="border-b border-stone">
        <div className="wrap flex items-center py-5">
          <Link
            href="/"
            className="font-display text-[21px] leading-none tracking-wordmark text-ink"
            aria-label="Liora — home"
          >
            LIORA
          </Link>
        </div>
      </header>

      <div className="wrap flex flex-1 flex-col items-center justify-center py-[clamp(80px,14vw,160px)] text-center">
        <p className="meta mb-6 text-text-mut">Error 404</p>
        <h1 className="d2 max-w-[18ch] text-ink">
          Nothing at this <span className="soul">address</span>.
        </h1>
        <p className="body mt-6 max-w-[44ch] text-text-mut">
          This page may have moved, or it never existed. Here is the way back.
        </p>
        <nav
          aria-label="Helpful links"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-meta text-text-mut"
        >
          <Link href="/" className="link-underline hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/work/adv" className="link-underline hover:text-ink">
            Selected work
          </Link>
          <span aria-hidden="true">·</span>
          <a href="/sitemap.xml" className="link-underline hover:text-ink">
            Sitemap
          </a>
        </nav>
      </div>
    </main>
  );
}
