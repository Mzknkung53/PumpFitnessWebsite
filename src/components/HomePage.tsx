"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Branches } from "./Branches";
import { Prices } from "./Prices";
import { Equipment } from "./Equipment";
import { Gallery } from "./Gallery";
import { Reviews } from "./Reviews";
import { FAQ } from "./FAQ";
import { Cta } from "./Cta";
import { Footer } from "./Footer";

export function HomePage() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Branches />
        <Prices />
        <Equipment />
        <Gallery />
        <Reviews />
        <FAQ />
        <Cta />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
