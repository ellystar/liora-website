import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Tension from "@/components/Tension";
import Signature from "@/components/Signature";
import WhatWeBuild from "@/components/WhatWeBuild";
import FeaturedWork from "@/components/FeaturedWork";
import Horizon from "@/components/Horizon";
// import Manifesto from "@/components/Manifesto"; // temporarily removed
import BuiltBy from "@/components/BuiltBy";
import Answers from "@/components/Answers";
import Close from "@/components/Close";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Tension />
        {/* <Manifesto /> — temporarily removed */}
        <WhatWeBuild />
        <FeaturedWork />
        <Horizon />
        <BuiltBy />
        <Answers />
        <Signature />
        <Close />
      </main>
      <Footer />
    </>
  );
}
