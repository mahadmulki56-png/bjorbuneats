import React from 'react';

export const BackgroundDoodles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.04] select-none">
      {/* Repeating SVG watermark illustrations */}
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="burger-doodle-grid"
            x="0"
            y="0"
            width="220"
            height="220"
            patternUnits="userSpaceOnUse"
          >
            {/* Mini Burger Doodle */}
            <g transform="translate(30, 20) scale(0.65)" stroke="#F2E9D4" strokeWidth="2.5" fill="none">
              {/* Top Bun */}
              <path d="M 10 35 A 30 25 0 0 1 70 35 Z" />
              {/* Sesame seeds */}
              <line x1="30" y1="20" x2="33" y2="21" />
              <line x1="45" y1="18" x2="48" y2="19" />
              <line x1="40" y1="26" x2="43" y2="27" />
              {/* Patty */}
              <rect x="8" y="40" width="64" height="12" rx="6" />
              {/* Lettuce wave */}
              <path d="M 6 36 Q 16 32 26 36 Q 36 32 46 36 Q 56 32 66 36 Q 74 32 76 36" />
              {/* Bottom Bun */}
              <path d="M 12 55 Q 40 68 68 55 Z" />
            </g>

            {/* Mini Drink Cup */}
            <g transform="translate(140, 40) scale(0.6)" stroke="#F2E9D4" strokeWidth="2.5" fill="none">
              <path d="M 15 15 L 25 65 L 55 65 L 65 15 Z" />
              <line x1="10" y1="15" x2="70" y2="15" />
              {/* Straw */}
              <line x1="40" y1="5" x2="50" y2="-10" />
            </g>

            {/* Mini Fries Box */}
            <g transform="translate(40, 130) scale(0.6)" stroke="#F2E9D4" strokeWidth="2.5" fill="none">
              <path d="M 20 30 L 25 70 L 55 70 L 60 30 Z" />
              <line x1="26" y1="30" x2="26" y2="10" />
              <line x1="34" y1="30" x2="33" y2="5" />
              <line x1="42" y1="30" x2="44" y2="8" />
              <line x1="50" y1="30" x2="53" y2="12" />
            </g>

            {/* Starburst */}
            <g transform="translate(150, 145)" fill="#F2B705">
              <polygon points="10,0 12,7 19,8 14,13 16,20 10,16 4,20 6,13 1,8 8,7" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#burger-doodle-grid)" />
      </svg>
    </div>
  );
};
