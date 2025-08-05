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
        
        // Set volume based on mute state
        const volume = isMuted ? 0 : 1; // Use full volume when unmuted
        player.setVolume(volume).then(() => {
          console.log(`Volume set to ${volume} for ${isIOS ? 'iOS' : 'other'} device`);
        }).catch(error => {
          console.error('Error setting volume:', error);
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isMuted, isIOS]);

  const toggleMute = async () => {
    console.log(`Toggling mute from ${isMuted} to ${!isMuted} on ${isIOS ? 'iOS' : 'other'} device`);
    
    // For iOS, handle audio context activation on first user interaction
    if (isIOS && isMuted) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const audioContext = new AudioContext();
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
            console.log('iOS audio context resumed');
          }
        }
        
        // Also try to interact with the iframe for iOS
        const iframe = document.querySelector('iframe[src*="vimeo.com"]') as HTMLIFrameElement;
        if (iframe && window.Vimeo) {
          const player = new window.Vimeo.Player(iframe);
          await player.setVolume(1);
          console.log('iOS: Set volume to 1 via direct interaction');
        }
      } catch (error) {
        console.error('iOS audio activation error:', error);
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