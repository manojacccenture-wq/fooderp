import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { SpecialInstructionTags } from '../../../components/orders/SpecialInstructionTags';

export const OrderItem = ({ image, title, price, quantity, onIncrease, onDecrease, onRemove, onSplit, onReplace, showDelete, isSelected,
  onSelect, itemRef, showQuantityControls = true, specialInstructions, onAddInstruction }) => {
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [animIndicator, setAnimIndicator] = useState(null);
  const prevQuantity = useRef(quantity);

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
      className={clsx(
        "bg-white border rounded-2xl p-3 flex gap-3 items-center shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] relative cursor-pointer transition-all duration-300",
        isSelected
          ? "border-2 border-[#fbbf24] shadow-[0_0_0_4px_rgba(251,191,36,0.15)] bg-[#fffbf0]"
          : "border-[#eaeaef]",
        isAnimating && "animate-order-flash"
      )}
    >
      <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-[14px] leading-[22px] text-[#32324d] font-semibold">{title}</span>
        {showQuantityControls ? (
          <div className="flex items-center gap-2 mt-1 relative">
            <button onClick={onDecrease} className="w-6 h-6 rounded-[12.5px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer hover:bg-[#ffe3d1] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <div className="relative">
              <span className={clsx("text-[14px] font-semibold text-[#666687] min-w-[9px] text-center block transition-transform duration-200", isAnimating && "scale-125 text-[#ff7b2c]")}>{quantity}</span>
              {animIndicator && (
                <span className={clsx("absolute -top-6 left-1/2 -translate-x-1/2 text-[12px] font-bold pointer-events-none animate-float-fade", animIndicator === '+1' ? 'text-[#24a44b]' : 'text-[#e23744]')}>
                  {animIndicator}
                </span>
              )}
            </div>
            <button onClick={onIncrease} className="w-7 h-7 rounded-[14px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer hover:bg-[#ffe3d1] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center mt-1">
            <span className="text-[14px] font-semibold text-[#666687] text-center">{quantity} Quantity</span>
          </div>
        )}
        <SpecialInstructionTags instructions={specialInstructions} />
      </div>
      <div className="absolute right-3 top-3 flex gap-[6px]">
        {onAddInstruction && (
          <div onClick={(e) => { e.stopPropagation(); onAddInstruction(); }} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#6b4eff] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sticky-note"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg>
          </div>
        )}
        {onSplit && (
          <div onClick={onSplit} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#666687]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13.3333 2.5H17.4999V6.66667" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.66667 2.5H2.5V6.66667" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 18.3333V11.4167C10.0048 10.9728 9.92082 10.5325 9.75311 10.1215C9.5854 9.71049 9.33728 9.33714 9.02333 9.02333L2.5 2.5" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.5 7.5L17.5 2.5" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {onReplace && (
          <div onClick={onReplace} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#ffb01d]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C12.0967 2.50789 14.1092 3.32602 15.6167 4.78333L17.5 6.66667" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.4999 2.5V6.66667H13.3333" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.5 10C17.5 11.9891 16.7098 13.8968 15.3033 15.3033C13.8968 16.7098 11.9891 17.5 10 17.5C7.90329 17.4921 5.89081 16.674 4.38333 15.2167L2.5 13.3333" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.66667 13.334H2.5V17.5007" stroke="#666687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {showDelete && onRemove && (
          <div onClick={onRemove} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#e23744]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8.33325 9.16602V14.166" stroke="#666687" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.6667 9.16602V14.166" stroke="#666687" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.8334 5V16.6667C15.8334 17.1087 15.6578 17.5326 15.3453 17.8452C15.0327 18.1577 14.6088 18.3333 14.1667 18.3333H5.83341C5.39139 18.3333 4.96746 18.1577 4.6549 17.8452C4.34234 17.5326 4.16675 17.1087 4.16675 16.6667V5" stroke="#666687" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.5 5H17.5" stroke="#666687" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.66675 4.99935V3.33268C6.66675 2.89065 6.84234 2.46673 7.1549 2.15417C7.46746 1.84161 7.89139 1.66602 8.33341 1.66602H11.6667C12.1088 1.66602 12.5327 1.84161 12.8453 2.15417C13.1578 2.46673 13.3334 2.89065 13.3334 3.33268V4.99935" stroke="#666687" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div className="absolute right-3 bottom-3 flex items-end gap-[2px]">
        <span className="text-[12px] font-bold text-[#ffb080] pb-[1px]">₹</span>
        <span className="text-[16px] font-extrabold text-[#ff7b2c]">{(Number(price) * quantity).toFixed(2)}</span>
      </div>
    </div>
  );
};
