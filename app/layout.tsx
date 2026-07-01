import type { Metadata, Viewport } from "next";
import { neueHaas, newsreader, splineMono } from "./fonts";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CookieConsent from "@/components/CookieConsent";
import Cursor from "@/components/Cursor";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://lioralabs.io"),
  title: {
    default: "Liora — An AI-native creative systems lab for fashion, beauty and design-led brands",
    template: "%s — Liora",
  },
  description:
    "Liora is an AI-native creative systems lab for fashion, beauty and design-led brands. AI can generate visuals. Only aesthetic intelligence can preserve a brand.",
  keywords: [
    "aesthetic intelligence",
    "creative systems",
    "fashion AI",
    "beauty AI",
    "brand systems",
    "creative direction",
  ],
  authors: [{ name: "Liora" }],
  openGraph: {
    title: "Liora — An AI-native creative systems lab for fashion, beauty and design-led brands",
    description:
      "An AI-native creative systems lab for fashion, beauty and design-led brands.",
    type: "website",
    locale: "en",
    siteName: "Liora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liora — An AI-native creative systems lab for fashion, beauty and design-led brands",
    description:
      "An AI-native creative systems lab for fashion, beauty and design-led brands.",
  },
};

export const viewport: Viewport = {
  themeColor: "#100E0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`js ${newsreader.variable} ${neueHaas.variable} ${splineMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1000] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-on-dark"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
        <Cursor />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
