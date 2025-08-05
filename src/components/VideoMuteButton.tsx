import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

// Extend window interface for Vimeo Player
declare global {
  interface Window {
    Vimeo?: {
      Player: new (element: HTMLIFrameElement) => {
        setVolume: (volume: number) => Promise<number>;
        getVolume: () => Promise<number>;
        pause: () => Promise<void>;
        play: () => Promise<void>;
      };
    };
  }
}

export const VideoMuteButton = () => {
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay

  useEffect(() => {
    // Wait for Vimeo player to load before controlling it
    const timer = setTimeout(() => {
      const iframe = document.querySelector('iframe[src*="vimeo.com"]') as HTMLIFrameElement;
      if (iframe && window.Vimeo) {
        const player = new window.Vimeo.Player(iframe);
        
        // Set volume based on mute state
        const volume = isMuted ? 0 : 0.7; // Use 0.7 for better audio control
        player.setVolume(volume).catch(console.error);
      }
    }, 1500); // Wait 1.5 seconds for iframe to fully load

    return () => clearTimeout(timer);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Button
      onClick={toggleMute}
      variant="outline"
      size="sm"
      className="!bg-white/20 backdrop-blur-lg border border-white/60 text-white hover:!bg-white/30 hover:text-white transition-all duration-300"
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