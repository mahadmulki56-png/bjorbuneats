import React from 'react';
import { CheckCircle2, Calendar, Clock, Users, X, MapPin, Share2 } from 'lucide-react';
import { ReservationFormData } from '../types';

interface ReservationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: ReservationFormData | null;
  confirmationCode: string;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  isOpen,
  onClose,
  reservation,
  confirmationCode,
}) => {
  if (!isOpen || !reservation) return null;

  const handleAddToCalendar = () => {
    // Generate simple Google Calendar Link
    const title = encodeURIComponent('Dinner at Bjorbun Burger Joint');
    const details = encodeURIComponent(
      `Table reserved for ${reservation.fullName} (${reservation.guests}) at Bjorbun Burgers. Confirmation: ${confirmationCode}.`
    );
    const location = encodeURIComponent('Food Street District No.32, Jakarta Selatan');
    
    // Fallback date string format
    const startIso = `${reservation.date.replace(/-/g, '')}T${reservation.time.replace(':', '')}00Z`;
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        id="reservation-success-modal"
        className="relative w-full max-w-lg bg-[#072115] text-[#F2E9D4] rounded-[36px] sm:rounded-[44px] p-7 sm:p-10 border-2 border-[#F2B705] shadow-[0_20px_60px_rgba(0,0,0,0.85)] animate-in zoom-in-95 duration-300"
      >
        {/* Top Gold Close Button */}
        <button
          onClick={onClose}
          id="close-reservation-success-modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F2E9D4]/10 hover:bg-[#F2E9D4]/20 flex items-center justify-center text-[#F2E9D4] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gold Checkmark Badge */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F2B705] text-[#0A291B] flex items-center justify-center shadow-[0_0_35px_rgba(242,183,5,0.6)] animate-bounce">
              <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.5]" />
            </div>
            {/* Sparkle badge */}
            <div className="absolute -top-1 -right-1 bg-[#0A291B] text-[#F2B705] text-[10px] font-bubbly px-2 py-0.5 rounded-full border border-[#F2B705]">
              CONFIRMED
            </div>
          </div>
        </div>

        {/* Bubbly Header */}
        <div className="text-center mb-6">
          <h2 className="font-bubbly text-2xl sm:text-3xl lg:text-4xl uppercase text-[#F2E9D4] tracking-tight mb-2">
            RESERVATION CONFIRMED!
          </h2>
          {/* Exact prompt sentence required */}
          <p className="text-sm sm:text-base text-[#F2E9D4]/90 font-medium leading-relaxed max-w-md mx-auto">
            Reservation Confirmed! We&apos;ve saved a table for{' '}
            <strong className="text-[#F2B705] underline decoration-[#F2B705]/50 underline-offset-4">
              {reservation.fullName}
            </strong>{' '}
            on{' '}
            <strong className="text-[#F2B705] underline decoration-[#F2B705]/50 underline-offset-4">
              {reservation.date}
            </strong>{' '}
            at{' '}
            <strong className="text-[#F2B705] underline decoration-[#F2B705]/50 underline-offset-4">
              {reservation.time}
            </strong>
            .
          </p>
        </div>

        {/* Confirmation Detail Card */}
        <div className="bg-[#0A291B] rounded-2xl p-4 sm:p-5 border border-[#F2E9D4]/15 mb-6 space-y-3">
          <div className="flex items-center justify-between border-b border-[#F2E9D4]/10 pb-3">
            <span className="text-xs uppercase tracking-wider text-[#F2E9D4]/60 font-semibold">
              Confirmation Code
            </span>
            <span className="font-bubbly text-lg sm:text-xl text-[#F2B705] tracking-widest bg-[#072115] px-3 py-1 rounded-lg border border-[#F2B705]/30">
              {confirmationCode}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs">
            <div className="p-2 rounded-xl bg-[#072115]/80">
              <Users className="w-4 h-4 text-[#F2B705] mx-auto mb-1" />
              <span className="text-[10px] text-[#F2E9D4]/60 block uppercase">Party</span>
              <span className="font-bold text-[#F2E9D4]">{reservation.guests}</span>
            </div>
            <div className="p-2 rounded-xl bg-[#072115]/80">
              <Calendar className="w-4 h-4 text-[#F2B705] mx-auto mb-1" />
              <span className="text-[10px] text-[#F2E9D4]/60 block uppercase">Date</span>
              <span className="font-bold text-[#F2E9D4]">{reservation.date}</span>
            </div>
            <div className="p-2 rounded-xl bg-[#072115]/80">
              <Clock className="w-4 h-4 text-[#F2B705] mx-auto mb-1" />
              <span className="text-[10px] text-[#F2E9D4]/60 block uppercase">Time</span>
              <span className="font-bold text-[#F2E9D4]">{reservation.time}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 text-xs text-[#F2E9D4]/70">
            <MapPin className="w-4 h-4 text-[#F2B705] flex-shrink-0 mt-0.5" />
            <span>Food Street District No.32, Jakarta Selatan (Free valet available)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddToCalendar}
            id="add-to-calendar-btn"
            className="flex-1 py-3.5 px-4 rounded-full bg-[#F2E9D4] text-[#0A291B] font-bubbly text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            ADD TO CALENDAR
          </button>

          <button
            onClick={onClose}
            id="done-reservation-btn"
            className="flex-1 py-3.5 px-4 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-xs sm:text-sm uppercase tracking-wider hover:bg-[#ffc61a] transition-all cursor-pointer shadow-md font-bold"
          >
            DONE & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
