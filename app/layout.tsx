import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jediraRegular = localFont({
  src: '../public/Fonts/JediraRegular.ttf',
  variable: '--font-jedira-regular'
});

const jediraItalic = localFont({
  src: '../public/Fonts/JediraItalic.ttf',
  variable: '--font-jedira-italic'
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tribepetraworldministry.com'),
  title: {
    default: 'Tribe Petra Ministry World',
    template: '%s | Tribe Petra Ministry World'
  },
  description: 'Transforming lives through divine encounters and spiritual growth. Join our community for life-changing messages, programs, and events.',
  keywords: ['Tribe Petra', 'Ministry', 'Christian', 'Faith', 'Spiritual Growth', 'Church', 'Religious Community', 'Worship'],
  authors: [{ name: 'Tribe Petra Ministry' }],
  creator: 'Tribe Petra Ministry',
  publisher: 'Tribe Petra Ministry World',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tribepetraworldministry.com',
    siteName: 'Tribe Petra Ministry World',
    title: 'Tribe Petra Ministry World',
    description: 'Transforming lives through divine encounters and spiritual growth. Join our community for life-changing messages, programs, and events.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tribe Petra Ministry World',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tribe Petra Ministry World',
    description: 'Transforming lives through divine encounters and spiritual growth. Join our community for life-changing messages, programs, and events.',
    images: ['/twitter-image.jpg'],
    creator: '@tribepetraworldministry',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jediraRegular.variable} ${jediraItalic.variable} ${inter.variable} antialiased`}
      >
        <div className="md:px-[72px] md:pt-11">
          <Navbar />
        </div>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
