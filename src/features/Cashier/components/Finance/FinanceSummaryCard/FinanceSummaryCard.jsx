import React from 'react';

export const FinanceSummaryCard = ({ title, amount, isCurrency = true }) => {
  return (
    <div className="bg-white border border-[var(--color-neutral-200)] h-[76px] rounded-[16px] shadow-[0px_0px_1px_0px_rgba(12,26,75,0.03),0px_4px_20px_0px_rgba(50,50,71,0.04)] flex flex-col justify-center px-5 shrink-0 flex-1 min-w-[180px]">
      <h3 className="text-[13px] font-semibold text-[#8e8ea9] uppercase tracking-wide">{title}</h3>
      <div className="flex gap-[2px] items-baseline mt-0.5">
        <span className="text-[20px] font-bold text-[#32324D]">
          {isCurrency ? amount : amount}
        </span>
      </div>
    </div>
  );
};
