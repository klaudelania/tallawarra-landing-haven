import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export const VideoMuteButton = () => {
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay

  useEffect(() => {
    // Find all video elements and apply mute state
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = isMuted;
    });
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Button
      onClick={toggleMute}
      variant="outline"
      size="sm"
      className="bg-white/20 backdrop-blur-lg border border-white/60 text-white hover:bg-white/30 hover:text-white transition-all duration-300"
    >
      {isMuted ? (
        <>
          <VolumeX className="h-4 w-4 mr-2" />
          Audio
        </>
      ) : (
        <>
          <Volume2 className="h-4 w-4 mr-2" />
          Audio
        </>
      )}
    </Button>
  );
};