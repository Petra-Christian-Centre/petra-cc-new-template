import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";

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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
