'use client'
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './custom-swiper.css';
import 'swiper/css';
import Image from 'next/image';

type Slide = {
  id: number;
  image: string;
  title: string;
};

type CustomSwiperProps = {
  slides: Slide[];
};

const CustomSwiper: FC<CustomSwiperProps> = ({ slides }) => {
  return (
    <Swiper
      loop={true}
      centeredSlides={true}
      slidesPerView={1.7}
      spaceBetween={25}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className="custom-swiper w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="custom-swiper-slide"></div>
            <Image src={slide.image} alt={slide.title} className="custom-swiper-image" fill sizes="(max-width: 900px) 100vw, 70vw" />
            <div className="custom-swiper-overlay">
              <span className="custom-swiper-title">{slide.title}</span>
            </div>      
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper