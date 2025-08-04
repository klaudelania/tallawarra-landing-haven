
import { Toaster } from "./ui/toaster";
import { useImageLoader } from "../hooks/useImageLoader";
import SlideshowDisplay from "./SlideshowDisplay";
import LoadingIndicator from "./LoadingIndicator";
import { VideoMuteButton } from "./VideoMuteButton";

const Slideshow = () => {
  const { mediaUrls, imagesLoaded, loadingProgress } = useImageLoader();

  // Loading state with progress indicator
  if (!imagesLoaded) {
    return <LoadingIndicator progress={loadingProgress} />;
  }

  return (
    <>
      <SlideshowDisplay mediaUrls={mediaUrls} fallbackImages={[]} />
      <VideoMuteButton />
      <Toaster />
    </>
  );
};

export default Slideshow;
