// @ts-nocheck
"use client";

import Details from "./(Sections)/Details";
import Details2 from "./(Sections)/Details2";
import FaqSection from "./(Sections)/FaqSection";
import Features from "./Features";
import Footer from "./Footer";
import SectionConsult from "./SectionConsult";
import SectionHero from "./(Sections)/SectionHero";
import SectionProcess from "./SectionProcess";
import SectionTrust from "./SectionTrust";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});
export default function Home() {
  return (
    <div>
      <SectionHero />
      <Details />
      <Details2 />
      <Features />
      <FaqSection />
      <Footer />
    </div>
  );
}
