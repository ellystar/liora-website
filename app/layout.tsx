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

// Organization / ProfessionalService schema — helps search engines and AI
// agents connect "Liora Labs" / "Liora" to the brand and understand what it
// does (services, founders, expertise) without guessing. Strengthens branded
// search, knowledge/brand cards, and answer-engine (AEO) understanding.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Liora Labs",
  alternateName: "Liora",
  url: "https://lioralabs.io",
  logo: "https://lioralabs.io/icon.png",
  description:
    "An AI-native creative systems lab for fashion, beauty and design-led brands.",
  slogan: "Scale without losing soul.",
  email: "info@lioralabs.io",
  areaServed: "Worldwide",
  knowsAbout: [
    "AI-native visual production",
    "Fashion and beauty imagery",
    "Brand visual systems",
    "Creative direction",
    "Campaign and commerce imagery",
    "AI image and video generation",
  ],
  founder: [
    {
      "@type": "Person",
      name: "Melis Dogan",
      jobTitle: "Co-Founder · Creative Director",
    },
    {
      "@type": "Person",
      name: "Elif Yildiz",
      jobTitle: "Co-Founder · Product Manager",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/liora1/",
    "https://www.instagram.com/lioralabs.io/",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Visual Systems",
          description:
            "On-brand imagery and video systems for catalog, campaign and commerce.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Campaign & Commerce",
          description:
            "Turning brand imagery into a connected campaign and commerce ecosystem.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Creative Residency",
          description: "An external creative systems team, embedded long-term.",
        },
      },
    ],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
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
