import React from 'react';

export const ProductCard = ({ image, itemNo, title, price, isVeg, quantity }) => {
  return (
    <div className={`bg-white h-[179px] w-[164px] relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] flex-shrink-0 ${quantity > 0 ? 'border border-[#faa300]' : ''}`}>
      <div className="absolute left-[7px] top-[8px] h-[24px] flex items-center justify-center px-2 py-2 rounded-full z-10">
        <span className="text-card-detail-sm text-[var(--color-neutral-500)]">
          Item No : {itemNo}
        </span>
      </div>
      
      <div className="absolute top-[47px] left-1/2 -translate-x-1/2 w-[59px] h-[59px] drop-shadow-[0px_0px_4.72px_rgba(255,255,255,0.7)] pointer-events-none">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="absolute left-[11px] top-[116px] w-[104px] flex flex-col gap-1 items-start">
        <div className="w-full">
          <span className="text-card-detail-sm text-[var(--color-neutral-800)] truncate block">{title}</span>
        </div>
        <div className="flex gap-[2px] items-start">
          <small className="text-[var(--color-tertiary-3)] pb-[5px]">₹</small>
          <span className="text-price-sm text-[var(--color-tertiary-1)]">{price}</span>
        </div>
      </div>

      <div className={`absolute left-[96px] top-[145px] h-[24px] flex items-center justify-center px-2 py-2 rounded-full ${isVeg ? 'bg-[var(--color-success-200)]' : 'bg-[var(--color-danger-200)]'}`}>
        <span className={`text-caption-3 ${isVeg ? 'text-[var(--color-success-500)]' : 'text-[var(--color-danger-500)]'}`}>
          {isVeg ? 'Veg' : 'Non Veg'}
        </span>
      </div>

      {quantity > 0 && (
        <div className="absolute left-[145px] top-[8px] min-w-[24px] h-[24px] px-[5px] bg-[var(--color-danger-500)] rounded-full flex items-center justify-center">
          <span className="text-white text-caption-2 text-center leading-none">{quantity}</span>
        </div>
      )}
    </div>
  );
};
