import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import HashScrollHandler  from "@/components/motion/HashScrollHandler";
import PageLoader         from "@/components/motion/PageLoader";
import WhatsAppButton     from "@/components/ui/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parkland By The River | Permas Jaya Johor",
  description:
    "Experience riverside living like never before. Parkland By The River — a freehold serviced apartment in the heart of Permas Jaya, Johor Bahru. 8km to CIQ & RTS.",
  keywords: [
    "Parkland By The River",
    "Permas Jaya",
    "Johor Bahru property",
    "freehold serviced apartment",
    "CIQ",
    "RTS Link",
    "riverside living",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <PageLoader />
        <HashScrollHandler />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
