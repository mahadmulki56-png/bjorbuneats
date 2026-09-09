import React from 'react';
import { FEATURES } from '../data/restaurantData';
import { Award, Flame, Zap, Sparkles } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-6 h-6 text-[#0A291B]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#0A291B]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#0A291B]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#0A291B]" />;
    }
  };

  return (
    <section id="features" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 bg-[#0A291B]">
      {/* Giant Organic Cream Undulating Container */}
      <div className="max-w-7xl mx-auto bg-[#F2E9D4] text-[#0A291B] rounded-[48px] sm:rounded-[70px] lg:rounded-[80px] p-6 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
        
        {/* Subtle decorative background tint */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2B705]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* Left Column: Towering Burger Graphic with Floating Garnish */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Floating Basil Leaf Accent */}
            <div className="absolute -top-6 left-6 w-14 sm:w-18 z-20 pointer-events-none animate-float-medium">
              <img
                src="https://pngimg.com/d/spinach_PNG43.png"
                alt="Basil leaf garnish"
                className="w-full h-auto drop-shadow-md rotate-12"
              />
            </div>

            {/* Floating Tomato Slice Accent */}
            <div className="absolute -top-4 right-10 w-16 sm:w-20 z-20 pointer-events-none animate-float-slow">
              <img
                src="https://pngimg.com/d/tomato_PNG12591.png"
                alt="Ripe tomato slice"
                className="w-full h-auto drop-shadow-lg -rotate-12"
              />
            </div>

            {/* Bottom floating leaf */}
            <div className="absolute -bottom-4 right-4 w-12 sm:w-16 z-20 pointer-events-none animate-float-fast">
              <img
                src="https://pngimg.com/d/spinach_PNG43.png"
                alt="Herb accent"
                className="w-full h-auto drop-shadow-md 45deg"
              />
            </div>

            {/* Master Tall Burger Graphic */}
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-square flex items-center justify-center">
              {/* Soft ground shadow */}
              <div className="absolute bottom-4 w-4/5 h-10 bg-[#0A291B]/30 rounded-[100%] blur-xl" />

              <img
                src="https://pngimg.com/d/burger_sandwich_PNG4114.png"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80';
                }}
                alt="Towering Gourmet Bjorbun Burger"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_22px_30px_rgba(10,41,27,0.4)] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Heading, Subtitle & 3 Feature Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Header and Subtitle Layout */}
            <div className="mb-8 sm:mb-10">
              <h2 className="font-bubbly text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0A291B] leading-[1.05]">
                WHY PEOPLE LOVE OUR BURGERS
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#0A291B]/80 font-medium leading-relaxed max-w-xl">
                We don't just make burgers — we craft unforgettable flavor experiences using premium ingredients, bold recipes, and perfectly grilled patties in every bite.
              </p>
            </div>

            {/* 3 Distinct Feature Cards with Organic Pill Shapes */}
            <div className="space-y-4 sm:space-y-5">
              {FEATURES.map((feat) => (
                <div
                  key={feat.id}
                  id={`feature-card-${feat.id}`}
                  className="bg-[#EBE2CB] hover:bg-[#E5DBC2] p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] transition-all duration-300 flex items-start gap-4 sm:gap-5 border border-[#0A291B]/5 hover:shadow-md group"
                >
                  {/* Icon Frame */}
                  <div className="w-12 h-12 rounded-2xl bg-[#F2B705] flex-shrink-0 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {getIcon(feat.iconName)}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bubbly text-base sm:text-lg uppercase tracking-wide text-[#0A291B] mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0A291B]/80 leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
