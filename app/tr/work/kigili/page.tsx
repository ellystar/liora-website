import type { Metadata } from "next";
import KigiliCase from "@/components/KigiliCase";
import LangScope from "@/components/LangScope";

export const metadata: Metadata = {
  title: "Kiğılı Signature · Editoryal Sistem",
  description:
    "Liora, Kiğılı Signature için bir premium çekimin yüzünü, setini, styling’ini ve yönetmenliğini tek bir sisteme dönüştürdü ve 50 parçaya üç günde uyguladı.",
  alternates: {
    canonical: "/tr/work/kigili",
    languages: { en: "/work/kigili", tr: "/tr/work/kigili" },
  },
  // NOTE: kept out of search until the placeholder frames are replaced.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Kiğılı Signature — Editoryal, seri hâlinde",
    description: "Sistem olarak çalışan bir premium çekim: 50 parça, editoryal ve e-ticaret, üç günde.",
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
