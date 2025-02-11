import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Polytune",
  description: "Verification Pilot UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-sine-green flex justify-center items-center h-screen w-screen p-2">
        <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-black h-full w-full">
          {/* <header className="flex justify-end w-full absolute top-6 right-6">
            <span className="bg-sine-green px-8 border border-black rounded-xl">
              Polytune by SINE
            </span>
          </header> */}
          <main className="overflow-scroll max-w-6xl">{children}</main>
          <footer className="flex absolute bottom-6">
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
