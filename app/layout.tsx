import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import Footer from "@/components/Footer";
import Navigation from '@/components/Navigation'

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
  title: "Your Site Name",
  description: "Your site description",
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
          <Navigation />
        </div>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
