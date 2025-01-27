import { PlayCircleIcon } from '@heroicons/react/16/solid'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import CalendarIcon from './icons/CalendarIcon'

const Hero = () => {
  return (
    <section className="min-h-screen bg-custom-gray px-4 py-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Desktop and Mobile Layout */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          {/* Left Section */}
          <div className="space-y-6 md:max-w-2xl">
            <h1 className="text-center sm:text-left text-[72px] leading-[80px] md:text-6xl font-jedira-regular">
              Tribe Petra
              <br />
              Ministry World
            </h1>
            
            <p className="text-lg md:mt-4 hidden md:block">
              Led by Pastor Ayo Ajani
            </p>

            {/* Apply Now Section */}
            <div className="bg-gray-300 md:bg-white px-1 flex rounded-[32px] md:rounded-full md:inline-flex flex-col md:flex-row items-start md:p-2 md:mt-8">
              <span className="px-4 py-4 text-center md:text-left w-full">
                Be a part of Tribe Petra School of Ministry
              </span>

              <Link 
                href="/apply"
                className="w-full bg-white text-center rounded-[32px] p-2 flex items-center justify-center"
              >
                  <span className='font-semibold'>Apply Now</span>
                  <ArrowRightIcon className="w-4 h-4 text-red-500 mx-4" />
                {/* <span className='bg-green-400 w-full '>
                
                </span> */}
              </Link>
              
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 md:mt-0 md:w-[400px]">
            
            <Link href="/apply" className="bg-[#2F4F4F] p-6 h-[143px] rounded-2xl text-white md:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-medium">Visit Pastor Ayo's</h3>
                  <p className="text-2xl">Website</p>
                </div>
                <span className="text-2xl bg-[#3A7475] flex justify-center items-center font-bold rounded-lg size-[72px] font-jedira-regular">
                  a.a
                </span>
              </div>
            </Link>

            {/* Latest Sermon Card */}
            <Link href={"/..."} className="bg-[#4A4A4A] p-6 rounded-2xl text-white flex items-center justify-between">
              <p className="text-2xl">Lastest Sermon</p>
              <span className='size-[72px] bg-[#676565] flex justify-center items-center rounded-md'>
                <PlayCircleIcon className='size-8 opacity-75' />
              </span>
            </Link>

            {/* Upcoming Events Card */}
            <div className="bg-[#E86C4F] p-6 rounded-2xl text-white flex items-center justify-between h-[143px]">
              <p className="text-2xl">Upcoming Events</p>
               <span className='size-[72px] opacity-75 flex justify-center items-center rounded-md'>
                <CalendarIcon className="w-8 h-8" />
               </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 