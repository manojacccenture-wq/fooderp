import React from 'react';

export const ProductCard = ({ image, itemNo, title, price, isVeg, quantity, isKeyboardSelected }) => {
  return (
    <div className={`bg-white h-[100px] w-full relative rounded-[12px] p-[10px] flex flex-col justify-between transition-all duration-200 ${isKeyboardSelected ? 'border-2 border-[#f59e0b] shadow-[0_0_0_4px_rgba(245,158,11,0.18)] scale-[1.01] z-10' : quantity > 0 ? 'border border-[#faa300] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]' : 'shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] border border-[#eaeaef]'}`}>
      
      {/* Top Row: Meta */}
      <div className="flex justify-between items-start w-full gap-2">
        <div className={`px-2 py-[3px] rounded-[4px] border ${isVeg ? 'bg-[#b4efc6]/20 border-[#24a44b]/30 text-[#24a44b]' : 'bg-[#ffe2e5]/30 border-[#e23744]/30 text-[#e23744]'} text-[10px] font-extrabold tracking-wider leading-none`}>
          {isVeg ? 'VEG' : 'N-VEG'}
        </div>
        <span className="text-[11px] text-[#8e8ea9] font-bold leading-none bg-[#f3f5f9] px-1.5 py-1 rounded-[4px]">#{itemNo}</span>
      </div>

      {/* Commented out image as per request */}
      {/* 
      <div className="w-[40px] h-[40px] shrink-0 drop-shadow-sm rounded-[8px] overflow-hidden bg-[#f3f5f9]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div> 
      */}

      {/* Bottom Row: Title & Price */}
      <div className="flex flex-col w-full mt-auto gap-0.5">
        <span className="text-[14px] font-bold text-[#32324d] leading-[1.2] line-clamp-2" title={title}>{title}</span>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[15px] font-black text-[#ff7b2c]">₹{price}</span>
          {quantity > 0 && (
            <div className="min-w-[22px] h-[22px] px-[6px] bg-[#e23744] rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-[12px] font-bold leading-none">{quantity}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

