import React from 'react';
import Image from 'next/image';

const BooksSection = () => {
  const books = [
    {
      id: 1,
      title: "Abba Father",
      author: "Pastor Ayo Ajani",
      image: "/images/book-thumbnail-1.png"
    },
    {
      id: 2,
      title: "It's Time to GROW UP!",
      author: "Pastor Ayo Ajani",
      image: "/images/book-thumbnail-2.png"
    },
    {
      id: 3,
      title: "I am Mary: The Impossible",
      author: "Adeola Ajani",
      image: "/images/book-thumbnail-3.png"
    }
    ];

  return (
    <section className="py-16 px-4 md:pt-48">
      <div className="flex w-full justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative md:w-[600px] min-w-3xl">
        {books.map((book, index) => (
          <div key={book.id} className={`relative ${index === 1 ? 'md:-mt-[140px]' : index === 0 ? 'md:-mt-10 md:-rotate-6' : 'md:-mt-10 md:rotate-6'}`}>            
            <Image
              src={book.image}
              alt={book.title}
              width={300}
              height={400}
              className="w-full h-auto  rounded-md"
            />
          </div>
        ))}                      
      </div>

      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-orange-500 uppercase font-bold tracking-wide mb-2">MISSION</h2>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-jedira-regular mb-6">
            To make all men<br />
            <span className="flex items-center justify-center gap-2">
              see <span className="text-black">- Jesus</span>
            </span>
          </h1>
          
          <p className="text-gray-700 max-w-[33rem] mx-auto">
            We are on a mission to reveal Jesus to the world. By Building
            Jesus communities and influencing change in the word through
            the transformative power of the word
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <button className="bg-gradient-to-r from-[#F27666] via-[#A835A4] to-[#7F408C] hover:opacity-90 rounded-full text-white px-6 py-3 font-medium transition-opacity duration-300"
            tabIndex={0}
            aria-label="Get a book">
            Get a book
          </button>
          </div>          
      </div>
    </section>
  );
};

export default BooksSection; 