import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  isLoading?: boolean;
  minDurationMs?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({
  isLoading = true,
  minDurationMs = 2500,
}) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // If external isLoading turns false, initiate fade-out
    if (!isLoading) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 600); // Wait for CSS opacity fade to finish
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Self-managing fallback in case no external state is supplied
  useEffect(() => {
    const minTimer = setTimeout(() => {
      setIsFadingOut(true);
      const unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, 600);
      return () => clearTimeout(unmountTimer);
    }, minDurationMs);

    return () => clearTimeout(minTimer);
  }, [minDurationMs]);

  if (!shouldRender) return null;

  return (
    <div
      id="app-preloader"
      aria-label="Loading application"
      role="status"
      className={`fixed inset-0 z-[9999] bg-[#0A291B] flex flex-col items-center justify-center overflow-hidden select-none transition-opacity duration-600 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      <style>{`
        @keyframes preloaderPulseFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 12px 28px rgba(242, 183, 5, 0.25));
          }
          50% {
            transform: translateY(-10px) scale(1.06);
            filter: drop-shadow(0 24px 38px rgba(242, 183, 5, 0.5));
          }
        }
        @keyframes preloaderAmbientGlow {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.92);
          }
          50% {
            opacity: 0.65;
            transform: scale(1.15);
          }
        }
      `}</style>

      {/* Ambient background radial lighting */}
      <div
        className="absolute w-80 h-80 rounded-full bg-[#F2B705] blur-[110px] pointer-events-none"
        style={{ animation: 'preloaderAmbientGlow 3.5s ease-in-out infinite' }}
      />

      {/* Centered Brand Stack */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Brand Logo Container with Floating + Pulsing Animation */}
        <div
          className="relative mb-8 flex items-center justify-center"
          style={{
            animation: 'preloaderPulseFloat 3s ease-in-out infinite',
          }}
        >
          <img
            src="/logo.png"
            alt="Bjorbun Burger Logo"
            className="h-24 w-auto object-contain drop-shadow-2xl"
            style={{ height: '96px', objectFit: 'contain' }}
          />
        </div>

        {/* Rolling Golden Loader Ring & Status Indicator */}
        <div className="flex flex-col items-center gap-4">
          {/* Smooth, thin golden (#F2B705) rolling circle loader track */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Background track */}
            <div className="w-10 h-10 rounded-full border-2 border-[#F2B705]/20" />
            {/* Active rolling spinner */}
            <div className="absolute inset-0 w-10 h-10 rounded-full border-2 border-t-[#F2B705] border-r-[#F2B705]/40 border-b-transparent border-l-transparent animate-spin" />
          </div>

          {/* Clean typography loading status */}
          <div className="flex flex-col items-center gap-1">
            <p className="font-bubbly text-xs sm:text-sm uppercase tracking-[0.25em] text-[#F2E9D4] flex items-center">
              <span>FIRING UP THE GRILL</span>
              <span className="inline-flex ml-0.5">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse" style={{ animationDelay: '200ms' }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: '400ms' }}>.</span>
              </span>
            </p>
            <span className="text-[11px] text-[#F2B705] tracking-widest font-semibold uppercase opacity-90">
              SMASH • SEAR • SAVOR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
