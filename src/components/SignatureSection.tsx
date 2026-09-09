import React, { useState } from 'react';
import { ALL_MENU_ITEMS, CATEGORY_TABS, CategoryType } from '../data/restaurantData';
import { BurgerItem } from '../types';
import { Plus } from 'lucide-react';

interface SignatureSectionProps {
  onSelectBurger: (burger: BurgerItem) => void;
  onGetBurgerClick: () => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  onSelectBurger,
  onGetBurgerClick,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryType>('burgers');
  const [isFading, setIsFading] = useState(false);

  // Filter items by active category
  const filteredItems = ALL_MENU_ITEMS.filter(
    (item) => item.category === activeTab
  );

  const handleTabChange = (category: CategoryType) => {
    if (category === activeTab) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(category);
      setIsFading(false);
    }, 150);
  };

  return (
    <section id="signature" className="py-20 sm:py-28 bg-[#0A291B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-bubbly text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F2E9D4] drop-shadow-md">
            OUR SIGNATURE <br className="hidden sm:inline" />
            CATALOG
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F2E9D4]/80 font-medium max-w-xl mx-auto leading-relaxed">
            Discover our most-loved recipes, crafted with premium ingredients and bold flavors that keep customers coming back for more.
          </p>
        </div>

        {/* 4 Category Pill-Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-16">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`catalog-tab-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                className={`px-7 py-3 rounded-full font-bubbly text-sm sm:text-base uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#F2B705] text-[#0A291B] font-extrabold border-2 border-[#F2B705] shadow-[0_6px_20px_rgba(242,183,5,0.4)] scale-105'
                    : 'bg-[#F2E9D4]/10 text-[#F2E9D4] border-2 border-[#F2E9D4]/20 hover:border-[#F2B705] hover:text-[#F2B705] hover:bg-[#F2E9D4]/15'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Cards Grid with Smooth CSS Transition Container */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-14 min-h-[460px] transition-all duration-300 ease-in-out ${
            isFading ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`burger-card-${item.id}`}
              onClick={() => onSelectBurger(item)}
              className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-3"
            >
              {/* Circular Numbered Badge Top-Left */}
              <div className="absolute -top-2 left-6 sm:left-4 z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#F2B705] border-2 border-[#0A291B] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <svg
                  className="absolute inset-0 w-full h-full animate-spin-slow"
                  viewBox="0 0 100 100"
                >
                  <path
                    id={`badgePath-${item.id}`}
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="none"
                  />
                  <text className="text-[10px] font-bold uppercase fill-[#0A291B] tracking-[1.6px]">
                    <textPath href={`#badgePath-${item.id}`} startOffset="0%">
                      • MOST POPULAR • TOP PICK
                    </textPath>
                  </text>
                </svg>
                <span className="font-bubbly text-xl sm:text-2xl text-[#0A291B] font-extrabold z-10">
                  {item.badgeNumber}
                </span>
              </div>

              {/* Food Image Container with Glow */}
              <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] flex items-center justify-center p-4">
                {/* Soft glow behind food image */}
                <div className="absolute inset-4 rounded-full bg-[#F2B705]/10 blur-2xl group-hover:bg-[#F2B705]/20 transition-all duration-300" />
                
                {/* Food Image */}
                <img
                  src={item.image}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.fallbackImage;
                  }}
                  alt={item.name}
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_18px_25px_rgba(0,0,0,0.65)] group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Cream Pill Label with Item Name */}
              <div className="relative -mt-2 z-20 w-full max-w-[280px]">
                <div className="bg-[#F2E9D4] text-[#0A291B] px-6 py-3.5 rounded-full text-center shadow-[0_8px_20px_rgba(0,0,0,0.3)] border-2 border-[#F2B705]/50 group-hover:bg-[#fffaee] group-hover:border-[#F2B705] transition-all">
                  <h3 className="font-bubbly text-base sm:text-lg uppercase tracking-wide truncate">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Subtle hover prompt with price */}
              <div className="mt-3 flex items-center gap-2 text-xs text-[#F2E9D4]/70 font-semibold group-hover:text-[#F2B705] transition-colors">
                <span>${item.price.toFixed(2)}</span>
                <span>•</span>
                <span className="flex items-center gap-1 underline underline-offset-4">
                  View Details <Plus className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Center Main CTA Pill Button: GET YOUR BURGER */}
        <div className="flex justify-center">
          <button
            onClick={onGetBurgerClick}
            id="signature-cta-btn"
            className="px-10 py-4 rounded-full bg-[#F2E9D4] text-[#0A291B] font-bubbly text-base sm:text-lg tracking-wider uppercase shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:bg-[#ffffff] hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-transparent hover:border-[#F2B705]"
          >
            GET YOUR BURGER
          </button>
        </div>
      </div>
    </section>
  );
};
