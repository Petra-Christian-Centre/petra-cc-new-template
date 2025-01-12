'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AudioPlayer from './AudioPlayer';

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
    <div className="w-full max-w-7xl mx-auto p-8 bg-white rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 relative">
            <Image
              src="/Images/headphones-icon.png"
              alt="Listen Now"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-semibold">Listen Now</h2>
        </div>
        <p className="text-gray-600 max-w-md">
          Ditch the low life and dive into the deep end, exploring the possibilities of your new life in Christ
        </p>
      </div>

      {/* Sermons List */}
      <div className="space-y-4">
        {sermons.map((sermon) => (
          <div
            key={sermon.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {/* Thumbnail */}
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={sermon.thumbnail}
                alt={sermon.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Sermon Info */}
            <div className="flex-grow">
              <h3 className="font-semibold">{sermon.title}</h3>
              <p className="text-sm text-gray-500">{sermon.preacher}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
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
              className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center text-white hover:bg-[#6D28D9] transition-colors"
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