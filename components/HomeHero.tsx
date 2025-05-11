import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function HomeHero() {
  return (
    <div className="min-h-screen bg-gray-50">      
      <div className="relative h-screen flex items-center">        
        <div className="inset-0 bg-gradient-to-b from-transparent to-gray-50/10" />
                
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">            
            <h1 className="font-jedira-regular text-gray-800 text-6xl sm:text-7xl lg:text-8xl mb-6">
              Tribe Petra
              <br />
              Ministry World
            </h1>
            
            <p className="text-xl sm:text-2xl mb-8 text-gray-700">
              Led by Pastor Ayo Ajani
            </p>
            
            <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all">
              <p className="text-sm flex items-center text-gray-800 sm:text-base rounded-full bg-gray-50 p-4">
                Be a part of Tribe Petra School of Ministry                
              </p>
              <Link 
                href="/apply"
                className="ml-3 bg-white text-black font-bold transition-colors"
              >
                Apply Now
              </Link>
              <ArrowRightIcon className="w-4 h-4 text-red-500 mx-4" />
            </div>
          </div>
          
          <div className="absolute right-4 top-1/2 flex gap-4 -translate-y-1/2 space-y-4">            

            <div>
              <div className="bg-[#2F4F4F] flex flex-col justify-between text-white p-6 rounded-2xl w-64">
                <div className='flex justify-between'>
                    <Image
                    src="/images/pst-ayo-a-mini.png"
                    alt="Pastor Ayo"
                    width={50}
                    height={50}
                    className="rounded-full mb-4"
                  />
                  <div className='flex justify-center items-center font-jedira-regular font-bold size-16 bg-pt-green rounded-md bg'>
                    <span>a.a</span>
                  </div>
                </div>
              
                <h3 className="text-2xl mb-2">Visit Pastor Ayo&apos;s Website</h3>
                {/* <Link
                  href="https://ayo-ajani.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm hover:underline"
                >
                  Learn More
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link> */}
              </div>
            </div>
            
            <div className='flex flex-col gap-4'>
              <div className="bg-[#4D4D4D] size-[272px] text-white p-6 rounded-2xl w-64">
                <h3 className="text-2xl mb-2">Latest Sermon</h3>
                <div className="mt-4">
                  <Link
                    href="/sermons"
                    className="inline-flex items-center text-sm hover:underline"
                  >
                    Watch Now
                    <PlayCircleIcon className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-[#E9967A] text-white p-6 rounded-2xl w-64">
                <h3 className="text-2xl mb-2">Upcoming Events</h3>
                <Link
                  href="/events"
                  className="inline-flex items-center text-sm hover:underline"
                >
                  View Calendar
                  <CalendarIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
