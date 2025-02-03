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
      <body>
        <div className="flex flex-col items-center h-screen pt-20 text-center">
          <main>
            <h1>Polytune</h1>
            {children}
          </main>
          <footer className="flex justify-center p-4 absolute bottom-0 w-full">
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
