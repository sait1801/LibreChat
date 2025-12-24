import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface GoogleAdBannerProps {
  adClient?: string;
  adSlot?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive?: boolean;
  className?: string;
}

function GoogleAdBanner({
  adClient,
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
}: GoogleAdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Placeholder ads for demonstration
  const placeholderAds = [
    'https://via.placeholder.com/728x90?text=Advertisement+1',
    'https://via.placeholder.com/728x90?text=Advertisement+2',
    'https://via.placeholder.com/728x90?text=Advertisement+3',
  ];

  useEffect(() => {
    // Only load ad once and only if we have the required props
    if (!adClient || !adSlot || isAdLoaded.current) {
      return;
    }

    try {
      // Push ad to adsbygoogle
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      isAdLoaded.current = true;
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adClient, adSlot]);

  const handlePrevAd = () => {
    setCurrentAdIndex((prev) => (prev === 0 ? placeholderAds.length - 1 : prev - 1));
  };

  const handleNextAd = () => {
    setCurrentAdIndex((prev) => (prev === placeholderAds.length - 1 ? 0 : prev + 1));
  };

  // Show carousel placeholder if AdSense is not configured
  if (!adClient || !adSlot) {
    return (
      <div
        className={`mx-auto mb-6 w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-200 ${className}`}
        style={{ minHeight: '140px' }}
      >
        <div className="relative flex items-center justify-between gap-3 bg-gray-300 p-4 h-full">
          {/* Left Arrow */}
          <button
            onClick={handlePrevAd}
            className="flex-shrink-0 rounded-lg p-2 bg-white hover:bg-gray-100 transition-colors"
            aria-label="Previous ad"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Ad Carousel */}
          <div className="flex-1 flex items-center justify-center relative h-24">
            {placeholderAds.map((ad, index) => (
              <div
                key={index}
                className={`absolute transition-opacity duration-300 ${
                  index === currentAdIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={ad}
                  alt={`Advertisement ${index + 1}`}
                  className="h-24 w-48 rounded-lg object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNextAd}
            className="flex-shrink-0 rounded-lg p-2 bg-white hover:bg-gray-100 transition-colors"
            aria-label="Next ad"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 bg-gray-300 px-4 py-2">
          {placeholderAds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAdIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentAdIndex ? 'bg-black' : 'bg-gray-500'
              }`}
              aria-label={`Go to ad ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={adRef}
      className={`mx-auto mb-6 w-full max-w-4xl overflow-hidden rounded-2xl bg-surface-primary ${className}`}
      style={{ minHeight: '120px' }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

export default GoogleAdBanner;
