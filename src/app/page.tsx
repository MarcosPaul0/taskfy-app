"use client";

import { Footer } from "./components/Footer";
import { Functionalities } from "./components/Functionalities";
import { Header } from "@taskfy/app/components/Header";
import { Hero } from "@taskfy/app/components/Hero";
import { Platform } from "@taskfy/app/components/Platform";
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
