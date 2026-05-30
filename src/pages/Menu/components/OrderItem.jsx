import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { SpecialInstructionTags } from '../../../components/orders/SpecialInstructionTags';

export const OrderItem = ({ image, title, price, quantity, onIncrease, onDecrease, onRemove, onSplit, onReplace, showDelete, isSelected,
  onSelect, itemRef, showQuantityControls = true, specialInstructions, onAddInstruction, fulfillment, onToggleFulfillmentType, isParcelActive = false }) => {
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [animIndicator, setAnimIndicator] = useState(null);
  const prevQuantity = useRef(quantity);

  const [isPackVisible, setIsPackVisible] = useState(false);

  // Auto-hide pack counter if quantity hits 0
  useEffect(() => {
    if (fulfillment && fulfillment.take_away === 0 && isPackVisible) {
      setIsPackVisible(false);
    }
  }, [fulfillment?.take_away, isPackVisible]);

  useEffect(() => {
    if (quantity !== prevQuantity.current) {
      const diff = quantity - prevQuantity.current;
      if (diff !== 0) {
        setIsAnimating(true);
        setAnimIndicator(diff > 0 ? '+1' : '-1');
        const timer = setTimeout(() => {
          setIsAnimating(false);
          setAnimIndicator(null);
        }, 800);
        prevQuantity.current = quantity;
        return () => clearTimeout(timer);
      }
    }
  }, [quantity]);

  return (
    <div
      ref={itemRef}
      onClick={onSelect}
      onFocus={onSelect}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onSelect) onSelect();
        }
      }}
      className={clsx(
        "bg-white border rounded-[12px] p-2 flex gap-2.5 items-center shadow-sm relative cursor-pointer transition-all duration-200",
        isSelected
          ? "border-2 border-[#6366f1] shadow-[0_0_0_4px_rgba(99,102,241,0.18)] scale-[1.01] bg-[#f8faff] z-10"
          : "border-[#eaeaef]",
        isAnimating && "animate-order-flash"
      )}
    >
      <div className="w-[42px] h-[42px] shrink-0 drop-shadow-[0px_0px_2px_rgba(255,255,255,0.7)]">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-[6px]" />
      </div>
      <div className="flex-1 flex flex-col gap-0.5">
        <span className="text-[13px] leading-[1.2] text-[#32324d] font-medium pr-16 line-clamp-2">{title}</span>
        {showQuantityControls ? (
          fulfillment ? (
            <div className="flex flex-col gap-0.5 mt-[2px] overflow-hidden transition-all duration-300">
              {/* Dine-In Counter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-[#6366f1] w-[36px]">Serve</span>
                <button onClick={(e) => { e.stopPropagation(); onDecrease('dine_in'); }} className="w-5 h-5 rounded-[6px] bg-[#f8faff] flex items-center justify-center text-[#6366f1] cursor-pointer hover:bg-[#eef2ff] transition-colors border border-[#6366f1]/20">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span className="text-[12px] font-bold text-[#32324d] min-w-[12px] text-center leading-none">{fulfillment.dine_in || 0}</span>
                <button onClick={(e) => { e.stopPropagation(); onIncrease('dine_in'); }} className="w-5 h-5 rounded-[6px] bg-[#f8faff] flex items-center justify-center text-[#6366f1] cursor-pointer hover:bg-[#eef2ff] transition-colors border border-[#6366f1]/20">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                
                {/* Pack Reveal Button (Shows when Pack is 0 and not visible) */}
                {(!fulfillment.take_away && !isPackVisible) && (
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setIsPackVisible(true);
                      if (!fulfillment.take_away) {
                        onIncrease('take_away'); 
                      }
                    }} 
                    className="ml-2 px-2 py-0.5 h-5 rounded-[6px] bg-white border border-[#ffb01d]/50 text-[#d88c00] text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:bg-[#fffcf5] transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    Pack
                  </button>
                )}
              </div>
              
              {/* Takeaway Counter (Contextually Revealed) */}
              {(fulfillment.take_away > 0 || isPackVisible) && (
                <div className="flex items-center gap-1.5 animate-in slide-in-from-top-1 fade-in duration-200 fill-mode-both">
                  <span className="text-[11px] font-bold text-[#d88c00] w-[36px]">Pack</span>
                  <button onClick={(e) => { e.stopPropagation(); onDecrease('take_away'); }} className="w-5 h-5 rounded-[6px] bg-[#fffcf5] flex items-center justify-center text-[#d88c00] cursor-pointer hover:bg-[#fff7e8] transition-colors border border-[#ffb01d]/30">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                  <span className="text-[12px] font-bold text-[#32324d] min-w-[12px] text-center leading-none">{fulfillment.take_away || 0}</span>
                  <button onClick={(e) => { e.stopPropagation(); onIncrease('take_away'); }} className="w-5 h-5 rounded-[6px] bg-[#fffcf5] flex items-center justify-center text-[#d88c00] cursor-pointer hover:bg-[#fff7e8] transition-colors border border-[#ffb01d]/30">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-[2px] relative">
              <button onClick={(e) => { e.stopPropagation(); onDecrease(); }} className="w-5 h-5 rounded-[6px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer hover:bg-[#ffe3d1] transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
              <div className="relative">
                <span className={clsx("text-[13px] font-semibold text-[#666687] min-w-[9px] text-center block transition-transform duration-200", isAnimating && "scale-125 text-[#ff7b2c]")}>{quantity}</span>
                {animIndicator && (
                  <span className={clsx("absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-bold pointer-events-none animate-float-fade", animIndicator === '+1' ? 'text-[#24a44b]' : 'text-[#e23744]')}>
                    {animIndicator}
                  </span>
                )}
              </div>
              <button onClick={(e) => { e.stopPropagation(); onIncrease(); }} className="w-5 h-5 rounded-[6px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer hover:bg-[#ffe3d1] transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
          )
        ) : (
          <div className="flex items-center gap-2 mt-[2px]">
            {fulfillment && (fulfillment.dine_in > 0 || fulfillment.take_away > 0) ? (
              <>
                {fulfillment.dine_in > 0 && (
                  <span className="text-[13px] font-semibold text-[#666687]">Serve x{fulfillment.dine_in}</span>
                )}
                {fulfillment.take_away > 0 && (
                  <div className={clsx("flex items-center gap-1 px-2 py-[2px] rounded-full", isParcelActive ? "bg-[#fff7e8] border border-[#ffb01d]/30" : "bg-[#e8fbf0] border border-[#24a44b]/30")}>
                    <span className={clsx("text-[10px] font-bold uppercase", isParcelActive ? "text-[#d88c00]" : "text-[#24a44b]")}>Pack x{fulfillment.take_away}</span>
                    {!isParcelActive && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#24a44b]"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    )}
                  </div>
                )}
              </>
            ) : (
              <span className="text-[13px] font-semibold text-[#666687] text-center">{quantity} Quantity</span>
            )}
          </div>
        )}
        <SpecialInstructionTags instructions={specialInstructions} />
      </div>
      <div className="absolute right-2 top-2 flex gap-1">
        {onAddInstruction && (
          <div 
            onClick={(e) => { e.stopPropagation(); onAddInstruction(); }} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onAddInstruction();
              }
            }}
            tabIndex={0}
            className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#6b4eff] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-1 rounded-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sticky-note"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg>
          </div>
        )}
        {onSplit && (
          <div 
            onClick={(e) => { e.stopPropagation(); onSplit(); }} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onSplit();
              }
            }}
            tabIndex={0}
            className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#666687] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-1 rounded-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13.3333 2.5H17.4999V6.66667" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.66667 2.5H2.5V6.66667" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 18.3333V11.4167C10.0048 10.9728 9.92082 10.5325 9.75311 10.1215C9.5854 9.71049 9.33728 9.33714 9.02333 9.02333L2.5 2.5" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.5 7.5L17.5 2.5" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {onReplace && (
          <div 
            onClick={(e) => { e.stopPropagation(); onReplace(); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onReplace();
              }
            }}
            tabIndex={0}
            className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#ffb01d] focus:outline-none focus:ring-2 focus:ring-[#ffb01d] focus:ring-offset-1 rounded-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C12.0967 2.50789 14.1092 3.32602 15.6167 4.78333L17.5 6.66667" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.4999 2.5V6.66667H13.3333" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.5 10C17.5 11.9891 16.7098 13.8968 15.3033 15.3033C13.8968 16.7098 11.9891 17.5 10 17.5C7.90329 17.4921 5.89081 16.674 4.38333 15.2167L2.5 13.3333" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.66667 13.334H2.5V17.5007" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {showDelete && onRemove && (
          <div 
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onRemove();
              }
            }}
            tabIndex={0}
            className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#e23744] focus:outline-none focus:ring-2 focus:ring-[#e23744] focus:ring-offset-1 rounded-sm"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.333 9.166v5m3.334-5v5m4.166-13.333v11.666c0 .442-.176.866-.488 1.178-.312.312-.736.488-1.178.488H5.833c-.442 0-.866-.176-1.178-.488-.312-.312-.488-.736-.488-1.178V5m11.667 0H2.5"/></svg>
          </div>
        )}
      </div>
      <div className="absolute right-2 bottom-2 font-extrabold text-[#ff7b2c] text-[13px]">
        ₹{(Number(price) * quantity).toFixed(2)}
      </div>
    </div>
  );
};
