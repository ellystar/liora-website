/**
 * Hero — ported 1:1 from the finished liora-hero.html reference.
 * 50/50 split, full uncropped composite bleeding up behind the transparent nav,
 * CSS-only staggered entrance. Styles live in globals.css (.hero / .btn).
 */
export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero-text">
        <h1>
          <span className="l1">Technology is learning how to create.</span>
          <span className="l2">
            We are learning to <span className="soul">preserve</span> what
            matters.
          </span>
        </h1>
        <p className="sub">
          We build AI-native creative systems for fashion and beauty brands.
        </p>
        <p className="slogan">Scale without losing soul.</p>
        <div className="cta">
          <a className="btn" href="mailto:info@lioralabs.io?subject=Working%20with%20Liora">
            Get in touch <span className="ar">&rarr;</span>
          </a>
          <a
            className="btn ghost"
            href="https://atelier.lioralabs.io/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the Atelier <span className="ar">&rarr;</span>
          </a>
        </div>
      </div>
      <div className="hero-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.jpg"
          alt="A contemporary model's face torn along a paper seam into Botticelli's Venus painting - the seam is the reveal."
          fetchPriority="high"
        />
      </div>
    </header>
  );
}
