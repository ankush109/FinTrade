"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from ".././_middlewares/ReactQueryProvider";
import { SidebarProvider } from "../../context/SidebarContext";
import { ThemeProvider } from "../../context/ThemeContext";
import Sidebar from "./_components/sidebar";
import DashboardNav from "./_components/DashboardNav";
const inter = Inter({ subsets: ["latin"] });
const MAX_TOAST_LIMIT = 1;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>FinTrade</title>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider>
            <SidebarProvider>
              <div className="flex max-h-screen overflow-hidden bg-gray-100 dark:bg-[#1F214A]">
                <div className="w-[20%] hidden lg:block">
                  <Sidebar />
                </div>
                <div className="w-full   overflow-auto">
                  <div className="bg-[#696FFB0A]">
                    <DashboardNav />
                  </div>
                  <div>{children}</div>
                </div>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
