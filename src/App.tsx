import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureSection } from './components/SignatureSection';
import { AboutKitchenSection } from './components/AboutKitchenSection';
import { FeaturesSection } from './components/FeaturesSection';
import { MenuPreview } from './components/MenuPreview';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FindUsSection } from './components/FindUsSection';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { BackgroundDoodles } from './components/BackgroundDoodles';
import { BurgerItem } from './types';
import { SIGNATURE_BURGERS } from './data/restaurantData';
import { ShoppingBag, Check } from 'lucide-react';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedBurger, setSelectedBurger] = useState<BurgerItem | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleOpenOrder = (burger?: BurgerItem) => {
    setSelectedBurger(burger || SIGNATURE_BURGERS[0]);
    setIsOrderModalOpen(true);
  };

  const handleOrderSuccess = (orderSummary: string) => {
    setCartCount((prev) => prev + 1);
    showToast(`Added to Order: ${orderSummary}`);
  };

  const handleQuickAdd = (item: { name: string; price: number }) => {
    setCartCount((prev) => prev + 1);
    showToast(`Added ${item.name} ($${item.price.toFixed(2)})`);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A291B] text-[#F2E9D4] relative selection:bg-[#F2B705] selection:text-[#0A291B]">
      {/* Background Watermark Food Doodles */}
      <BackgroundDoodles />

      {/* Main Navigation Bar */}
      <Navbar onOpenOrder={() => handleOpenOrder()} cartCount={cartCount} />

      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero
          onReserveClick={() => scrollToSection('reservation')}
          onExploreMenu={() => scrollToSection('signature')}
        />

        {/* 2. Signature Catalog Section with 16 items & 4 Category Pills */}
        <SignatureSection
          onSelectBurger={(burger) => handleOpenOrder(burger)}
          onGetBurgerClick={() => scrollToSection('reservation')}
        />

        {/* 3. New Section: About Our Kitchen (Wrapped in Organic Cream Container) */}
        <AboutKitchenSection />

        {/* 4. Features Section ("WHY PEOPLE LOVE OUR BURGERS") */}
        <FeaturesSection />

        {/* 5. Menu Preview Section */}
        <MenuPreview
          onSelectItem={handleQuickAdd}
          onOpenOrder={() => handleOpenOrder()}
        />

        {/* 6. Testimonials Section ("WHAT OUR CUSTOMERS SAY") */}
        <TestimonialsSection />

        {/* 7. New Section: Find Us (Wrapped in Organic Cream Container) */}
        <FindUsSection />

        {/* 8. Reservation Form Section ("COME ENJOY WITH US") */}
        <ReservationSection
          onReservationComplete={(data) => {
            showToast(`Table booked for ${data.fullName}!`);
          }}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Floating Order Cart Quick Launcher */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-bounce">
          <button
            onClick={() => handleOpenOrder()}
            id="floating-cart-button"
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-sm uppercase shadow-[0_8px_25px_rgba(242,183,5,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-[#0A291B]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag ({cartCount})</span>
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#F2E9D4] text-[#0A291B] px-6 py-3 rounded-full shadow-2xl flex items-center gap-2.5 border-2 border-[#F2B705] font-semibold text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-5 h-5 rounded-full bg-[#0A291B] text-[#F2B705] flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Order / Customization Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedBurger={selectedBurger}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
