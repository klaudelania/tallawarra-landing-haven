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
    // Wait for Vimeo player to load before controlling it
    const timer = setTimeout(() => {
      const iframe = document.querySelector('iframe[src*="vimeo.com"]') as HTMLIFrameElement;
      if (iframe && window.Vimeo) {
        const player = new window.Vimeo.Player(iframe);
        
        // Set volume based on mute state without stopping playback
        const volume = isMuted ? 0 : 0.8;
        player.setVolume(volume).then(() => {
          // For iOS devices, ensure audio context is properly activated
          if (isIOS && !isMuted) {
            // Trigger user interaction requirement for iOS audio
            player.play().catch(() => {
              console.log('iOS requires user interaction for audio');
            });
          } else if (!isMuted) {
            // Ensure video continues playing after volume change
            player.play().catch(() => {
              // Ignore play errors as video might already be playing
            });
          }
        }).catch(console.error);
      }
    }, 2000); // Increased wait time for better compatibility

    return () => clearTimeout(timer);
  }, [isMuted, isIOS]);

  const toggleMute = () => {
    // For iOS, we need to handle audio context activation on first user interaction
    if (isIOS && isMuted) {
      // Create audio context if needed for iOS
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const audioContext = new AudioContext();
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
      }
    }
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