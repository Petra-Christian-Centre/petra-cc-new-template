'use client';

import React, { useRef, useEffect, useState } from 'react';

interface AudioPlayerProps {
  url: string;
  isPlaying: boolean;
  onTimeUpdate: (progress: number) => void;
  onEnded: () => void;
  onError?: (error: string) => void;
}

export default function AudioPlayer({
  url,
  isPlaying,
  onTimeUpdate,
  onEnded,
  onError,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !hasError) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setHasError(true);
          if (onError) {
            onError('Failed to play audio. Please try using a platform link instead.');
          }
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, url, hasError, onError]);

  useEffect(() => {
    setHasError(false);
  }, [url]);

  const handleTimeUpdate = () => {
    if (audioRef.current && !hasError) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      onTimeUpdate(progress);
    }
  };

  const handleError = () => {
    setHasError(true);
    if (onError) {
      onError('Audio file not found. Please use a platform link to listen.');
    }
  };

  const handleLoadedMetadata = () => {
    setHasError(false);
  };

  return (
    <audio
      ref={audioRef}
      src={url}
      onTimeUpdate={handleTimeUpdate}
      onEnded={onEnded}
      onError={handleError}
      onLoadedMetadata={handleLoadedMetadata}
      className="hidden"
    />
  );
} 