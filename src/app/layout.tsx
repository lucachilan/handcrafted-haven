import type { Metadata } from "next";
import {
  Caveat_Brush,
  Quicksand,
  Caesar_Dressing,
  Spicy_Rice,
} from "next/font/google";
import "./globals.css";

/* ─── Metadata (SEO) ─── */
export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description: "Handcrafted goods made by independent artisans.",
  icons: {
    icon: "/favicon-light.webp",
  },
};

const caveatBrush = Spicy_Rice({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-spicy-rice",
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
    <html
      lang="en"
      className={`${caveatBrush.variable} ${quicksand.variable} ${caesarDressing.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
