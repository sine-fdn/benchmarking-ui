import type { Metadata } from "next";
import "./globals.css";

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
        <main className="flex items-center justify-center p-4 h-[calc(100vh-64px)]">
          {children}
        </main>
        <footer className="p-4 flex items-center justify-center w-full h-64px">
          SINE Foundation
        </footer>
      </body>
    </html>
  );
}
