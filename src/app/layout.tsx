import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import localFont from "next/font/local";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Polytune",
  description: "Verification Pilot UI",
};

const favoritFont = localFont({
  src: [
    {
      path: "../../public/fonts/favorit-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/favorit-medium.ttf",
      weight: "500",
      style: "bold",
    },
  ],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={favoritFont.className}>
      <body className="bg-sine-green flex justify-center items-center h-screen w-screen p-2">
        <div className="overflow-y-scroll flex flex-col justify-between items-center text-center bg-white rounded-2xl border border-black h-full w-full">
          <main className="lg:max-w-6xl flex flex-col items-center justify-center">
            <div className="my-12 w-xs md:w-lg text-center">
              <h1 className="-mb-2">Private Multi-Party Benchmark</h1>
              <h2>SINE Foundation</h2>
            </div>
            {children}
          </main>
          <footer className="flex items-end pb-6 pt-12">
            <a href="https://sine.foundation" target="_blank" rel="noreferrer">
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
    </html>
  );
}
