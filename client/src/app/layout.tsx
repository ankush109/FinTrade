// @ts-nocheck
"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactQueryProvider from "./_middlewares/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const MAX_TOAST_LIMIT = 1;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= MAX_TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <html lang="en">
      <title>FinTrade</title>
      <body className={inter.className}>
        <ReactQueryProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{ duration: 5000 }}
            />
            {children}
          </LocalizationProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
