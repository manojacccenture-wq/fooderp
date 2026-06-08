import React from 'react';

export const OrderSummaryRow = ({ label, amount, type = 'default' }) => {
  const getLabelClass = () => {
    switch (type) {
      case 'discount': return 'text-subtitle-3 text-[var(--color-success-500)]';
      case 'total': return 'text-subtitle-2 font-bold text-[var(--color-neutral-700)]';
      default: return 'text-subtitle-3 text-[var(--color-neutral-600)]';
    }
  };

  const getAmountClass = () => {
    switch (type) {
      case 'discount': return 'text-[14px] font-bold text-[var(--color-success-500)]';
      case 'total': return 'text-[16px] font-extrabold text-[var(--color-tertiary-1)]';
      default: return 'text-[14px] font-bold text-[var(--color-neutral-700)]';
    }
  };

  const currencySymbolClass = type === 'total' 
    ? 'text-[8px] font-bold text-[#ffb080]' 
    : 'text-[8px] font-bold text-[#ffb080]';

  return (
    <div className="flex justify-between items-center w-full min-h-[22px]">
      <span className={getLabelClass()}>{label}</span>
      <div className="flex items-center gap-[2px]">
        <span className={currencySymbolClass}>₹</span>
        <span className={getAmountClass()}>{amount}</span>
      </div>
    </div>
  );
};
