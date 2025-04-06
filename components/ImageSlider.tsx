'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/8980982/pexels-photo-8980982.jpeg',
      title: 'Preaching The Word',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/7089617/pexels-photo-7089617.jpeg',
      title: 'Total Immersion, June 2025',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/8047028/pexels-photo-8047028.jpeg',
      title: 'Worship Experience',
    },
    // {
    //   id: 4,
    //   image: 'https://images.pexels.com/photos/8047028/pexels-photo-8047028.jpeg',
    //   title: 'Worship Experience',
    // },
    // {
    //   id: 5,
    //   image: 'https://images.pexels.com/photos/8047028/pexels-photo-8047028.jpeg',
    //   title: 'Worship Experience',
    // },
    // {
    //   id: 6,
    //   image: 'https://images.pexels.com/photos/8047028/pexels-photo-8047028.jpeg',
    //   title: 'Worship Experience',
    // },
    // {
    //   id: 7,
    //   image: 'https://images.pexels.com/photos/8980982/pexels-photo-8980982.jpeg',
    //   title: 'Preaching The Word',
    // },
  ];

  return (
    <section className="relative bg-custom-gray px-2 py-8 md:py-16 w-screen left-[50%] right-[50%] mx-[-50vw]">
      <div className="w-full">
        <Swiper
          modules={[Pagination]}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={24}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !w-8 !h-1 !rounded-full',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-white',
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full flex "
          
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className={index === activeIndex ? 'bg-green-500 flex-1' : 'bg-blue-500 w-[239px]'} >
              
                <div className={`bg-green- w-full h-[600px] rounded-2xl overflow-hidden`}></div>
                        
              {/* <div className="relative  h-[600px] rounded-2xl overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-full">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    {slide.title}
                  </p>
                </div>
              </div> */}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Styles for active slide scaling */}
        <style jsx global>{`
          .swiper-slide {
            transition: all 0.3s ease;
            opacity: 0.4;            
          }
          .swiper-slide-active {            
            transform: scaleX(2.15) !important;
            opacity: 1 !important;
            z-index: 2 !important;
          }
          .swiper-pagination {
            position: relative !important;
            margin-top: 2rem;
          }
          .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
          }
        `}</style>
      </div>
    </section>
  );
};

export default ImageSlider;