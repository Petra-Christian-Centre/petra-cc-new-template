'use client'

import dynamic from 'next/dynamic';
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
    <section className="relative p-2">
      <CustomSwiper slides={slides} />
    </section>
  );
};

export default ImageSlider;