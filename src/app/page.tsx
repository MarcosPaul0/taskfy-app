"use client";

import { Footer } from "@taskfy/components/landingPage/Footer";
import { Functionalities } from "@taskfy/components/landingPage/Functionalities";
import { Header } from "@taskfy/components/landingPage/Header";
import { Hero } from "@taskfy/components/landingPage/Hero";
import { Platform } from "@taskfy/components/landingPage/Platform";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function LandingPage() {
  return (
    <main
      className={`
        ${poppins.className} flex min-h-screen flex-col
        bg-gradient-to-bl from-zinc-900 to-zinc-950 
      `}
    >
      <Header />
      <Hero />
      <Functionalities />
      <Platform />
      <Footer />
    </main>
  );
}
