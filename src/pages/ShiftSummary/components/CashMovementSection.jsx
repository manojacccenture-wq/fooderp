import React, { useMemo } from 'react';

export const CashMovementSection = ({ transactions }) => {
  const movement = useMemo(() => {
    let cashIn = 0;
    let cashOut = 0;

    transactions.forEach(tx => {
      if (tx.type === 'cash_in' || tx.type === 'deposit') {
        cashIn += tx.amount;
      } else if (tx.type === 'cash_out' || tx.type === 'expense' || tx.type === 'refund') {
        cashOut += tx.amount;
      }
    });

    return { cashIn, cashOut };
  }, [transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="bg-white p-4 rounded-[12px] border border-[#eaeaef] flex flex-col gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[76px] justify-center overflow-hidden">
      <div className="grid grid-cols-2 gap-4 h-full items-center">
        <div className="flex items-center gap-3">
          <div className="w-[32px] h-[32px] bg-[#e8fbf0] rounded-full flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#24a44b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider leading-tight">Cash In</span>
            <span className="text-[16px] font-black text-[#24a44b] leading-tight">{formatCurrency(movement.cashIn)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-[#eaeaef] pl-4">
          <div className="w-[32px] h-[32px] bg-[#fff0f4] rounded-full flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f24343" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider leading-tight">Cash Out</span>
            <span className="text-[16px] font-black text-[#f24343] leading-tight">{formatCurrency(movement.cashOut)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
