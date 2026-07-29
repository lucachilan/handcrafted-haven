import type { Metadata } from "next";
import { Caveat_Brush, Quicksand } from "next/font/google";
import "./globals.css";
import "./animation.module.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveatBrush.variable} ${quicksand.variable}`}>
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}