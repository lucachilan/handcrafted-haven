import type { Metadata } from "next";
import { Caveat_Brush, Quicksand, Caesar_Dressing } from "next/font/google";
import "./globals.css";

/* ─── Metadata (SEO) ─── */
export const metadata: Metadata = {
  title: "Handcrafted Haven | Home",
  description: "Homepage for Handcrafted Haven",
  icons: {
    icon: "/favicon-light.webp",
  },
};

const caveatBrush = Caveat_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caveat-brush",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const caesarDressing = Caesar_Dressing({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caesar-dressing",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html lang="en" className={`${caveatBrush.variable} ${quicksand.variable} ${caesarDressing.variable}`} data-scroll-behavior="smooth">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}