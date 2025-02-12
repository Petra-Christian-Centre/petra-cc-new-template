import { PlayCircleIcon } from '@heroicons/react/16/solid'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import CalendarIcon from './icons/CalendarIcon'

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-custom-gray px-4 py-8 md:py-16">
      
        <div className='flex-1 min-h-full mt-[51px] sm:mt-0 sm:pl-[72px] sm:pt-[154px]'>
          <div className="space-y-6 md:max-w-2xl">
            <h1 className="text-center sm:text-left text-[72px] leading-[80px] font-jedira-regular">
              Tribe Petra
              <br />
              Ministry World
            </h1>
            
            <p className="text-lg md:mt-4 hidden md:block">
              Led by Pastor Ayo Ajani
            </p>

            {/* Apply Now Section */}
            <div className=" bg-gray-300 md:bg-white px-1 flex rounded-[32px] md:rounded-full md:hidden flex-col items-start">
              <span className="px-4 py-4 text-center md:text-left w-full">
                Be a part of Tribe Petra School of Ministry
              </span>

              <Link 
                href="/apply"
                className="w-full bg-white text-center rounded-[32px] p-2 flex items-center justify-center"
              >
                  <span className='font-semibold'>Apply Now</span>
                  <ArrowRightIcon className="w-4 h-4 text-red-500 mx-4" />               
              </Link>
              
            </div>
            
            <div className="max-w-[535px] hidden bg-white sm:flex items-center justify-between rounded-full p-2 shadow-sm">
              <span className="px-6 text-gray-800 bg-gray-100 rounded-full py-2">
                Be a part of Tribe Petra School of Ministry
              </span>
              
              <Link 
                href="/apply"
                className="inline-flex items-center font-semibold bg-white hover:bg-gray-50 text-black font-medium px-6 py-2 rounded-full transition-colors"
              >
                Apply Now
                <ArrowRightIcon className="w-5 h-5 ml-2 text-red-500" />
              </Link>
            </div>
          </div>
        </div>
        <div className='flex-1 flex min-h-full p-2'>
          <div className=' w-full h-full pt-[72px] flex justify-center'>
            <div className="relative w-[272px] h-[273px] bg-teal-700 rounded-3xl p-4">
              <div className='flex justify-between items-center'>                  
                <div className="w-24 h-24 rounded-full overflow-hidden g-gray-200">
                  <Image src="/images/pst-ayo-a-mini.png" alt="Pastor Ayo" width={84} height={84} />
                </div>
                  
                <div className="size-[70px] bg-teal-600/30 -mt-4 rounded-2xl flex items-center justify-center">
                  <span className="text-teal-200 font-semibold text-2xl font-jedira-regular">a.a</span>
                </div>                    
              </div>
              
              
              <Link href="/" className="absolute bottom-12 text-white text-2xl font-medium">
                Visit Pastor Ayo&apos;s<br />Website
              </Link>
            </div>
          </div>

          <div className='w-full h-full flex'>
            <div className='space-y-4'>
              <div className="relative w-[272px] h-[273px] bg-[#4A4A4A] rounded-3xl p-4">
                <div className='flex justify-between items-center'>                  
                  <div className="">
                    
                  </div>
                                
                  <span className='size-[72px] bg-[#676565] flex justify-center items-center rounded-2xl'>
                  <PlayCircleIcon className='size-8 text-white opacity-75' />
                </span>                   
                </div>
                            
                <Link href="/" className="absolute bottom-4 text-white text-2xl font-medium">
                  Latest<br />Sermon
                </Link>
              </div>
              
              <div className="relative w-[272px] h-[273px] bg-[#E86C4F] rounded-3xl p-4">
                <div className='flex justify-between items-center'>                  
                  <div className="">
                    
                  </div>
                                
                  <span className='size-[72px] bg-[#FF7C54] flex justify-center items-center rounded-2xl'>
                  <CalendarIcon className="w-8 h-8" />
                </span>                   
                </div>
                            
                <Link href="/" className="absolute bottom-4 text-white text-2xl font-medium">
                  Latest<br />Sermon
                </Link>
              </div>
            </div>
          </div>
        </div>
      
    </section>
  )
}

export default Hero 