'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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

export default function SermonSlider() {
  return (
    <div className="relative overflow-hidden">
      <style jsx global>
        {`
          .swiper {
            width: 100%;
            height: 100%;
          }
          .swiper-wrapper {
            display: flex;
            align-items: stretch;
          }
          .swiper-slide {
            width: 535px !important;
            height: auto;
          }
          .swiper-button-prev,
          .swiper-button-next {
            display: none;
          }
        `}
      </style>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView="auto"
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next',
        }}
        className="w-full"
      >
        {sermonData.map((sermon, index) => (
          <SwiperSlide key={index}>
            <div className="relative group">
              <div className="relative rounded-lg overflow-hidden md:w-[535px] w-[300px] md:h-[286px] h-[150px]">
                <Image
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-sm">
                  {sermon.duration}
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-[#FF6B4A] text-lg">{sermon.date}</h4>
                {/* <h3 className="text-xl font-bold mt-2">{sermon.title}</h3> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-end gap-4 mt-8">
        <button className="custom-swiper-button-prev w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black transition-colors group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" className="group-hover:stroke-white">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="custom-swiper-button-next w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black transition-colors group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" className="group-hover:stroke-white">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
} 