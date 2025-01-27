'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  {
    src: '/path-to-left-image.jpg',
    alt: 'Worship service',
  },
  {
    src: '/path-to-center-image.jpg',
    alt: 'Worship experience',
    overlay: 'Total Immersion, June 2025',
  },
  {
    src: '/path-to-right-image.jpg',
    alt: 'Musician worship',
  },
];

const ImageSlider = () => {
  return (
    <div className="w-full h-[600px] relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2.2,
          },
          1024: {
            slidesPerView: 2.5,
          },
        }}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />
              {image.overlay && (
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {image.overlay}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider; 