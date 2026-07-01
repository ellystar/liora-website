import Link from "next/link";
import Footer from "./Footer";

/**
 * Shell for the legal pages (Privacy, Terms). A quiet static header (no anchor
 * nav — those only resolve on the homepage), the prose, then the shared footer.
 */
export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-stone bg-bone">
        <div className="wrap flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-display text-[21px] leading-none tracking-wordmark text-ink"
            aria-label="Liora — home"
          >
            LIORA
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 font-ui text-[13px] text-text-mut transition-colors duration-300 ease-liora hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-liora group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Back to home
          </Link>
        </div>
      </header>

      <main id="main" className="bg-bone">
        <article className="wrap py-[clamp(56px,9vw,120px)]">
          <header className="mb-[clamp(36px,5vw,56px)] max-w-[68ch] border-b border-stone/60 pb-[clamp(28px,4vw,40px)]">
            <p className="meta mb-5">Legal</p>
            <h1 className="d2 text-ink">{title}</h1>
            <p className="meta mt-6">Last updated · {updated}</p>
          </header>
          <div className="legal-prose max-w-[68ch]">{children}</div>
        </article>
      </main>

      <Footer />
    </>
  );
}
