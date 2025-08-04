import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SlideshowContextType {
  isImageMode: boolean;
  setIsImageMode: (mode: boolean) => void;
  shouldRevertToVideo: boolean;
  setShouldRevertToVideo: (revert: boolean) => void;
}

const SlideshowContext = createContext<SlideshowContextType | undefined>(undefined);

export const useSlideshowContext = () => {
  const context = useContext(SlideshowContext);
  if (!context) {
    throw new Error('useSlideshowContext must be used within SlideshowProvider');
  }
  return context;
};

interface SlideshowProviderProps {
  children: ReactNode;
}

export const SlideshowProvider = ({ children }: SlideshowProviderProps) => {
  const [isImageMode, setIsImageMode] = useState(false);
  const [shouldRevertToVideo, setShouldRevertToVideo] = useState(false);

  return (
    <SlideshowContext.Provider value={{
      isImageMode,
      setIsImageMode,
      shouldRevertToVideo,
      setShouldRevertToVideo
    }}>
      {children}
    </SlideshowContext.Provider>
  );
};