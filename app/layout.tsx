import type { Metadata } from "next";
import { Inter, Playfair_Display, Alegreya } from "next/font/google";
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

const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
  display: "swap",
});

/* ── UPDATE: set SITE_URL to the production domain before going live ─────── */
const SITE_URL = 'https://www.parklandbytheriver.com.my';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Parkland By The River | Modern Apartment in Johor Bahru',
  description:
    'Discover Parkland By The River, a modern residential development in Johor Bahru featuring premium facilities, spacious layouts, and a strategic location.',
  keywords: [
    'Parkland By The River',
    'apartment Johor Bahru',
    'condo Johor Bahru',
    'new property launch',
    'freehold property',
    'new apartment Johor Bahru',
    'family-friendly apartment',
    'residential property Johor',
    'freehold apartment Johor',
    'riverside apartment Johor',
    'waterfront condo Johor',
  ],
  authors: [{ name: 'Parkland Group' }],
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type:        'website',
    locale:      'en_MY',
    url:         SITE_URL,
    siteName:    'Parkland By The River',
    title:       'Parkland By The River | Modern Apartment in Johor Bahru',
    description: 'Discover Parkland By The River, a modern residential development in Johor Bahru featuring premium facilities, spacious layouts, and a strategic location.',
    images: [
      {
        url:    '/assets/parkland/images/hero-render.jpg',
        width:  1200,
        height: 630,
        alt:    'Parkland By The River — modern residential development in Johor Bahru',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Parkland By The River | Modern Apartment in Johor Bahru',
    description: 'Discover Parkland By The River, a modern residential development in Johor Bahru featuring premium facilities, spacious layouts, and a strategic location.',
    images:      ['/assets/parkland/images/hero-render.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${alegreya.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-alegreya">
        <PageLoader />
        <HashScrollHandler />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
