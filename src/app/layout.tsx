import type { Metadata } from "next";
import { Faculty_Glyphic, Nunito } from "next/font/google";
import "./globals.css";
import { StarField } from "kaizen-lib/efectos";
import Providers from "./providers";

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
        <Providers>{children}</Providers>
        <StarField modo="fijo" color="#bb7fff" />
      </body>
    </html>
  );
}
