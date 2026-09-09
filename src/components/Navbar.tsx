import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, PhoneCall, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenOrder: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder, cartCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A291B]/90 backdrop-blur-md py-3 shadow-lg shadow-black/20 border-b border-[#F2E9D4]/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Brand Logo Container */}
        <div id="nav-logo-container" className="flex items-center">
          <a
            href="#home"
            id="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center group cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="Bjorbun Logo"
              className="h-[50px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
              referrerPolicy="no-referrer"
            />
          </a>
        </div>


        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs sm:text-sm font-semibold tracking-wider text-[#F2E9D4]/90 uppercase">
          <button
            onClick={() => scrollToSection('signature')}
            className="hover:text-[#F2B705] transition-colors py-1 cursor-pointer hover:underline underline-offset-8"
            id="nav-link-signature"
          >
            MENU
          </button>
          <button
            onClick={() => scrollToSection('kitchen')}
            className="hover:text-[#F2B705] transition-colors py-1 cursor-pointer hover:underline underline-offset-8"
            id="nav-link-kitchen"
          >
            KITCHEN
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-[#F2B705] transition-colors py-1 cursor-pointer hover:underline underline-offset-8"
            id="nav-link-features"
          >
            SERVICES
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="hover:text-[#F2B705] transition-colors py-1 cursor-pointer hover:underline underline-offset-8"
            id="nav-link-testimonials"
          >
            TESTIMONIAL
          </button>
          <button
            onClick={() => scrollToSection('find-us')}
            className="hover:text-[#F2B705] transition-colors py-1 cursor-pointer hover:underline underline-offset-8"
            id="nav-link-find-us"
          >
            FIND US
          </button>
          <button
            onClick={() => scrollToSection('reservation')}
            className="hover:text-[#F2B705] transition-colors py-1 cursor-pointer hover:underline underline-offset-8"
            id="nav-link-reservation"
          >
            BOOK TABLE
          </button>
        </nav>

        {/* Right CTA Button & Cart Trigger */}
        <div className="flex items-center gap-3">
          {/* Cart Bag Icon with dynamic item count badge */}
          <button
            onClick={onOpenOrder}
            id="nav-cart-btn"
            aria-label="View Shopping Bag"
            className="relative p-2.5 rounded-full bg-[#F2E9D4]/10 hover:bg-[#F2E9D4]/20 text-[#F2E9D4] hover:text-[#F2B705] transition-all cursor-pointer border border-[#F2E9D4]/20 flex items-center justify-center"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F2B705] text-[#0A291B] font-bubbly text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenOrder}
            id="nav-order-button"
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-sm tracking-wider uppercase shadow-[0_4px_14px_rgba(242,183,5,0.4)] hover:bg-[#ffc61a] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            ORDER NOW
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle"
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-[#F2E9D4] hover:text-[#F2B705] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A291B]/95 backdrop-blur-lg border-b border-[#F2E9D4]/15 px-6 py-6 space-y-4">
          <button
            onClick={() => scrollToSection('signature')}
            className="block w-full text-left text-base font-semibold uppercase text-[#F2E9D4] hover:text-[#F2B705]"
          >
            MENU
          </button>
          <button
            onClick={() => scrollToSection('kitchen')}
            className="block w-full text-left text-base font-semibold uppercase text-[#F2E9D4] hover:text-[#F2B705]"
          >
            KITCHEN
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left text-base font-semibold uppercase text-[#F2E9D4] hover:text-[#F2B705]"
          >
            SERVICES
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="block w-full text-left text-base font-semibold uppercase text-[#F2E9D4] hover:text-[#F2B705]"
          >
            TESTIMONIAL
          </button>
          <button
            onClick={() => scrollToSection('find-us')}
            className="block w-full text-left text-base font-semibold uppercase text-[#F2E9D4] hover:text-[#F2B705]"
          >
            FIND US
          </button>
          <button
            onClick={() => scrollToSection('reservation')}
            className="block w-full text-left text-base font-semibold uppercase text-[#F2E9D4] hover:text-[#F2B705]"
          >
            BOOK TABLE
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-base tracking-wider uppercase shadow-md"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
