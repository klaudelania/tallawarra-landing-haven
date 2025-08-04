import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export const VideoMuteButton = () => {
  const [isMuted, setIsMuted] = useState(false);

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
      className="fixed top-20 right-4 z-50 bg-background/80 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
    >
      {isMuted ? (
        <>
          <VolumeX className="h-4 w-4 mr-2" />
          Unmute
        </>
      ) : (
        <>
          <Volume2 className="h-4 w-4 mr-2" />
          Mute
        </>
      )}
    </Button>
  );
};