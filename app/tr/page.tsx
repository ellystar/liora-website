import type { Metadata } from "next";
import LangScope from "@/components/LangScope";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Tension from "@/components/Tension";
import Signature from "@/components/Signature";
import WhatWeBuild from "@/components/WhatWeBuild";
import FeaturedWork from "@/components/FeaturedWork";
import Horizon from "@/components/Horizon";
import BuiltBy from "@/components/BuiltBy";
import Answers from "@/components/Answers";
import Close from "@/components/Close";
import Footer from "@/components/Footer";

const TITLE =
  "Liora — Moda, güzellik ve tasarım odaklı markalar için yapay zekâ temelli yaratıcı sistemler laboratuvarı";
const DESCRIPTION =
  "Liora; moda, güzellik ve tasarım odaklı markalar için yapay zekâ temelli bir yaratıcı sistemler laboratuvarı. Yapay zekâ görsel üretebilir. Bir markayı ancak estetik zekâ koruyabilir.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/tr", languages: { en: "/", tr: "/tr" } },
  openGraph: { title: TITLE, description: DESCRIPTION, locale: "tr_TR", type: "website", siteName: "Liora" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function HomeTr() {
  return (
    <LangScope lang="tr">
      <Nav lang="tr" />
      <main id="main">
        <Hero lang="tr" />
        <Tension lang="tr" />
        <WhatWeBuild lang="tr" />
        <FeaturedWork lang="tr" />
        <Horizon lang="tr" />
        <BuiltBy lang="tr" />
        <Signature lang="tr" />
        <Answers lang="tr" />
        <Close lang="tr" />
      </main>
      <Footer lang="tr" />
    </LangScope>
  );
}
