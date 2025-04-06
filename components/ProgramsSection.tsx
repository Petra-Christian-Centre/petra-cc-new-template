import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProgramsSection = () => {
  const programs = [
    {
      id: 1,
      title: 'Rain Conference',
      description: 'We are on a mission to reveal Jesus to the world. By Building Jesus communities and influencing change in the word through the transformative power of the word',
      date: 'July 2025',
      status: 'next',
      image: '/images/programs-section-thumbnail.png',
      hasDetails: true
    },
    {
      id: 2,
      title: 'Total Immersion',
      date: 'Nov 3 2024',
      status: 'next',
      hasDetails: false
    },
    {
      id: 3,
      title: 'Kindle',
      date: 'Coming Soon',
      status: 'next',
      hasDetails: false
    },
    {
      id: 4,
      title: 'The Festival',
      date: 'Coming Soon',
      status: 'next',
      hasDetails: false
    },
    {
      id: 5,
      title: 'Look & Live',
      date: 'Coming Soon',
      status: 'next',
      hasDetails: false
    },
    {
      id: 6,
      title: 'Tribe Petra School of Ministry',
      date: 'Happening Now',
      status: 'active',
      hasDetails: false
    }
  ];

  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-jedira-regular mb-6">
            <span className="bg-gradient-to-tr from-white via-[#EBB2A0] to-white bg-clip-text text-transparent">
              You have <span>an</span><br />
              appointment <span>with God</span>
            </span>
          </h1>
        </div>
        
        <div className="mb-8">
          <h2 className="uppercase text-lg tracking-wider font-medium">PROGRAMS</h2>
        </div>

        <div className="space-y-6">
          {programs.map((program) => (
            <div key={program.id} className={program.hasDetails ? 'border-t border-gray-700 py-4' : 'md:pl-[150px]'}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {program.hasDetails && program.image && (
                  <div className="w-32 h-24 relative rounded-md overflow-hidden">
                    <Image 
                      src={program.image} 
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className={`flex-1 ${program.hasDetails ? '' : 'py-2'}`}>
                  <h3 className="text-2xl md:text-3xl font-jedira-regular mb-1">{program.title}</h3>
                  {program.description && (
                    <p className="text-gray-400 max-w-2xl mb-2">{program.description}</p>
                  )}
                  {program.hasDetails && (
                    <Link 
                      href={`/programs/${program.id}`} 
                      className="inline-flex items-center text-gray-300 group"
                      aria-label={`Learn more about ${program.title}`}
                      tabIndex={0}
                    >
                      <span className='font-bold'>LEARN MORE</span>
                      <span className='text-primary h-4 w-4 ml-1 transition-transform group-hover:translate-x-1'>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </Link>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {program.status === 'next' ? 'Next' : ''}
                  </span>
                  <div className="text-right">
                    {program.status === 'active' ? (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span>{program.date}</span>
                      </div>
                    ) : (
                      <span className={program.date === 'Coming Soon' ? 'text-gray-500' : ''}>{program.date}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection; 