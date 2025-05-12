import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NewsSection = () => {
  // Sample news data
  const newsItems = [
    {
      id: 1,
      date: '24-10-2024',
      title: 'Petra Launches Kubwa Campus',
      description: 'We are on a mission to reveal Jesus to the world. By Building Jesus communities and influencing change in the word through the transformative power of the word',
      image: '/images/news/news-1.png',
      alt: 'Modern architectural building',
      link: '/news/news-1.png'
    },
    {
      id: 2,
      date: '24-10-2024',
      title: 'Petra Launches Kubwa Campus',
      description: 'We are on a mission to reveal Jesus to the world. By Building Jesus communities and influencing change in the word through the transformative power of the word',
      image: '/images/news/news-2.png',
      alt: 'Interior of a church with arches',
      link: '/news/news-2.png'
    },
    {
      id: 3,
      date: '24-10-2024',
      title: 'Petra Launches Kubwa Campus',
      description: 'We are on a mission to reveal Jesus to the world. By Building Jesus communities and influencing change in the word through the transformative power of the word',
      image: '/images/news/news-3.png',
      alt: 'Modern office building',
      link: '/news/news-3.png'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-orange-500 uppercase font-medium tracking-wide mb-2">LATEST</h2>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-jedira-regular mb-8">
            Tribe Petra Ministry News
          </h1>
          <p className="text-gray-700 max-w-3xl">
            We are on a mission to reveal Jesus to the world. By Building Jesus communities and influencing change in the word through the transformative power of the word
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-gray-500 mb-2">{item.date}</p>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                <div className="mt-auto">
                  <Link 
                    href={item.link}
                    className="inline-flex items-center text-black font-medium group"
                    tabIndex={0}
                    aria-label={`Read more about ${item.title}`}
                  >
                    Read more
                    <svg 
                      className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 