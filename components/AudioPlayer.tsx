'use client';

import React, { useRef, useEffect } from 'react';

interface AudioPlayerProps {
  url: string;
  isPlaying: boolean;
  onTimeUpdate: (progress: number) => void;
  onEnded: () => void;
}

export default function AudioPlayer({
  url,
  isPlaying,
  onTimeUpdate,
  onEnded,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, url]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      onTimeUpdate(progress);
    }
  };

  return (
    <audio
      ref={audioRef}
      src={url}
      onTimeUpdate={handleTimeUpdate}
      onEnded={onEnded}
      className="hidden"
    />
  );
} 