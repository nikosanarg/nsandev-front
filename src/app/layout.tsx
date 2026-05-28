import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarField from "@/components/StarField";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const STARFIELD_CONFIG = {
  starCount: 120,
  maxStarSize: 1.4,
  twinkleChance: 1,
  twinkleMinDuration: 0.5,
  twinkleMaxDuration: 2.25,
  twinkleMinOpacity: 0.03,
  twinkleMaxOpacity: 1,
};

export const metadata: Metadata = {
  title: "nsande.v",
  description: "nsande's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <StarField {...STARFIELD_CONFIG} />
      </body>
    </html>
  );
}
