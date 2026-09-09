import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#072115] text-[#F2E9D4] pt-16 sm:pt-20 pb-12 border-t border-[#F2E9D4]/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[#F2B705]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <a href="#" className="inline-block mb-3">
            <span className="font-bubbly text-3xl sm:text-4xl text-[#F2E9D4] tracking-widest uppercase hover:text-[#F2B705] transition-colors">
              BJORBUN
            </span>
          </a>
          <p className="text-xs sm:text-sm text-[#F2E9D4]/70 leading-relaxed font-medium">
            Serving freshly grilled, handcrafted burgers made with premium ingredients and bold flavors. Your go-to spot for juicy burgers, crispy fries, and great vibes every day.
          </p>
        </div>

        {/* 4 Column Information Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16 text-left">
          
          {/* Col 1: QUICK LINK */}
          <div>
            <h4 className="font-bubbly text-sm sm:text-base uppercase tracking-wider text-[#F2B705] mb-4">
              QUICK LINK
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F2E9D4]/80">
              <li>
                <button
                  onClick={() => onNavigate('main-navbar')}
                  className="hover:text-[#F2B705] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('signature')}
                  className="hover:text-[#F2B705] transition-colors cursor-pointer"
                >
                  Menu Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kitchen')}
                  className="hover:text-[#F2B705] transition-colors cursor-pointer"
                >
                  About Our Kitchen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-[#F2B705] transition-colors cursor-pointer"
                >
                  Why People Love Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-us')}
                  className="hover:text-[#F2B705] transition-colors cursor-pointer"
                >
                  Find Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservation')}
                  className="hover:text-[#F2B705] transition-colors cursor-pointer"
                >
                  Book Table
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: FOLLOW US */}
          <div>
            <h4 className="font-bubbly text-sm sm:text-base uppercase tracking-wider text-[#F2B705] mb-4">
              FOLLOW US
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F2E9D4]/80">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F2B705] transition-colors inline-flex items-center gap-1.5"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F2B705] transition-colors inline-flex items-center gap-1.5"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F2B705] transition-colors inline-flex items-center gap-1.5"
                >
                  Tiktok
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: CONTACT US */}
          <div>
            <h4 className="font-bubbly text-sm sm:text-base uppercase tracking-wider text-[#F2B705] mb-4">
              CONTACT US
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#F2E9D4]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                <span>Food Stread Districk No.32, Jakarta Selatan</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F2B705] shrink-0" />
                <span>+1234 567 890</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F2B705] shrink-0" />
                <span>hello@bjorbunburgers.com</span>
              </p>
            </div>
          </div>

          {/* Col 4: OPENING HOURS */}
          <div>
            <h4 className="font-bubbly text-sm sm:text-base uppercase tracking-wider text-[#F2B705] mb-4">
              OPENING HOURS
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#F2E9D4]/80">
              <div>
                <p className="font-semibold text-[#F2E9D4]">Monday – Friday</p>
                <p className="text-[#F2E9D4]/60">10:00 AM – 10:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-[#F2E9D4]">Saturday – Sunday</p>
                <p className="text-[#F2E9D4]/60">11:00 AM – 11:00 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#F2E9D4]/10 pt-8 text-center text-xs text-[#F2E9D4]/50">
          <p>© 2026 Bjorbun Burgers. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
