import React, { useMemo } from 'react';

export const ShiftCloseSummary = ({ transactions }) => {
  const summary = useMemo(() => {
    let openingCash = 0; // Usually this would come from a Redux state storing the start-of-day float
    let cashIn = 0;
    let salesCollection = 0;
    let cashOut = 0;

    transactions.forEach(tx => {
      if (tx.type === 'cash_sale' && tx.direction === 'in') {
        salesCollection += tx.amount;
      } else if (tx.type === 'cash_in' || tx.type === 'deposit') {
        cashIn += tx.amount;
      } else if (tx.type === 'cash_out' || tx.type === 'expense' || tx.type === 'refund') {
        cashOut += tx.amount;
      }
    });

    const closingCash = openingCash + cashIn + salesCollection - cashOut;

    return { openingCash, cashIn, salesCollection, cashOut, closingCash };
  }, [transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="bg-[#32324d] rounded-[12px] px-6 py-4 text-white shadow-lg flex items-center justify-between relative overflow-hidden h-[76px]">
      {/* Decorative background pattern */}
      <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="flex items-center gap-6 z-10 w-full overflow-x-auto no-scrollbar">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider">Opening Cash</span>
          <span className="text-[15px] font-semibold text-white leading-tight">{formatCurrency(summary.openingCash)}</span>
        </div>
        
        <span className="text-[#8e8ea9] font-light text-[20px] opacity-50">+</span>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider">Cash In</span>
          <span className="text-[15px] font-semibold text-[#24a44b] leading-tight">{formatCurrency(summary.cashIn)}</span>
        </div>
        
        <span className="text-[#8e8ea9] font-light text-[20px] opacity-50">+</span>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider">Cash Sales</span>
          <span className="text-[15px] font-semibold text-[#24a44b] leading-tight">{formatCurrency(summary.salesCollection)}</span>
        </div>
        
        <span className="text-[#8e8ea9] font-light text-[20px] opacity-50">-</span>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider">Cash Out</span>
          <span className="text-[15px] font-semibold text-[#f24343] leading-tight">{formatCurrency(summary.cashOut)}</span>
        </div>
      </div>

      <div className="shrink-0 flex flex-col items-end z-10 border-l border-white/10 pl-6 ml-6">
        <span className="text-[10px] font-bold text-[#ffb01d] uppercase tracking-wider leading-tight">Expected Closing Cash</span>
        <span className="text-[24px] font-black leading-none">{formatCurrency(summary.closingCash)}</span>
      </div>
    </div>
  );
};
