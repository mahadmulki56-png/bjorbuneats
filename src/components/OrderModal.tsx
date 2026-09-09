import React, { useState } from 'react';
import { BurgerItem } from '../types';
import { X, Plus, Minus, Check, ShoppingBag, Flame, Sparkles } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBurger: BurgerItem | null;
  onOrderSuccess: (orderSummary: string) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedBurger,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [quantity, setQuantity] = useState(1);
  const [pattySize, setPattySize] = useState<'single' | 'double' | 'triple'>('double');
  const [spiceLevel, setSpiceLevel] = useState<'mild' | 'regular' | 'fire'>('regular');
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraBacon, setExtraBacon] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Price calculations
  const basePrice = selectedBurger ? selectedBurger.price : 14.50;
  const sizeCost = pattySize === 'single' ? -2.00 : pattySize === 'triple' ? 3.50 : 0;
  const cheeseCost = extraCheese ? 1.50 : 0;
  const baconCost = extraBacon ? 2.00 : 0;
  const unitPrice = basePrice + sizeCost + cheeseCost + baconCost;
  const totalPrice = unitPrice * quantity;

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      onOrderSuccess(
        `${quantity}x ${selectedBurger?.name || 'Artisan Burger'} (${pattySize.toUpperCase()})`
      );
      setOrderConfirmed(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#0A291B] border-2 border-[#F2B705]/40 rounded-[36px] overflow-hidden shadow-2xl text-[#F2E9D4] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-order-modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F2E9D4]/10 hover:bg-[#F2E9D4]/20 flex items-center justify-center text-[#F2E9D4] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {orderConfirmed ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F2B705] text-[#0A291B] mx-auto flex items-center justify-center mb-4">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h3 className="font-bubbly text-3xl uppercase text-[#F2E9D4] mb-2">
              Order Dispatched to Kitchen!
            </h3>
            <p className="text-sm text-[#F2E9D4]/80">
              Freshly grilled and seasoned with passion. Prepare your tastebuds!
            </p>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-4 border-b border-[#F2E9D4]/15 pb-4 mb-5">
              <div className="w-20 h-20 rounded-2xl bg-[#F2E9D4] p-2 flex items-center justify-center shrink-0">
                <img
                  src={selectedBurger?.image || 'https://pngimg.com/d/burger_sandwich_PNG4114.png'}
                  alt={selectedBurger?.name || 'Burger'}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F2B705] block">
                  Boutique Craft Customizer
                </span>
                <h3 className="font-bubbly text-2xl sm:text-3xl text-[#F2E9D4] uppercase">
                  {selectedBurger?.name || 'CHEESE LAVA BEAST'}
                </h3>
                <p className="text-xs text-[#F2E9D4]/70 line-clamp-1">
                  {selectedBurger?.tagline || 'Molten cheddar eruption with prime aged beef'}
                </p>
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-4 text-xs sm:text-sm">
              
              {/* Patty Size */}
              <div>
                <span className="font-bold text-[#F2E9D4] uppercase tracking-wider block mb-2">
                  Patty Size
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['single', 'double', 'triple'] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPattySize(size)}
                      className={`py-2 px-3 rounded-xl font-bubbly uppercase text-xs transition-all ${
                        pattySize === size
                          ? 'bg-[#F2B705] text-[#0A291B] font-extrabold shadow-md'
                          : 'bg-[#072115] text-[#F2E9D4]/80 hover:bg-[#0c3523] border border-[#F2E9D4]/10'
                      }`}
                    >
                      {size === 'single' && 'Single (-$2)'}
                      {size === 'double' && 'Double (Signature)'}
                      {size === 'triple' && 'Triple (+$3.50)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spice Level */}
              <div>
                <span className="font-bold text-[#F2E9D4] uppercase tracking-wider block mb-2">
                  Spice Profile
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['mild', 'regular', 'fire'] as const).map((spice) => (
                    <button
                      key={spice}
                      type="button"
                      onClick={() => setSpiceLevel(spice)}
                      className={`py-2 px-3 rounded-xl font-bubbly uppercase text-xs transition-all ${
                        spiceLevel === spice
                          ? 'bg-[#F2B705] text-[#0A291B] font-extrabold shadow-md'
                          : 'bg-[#072115] text-[#F2E9D4]/80 hover:bg-[#0c3523] border border-[#F2E9D4]/10'
                      }`}
                    >
                      {spice === 'mild' && 'Mild & Sweet'}
                      {spice === 'regular' && 'Smoky Relish'}
                      {spice === 'fire' && 'Habanero Fire'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <span className="font-bold text-[#F2E9D4] uppercase tracking-wider block mb-2">
                  Extra Indulgence
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExtraCheese(!extraCheese)}
                    className={`p-2.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                      extraCheese
                        ? 'bg-[#F2B705]/20 border-[#F2B705] text-[#F2E9D4]'
                        : 'bg-[#072115] border-[#F2E9D4]/10 text-[#F2E9D4]/70 hover:bg-[#0c3523]'
                    }`}
                  >
                    <span>Extra Lava Cheese</span>
                    <span className="font-bold text-[#F2B705]">+$1.50</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setExtraBacon(!extraBacon)}
                    className={`p-2.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                      extraBacon
                        ? 'bg-[#F2B705]/20 border-[#F2B705] text-[#F2E9D4]'
                        : 'bg-[#072115] border-[#F2E9D4]/10 text-[#F2E9D4]/70 hover:bg-[#0c3523]'
                    }`}
                  >
                    <span>Smoked Bacon Strips</span>
                    <span className="font-bold text-[#F2B705]">+$2.00</span>
                  </button>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-[#F2E9D4]/15">
                <span className="font-bold uppercase tracking-wider text-[#F2E9D4]">
                  Quantity
                </span>
                <div className="flex items-center gap-3 bg-[#072115] px-3 py-1.5 rounded-full border border-[#F2E9D4]/15">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full bg-[#F2E9D4]/10 hover:bg-[#F2E9D4]/20 flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5 text-[#F2E9D4]" />
                  </button>
                  <span className="font-bubbly text-base w-6 text-center text-[#F2B705]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full bg-[#F2E9D4]/10 hover:bg-[#F2E9D4]/20 flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#F2E9D4]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-3 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#F2E9D4]/60 uppercase tracking-widest block">
                  Total Order
                </span>
                <span className="font-bubbly text-2xl sm:text-3xl text-[#F2B705]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleConfirmOrder}
                id="modal-confirm-btn"
                className="flex-1 py-3.5 px-6 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-sm sm:text-base tracking-wider uppercase shadow-[0_6px_20px_rgba(242,183,5,0.4)] hover:bg-[#ffc61a] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                ADD TO ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
