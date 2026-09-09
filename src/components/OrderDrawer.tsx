import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Utensils } from 'lucide-react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onExploreMenu: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreMenu,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeout' | 'delivery'>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  // Frontend Accounting calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08;
  const estimatedTax = subtotal * taxRate;
  const grandTotal = subtotal + estimatedTax;
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleStartCheckout = () => {
    if (items.length === 0) return;
    setCheckoutStep('checkout');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = 'BJB-ORD-' + Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(generatedOrderNum);
    setCheckoutStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-out Order Sidebar Drawer */}
      <aside
        id="order-sidebar-drawer"
        className={`fixed top-0 right-0 h-full w-full max-w-md sm:max-w-lg bg-[#072115] text-[#F2E9D4] z-50 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] border-l border-[#F2B705]/20 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-[#F2E9D4]/10 flex items-center justify-between bg-[#0A291B]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F2B705] text-[#0A291B] flex items-center justify-center font-bubbly font-bold shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bubbly text-xl uppercase tracking-wide text-[#F2E9D4]">
                YOUR LIVE ORDER
              </h2>
              <p className="text-xs text-[#F2E9D4]/70">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in order bag
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-order-drawer-btn"
            className="w-10 h-10 rounded-full bg-[#F2E9D4]/10 hover:bg-[#F2E9D4]/20 text-[#F2E9D4] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 no-scrollbar">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-[#F2E9D4]/10 border-2 border-dashed border-[#F2B705]/40 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-[#F2B705]/70" />
                  </div>
                  <h3 className="font-bubbly text-2xl uppercase text-[#F2E9D4] mb-2">
                    YOUR BAG IS EMPTY
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F2E9D4]/70 max-w-xs mb-6">
                    Add our award-winning smash burgers, crispy sides, craft drinks, or desserts to get started.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onExploreMenu();
                    }}
                    className="px-6 py-3 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-sm uppercase tracking-wider hover:bg-[#ffc61a] transition-all cursor-pointer shadow-md"
                  >
                    EXPLORE MENU
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F2E9D4]/10 text-xs">
                    <span className="text-[#F2E9D4]/60 uppercase tracking-wider font-bold">
                      Order Summary
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-red-400 hover:text-red-300 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Clear All
                    </button>
                  </div>

                  {/* List of Cart Items */}
                  <div className="space-y-3">
                    {items.map((cartItem) => (
                      <div
                        key={cartItem.id}
                        id={`cart-item-${cartItem.id}`}
                        className="bg-[#0A291B] rounded-2xl p-3.5 border border-[#F2E9D4]/10 flex items-center gap-3.5 shadow-sm"
                      >
                        {/* Thumbnail image with transparent cutout */}
                        <div className="w-16 h-16 rounded-xl bg-[#F2E9D4]/10 flex-shrink-0 flex items-center justify-center p-1.5 border border-[#F2B705]/20">
                          <img
                            src={cartItem.image}
                            alt={cartItem.name}
                            className="w-full h-full object-contain drop-shadow-md"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bubbly text-sm sm:text-base text-[#F2E9D4] uppercase truncate">
                            {cartItem.name}
                          </h4>
                          {cartItem.customization && (
                            <p className="text-[11px] text-[#F2B705] truncate">
                              {cartItem.customization}
                            </p>
                          )}
                          <p className="text-xs font-bold text-[#F2B705] mt-0.5">
                            ${(cartItem.price * cartItem.quantity).toFixed(2)}{' '}
                            <span className="text-[10px] text-[#F2E9D4]/60 font-normal">
                              (${cartItem.price.toFixed(2)} each)
                            </span>
                          </p>
                        </div>

                        {/* Quantity Selector (+ / -) */}
                        <div className="flex items-center gap-1 bg-[#072115] rounded-full p-1 border border-[#F2E9D4]/15">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, -1)}
                            className="w-6 h-6 rounded-full bg-[#F2E9D4]/10 hover:bg-[#F2E9D4]/20 flex items-center justify-center text-xs text-[#F2E9D4] transition-colors cursor-pointer"
                            title="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#F2E9D4]">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, 1)}
                            className="w-6 h-6 rounded-full bg-[#F2B705] hover:bg-[#ffc61a] flex items-center justify-center text-xs text-[#0A291B] font-bold transition-colors cursor-pointer"
                            title="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove trash button */}
                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          className="text-[#F2E9D4]/40 hover:text-red-400 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#F2E9D4]/10">
                <h3 className="font-bubbly text-lg text-[#F2E9D4] uppercase">
                  COMPLETE CHECKOUT
                </h3>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs text-[#F2B705] hover:underline cursor-pointer"
                >
                  Edit Bag
                </button>
              </div>

              {/* Order Mode selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F2E9D4]/80 font-bold mb-1.5">
                  Dining Option
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['dine-in', 'takeout', 'delivery'] as const).map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setOrderType(mode)}
                      className={`py-2 px-3 rounded-xl font-bubbly text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                        orderType === mode
                          ? 'bg-[#F2B705] text-[#0A291B] border-[#F2B705] font-bold shadow-md'
                          : 'bg-[#0A291B] text-[#F2E9D4] border-[#F2E9D4]/20 hover:border-[#F2B705]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F2E9D4]/80 font-bold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A291B] border border-[#F2E9D4]/20 text-[#F2E9D4] text-sm focus:outline-none focus:border-[#F2B705]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F2E9D4]/80 font-bold mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +62 812-9876-5432"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A291B] border border-[#F2E9D4]/20 text-[#F2E9D4] text-sm focus:outline-none focus:border-[#F2B705]"
                />
              </div>

              {/* Table or Address */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F2E9D4]/80 font-bold mb-1">
                  {orderType === 'dine-in'
                    ? 'Table Number (or write "Counter")'
                    : orderType === 'takeout'
                    ? 'Pickup Time (e.g. In 20 mins)'
                    : 'Delivery Address & Notes'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    orderType === 'dine-in'
                      ? 'Table #07'
                      : orderType === 'takeout'
                      ? 'Pick up at 18:30'
                      : 'Apartment / Street / Unit'
                  }
                  value={tableOrAddress}
                  onChange={(e) => setTableOrAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A291B] border border-[#F2E9D4]/20 text-[#F2E9D4] text-sm focus:outline-none focus:border-[#F2B705]"
                />
              </div>

              {/* Payment preview info */}
              <div className="bg-[#0A291B] p-3.5 rounded-xl border border-[#F2B705]/30 text-xs text-[#F2E9D4]/80 space-y-1">
                <div className="flex justify-between font-semibold text-[#F2E9D4]">
                  <span>Total Due at Counter / Delivery:</span>
                  <span className="text-[#F2B705] font-bubbly text-sm">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-[#F2E9D4]/60">
                  Cash, QRIS, Apple Pay, & all major credit cards accepted.
                </p>
              </div>

              <button
                type="submit"
                id="submit-order-btn"
                className="w-full py-4 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-base uppercase tracking-wider hover:bg-[#ffc61a] active:scale-[0.98] transition-all cursor-pointer shadow-[0_8px_25px_rgba(242,183,5,0.4)] flex items-center justify-center gap-2"
              >
                <span>CONFIRM ORDER (${grandTotal.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#F2B705] text-[#0A291B] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(242,183,5,0.5)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-bubbly text-2xl sm:text-3xl uppercase text-[#F2E9D4] mb-2">
                ORDER RECEIVED!
              </h3>
              <p className="text-xs sm:text-sm text-[#F2E9D4]/80 max-w-xs mb-4">
                Thank you <strong className="text-[#F2B705]">{customerName || 'Chef’s Guest'}</strong>! The kitchen has started searing your fresh order.
              </p>

              <div className="w-full bg-[#0A291B] rounded-2xl p-4 border border-[#F2B705]/40 mb-6 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#F2E9D4]/10 pb-2">
                  <span className="text-[#F2E9D4]/60">Order Ticket:</span>
                  <span className="font-bubbly text-sm text-[#F2B705]">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F2E9D4]/60">Type:</span>
                  <span className="uppercase font-bold text-[#F2E9D4]">{orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F2E9D4]/60">Destination:</span>
                  <span className="font-medium text-[#F2E9D4]">{tableOrAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F2E9D4]/60">Items:</span>
                  <span className="font-medium text-[#F2E9D4]">{totalItemCount} items</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#F2E9D4]/10 font-bold text-sm">
                  <span className="text-[#F2E9D4]">Amount Due:</span>
                  <span className="text-[#F2B705]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-full bg-[#F2E9D4] text-[#0A291B] font-bubbly text-sm uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-md"
              >
                DONE & CLOSE
              </button>
            </div>
          )}
        </div>

        {/* Drawer Sticky Footer with Live Accounting Calculation (Only in Cart mode) */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-5 sm:p-6 bg-[#0A291B] border-t border-[#F2E9D4]/15 shadow-2xl">
            {/* Frontend Accounting Breakdown */}
            <div className="space-y-2 mb-4 text-xs sm:text-sm">
              <div className="flex justify-between text-[#F2E9D4]/80">
                <span>Subtotal</span>
                <span className="font-bold text-[#F2E9D4]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#F2E9D4]/80">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-[#F2E9D4]">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-[#F2E9D4]/15 my-2" />
              <div className="flex justify-between text-base font-extrabold text-[#F2E9D4]">
                <span className="font-bubbly uppercase tracking-wide">Grand Total</span>
                <span className="text-[#F2B705] font-bubbly text-xl tracking-wide">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Prominent Gold Proceed to Checkout Button */}
            <button
              onClick={handleStartCheckout}
              id="proceed-to-checkout-btn"
              className="w-full py-4 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-base uppercase tracking-wider hover:bg-[#ffc61a] active:scale-[0.98] transition-all cursor-pointer shadow-[0_8px_25px_rgba(242,183,5,0.4)] flex items-center justify-center gap-2 border-2 border-[#0A291B]"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
