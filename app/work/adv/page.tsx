import type { Metadata } from "next";
import AdvCase from "@/components/AdvCase";

export const metadata: Metadata = {
  title: "ADV · Visual Launch System",
  description:
    "How Liora launched a 250-product fashion brand for ADV (Orka Holding) in 72 hours — no photoshoot — with a reusable, AI-native visual launch system.",
  openGraph: {
    title: "ADV — Launching a brand in 72 hours",
    description:
      "A 250-product launch in three days, built as a reusable visual system the brand keeps using.",
    images: ["/adv-hero.jpg"],
  },
};

export default function AdvCasePage() {
  return <AdvCase />;
}
