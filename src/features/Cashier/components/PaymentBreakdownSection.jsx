import React, { useMemo } from 'react';

export const PaymentBreakdownSection = ({ transactions }) => {
  const breakdown = useMemo(() => {
    let total = 0;
    let cash = 0;
    let upi = 0;
    let card = 0;
    let due = 0;

    transactions.forEach(tx => {
      if (tx.type.includes('_sale') && tx.direction === 'in') {
        total += tx.amount;
        if (tx.type === 'cash_sale') cash += tx.amount;
        if (tx.type === 'upi_sale') upi += tx.amount;
        if (tx.type === 'card_sale') card += tx.amount;
        if (tx.type === 'due_sale') due += tx.amount;
      }
    });

    const getPct = (val) => total > 0 ? (val / total) * 100 : 0;

    return {
      total,
      cash: { amount: cash, pct: getPct(cash) },
      upi: { amount: upi, pct: getPct(upi) },
      card: { amount: card, pct: getPct(card) },
      due: { amount: due, pct: getPct(due) }
    };
  }, [transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="bg-white p-4 rounded-[12px] border border-[#eaeaef] flex flex-col gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-full">
      <h3 className="text-[14px] font-bold text-[#32324d]">Payment Breakdown</h3>
      
      <div className="flex flex-col gap-3 justify-center flex-1">
        {/* Cash */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-[12px] font-semibold">
            <span className="text-[#8e8ea9]">Cash</span>
            <span className="text-[#32324d]">{formatCurrency(breakdown.cash.amount)} <span className="text-[#8e8ea9] font-medium ml-1">({breakdown.cash.pct.toFixed(0)}%)</span></span>
          </div>
          <div className="h-[6px] w-full bg-[#f3f5f9] rounded-full overflow-hidden">
            <div className="h-full bg-[#24a44b] rounded-full transition-all duration-500" style={{ width: `${breakdown.cash.pct}%` }} />
          </div>
        </div>

        {/* UPI */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-[12px] font-semibold">
            <span className="text-[#8e8ea9]">UPI</span>
            <span className="text-[#32324d]">{formatCurrency(breakdown.upi.amount)} <span className="text-[#8e8ea9] font-medium ml-1">({breakdown.upi.pct.toFixed(0)}%)</span></span>
          </div>
          <div className="h-[6px] w-full bg-[#f3f5f9] rounded-full overflow-hidden">
            <div className="h-full bg-[#6366f1] rounded-full transition-all duration-500" style={{ width: `${breakdown.upi.pct}%` }} />
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-[12px] font-semibold">
            <span className="text-[#8e8ea9]">Card</span>
            <span className="text-[#32324d]">{formatCurrency(breakdown.card.amount)} <span className="text-[#8e8ea9] font-medium ml-1">({breakdown.card.pct.toFixed(0)}%)</span></span>
          </div>
          <div className="h-[6px] w-full bg-[#f3f5f9] rounded-full overflow-hidden">
            <div className="h-full bg-[#f24343] rounded-full transition-all duration-500" style={{ width: `${breakdown.card.pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
