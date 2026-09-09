import React from 'react';
import { Sparkles, ArrowDownRight, Utensils } from 'lucide-react';
import { TICKER_ITEMS } from '../data/restaurantData';

interface HeroProps {
  onReserveClick: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick, onExploreMenu }) => {
  return (
    <section className="relative pt-24 sm:pt-28 pb-12 overflow-hidden bg-[#0A291B]">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full bg-emerald-700/15 blur-[120px] pointer-events-none" />

      {/* Floating flying ingredients with CSS keyframe animations */}
      {/* Ingredient 1: Basil Leaf Top Left */}
      <div
        className="absolute top-28 left-[8%] sm:left-[15%] w-14 sm:w-20 pointer-events-none z-10 animate-float-slow"
        style={{ animationDelay: '0s' }}
      >
        <img
          src="https://pngimg.com/d/spinach_PNG43.png"
          alt="Fresh organic herb"
          className="w-full h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)] rotate-12 transform"
          loading="eager"
        />
      </div>

      {/* Ingredient 2: Tomato Slice Top Right */}
      <div
        className="absolute top-36 right-[10%] sm:right-[16%] w-16 sm:w-24 pointer-events-none z-10 animate-float-medium"
        style={{ animationDelay: '1.2s' }}
      >
        <img
          src="https://pngimg.com/d/tomato_PNG12591.png"
          alt="Flying ripe tomato slice"
          className="w-full h-auto drop-shadow-[0_14px_24px_rgba(0,0,0,0.6)] -rotate-12 transform"
          loading="eager"
        />
      </div>

      {/* Ingredient 3: Red Onion Ring Bottom Left */}
      <div
        className="absolute bottom-28 left-[12%] sm:left-[18%] w-14 sm:w-20 pointer-events-none z-10 animate-float-fast"
        style={{ animationDelay: '0.8s' }}
      >
        <img
          src="https://pngimg.com/d/onion_PNG3826.png"
          alt="Flying red onion ring"
          className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] rotate-45 transform"
          loading="eager"
        />
      </div>

      {/* Ingredient 4: Tomato Slice Bottom Center-Right */}
      <div
        className="absolute bottom-24 right-[12%] sm:right-[22%] w-14 sm:w-22 pointer-events-none z-10 animate-float-slow"
        style={{ animationDelay: '2.1s' }}
      >
        <img
          src="https://pngimg.com/d/tomato_PNG12591.png"
          alt="Flying tomato garnish"
          className="w-full h-auto drop-shadow-[0_12px_22px_rgba(0,0,0,0.5)] 35deg transform opacity-90"
          loading="eager"
        />
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20 flex flex-col items-center text-center">
        
        {/* Top Huge Display Typography: CRAFTED BURGERS */}
        <div className="relative w-full select-none">
          <h1 className="font-bubbly text-5xl sm:text-7xl md:text-8xl lg:text-[104px] tracking-tight uppercase leading-[0.9] text-[#F2E9D4] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            CRAFTED
          </h1>
          <h2 className="font-bubbly text-5xl sm:text-7xl md:text-8xl lg:text-[104px] tracking-tight uppercase leading-[0.9] text-[#F2E9D4] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] mt-1 sm:mt-2">
            BURGERS
          </h2>
        </div>

        {/* Central Exploded Floating Burger & Rotating Stamp */}
        <div className="relative -my-10 sm:-my-14 md:-my-18 w-full max-w-[420px] sm:max-w-[540px] md:max-w-[620px] aspect-square flex items-center justify-center">
          {/* Subtle under-burger shadow */}
          <div className="absolute bottom-12 w-3/4 h-12 bg-black/60 rounded-[100%] blur-xl transform scale-y-50 pointer-events-none" />

          {/* Central Master Burger Asset */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
            <img
              src="https://pngimg.com/d/burger_sandwich_PNG4114.png"
              onError={(e) => {
                // Fallback to high-res transparent food if CDN is unreachable
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80';
              }}
              alt="Bjorbun Crafted Gourmet Exploded Burger"
              className="w-full max-h-[460px] sm:max-h-[560px] object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={onReserveClick}
            />

            {/* Flying Tomato Garnish Layer in front of burger */}
            <div className="absolute -bottom-4 sm:bottom-0 left-1/3 w-28 sm:w-40 z-20 pointer-events-none animate-float-medium">
              <img
                src="https://pngimg.com/d/tomato_PNG12591.png"
                alt="Juicy tomato slice"
                className="w-full h-auto drop-shadow-2xl rotate-12"
              />
            </div>
          </div>

          {/* Rotating Circular "Reserve a Table" Stamp Badge */}
          <div
            onClick={onReserveClick}
            id="hero-reserve-badge"
            className="absolute top-12 left-4 sm:left-10 z-30 group cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            title="Click to Reserve a Table"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-[#F2E9D4] rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.4)] border-2 border-[#F2B705]">
              {/* Rotating Circular Text SVG */}
              <svg
                className="absolute inset-0 w-full h-full animate-spin-slow"
                viewBox="0 0 100 100"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[9px] font-bold uppercase fill-[#0A291B] tracking-[2.2px]">
                  <textPath href="#circlePath" startOffset="0%">
                    RESERVE A TABLE • RESERVE A TABLE •
                  </textPath>
                </text>
              </svg>

              {/* Center Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A291B] text-[#F2B705] flex items-center justify-center shadow-inner group-hover:bg-[#F2B705] group-hover:text-[#0A291B] transition-colors">
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Huge Display Typography: WITH PREMIUM TASTE */}
        <div className="relative w-full select-none z-10">
          <h2 className="font-bubbly text-5xl sm:text-7xl md:text-8xl lg:text-[104px] tracking-tight uppercase leading-[0.9] text-[#F2E9D4] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            WITH PREMIUM
          </h2>
          <h2 className="font-bubbly text-5xl sm:text-7xl md:text-8xl lg:text-[104px] tracking-tight uppercase leading-[0.9] text-[#F2E9D4] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] mt-1 sm:mt-2">
            TASTE
          </h2>
        </div>
      </div>

      {/* Curved / Organic Gold Horizontally Scrolling Marquee Ticker Band */}
      <div className="relative mt-8 sm:mt-12 w-full max-w-7xl mx-auto px-2 sm:px-4">
        {/* Organic curved shape wrapper */}
        <div className="relative bg-[#F2B705] text-[#0A291B] py-3.5 sm:py-4 px-2 overflow-hidden shadow-[0_10px_30px_rgba(242,183,5,0.25)] rounded-2xl sm:rounded-3xl border-2 border-[#F2E9D4]/40">
          <div className="animate-marquee flex items-center gap-6 select-none whitespace-nowrap">
            {/* Duplicated list for seamless infinite loop */}
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <span className="font-bubbly text-sm sm:text-base md:text-lg tracking-wider uppercase font-bold text-[#0A291B]">
                  {item}
                </span>
                <span className="text-[#0A291B] text-lg sm:text-xl font-black">
                  ✸
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
