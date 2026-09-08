import localFont from "next/font/local";
import { Newsreader, Spline_Sans_Mono } from "next/font/google";

/**
 * Display — Newsreader (book-serif for craft & authorship).
 * Production target is Canela; Newsreader is the launch face named in the brief.
 * Italic is rationed — reserved for the words that carry the soul.
 */
export const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  adjustFontFallback: false,
});

/**
 * Mono — Spline Sans Mono (data, meta, index). Exact match to the brief.
 */
export const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

/**
 * UI / body — Neue Haas Display (supplied locally).
 * The quiet contemporary grotesque for systems and clarity.
 */
export const neueHaas = localFont({
  display: "swap",
  variable: "--font-ui",
  // WOFF2, not TTF: same faces, ~75% smaller. Every declared face is
  // preloaded, so each one sits on the critical path — only the weights the
  // site actually uses are listed here (Thin 200 and Black 900 were unused,
  // and their .woff2 masters stay in /fonts if they are ever needed).
  src: [
    { path: "../fonts/NeueHaasDisplayLight.woff2", weight: "300", style: "normal" },
    { path: "../fonts/NeueHaasDisplayRoman.woff2", weight: "400", style: "normal" },
    { path: "../fonts/NeueHaasDisplayMedium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/NeueHaasDisplayBold.woff2", weight: "700", style: "normal" },
  ],
});
