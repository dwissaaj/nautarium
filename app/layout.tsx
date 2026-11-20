import type { Metadata } from "next";

import "@/styles/globals.css";

import Navbar from "@/components/navbar";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Nautarium",
  description: "A desktop environment for NLP and data analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh overflow-hidden">
        <Providers>
          <div className="flex h-dvh w-full overflow-hidden">
            <Navbar />

            <main className="min-w-0 flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}