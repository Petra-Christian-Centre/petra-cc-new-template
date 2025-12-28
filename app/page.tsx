import React from 'react';
import Hero from '@/components/Hero';
import ImageSlider from '@/components/ImageSlider';
import MissionsSection from '@/components/MissionsSection';
import ProgramsSection from '@/components/ProgramsSection';
import BooksSection from '@/components/BooksSection';
import Global from '@/components/Global';
import type { Metadata } from "next";
import Sermons from '@/components/Sermons';


export const metadata: Metadata = {
  title: 'Tribe Petra Ministry World',
  description: 'Welcome to Tribe Petra Ministry World - A place of divine encounters and spiritual transformation. Experience life-changing messages and programs.',
  openGraph: {
    title: 'Home | Tribe Petra Ministry World',
    description: 'Welcome to Tribe Petra Ministry World - A place of divine encounters and spiritual transformation. Experience life-changing messages and programs.',
  },
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <ImageSlider />
      <MissionsSection />
      <ProgramsSection />
      <BooksSection />    
      <Sermons eyebrowText="SERMONS" title={['Latest', 'Messages ', 'From TPWMW']} subheading="Listen to the latest sermons from our church" />
      <Global hasImage={true} />
    </main>
  );
}
