import { useEffect, useRef } from 'react';

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

export default function GoogleAdBanner({
  adClient,
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
}: GoogleAdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

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

  // Show placeholder if AdSense is not configured
  if (!adClient || !adSlot) {
    return (
      <div
        className={`mx-auto mb-6 flex w-full max-w-3xl items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-surface-secondary to-surface-tertiary ${className}`}
        style={{ minHeight: '120px' }}
      >
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <span className="text-sm font-medium text-text-secondary">Advertisement Space</span>
          <span className="text-xs text-text-tertiary">Google AdSense will appear here</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={adRef}
      className={`mx-auto mb-6 w-full max-w-3xl overflow-hidden rounded-2xl bg-surface-primary ${className}`}
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
