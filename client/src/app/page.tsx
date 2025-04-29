// @ts-nocheck
"use client";

import Footer from "./Footer";
import SectionConsult from "./SectionConsult";
import SectionHero from "./SectionHero";
import SectionProcess from "./SectionProcess";
import SectionTrust from "./SectionTrust";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000, // 5 minutes
    },
  },
});
export default function Home() {
  return (
    <div>
      <SectionHero />
      {/* <SectionTrust />
      <SectionProcess />
      <Footer /> */}
    </div>
  );
}
