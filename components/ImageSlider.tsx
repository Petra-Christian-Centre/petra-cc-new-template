'use client'

import dynamic from 'next/dynamic';
import { ClientMotionDiv } from './ClientMotion';

const CustomSwiper = dynamic(() => import('./CustomSwiper'), { ssr: false });

const slides = [
  {
    id: 1,
    image: '/images/slides/slide-1.png',
    title: 'Preaching The Word',
  },
  {
    id: 2,
    image: '/images/slides/slide-2.png',
    title: 'Total Immersion, June 2025',
  },
  {
    id: 3,
    image: '/images/slides/slide-3.png',
    title: 'Worship Experience',
  },
];

const ImageSlider = () => {
  return (
    <ClientMotionDiv
      className="relative p-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <CustomSwiper slides={slides} />
    </ClientMotionDiv>
  );
};

export default ImageSlider;