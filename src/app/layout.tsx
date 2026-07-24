import type { Metadata } from "next";
import "./globals.css";

/* ─── Metadata (SEO) ─── */
export const metadata: Metadata = {
  title: "Handcrafted Haven | Home", 
  description: "Homepage for Handcrafted Haven",
  icons: {
    icon: "/favicon-light.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
