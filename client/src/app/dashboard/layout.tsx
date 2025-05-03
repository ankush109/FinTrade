"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from ".././_middlewares/ReactQueryProvider";
import { SidebarProvider } from "../../context/SidebarContext";
import { ThemeProvider } from "../../context/ThemeContext";
import Sidebar from "./_components/sidebar";
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
              <div className="flex ">
                <div className="w-[20%]">
                  <Sidebar />
                </div>
                <div className="w-full">{children}</div>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
