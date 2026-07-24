import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handcrafted Haven – Discover Unique Artisan Products",
  description:
    "Handcrafted Haven connects artisans with those who appreciate the beauty of handmade goods. Explore unique pottery, textiles, jewelry, woodwork, and more from talented makers worldwide.",
  keywords: [
    "handcrafted",
    "artisan",
    "handmade",
    "unique products",
    "craft marketplace",
    "pottery",
    "jewelry",
    "textiles",
    "woodwork",
  ],
  openGraph: {
    title: "Handcrafted Haven – Discover Unique Artisan Products",
    description:
      "Connect with artisans who pour their passion into every piece. Shop handmade goods crafted with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
