import type { Metadata } from "next";
import { Faculty_Glyphic, Nunito } from "next/font/google";
import "./globals.css";
import StarField from "@/components/StarField";

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-faculty-glyphic",
  weight: "400",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${facultyGlyphic.variable} ${nunito.variable}`}>
      <body>
        {children}
        <StarField {...STARFIELD_CONFIG} />
      </body>
    </html>
  );
}
