import React, { useState } from 'react';
import { ALL_MENU_ITEMS, CATEGORY_TABS, CategoryType } from '../data/restaurantData';
import { BurgerItem } from '../types';
import { Plus, ShoppingBag, Heart } from 'lucide-react';

interface SignatureSectionProps {
  onSelectBurger: (burger: BurgerItem) => void;
  onGetBurgerClick: () => void;
  onAddToCart: (item: BurgerItem) => void;
}

type TabType = CategoryType | 'favorites';

const ALL_TABS: Array<{ id: TabType; label: string }> = [
  ...CATEGORY_TABS,
  { id: 'favorites', label: 'My Favorites' },
];

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  onSelectBurger,
  onGetBurgerClick,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('burgers');
  const [isFading, setIsFading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bjorbun_favorites');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore localStorage parse errors
    }
    return ['cheese-lava-beast'];
  });

  const toggleFavorite = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];
      try {
        localStorage.setItem('bjorbun_favorites', JSON.stringify(updated));
      } catch {
        // Ignore localStorage errors
      }
      return updated;
    });
  };

  const handleTabChange = (category: TabType) => {
    if (category === activeTab) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(category);
      setIsFading(false);
    }, 150);
  };

  // Filter items by active category or favorites
  const filteredItems =
    activeTab === 'favorites'
      ? ALL_MENU_ITEMS.filter((item) => favorites.includes(item.id))
      : ALL_MENU_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="signature" className="py-20 sm:py-28 bg-[#0A291B] relative">
      <div className="organic-container-large max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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

        {/* Category Pill-Buttons with 'My Favorites' */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-16">
          {ALL_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const isFavoritesTab = tab.id === 'favorites';
            return (
              <button
                key={tab.id}
                id={`catalog-tab-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 sm:px-7 py-3 rounded-full font-bubbly text-sm sm:text-base uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#F2B705] text-[#0A291B] font-extrabold border-2 border-[#F2B705] shadow-[0_6px_20px_rgba(242,183,5,0.4)] scale-105'
                    : 'bg-[#F2E9D4]/10 text-[#F2E9D4] border-2 border-[#F2E9D4]/20 hover:border-[#F2B705] hover:text-[#F2B705] hover:bg-[#F2E9D4]/15'
                }`}
              >
                {isFavoritesTab && (
                  <Heart
                    className={`w-4 h-4 ${
                      isActive
                        ? 'fill-[#0A291B] stroke-[#0A291B]'
                        : 'fill-red-500 stroke-red-500'
                    }`}
                  />
                )}
                <span>{tab.label}</span>
                {isFavoritesTab && favorites.length > 0 && (
                  <span
                    className={`ml-0.5 text-xs px-2 py-0.5 rounded-full font-sans font-bold transition-colors ${
                      isActive
                        ? 'bg-[#0A291B] text-[#F2B705]'
                        : 'bg-[#F2B705] text-[#0A291B]'
                    }`}
                  >
                    {favorites.length}
                  </span>
                )}
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
          {activeTab === 'favorites' && filteredItems.length === 0 ? (
            <div className="col-span-full py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#F2E9D4]/10 border border-[#F2E9D4]/20 flex items-center justify-center mb-4 text-[#F2B705]">
                <Heart className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-bubbly text-2xl sm:text-3xl text-[#F2E9D4] mb-2 uppercase tracking-wide">
                No Favorites Yet
              </h3>
              <p className="text-[#F2E9D4]/70 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
                Tap the heart icon on any signature burger, side, drink, or dessert to curate your personal favorites list.
              </p>
              <button
                type="button"
                onClick={() => handleTabChange('burgers')}
                className="px-8 py-3 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-sm uppercase tracking-wider hover:bg-[#ffc61a] transition-all cursor-pointer font-bold shadow-lg active:scale-95"
              >
                Browse Burgers
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <div
                  key={item.id}
                  id={`burger-card-${item.id}`}
                  onClick={() => onSelectBurger(item)}
                  className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-2"
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

                  {/* Favorite Heart Toggle Button Top-Right */}
                  <button
                    type="button"
                    id={`favorite-btn-${item.id}`}
                    onClick={(e) => toggleFavorite(item.id, e)}
                    aria-label={isFav ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
                    className={`absolute -top-1 right-6 sm:right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer border-2 ${
                      isFav
                        ? 'bg-[#0A291B] border-red-500 text-red-500 scale-105 shadow-[0_4px_14px_rgba(239,68,68,0.4)]'
                        : 'bg-[#0A291B]/85 hover:bg-[#0A291B] border-[#F2E9D4]/25 hover:border-[#F2B705] text-[#F2E9D4]/60 hover:text-red-400'
                    } active:scale-90`}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-200 ${
                        isFav
                          ? 'fill-red-500 stroke-red-500 scale-110'
                          : 'stroke-current hover:scale-110'
                      }`}
                    />
                  </button>

                  {/* Food Image Container with Strict Height & Floating Micro-Animation */}
                  <div className="relative w-full h-[220px] max-h-[220px] flex items-center justify-center p-2 bg-transparent overflow-visible">
                    {/* Soft ambient radial glow behind transparent food PNG */}
                    <div className="absolute inset-4 rounded-full bg-[#F2B705]/15 blur-2xl group-hover:bg-[#F2B705]/25 transition-all duration-300" />
                    
                    {/* Food Image - strictly contained & floating */}
                    <img
                      src={item.image}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = item.fallbackImage;
                      }}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '220px',
                        objectFit: 'contain',
                        animation: 'float 4s ease-in-out infinite',
                      }}
                      className="relative z-10 drop-shadow-[0_18px_25px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none object-contain"
                    />
                  </div>

                  {/* Cream Pill Label with Item Name */}
                  <div className="relative -mt-2 z-20 w-full max-w-[280px]">
                    <div className="bg-[#F2E9D4] text-[#0A291B] px-5 py-3 rounded-full text-center shadow-[0_8px_20px_rgba(0,0,0,0.3)] border-2 border-[#F2B705]/50 group-hover:bg-[#fffaee] group-hover:border-[#F2B705] transition-all">
                      <h3 className="font-bubbly text-base sm:text-lg uppercase tracking-wide truncate">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="mt-3 flex items-center justify-between w-full max-w-[280px] px-2">
                    <span className="font-bubbly text-base text-[#F2B705]">
                      ${item.price.toFixed(2)}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBurger(item);
                        }}
                        className="px-2.5 py-1 rounded-full bg-[#F2E9D4]/15 hover:bg-[#F2E9D4]/25 text-[#F2E9D4] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Custom
                      </button>
                      <button
                        type="button"
                        id={`quick-add-${item.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(item);
                        }}
                        className="px-3 py-1 rounded-full bg-[#F2B705] hover:bg-[#ffc61a] text-[#0A291B] text-[11px] font-bubbly uppercase tracking-wider transition-all active:scale-95 shadow-md flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
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
