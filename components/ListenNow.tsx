'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AudioPlayer from './AudioPlayer';
import { MdHeadsetMic } from 'react-icons/md';
import listenicon from "@/public/Images/listenicons.png"

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  audioUrl: string;
  thumbnail: string;
}

const sermons: Sermon[] = [
  {
    id: '1',
    title: 'There is a river - RC 24',
    preacher: 'Pastor Ayo Ajani',
    date: '25th July, 2024',
    duration: '2h:46m',
    audioUrl: '/audio/sample1.mp3', // Replace with actual audio URL
    thumbnail: '/Images/sermon-thumb.jpg', // Replace with actual thumbnail
  },
  {
    id: '2',
    title: 'Mysteries of the Kingdom',
    preacher: 'Pastor Ayo Ajani',
    date: '25th July, 2024',
    duration: '2h:46m',
    audioUrl: '/audio/sample2.mp3',
    thumbnail: '/Images/sermon-thumb.jpg',
  },
  {
    id: '3',
    title: 'Soul Safari',
    preacher: 'Pastor Ayo Ajani',
    date: '25th July, 2024',
    duration: '2h:46m',
    audioUrl: '/audio/sample2.mp3',
    thumbnail: '/Images/sermon-thumb.jpg',
  },
  {
    id: '4',
    title: 'But God- When mercy Steps in',
    preacher: 'Pastor Ayo Ajani',
    date: '25th July, 2024',
    duration: '2h:46m',
    audioUrl: '/audio/sample2.mp3',
    thumbnail: '/Images/sermon-thumb.jpg',
  },
  {
    id: '5',
    title: 'Sure Mercies of David',
    preacher: 'Pastor Ayo Ajani',
    date: '25th July, 2024',
    duration: '2h:46m',
    audioUrl: '/audio/sample2.mp3',
    thumbnail: '/Images/sermon-thumb.jpg',
  },
  // Add more sermons as needed
];

export default function ListenNow() {
  const [currentSermonId, setCurrentSermonId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSermon = sermons.find(sermon => sermon.id === currentSermonId);

  const handleTimeUpdate = (progress: number) => {
    setProgress(progress);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
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

            {/* Progress Bar (only for current sermon) */}
            {currentSermonId === sermon.id && (
              <div className="w-32 h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-[#7C3AED] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Play/Pause Button */}
            <button
              onClick={() => {
                setCurrentSermonId(sermon.id);
                setIsPlaying(!isPlaying);
              }}
              className="md:w-12 md:h-12 w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-white hover:bg-[#6D28D9] transition-colors"
            >
              {currentSermonId === sermon.id && isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Audio Player */}
      {currentSermon && (
        <AudioPlayer
          url={currentSermon.audioUrl}
          isPlaying={isPlaying}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      )}
    </div>
  );
}

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
); 