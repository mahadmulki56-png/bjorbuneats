import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/restaurantData';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#0A291B] relative">
      <div className="organic-container-large max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Title */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-bubbly text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F2E9D4] drop-shadow-md">
            WHAT OUR <br />
            CUSTOMERS SAY
          </h2>
        </div>

        {/* Testimonial Presentation Card */}
        <div className="relative flex flex-col items-center">
          
          {/* Customer Eating Burger Photo */}
          <div className="relative w-full max-w-[420px] sm:max-w-[480px] aspect-[4/3] rounded-[36px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.6)] border-4 border-[#F2E9D4]/20 mb-8 sm:mb-10 group">
            <img
              src={current.avatar}
              alt={current.author}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-left">
              <div className="flex gap-1 text-[#F2B705]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#F2E9D4]/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                Fav: {current.dishLoved}
              </span>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="max-w-2xl mx-auto px-4">
            <p className="text-base sm:text-xl md:text-2xl text-[#F2E9D4] font-medium leading-relaxed italic drop-shadow-sm min-h-[90px] flex items-center justify-center">
              {current.quote}
            </p>
            <div className="mt-4">
              <h4 className="font-bubbly text-lg sm:text-xl text-[#F2B705] uppercase tracking-wide">
                {current.author}
              </h4>
              <p className="text-xs sm:text-sm text-[#F2E9D4]/60 font-medium mt-0.5">
                {current.role}
              </p>
            </div>
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              id="testimonial-prev-btn"
              aria-label="Previous Testimonial"
              className="w-12 h-12 rounded-full bg-[#F2B705] text-[#0A291B] flex items-center justify-center hover:bg-[#ffc61a] hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div className="flex gap-1.5 px-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-6 bg-[#F2B705]'
                      : 'bg-[#F2E9D4]/30 hover:bg-[#F2E9D4]/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              id="testimonial-next-btn"
              aria-label="Next Testimonial"
              className="w-12 h-12 rounded-full bg-[#F2B705] text-[#0A291B] flex items-center justify-center hover:bg-[#ffc61a] hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
