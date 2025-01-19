
"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SidebarProvider } from "../../context/SidebarContext"
import { ThemeProvider } from "../../context/ThemeContext"
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
                <ThemeProvider>
                    <SidebarProvider>

                        {children}


                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
