'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const ImageSlider = () => {
  // Add your event images to the public folder with these names 
  // or update the paths below to match your existing images
  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/8047028/pexels-photo-8047028.jpeg',
      title: 'Preaching The Word',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/8047028/pexels-photo-8047028.jpeg',
      title: 'Total Immersion, June 2025',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/8047028/pexels-photo-8047028.jpeg',
      title: 'Worship Experience',
    },    
  ];

  return (
    <section className="relative bg-black px-2 py-8 md:py-16 w-screen left-[50%] right-[50%] mx-[-50vw]">
      <div className="container mx-auto">
        <Swiper
          modules={[Pagination, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView={1.6}
          spaceBetween={0}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet !w-2 !h-2 !rounded-full mx-1',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-white',
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.8,
            },
            768: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 2.5,
            },
          }}
          className="w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="pb-10">
              <div className="relative rounded-xl overflow-hidden h-[450px] md:h-[500px] border border-gray-800">
                <div className="w-full h-full relative">
                  {/* Using relative path - replace with your actual image paths */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Label overlay at bottom */}
                <div className="absolute bottom-0 left-0 w-full">
                  <div className="flex justify-center items-center py-2">
                    <div className="text-white bg-black/50 backdrop-blur-sm px-4 py-1 rounded-full text-xs md:text-sm">
                      <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                      {slide.title}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom pagination */}
        <div className="swiper-pagination flex justify-center items-center mt-6"></div>

        {/* Custom Styles */}
        <style jsx global>{`
          .swiper-slide {
            transition: all 0.3s ease;
            opacity: 0.6;
            transform: scale(0.8);
          }
          .swiper-slide-active {
            opacity: 1;
            transform: scale(1);
            z-index: 2;
          }
          .swiper-pagination {
            position: relative !important;
          }
          .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background: white;
          }
        `}</style>
      </div>
    </section>
  );
};

export default ImageSlider;