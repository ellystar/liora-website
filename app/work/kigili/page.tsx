import type { Metadata } from "next";
import KigiliCase from "@/components/KigiliCase";

export const metadata: Metadata = {
  title: "Kiğılı Signature · Editorial System",
  description:
    "How Liora ran an editorial brief as a batch for Kiğılı Signature — 50 pieces in one premium room, editorial and e-commerce from one flow, in three days.",
  alternates: {
    canonical: "/work/kigili",
    languages: { en: "/work/kigili", tr: "/tr/work/kigili" },
  },
  // NOTE: kept out of search until the placeholder frames are replaced.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Kiğılı Signature — Editorial, by the batch",
    description:
      "50 pieces, one room, three days — editorial and e-commerce from one flow.",
  },
};

export default function KigiliCasePage() {
  return <KigiliCase />;
}
