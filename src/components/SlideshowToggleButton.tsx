import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Images, Video } from 'lucide-react';

interface SlideshowToggleButtonProps {
  onToggle: (showImages: boolean) => void;
  isImageMode: boolean;
}

export const SlideshowToggleButton = ({ onToggle, isImageMode }: SlideshowToggleButtonProps) => {
  const toggleSlideshow = () => {
    onToggle(!isImageMode);
  };

  return (
    <Button
      onClick={toggleSlideshow}
      variant="outline"
      size="sm"
      className="!bg-white/20 backdrop-blur-lg border border-white/60 text-white hover:!bg-white/30 hover:text-white transition-all duration-300"
    >
      {isImageMode ? (
        <>
          <Video className="h-4 w-4 mr-2" />
          Video
        </>
      ) : (
        <>
          <Images className="h-4 w-4 mr-2" />
          Images
        </>
      )}
    </Button>
  );
};