import React, { useState } from 'react';
import { MENU_CATEGORIES } from '../data/restaurantData';
import { Plus, Check, ArrowRight } from 'lucide-react';

interface MenuPreviewProps {
  onSelectItem: (item: { name: string; price: number; description: string }) => void;
  onOpenOrder: () => void;
}

export const MenuPreview: React.FC<MenuPreviewProps> = ({ onSelectItem, onOpenOrder }) => {
  const [activeCategoryId, setActiveCategoryId] = useState('burger');
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const activeCategory =
    MENU_CATEGORIES.find((cat) => cat.id === activeCategoryId) ||
    MENU_CATEGORIES[0];

  const handleAddItem = (item: { name: string; price: number; description: string }) => {
    onSelectItem(item);
    setAddedItemName(item.name);
    setTimeout(() => {
      setAddedItemName(null);
    }, 1800);
  };

  return (
    <section id="menu-preview" className="py-20 sm:py-28 bg-[#0A291B] relative">
      <div className="organic-container-large max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-bubbly text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F2E9D4] drop-shadow-md">
            MENU PREVIEW
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F2E9D4]/80 font-medium max-w-xl mx-auto leading-relaxed">
            Discover our most-loved burgers, crafted with premium ingredients and bold flavors that keep customers coming back for more.
          </p>
        </div>

        {/* 3 Circular Category Thumbnails with Cream Pill Labels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 lg:gap-12 max-w-5xl mx-auto mb-14">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = cat.id === activeCategoryId;
            return (
              <div
                key={cat.id}
                id={`category-thumb-${cat.id}`}
                onClick={() => setActiveCategoryId(cat.id)}
                className="flex flex-col items-center cursor-pointer group"
              >
                {/* Circular Plate Thumbnail Frame */}
                <div
                  className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center p-3 transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#F2E9D4] ring-4 ring-[#F2B705] scale-105 shadow-[0_12px_35px_rgba(242,183,5,0.35)]'
                      : 'bg-[#F2E9D4]/90 hover:bg-[#F2E9D4] shadow-[0_8px_25px_rgba(0,0,0,0.4)] group-hover:scale-102'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={cat.image}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = cat.fallbackImage;
                      }}
                      alt={cat.title}
                      className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Cream Pill Label Underneath */}
                <div className="mt-6 w-full max-w-[200px]">
                  <div
                    className={`py-3 px-6 rounded-full text-center font-bubbly text-base sm:text-lg uppercase tracking-wide transition-all shadow-md ${
                      isSelected
                        ? 'bg-[#F2B705] text-[#0A291B] font-extrabold shadow-[0_4px_14px_rgba(242,183,5,0.4)] scale-105'
                        : 'bg-[#F2E9D4] text-[#0A291B] hover:bg-[#fffaee]'
                    }`}
                  >
                    {cat.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Selected Category Menu Items Drawer */}
        <div className="max-w-4xl mx-auto bg-[#072115] border border-[#F2E9D4]/15 rounded-[36px] p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#F2E9D4]/15 pb-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#F2B705] font-bold">
                Selected Category
              </span>
              <h3 className="font-bubbly text-2xl sm:text-3xl text-[#F2E9D4] uppercase">
                {activeCategory.title}
              </h3>
            </div>
            <button
              onClick={onOpenOrder}
              className="text-xs sm:text-sm font-bold text-[#F2B705] hover:text-white flex items-center gap-1 transition-colors"
            >
              Full Menu <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeCategory.items.map((item, idx) => {
              const isAdded = addedItemName === item.name;
              return (
                <div
                  key={idx}
                  className="bg-[#0A291B] border border-[#F2E9D4]/10 hover:border-[#F2B705]/40 rounded-2xl p-4 flex flex-col justify-between transition-all hover:bg-[#0c3322] group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-bubbly text-base text-[#F2E9D4] group-hover:text-[#F2B705] transition-colors">
                        {item.name}
                      </h4>
                      <span className="font-bubbly text-base text-[#F2B705]">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    {item.tag && (
                      <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#F2B705]/20 text-[#F2B705] mb-1.5">
                        {item.tag}
                      </span>
                    )}
                    <p className="text-xs text-[#F2E9D4]/70 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 flex justify-end">
                    <button
                      onClick={() => handleAddItem(item)}
                      className={`text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#F2E9D4] text-[#0A291B] hover:bg-[#F2B705]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added!
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Quick Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
