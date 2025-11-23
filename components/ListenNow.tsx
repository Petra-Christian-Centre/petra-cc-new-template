'use client';

import React from 'react';
import Image from 'next/image';
import { MdHeadsetMic } from 'react-icons/md';
import listenicon from "@/public/Images/listenicons.png"
import sermonsData from "@/data/sermons.json";

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  thumbnail: string;
  spotifyUrl?: string | null;
}

// Map JSON data to component structure
const sermons: Sermon[] = sermonsData.map((sermon, index) => ({
  id: String(index + 1),
  title: sermon.title,
  preacher: sermon.preacher || 'Pastor Ayo Ajani',
  date: sermon.date,
  duration: sermon.duration,
  thumbnail: sermon.thumbnail || '/Images/mysteries.png',
  spotifyUrl: sermon.spotifyUrl,
}));

export default function ListenNow() {
  const handlePlayClick = (sermon: Sermon) => {
    if (sermon.spotifyUrl) {
      window.open(sermon.spotifyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8 p-4 bg-white rounded-2xl">
      {/* Header */}
      <div className="flex md:flex-row flex-col md:items-center items-start justify-between mb-8">
        <div className="flex md:items-center gap-4">
          <div className="md:w-10 md:h-10 w-6 h-6 relative">
           <MdHeadsetMic color='#FA6C41' size={48}/>
          </div>
          <h2 className="md:text-[48px] text-[32px] font-jedira-regular text-black ml-4">Listen Now</h2>
        </div>
        <p className="text-gray-600 max-w-md md:mt-0 mt-6">
          Ditch the low life and dive into the deep end, exploring the possibilities of your new life in Christ
        </p>
      </div>

      {/* Sermons List */}
      <div className="space-y-4 bg-[#F7F8F8] md:py-10 py-2 md:px-10 px-2 rounded-[12px] mt-20">
        {sermons.map((sermon) => (
          <div
            key={sermon.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {/* Thumbnail */}
            <div className="relative md:w-14 md:h-14 w-6 h-6 flex-shrink-0">
              <Image
                src={listenicon}
                alt={sermon.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Sermon Info */}
            <div className="flex-grow">
              <h3 className="font-semibold text-black">{sermon.title}</h3>
              <p className="text-sm text-[#4F4F4F]">{sermon.preacher}</p>
              <div className="flex items-center gap-4 text-sm text-[#4F4F4F]">
                <span>{sermon.date}</span>
                <span>{sermon.duration}</span>
              </div>
            </div>

            {/* Play Button */}
            <button
              onClick={() => handlePlayClick(sermon)}
              disabled={!sermon.spotifyUrl}
              className="md:w-12 md:h-12 w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center text-white hover:bg-[#1ed760] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={sermon.spotifyUrl ? "Play on Spotify" : "Spotify link not available"}
            >
              <PlayIcon />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

const PlayIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
); 