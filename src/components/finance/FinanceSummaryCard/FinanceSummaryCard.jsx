import React from 'react';

export const FinanceSummaryCard = ({ title, amount, icon, bgClass }) => {
  return (
    <div className="bg-white border border-[var(--color-neutral-200)] h-[96px] w-[249px] rounded-[16px] shadow-[0px_0px_1px_0px_rgba(12,26,75,0.03),0px_4px_20px_0px_rgba(50,50,71,0.04)] flex relative shrink-0">
      <div className="flex flex-col gap-1 items-start ml-5 mt-[14px]">
        <h3 className="text-subtitle-2 text-[#32324D]">{title}</h3>
        <div className="flex gap-[2px] items-start mt-1">
          <span className="text-heading-2 text-[var(--color-tertiary-1)] -mt-1">₹</span>
          <span className="text-heading-3 text-[var(--color-tertiary-1)]">{amount}</span>
        </div>
      </div>
      <div className={`absolute right-5 top-5 w-12 h-12 rounded-[36.667px] flex items-center justify-center ${bgClass}`}>
        <img src={icon} alt="" className="w-6 h-6 object-contain" />
      </div>
    </div>
  );
};
