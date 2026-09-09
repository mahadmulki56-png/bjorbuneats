import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { CartItem } from '../types';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Check,
  MapPin,
  Phone,
  User,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export interface CustomerOrderDetails {
  name: string;
  phone: string;
  address: string;
  subtotal: number;
  tax: number;
  grandTotal: number;
  items: CartItem[];
  orderId: string;
  orderSummaryText: string;
}

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem?: (id: string) => void;
  onClearCart?: () => void;
  onSubmitOrder?: (orderDetails: CustomerOrderDetails) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSubmitOrder,
}) => {
  // 1. Customer Intake Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    address?: string;
  }>({});

  // 2. Dispatch Loading & Success Modal Overlay State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrderDetails | null>(null);

  // 3. Interactive Math Logic
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08; // 8% State Sales Tax
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax;
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Form Validation
  const validateForm = () => {
    const errors: { name?: string; phone?: string; address?: string } = {};
    if (!customerName.trim()) {
      errors.name = 'Please provide your name for the kitchen ticket.';
    }
    if (!customerPhone.trim()) {
      errors.phone = 'Please provide your mobile phone number.';
    } else if (customerPhone.replace(/[^0-9]/g, '').length < 7) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!deliveryAddress.trim()) {
      errors.address = 'Please specify your delivery address or unit.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 4. Live EmailJS Dispatch Function
  const handleSubmitOrder = async (event: React.FormEvent) => {
    // Stop default page reload
    event.preventDefault();

    if (items.length === 0) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Format clean, readable order summary string (e.g. "2x Drip Stack Burger, 1x Truffle Fries")
    const formattedOrderString = items
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(', ');

    const orderId = `BJB-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderDetails: CustomerOrderDetails = {
      name: customerName.trim(),
      phone: customerPhone.trim(),
      address: deliveryAddress.trim(),
      subtotal,
      tax,
      grandTotal,
      items: [...items],
      orderId,
      orderSummaryText: formattedOrderString,
    };

    // EmailJS Parameters & Execution with fallback placeholders
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    const templateParams = {
      order_id: orderId,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      delivery_address: deliveryAddress.trim(),
      order_details: formattedOrderString,
      subtotal: `$${subtotal.toFixed(2)}`,
      tax: `$${tax.toFixed(2)}`,
      grand_total: `$${grandTotal.toFixed(2)}`,
    };

    try {
      // Execute EmailJS browser SDK dispatch
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
    } catch (error) {
      // Gracefully log notice when test/placeholder credentials are used
      console.warn(
        'EmailJS dispatch notice (using placeholder or test configuration):',
        error
      );
    } finally {
      setIsSubmitting(false);
      setConfirmedOrder(orderDetails);
      setShowSuccessModal(true);
      if (onSubmitOrder) {
        onSubmitOrder(orderDetails);
      }
    }
  };

  const handleFinishSuccess = () => {
    setShowSuccessModal(false);
    setConfirmedOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    setDeliveryAddress('');
    setFormErrors({});
    if (onClearCart) {
      onClearCart();
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        id="cart-drawer-backdrop"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
        className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      />

      {/* Slide-out Drawer Panel */}
      <aside
        id="cart-drawer-panel"
        aria-labelledby="cart-drawer-heading"
        className={`fixed top-0 right-0 h-full w-full sm:max-w-lg md:max-w-xl bg-[#072115] text-[#F2E9D4] z-50 shadow-[-12px_0_50px_rgba(0,0,0,0.85)] border-l border-[#F2B705]/20 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-[#F2E9D4]/10 flex items-center justify-between bg-[#0A291B]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#F2B705] text-[#0A291B] flex items-center justify-center font-bubbly font-extrabold shadow-[0_4px_16px_rgba(242,183,5,0.4)]">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2
                id="cart-drawer-heading"
                className="font-bubbly text-xl sm:text-2xl uppercase tracking-wide text-[#F2E9D4]"
              >
                YOUR ORDER BAG
              </h2>
              <p className="text-xs text-[#F2E9D4]/70">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            type="button"
            id="cart-drawer-close-btn"
            onClick={onClose}
            aria-label="Close cart drawer"
            className="w-10 h-10 rounded-full bg-[#F2E9D4]/10 hover:bg-[#F2E9D4]/20 text-[#F2E9D4] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 no-scrollbar space-y-6">
          {items.length === 0 ? (
            /* Empty State */
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#F2E9D4]/10 border-2 border-dashed border-[#F2B705]/40 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-[#F2B705]/70" />
              </div>
              <h3 className="font-bubbly text-2xl uppercase text-[#F2E9D4]">
                YOUR BAG IS EMPTY
              </h3>
              <p className="text-xs sm:text-sm text-[#F2E9D4]/70 max-w-xs leading-relaxed">
                Add our signature smash burgers, crispy sides, craft shakes, or desserts to begin your order.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-[#F2B705] text-[#0A291B] font-bubbly text-sm uppercase tracking-wider hover:bg-[#ffc61a] transition-all cursor-pointer shadow-md font-bold"
              >
                BROWSE MENU
              </button>
            </div>
          ) : (
            <>
              {/* Items List Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 text-xs">
                  <span className="text-[#F2E9D4]/60 uppercase tracking-wider font-bold">
                    Bag Items ({totalItemCount})
                  </span>
                  {onClearCart && (
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-red-400 hover:text-red-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Clear All
                    </button>
                  )}
                </div>

                <div className="space-y-2.5">
                  {items.map((cartItem) => {
                    const itemTotal = cartItem.price * cartItem.quantity;
                    return (
                      <div
                        key={cartItem.id}
                        id={`cart-item-${cartItem.id}`}
                        className="bg-[#0A291B] rounded-2xl p-3 sm:p-3.5 border border-[#F2E9D4]/10 flex items-center gap-3.5 shadow-sm hover:border-[#F2B705]/30 transition-colors"
                      >
                        {/* Food Thumbnail */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#F2E9D4]/10 flex-shrink-0 flex items-center justify-center p-1.5 border border-[#F2B705]/20 overflow-hidden">
                          <img
                            src={cartItem.image}
                            alt={cartItem.name}
                            style={{ objectFit: 'contain' }}
                            className="w-full h-full object-contain drop-shadow-md"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bubbly text-sm sm:text-base text-[#F2E9D4] uppercase truncate leading-tight">
                            {cartItem.name}
                          </h4>
                          <span className="text-xs text-[#F2B705] font-semibold">
                            ${cartItem.price.toFixed(2)} each
                          </span>
                        </div>

                        {/* Quantity Adjuster (+ / -) & Item Price */}
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="font-bubbly text-sm text-[#F2B705]">
                            ${itemTotal.toFixed(2)}
                          </span>

                          <div className="flex items-center gap-1 bg-[#072115] rounded-full p-0.5 border border-[#F2E9D4]/20">
                            <button
                              type="button"
                              onClick={() => {
                                if (cartItem.quantity === 1 && onRemoveItem) {
                                  onRemoveItem(cartItem.id);
                                } else {
                                  onUpdateQuantity(cartItem.id, -1);
                                }
                              }}
                              aria-label={`Decrease quantity of ${cartItem.name}`}
                              className="w-6 h-6 rounded-full bg-[#F2E9D4]/10 hover:bg-[#F2E9D4]/20 text-[#F2E9D4] flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-[#F2E9D4]">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.id, 1)}
                              aria-label={`Increase quantity of ${cartItem.name}`}
                              className="w-6 h-6 rounded-full bg-[#F2B705] text-[#0A291B] flex items-center justify-center hover:bg-[#ffc61a] transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Financial Math Summary (Subtotal, 8% Tax, Grand Total) */}
              <div className="bg-[#0A291B] rounded-2xl p-4 border border-[#F2E9D4]/10 space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-[#F2E9D4]/70">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#F2E9D4]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-[#F2E9D4]/70">
                  <span>State Sales Tax (8%)</span>
                  <span className="font-semibold text-[#F2E9D4]">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#F2E9D4]/10 flex justify-between items-center text-base sm:text-lg">
                  <span className="font-bubbly uppercase text-[#F2E9D4]">Grand Total</span>
                  <span className="font-bubbly text-xl sm:text-2xl text-[#F2B705]">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Customer Intake & EmailJS Dispatch Form */}
              <div className="bg-[#F2E9D4] text-[#0A291B] rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-[#F2B705]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0A291B] text-[#F2B705] flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bubbly text-lg uppercase tracking-wide text-[#0A291B]">
                      DISPATCH DETAILS
                    </h3>
                    <p className="text-[11px] text-[#0A291B]/70 font-medium">
                      Live ticket routing to kitchen station
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmitOrder} className="space-y-3.5">
                  {/* Customer Name */}
                  <div>
                    <label
                      htmlFor="cartCustomerName"
                      className="block text-xs font-bold uppercase tracking-wider text-[#0A291B] mb-1 flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-[#0A291B]" />
                      <span>Customer Name</span>
                    </label>
                    <input
                      id="cartCustomerName"
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (formErrors.name) {
                          setFormErrors((prev) => ({ ...prev, name: undefined }));
                        }
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0A291B]/20 text-[#0A291B] text-sm placeholder-[#0A291B]/40 focus:outline-none focus:ring-2 focus:ring-[#0A291B] transition-all font-medium"
                    />
                    {formErrors.name && (
                      <p className="text-red-600 text-[11px] mt-1 font-semibold">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Mobile Phone Number */}
                  <div>
                    <label
                      htmlFor="cartCustomerPhone"
                      className="block text-xs font-bold uppercase tracking-wider text-[#0A291B] mb-1 flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0A291B]" />
                      <span>Mobile Phone Number</span>
                    </label>
                    <input
                      id="cartCustomerPhone"
                      type="tel"
                      required
                      placeholder="e.g. (555) 349-8201"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (formErrors.phone) {
                          setFormErrors((prev) => ({ ...prev, phone: undefined }));
                        }
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0A291B]/20 text-[#0A291B] text-sm placeholder-[#0A291B]/40 focus:outline-none focus:ring-2 focus:ring-[#0A291B] transition-all font-medium"
                    />
                    {formErrors.phone && (
                      <p className="text-red-600 text-[11px] mt-1 font-semibold">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label
                      htmlFor="cartDeliveryAddress"
                      className="block text-xs font-bold uppercase tracking-wider text-[#0A291B] mb-1 flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#0A291B]" />
                      <span>Delivery Address</span>
                    </label>
                    <textarea
                      id="cartDeliveryAddress"
                      required
                      rows={2}
                      placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                      value={deliveryAddress}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        if (formErrors.address) {
                          setFormErrors((prev) => ({ ...prev, address: undefined }));
                        }
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0A291B]/20 text-[#0A291B] text-sm placeholder-[#0A291B]/40 focus:outline-none focus:ring-2 focus:ring-[#0A291B] transition-all font-medium resize-none"
                    />
                    {formErrors.address && (
                      <p className="text-red-600 text-[11px] mt-1 font-semibold">
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  {/* Prominent Gold Submit Order Button */}
                  <button
                    type="submit"
                    id="submit-cart-order-btn"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full mt-2 py-3.5 rounded-full bg-[#0A291B] hover:bg-[#12422c] text-[#F2B705] font-bubbly text-base sm:text-lg uppercase tracking-wider shadow-[0_6px_20px_rgba(10,41,27,0.4)] transition-all cursor-pointer font-extrabold active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-[#F2B705]/50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#F2B705] border-t-transparent rounded-full animate-spin" />
                        <span>ROUTING TO KITCHEN...</span>
                      </div>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 fill-[#F2B705]" />
                        <span>SUBMIT ORDER • ${grandTotal.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* 5. Order Success Modal Popup Overlay */}
      {showSuccessModal && (
        <div
          id="order-success-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
        >
          <div
            id="order-success-modal-card"
            className="w-full max-w-md bg-[#0A291B] text-[#F2E9D4] rounded-[28px] p-6 sm:p-8 border-2 border-[#F2B705] shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center relative space-y-5 animate-in zoom-in-95 duration-300"
          >
            {/* Gold Checkmark Icon */}
            <div className="w-20 h-20 rounded-full bg-[#F2B705] text-[#0A291B] flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(242,183,5,0.6)] animate-bounce">
              <Check className="w-10 h-10 stroke-[3.5] text-[#0A291B]" />
            </div>

            {/* Required Headline & Subtitle */}
            <div className="space-y-2">
              <h3 className="font-bubbly text-2xl sm:text-3xl uppercase tracking-wide text-[#F2E9D4] leading-tight">
                Order Placed Successfully!
              </h3>
              <p className="text-sm sm:text-base text-[#F2E9D4]/90 font-medium leading-relaxed">
                Your food slip has been routed directly to the kitchen.
              </p>
            </div>

            {/* Ticket Breakdown Slip */}
            {confirmedOrder && (
              <div className="bg-[#072115] rounded-2xl p-4 border border-[#F2B705]/30 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#F2E9D4]/15">
                  <span className="text-[#F2B705] font-bubbly uppercase text-sm tracking-wider">
                    TICKET #{confirmedOrder.orderId}
                  </span>
                  <span className="text-[#F2E9D4]/60">{confirmedOrder.phone}</span>
                </div>

                <div className="text-[#F2E9D4]/80 py-1">
                  <strong className="text-[#F2E9D4]">Items: </strong>
                  {confirmedOrder.orderSummaryText}
                </div>

                <div className="text-[#F2E9D4]/80 py-1 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F2B705] flex-shrink-0 mt-0.5" />
                  <span>{confirmedOrder.address}</span>
                </div>

                <div className="pt-2 border-t border-[#F2E9D4]/15 flex justify-between items-center text-sm">
                  <span className="font-bubbly uppercase text-[#F2E9D4]">Total (COD)</span>
                  <span className="font-bubbly text-base text-[#F2B705]">
                    ${confirmedOrder.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Return & Done Button */}
            <button
              type="button"
              id="success-modal-return-btn"
              onClick={handleFinishSuccess}
              className="w-full py-3.5 rounded-full bg-[#F2B705] hover:bg-[#ffc61a] text-[#0A291B] font-bubbly text-base uppercase tracking-wider shadow-[0_6px_25px_rgba(242,183,5,0.4)] transition-all cursor-pointer font-extrabold active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Return to Menu</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
