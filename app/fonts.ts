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
  src: [
    { path: "../fonts/NeueHaasDisplayThin.ttf", weight: "200", style: "normal" },
    { path: "../fonts/NeueHaasDisplayLight.ttf", weight: "300", style: "normal" },
    { path: "../fonts/NeueHaasDisplayRoman.ttf", weight: "400", style: "normal" },
    { path: "../fonts/NeueHaasDisplayMedium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/NeueHaasDisplayBold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/NeueHaasDisplayBlack.ttf", weight: "900", style: "normal" },
  ],
});
