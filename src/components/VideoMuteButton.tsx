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
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay compatibility
  const [isIOS, setIsIOS] = useState(false);

  // Detect iOS devices
  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
  }, []);

  useEffect(() => {
    // For iOS/Safari, audio in embedded videos is very restrictive
    // Show a message to user about audio limitations
    if (isIOS && !isMuted) {
      console.log('Audio requested on iOS - may require user to tap video directly');
    }
  }, [isMuted, isIOS]);

  const toggleMute = () => {
    // Simple toggle without interfering with video playback
    setIsMuted(!isMuted);
    
    // Post message to iframe to try to control audio (if supported)
    const iframe = document.querySelector('iframe[src*="vimeo.com"]') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        const message = {
          method: 'setVolume',
          value: isMuted ? 0.8 : 0
        };
        iframe.contentWindow.postMessage(JSON.stringify(message), '*');
      } catch (error) {
        console.log('PostMessage audio control not supported');
      }
    }
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