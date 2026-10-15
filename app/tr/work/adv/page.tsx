import type { Metadata } from "next";
import AdvCase from "@/components/AdvCase";
import LangScope from "@/components/LangScope";

export const metadata: Metadata = {
  title: "ADV · Görsel Lansman Sistemi",
  description:
    "Liora, ADV (Orka Holding) için 250 ürünlük bir moda markasını tek bir çekim yapmadan 72 saatte yayına aldı; marka bu görsel lansman sistemini sonrasında da kullanmaya devam ediyor.",
  alternates: {
    canonical: "/tr/work/adv",
    languages: { en: "/work/adv", tr: "/tr/work/adv" },
  },
  openGraph: {
    title: "ADV — Bir marka, 72 saatte",
    description:
      "Üç günde 250 ürünlük bir lansman; markanın kullanmaya devam ettiği, tekrar kullanılabilir bir görsel sistem.",
    images: ["/adv-hero.jpg"],
    locale: "tr_TR",
  },
};

export default function AdvCasePageTr() {
  return (
    <LangScope lang="tr">
      <AdvCase lang="tr" />
    </LangScope>
  );
}
