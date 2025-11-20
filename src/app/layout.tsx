import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import localFont from "next/font/local";
import { ReactNode } from "react";
import ScrollToTop from "@/components/ScrollToTopWrapper";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Polytune",
  description: "Verification Pilot UI",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Add weights you want to use
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <ScrollToTop>
        <body className="bg-sine-green flex justify-center items-center h-screen w-screen p-2">
          <div className="overflow-y-scroll flex flex-col justify-between items-center text-center bg-white rounded-2xl border border-black h-full w-full">
            <main className="lg:max-w-6xl flex flex-col items-center justify-center">
              <div className="my-12 text-center">
                <h1>Private Multi-Party Benchmarking</h1>
                <h2>SINE Foundation</h2>
              </div>
              {children}
            </main>
            <footer className="flex items-end pb-6 pt-12">
              <a
                href="https://sine.foundation"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/sine-logo.svg"
                  alt="SINE logo"
                  width={100}
                  height={100}
                />
              </a>
            </footer>
          </div>
        </body>
      </ScrollToTop>
    </html>
  );
}
