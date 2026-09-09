import React from 'react';
import { ChefHat, Wheat, Flame, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const AboutKitchenSection: React.FC = () => {
  return (
    <section id="kitchen" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 bg-[#0A291B]">
      {/* Heavily Rounded Organic Cream Container Block */}
      <div className="organic-container-large max-w-7xl mx-auto bg-[#F2E9D4] text-[#0A291B] rounded-[48px] sm:rounded-[70px] lg:rounded-[80px] p-6 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
        
        {/* Subtle decorative background tint */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#F2B705]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#0A291B]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A291B] text-[#F2B705] font-bubbly text-xs tracking-wider uppercase mb-4 shadow-sm">
            <ChefHat className="w-3.5 h-3.5" />
            THE ARTISAN STANDARD
          </span>
          <h2 className="font-bubbly text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0A291B] leading-none drop-shadow-sm">
            ABOUT OUR KITCHEN
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#0A291B]/80 font-medium max-w-xl mx-auto leading-relaxed">
            Born from a relentless pursuit of the perfect bite. We do not take shortcuts, we do not use frozen patties, and every ingredient has a story.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* Left Column: Visual Showcase & Craft Badges */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square rounded-[36px] overflow-hidden shadow-2xl border-4 border-[#0A291B]/10 group">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
                alt="Chef preparing artisanal burgers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A291B]/80 via-transparent to-transparent" />
              
              {/* Floating Chef Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#F2E9D4]/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-[#F2B705]/40 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#F2B705] text-[#0A291B] flex items-center justify-center font-bubbly text-xl font-bold shrink-0">
                  BJ
                </div>
                <div>
                  <h4 className="font-bubbly text-sm text-[#0A291B] uppercase tracking-wide">
                    The Bjorbun Promise
                  </h4>
                  <p className="text-xs text-[#0A291B]/70 font-medium">
                    100% Honest Ingredients • Sourced Locally
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stat Pills */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-5">
              <div className="bg-[#0A291B]/5 rounded-2xl p-3 text-center border border-[#0A291B]/10">
                <span className="font-bubbly text-2xl text-[#0A291B] block">5:00 AM</span>
                <span className="text-[11px] font-bold text-[#0A291B]/70 uppercase tracking-wider">
                  Daily Fresh Bake
                </span>
              </div>
              <div className="bg-[#0A291B]/5 rounded-2xl p-3 text-center border border-[#0A291B]/10">
                <span className="font-bubbly text-2xl text-[#0A291B] block">500°F</span>
                <span className="text-[11px] font-bold text-[#0A291B]/70 uppercase tracking-wider">
                  Cast-Iron Searing
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Artisanal Craft Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-[#ffffff]/60 backdrop-blur-sm rounded-[32px] p-6 sm:p-7 border border-[#0A291B]/10 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F2B705] text-[#0A291B] flex items-center justify-center shrink-0 shadow-sm">
                  <Wheat className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-bubbly text-lg sm:text-xl text-[#0A291B] uppercase tracking-wide mb-1.5">
                    DAWN-BAKED BRIOCHE BUNS
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0A291B]/75 leading-relaxed font-medium">
                    Every morning at the crack of dawn, our bakery team kneads organic French flour, cultured Normandy butter, and farm eggs to yield buns with a cloud-soft crumb and toasted golden crust.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#ffffff]/60 backdrop-blur-sm rounded-[32px] p-6 sm:p-7 border border-[#0A291B]/10 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F2B705] text-[#0A291B] flex items-center justify-center shrink-0 shadow-sm">
                  <Flame className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-bubbly text-lg sm:text-xl text-[#0A291B] uppercase tracking-wide mb-1.5">
                    TRIPLE-CUT CUSTOM SMASH BLEND
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0A291B]/75 leading-relaxed font-medium">
                    Our master butcher grinds a distinct ratio of 100% grass-fed chuck, brisket, and short rib twice daily. Smashed hard on screaming-hot iron plates to unlock deep Maillard browning and unmatched juiciness.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#ffffff]/60 backdrop-blur-sm rounded-[32px] p-6 sm:p-7 border border-[#0A291B]/10 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F2B705] text-[#0A291B] flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-bubbly text-lg sm:text-xl text-[#0A291B] uppercase tracking-wide mb-1.5">
                    ZERO ARTIFICIAL PRESERVATIVES
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0A291B]/75 leading-relaxed font-medium">
                    From whole-head crisp butterhead lettuce and heirloom beefsteak tomatoes to slow-fermented dill pickles and house-churned garlic aioli — purity and flavor always lead the way.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
