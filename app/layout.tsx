import type { Metadata } from "next";
import { Inter, Playfair_Display, Alegreya } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import HashScrollHandler  from "@/components/motion/HashScrollHandler";
import PageLoader         from "@/components/motion/PageLoader";
import WhatsAppButtonWrapper from "@/components/ui/WhatsAppButtonWrapper";

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
  title: 'Parkland By The River | Freehold Apartment in Permas Jaya',
  description:
    'Discover a freehold apartment in Permas Jaya with riverside living, modern facilities, and easy access to CIQ, RTS, and Johor Bahru city centre.',
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
  icons: {
    icon: '/icon.png',
  },
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
    title:       'Parkland By The River | Freehold Apartment in Permas Jaya',
    description: 'Discover a freehold apartment in Permas Jaya with riverside living, modern facilities, and easy access to CIQ, RTS, and Johor Bahru city centre.',
    images: [
      {
        url:    '/assets/parkland/images/hero-render.jpg',
        width:  1200,
        height: 630,
        alt:    'Parkland By The River — freehold apartment in Permas Jaya, Johor Bahru',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Parkland By The River | Freehold Apartment in Permas Jaya',
    description: 'Discover a freehold apartment in Permas Jaya with riverside living, modern facilities, and easy access to CIQ, RTS, and Johor Bahru city centre.',
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
        <WhatsAppButtonWrapper />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MCRK2TCVMH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MCRK2TCVMH');
        `}</Script>
      </body>
    </html>
  );
}
