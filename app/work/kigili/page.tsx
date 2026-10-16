import type { Metadata } from "next";
import KigiliCase from "@/components/KigiliCase";

export const metadata: Metadata = {
  title: "Kiğılı Signature · Editorial System",
  description:
    "How Liora turned every part of a premium shoot — the face, the set, the styling and the direction — into one system for Kiğılı Signature, and ran it across 50 pieces in three days.",
  alternates: {
    canonical: "/work/kigili",
    languages: { en: "/work/kigili", tr: "/tr/work/kigili" },
  },
  openGraph: {
    title: "Kiğılı Signature — Editorial, by the batch",
    description:
      "A premium shoot, run as a system: 50 pieces, editorial and e-commerce, in three days.",
    images: ["/kigili-hero.jpg"],
  },
};

export default function KigiliCasePage() {
  return <KigiliCase />;
}
