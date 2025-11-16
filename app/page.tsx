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

const sermonData = [
  {
    title: "MYSTERIES OF THE KINGDOM",
    date: "SAT 19TH OCT",
    duration: "1:18:03",
    thumbnail: "/Images/mysteries.png",
  },
  {
    title: "MYSTERIES OF THE KINGDOM 2",
    date: "SAT 20TH OCT",
    duration: "1:18:03",
    thumbnail: "/Images/mysteries.png",
  },
  {
    title: "MYSTERIES OF THE KINGDOM 3",
    date: "SAT 21ST OCT",
    duration: "1:18:03",
    thumbnail: "/Images/mysteries.png",
  },
  {
    title: "MYSTERIES OF THE KINGDOM 4",
    date: "SAT 22ND OCT",
    duration: "1:18:03",
    thumbnail: "/Images/mysteries.png",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <ImageSlider />
      <MissionsSection />
      <ProgramsSection />
      <BooksSection />    
      <Sermons eyebrowText="SERMONS" title={['Latest', 'Messages ', 'From TPWMW']} subheading="Listen to the latest sermons from our church" sermonData={sermonData ?? []} />
      <Global hasImage={false} />
    </main>
  );
}
