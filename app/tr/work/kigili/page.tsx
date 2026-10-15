import type { Metadata } from "next";
import KigiliCase from "@/components/KigiliCase";
import LangScope from "@/components/LangScope";

export const metadata: Metadata = {
  title: "Kiğılı Signature · Editoryal Sistem",
  description:
    "Liora, Kiğılı Signature için editoryal bir brief'i seri hâlinde çalıştırdı: tek bir premium odada 50 parça, tek akıştan editoryal ve e-ticaret görselleri, üç günde.",
  alternates: {
    canonical: "/tr/work/kigili",
    languages: { en: "/work/kigili", tr: "/tr/work/kigili" },
  },
  // NOTE: kept out of search until the placeholder frames are replaced.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Kiğılı Signature — Editoryal, seri hâlinde",
    description: "50 parça, tek oda, üç gün: tek akıştan editoryal ve e-ticaret görselleri.",
    locale: "tr_TR",
  },
};

export default function KigiliCasePageTr() {
  return (
    <LangScope lang="tr">
      <KigiliCase lang="tr" />
    </LangScope>
  );
}
