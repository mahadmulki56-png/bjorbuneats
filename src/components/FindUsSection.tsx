import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, ExternalLink, Check, Car, Bike } from 'lucide-react';

export const FindUsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Food Stread Districk No.32, Jakarta Selatan');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="find-us" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 bg-[#0A291B]">
      {/* Heavily Rounded Organic Cream Container Block */}
      <div className="organic-container-large max-w-7xl mx-auto bg-[#F2E9D4] text-[#0A291B] rounded-[48px] sm:rounded-[70px] lg:rounded-[80px] p-6 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
        
        {/* Subtle decorative background tints */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F2B705]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#0A291B]/5 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A291B] text-[#F2B705] font-bubbly text-xs tracking-wider uppercase mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5" />
            COME SAY HELLO
          </span>
          <h2 className="font-bubbly text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0A291B] leading-none drop-shadow-sm">
            FIND US
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#0A291B]/80 font-medium max-w-xl mx-auto leading-relaxed">
            Dine in at our vibrant flagship space, pick up curbside, or order straight to your doorstep.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
          
          {/* Left Column: Location & Hours Information */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-5">
            
            {/* Address & Status Card */}
            <div className="bg-[#ffffff]/70 backdrop-blur-sm rounded-[32px] p-6 sm:p-8 border border-[#0A291B]/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0A291B]/60">
                  FLAGSHIP HEADQUARTERS
                </span>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A291B] text-[#F2B705] text-xs font-bubbly uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  OPEN NOW
                </div>
              </div>

              {/* Clickable Google Maps Address Link */}
              <a
                href="https://maps.google.com/?q=Food+Street+District+No.32+Jakarta+Selatan"
                target="_blank"
                rel="noopener noreferrer"
                id="main-address-link"
                className="group block mb-6 transition-transform"
                title="Open in Google Maps"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bubbly text-2xl sm:text-3xl text-[#0A291B] uppercase group-hover:text-[#12422c] transition-colors flex items-center gap-2">
                    Food Stread Districk No.32
                    <ExternalLink className="w-5 h-5 text-[#F2B705] opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#0A291B]/80 font-medium group-hover:text-[#0A291B] underline decoration-[#F2B705]/60 underline-offset-4 transition-colors mt-1">
                  Jakarta Selatan, DKI Jakarta 12160 • Corner of Sultan Hasanuddin St.
                </p>
              </a>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopyAddress}
                  id="copy-address-btn"
                  className="px-5 py-2.5 rounded-full bg-[#0A291B] text-[#F2E9D4] font-bubbly text-xs tracking-wider uppercase hover:bg-[#12422c] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#F2B705]" />
                      COPIED TO CLIPBOARD!
                    </>
                  ) : (
                    <>
                      <Navigation className="w-3.5 h-3.5 text-[#F2B705]" />
                      COPY ADDRESS
                    </>
                  )}
                </button>

                <a
                  href="https://maps.google.com/?q=Food+Street+District+No.32+Jakarta+Selatan"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="google-maps-link"
                  className="px-5 py-2.5 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-xs tracking-wider uppercase hover:bg-[#ffc61a] active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  OPEN IN GOOGLE MAPS
                </a>
              </div>
            </div>

            {/* Operating Hours & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Hours */}
              <div className="bg-[#ffffff]/70 backdrop-blur-sm rounded-[28px] p-5 border border-[#0A291B]/10">
                <div className="flex items-center gap-2 text-[#0A291B] mb-3">
                  <Clock className="w-4 h-4 text-[#F2B705]" />
                  <h4 className="font-bubbly text-sm uppercase tracking-wide">
                    OPERATING HOURS
                  </h4>
                </div>
                <ul className="text-xs space-y-1.5 text-[#0A291B]/80 font-medium">
                  <li className="flex justify-between">
                    <span>Mon – Thu:</span>
                    <span className="font-bold">10:00 AM – 10:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Fri – Sat:</span>
                    <span className="font-bold">10:00 AM – 11:30 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-bold">09:00 AM – 10:00 PM</span>
                  </li>
                </ul>
              </div>

              {/* Transit & Amenities */}
              <div className="bg-[#ffffff]/70 backdrop-blur-sm rounded-[28px] p-5 border border-[#0A291B]/10">
                <div className="flex items-center gap-2 text-[#0A291B] mb-3">
                  <Phone className="w-4 h-4 text-[#F2B705]" />
                  <h4 className="font-bubbly text-sm uppercase tracking-wide">
                    DIRECT CONTACT
                  </h4>
                </div>
                <div className="text-xs text-[#0A291B]/80 font-medium space-y-2">
                  {/* Clickable Phone Number */}
                  <a
                    href="tel:+6281234567890"
                    id="contact-phone-link"
                    className="inline-flex items-center gap-2 font-bold text-sm sm:text-base text-[#0A291B] hover:text-[#12422c] underline decoration-[#F2B705] decoration-2 underline-offset-4 transition-colors"
                  >
                    <span>+62 812-3456-7890</span>
                    <span className="text-[10px] bg-[#F2B705] text-[#0A291B] font-bubbly uppercase px-2 py-0.5 rounded-full">
                      TAP TO CALL
                    </span>
                  </a>
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-[#0A291B]/70">
                    <span className="flex items-center gap-1">
                      <Car className="w-3 h-3 text-[#0A291B]" /> Free Valet
                    </span>
                    <span className="flex items-center gap-1">
                      <Bike className="w-3 h-3 text-[#0A291B]" /> MRT 3m Walk
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Delivery Partners Pill Banner */}
            <div className="bg-[#0A291B]/5 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 border border-[#0A291B]/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A291B]/70">
                ORDER DELIVERY VIA:
              </span>
              <div className="flex items-center gap-2 text-xs font-bubbly uppercase">
                <span className="px-3 py-1 rounded-full bg-[#ffffff] text-[#0A291B] shadow-sm border border-[#0A291B]/10">
                  GrabFood
                </span>
                <span className="px-3 py-1 rounded-full bg-[#ffffff] text-[#0A291B] shadow-sm border border-[#0A291B]/10">
                  GoFood
                </span>
                <span className="px-3 py-1 rounded-full bg-[#ffffff] text-[#0A291B] shadow-sm border border-[#0A291B]/10">
                  UberEats
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Stylized Visual Map Preview */}
          <a
            href="https://maps.google.com/?q=Food+Street+District+No.32+Jakarta+Selatan"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Food Street District in Google Maps"
            className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] rounded-[36px] overflow-hidden border-4 border-[#0A291B]/15 shadow-xl bg-[#072115] group cursor-pointer block"
          >
            
            {/* Stylized vector map graphic */}
            <svg
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              viewBox="0 0 600 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Map background terrain */}
              <rect width="600" height="500" fill="#0A291B" />
              
              {/* Organic green park area */}
              <path
                d="M 20 40 Q 120 20 220 80 Q 280 140 240 240 Q 180 300 80 260 Q 10 220 20 40 Z"
                fill="#0d3523"
              />
              <path
                d="M 380 320 Q 520 290 560 380 Q 520 480 400 460 Q 320 420 380 320 Z"
                fill="#0d3523"
              />

              {/* Water feature / canal */}
              <path
                d="M 0 380 Q 160 340 320 420 Q 450 490 600 470 L 600 500 L 0 500 Z"
                fill="#061c12"
              />

              {/* Major Roads Grid */}
              <path
                d="M 300 0 L 300 500"
                stroke="#174830"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <path
                d="M 0 250 L 600 250"
                stroke="#174830"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M 80 0 L 520 500"
                stroke="#153e2a"
                strokeWidth="16"
                strokeDasharray="8 6"
              />
              <path
                d="M 0 120 Q 260 200 600 130"
                stroke="#174830"
                strokeWidth="14"
              />

              {/* Street Names */}
              <text x="315" y="60" fill="#F2E9D4" opacity="0.4" fontSize="11" fontWeight="bold" letterSpacing="1">
                FOOD STREAD DISTRICT
              </text>
              <text x="40" y="240" fill="#F2E9D4" opacity="0.4" fontSize="11" fontWeight="bold" letterSpacing="1">
                SULTAN HASANUDDIN ST
              </text>
              <text x="350" y="440" fill="#F2E9D4" opacity="0.3" fontSize="10" fontWeight="bold">
                BJORBUN PARK
              </text>
            </svg>

            {/* Central Bjorbun Pin with Pulse Animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-[#F2B705] border-4 border-[#0A291B] flex items-center justify-center shadow-[0_10px_25px_rgba(242,183,5,0.6)] animate-bounce">
                  <MapPin className="w-7 h-7 text-[#0A291B] fill-[#0A291B]" />
                </div>
                {/* Ripple ring */}
                <div className="absolute inset-0 rounded-full bg-[#F2B705] animate-ping opacity-40 -z-10" />
              </div>
              
              {/* Location Badge */}
              <div className="mt-2 bg-[#F2E9D4] text-[#0A291B] px-4 py-1.5 rounded-full font-bubbly text-xs uppercase tracking-wider shadow-xl border-2 border-[#F2B705]">
                BJORBUN FLAGSHIP #32
              </div>
            </div>

            {/* Corner Info Overlay & Click Prompt */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-[#0A291B]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#F2E9D4]/15 text-[#F2E9D4] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F2B705] animate-ping" />
                <span className="font-semibold">Average Kitchen Prep: 8–12 mins</span>
              </div>
              <span className="text-[#F2B705] font-bubbly uppercase group-hover:underline flex items-center gap-1">
                OPEN MAP <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>

          </a>

        </div>

      </div>
    </section>
  );
};
