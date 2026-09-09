import React, { useState } from 'react';
import { ReservationFormData } from '../types';
import { Calendar, Clock, ChevronDown, CheckCircle2, Utensils, X } from 'lucide-react';
import { ReservationSuccessModal } from './ReservationSuccessModal';

interface ReservationSectionProps {
  onReservationComplete?: (data: ReservationFormData) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationComplete,
}) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    email: '',
    phone: '',
    guests: '2 Guests',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'BJB-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);
    setSubmitted(true);
    setIsSuccessModalOpen(true);
    if (onReservationComplete) {
      onReservationComplete(formData);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setIsSuccessModalOpen(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      guests: '2 Guests',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
    });
  };

  return (
    <section id="reservation" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 bg-[#0A291B] relative">
      {/* Giant Organic Cream Undulating Container */}
      <div className="max-w-6xl mx-auto bg-[#F2E9D4] text-[#0A291B] rounded-[48px] sm:rounded-[70px] lg:rounded-[80px] p-6 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
        
        {/* Floating Decorative Elements on edges */}
        {/* Herb Top Left */}
        <div className="absolute top-10 left-6 w-12 sm:w-16 pointer-events-none opacity-80 animate-float-slow">
          <img
            src="https://pngimg.com/d/spinach_PNG43.png"
            alt="Leaf accent"
            className="w-full h-auto drop-shadow-md rotate-45"
          />
        </div>

        {/* Mini Burger Top Right */}
        <div className="absolute top-8 right-8 w-14 sm:w-20 pointer-events-none animate-float-medium">
          <img
            src="https://pngimg.com/d/burger_sandwich_PNG4114.png"
            alt="Mini burger accent"
            className="w-full h-auto drop-shadow-lg -rotate-12"
          />
        </div>

        {/* Mini Burger Bottom Left */}
        <div className="absolute bottom-10 left-8 w-14 sm:w-20 pointer-events-none animate-float-fast">
          <img
            src="https://pngimg.com/d/burger_sandwich_PNG4135.png"
            alt="Mini burger accent"
            className="w-full h-auto drop-shadow-lg rotate-12"
          />
        </div>

        {/* Herb Bottom Right */}
        <div className="absolute bottom-10 right-8 w-12 sm:w-16 pointer-events-none opacity-80 animate-float-slow">
          <img
            src="https://pngimg.com/d/spinach_PNG43.png"
            alt="Leaf accent"
            className="w-full h-auto drop-shadow-md -rotate-45"
          />
        </div>

        {/* Main Content Area */}
        <div className="max-w-3xl mx-auto text-center relative z-10">
          
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <h2 className="font-bubbly text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0A291B] flex items-center justify-center gap-3">
              COME ENJOY WITH US
              <span className="hidden sm:inline-block w-9 h-9">
                <img
                  src="https://pngimg.com/d/burger_sandwich_PNG4114.png"
                  alt="burger icon"
                  className="w-full h-full object-contain"
                />
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#0A291B]/80 font-medium max-w-xl mx-auto leading-relaxed">
              Come enjoy juicy handcrafted burgers made with premium ingredients, served hot and fresh in a comfortable and welcoming space.
            </p>
          </div>

          {/* Form / Confirmation Box */}
          {submitted ? (
            <div className="bg-[#072115] text-[#F2E9D4] rounded-[32px] p-8 sm:p-12 shadow-2xl border border-[#F2B705]/40 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#F2B705] text-[#0A291B] mx-auto flex items-center justify-center mb-4 shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-bubbly text-2xl sm:text-3xl uppercase text-[#F2E9D4] mb-2">
                Table Reserved!
              </h3>
              <p className="text-sm text-[#F2E9D4]/80 max-w-md mx-auto mb-6">
                Thank you <strong className="text-[#F2B705]">{formData.fullName}</strong>! Your table for{' '}
                <strong className="text-[#F2B705]">{formData.guests}</strong> on{' '}
                <strong className="text-[#F2B705]">{formData.date}</strong> at{' '}
                <strong className="text-[#F2B705]">{formData.time}</strong> is confirmed.
              </p>
              <div className="inline-block bg-[#0A291B] border border-[#F2E9D4]/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-xs uppercase tracking-widest text-[#F2E9D4]/60 block">
                  Reservation Code
                </span>
                <span className="font-bubbly text-xl text-[#F2B705] tracking-wider">
                  {confirmationCode}
                </span>
              </div>
              <div>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-[#F2E9D4] text-[#0A291B] font-bubbly text-sm tracking-wider uppercase hover:bg-white transition-all cursor-pointer"
                >
                  Make Another Reservation
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              id="table-reservation-form"
              className="bg-[#072115] rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 shadow-2xl border border-[#F2E9D4]/10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left mb-6">
                
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F2E9D4]/90 mb-1.5"
                  >
                    FULL NAME:
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#0A291B] border border-[#F2E9D4]/20 rounded-xl px-4 py-3 text-sm text-[#F2E9D4] placeholder-[#F2E9D4]/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F2E9D4]/90 mb-1.5"
                  >
                    EMAIL ADDRESS:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0A291B] border border-[#F2E9D4]/20 rounded-xl px-4 py-3 text-sm text-[#F2E9D4] placeholder-[#F2E9D4]/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F2E9D4]/90 mb-1.5"
                  >
                    PHONE NUMBER:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0A291B] border border-[#F2E9D4]/20 rounded-xl px-4 py-3 text-sm text-[#F2E9D4] placeholder-[#F2E9D4]/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  />
                </div>

                {/* Guest Count Selector */}
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F2E9D4]/90 mb-1.5"
                  >
                    GUEST:
                  </label>
                  <div className="relative">
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-[#0A291B] border border-[#F2E9D4]/20 rounded-xl px-4 py-3 text-sm text-[#F2E9D4] appearance-none focus:outline-none focus:border-[#F2B705] transition-colors pr-10 cursor-pointer"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests (Couple Table)</option>
                      <option value="4 Guests">4 Guests (Booth Table)</option>
                      <option value="6+ Guests">6+ Guests (Family Feast)</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F2E9D4]/60 pointer-events-none" />
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F2E9D4]/90 mb-1.5"
                  >
                    DD/MM/YY:
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-[#0A291B] border border-[#F2E9D4]/20 rounded-xl px-4 py-3 text-sm text-[#F2E9D4] focus:outline-none focus:border-[#F2B705] transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                {/* Time Picker */}
                <div>
                  <label
                    htmlFor="time"
                    className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F2E9D4]/90 mb-1.5"
                  >
                    TIME:
                  </label>
                  <div className="relative">
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-[#0A291B] border border-[#F2E9D4]/20 rounded-xl px-4 py-3 text-sm text-[#F2E9D4] appearance-none focus:outline-none focus:border-[#F2B705] transition-colors pr-10 cursor-pointer"
                    >
                      <option value="12:00">12:00 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="17:00">05:00 PM (Early Dinner)</option>
                      <option value="18:30">06:30 PM (Dinner Rush)</option>
                      <option value="19:00">07:00 PM (Prime Hour)</option>
                      <option value="20:30">08:30 PM (Late Dinner)</option>
                      <option value="21:30">09:30 PM (Night Bites)</option>
                    </select>
                    <Clock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F2E9D4]/60 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Submit Pill Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-reservation-btn"
                  className="w-full py-4 rounded-full bg-[#F2E9D4] text-[#0A291B] font-bubbly text-base sm:text-lg tracking-wider uppercase shadow-lg hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-2 border-transparent hover:border-[#F2B705]"
                >
                  GET YOUR BURGER
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

      {/* Interactive High-Converting Reservation Success Modal Popup */}
      <ReservationSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        reservation={formData}
        confirmationCode={confirmationCode}
      />
    </section>
  );
};
