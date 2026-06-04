import React, { useMemo } from 'react';
import clsx from 'clsx';

export const ShiftKpiSection = ({ transactions }) => {
  const kpis = useMemo(() => {
    let orders = new Set();
    let grossSales = 0;
    let cash = 0;
    let upi = 0;
    let card = 0;
    let due = 0;

    transactions.forEach(tx => {
      // Only consider incoming sales for these specific KPIs
      if (tx.type.includes('_sale') && tx.direction === 'in') {
        if (tx.orderId) orders.add(tx.orderId);
        grossSales += tx.amount;
        
        if (tx.type === 'cash_sale') cash += tx.amount;
        if (tx.type === 'upi_sale') upi += tx.amount;
        if (tx.type === 'card_sale') card += tx.amount;
        if (tx.type === 'due_sale') due += tx.amount; // assuming 'due_sale' might exist or similar mapping
      }
    });

    return {
      orders: orders.size,
      grossSales,
      cash,
      upi,
      card,
      due
    };
  }, [transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const cards = [
    { label: 'Total Orders', value: kpis.orders.toString(), color: 'bg-[#f3f5f9]', text: 'text-[#32324d]' },
    { label: 'Gross Sales', value: formatCurrency(kpis.grossSales), color: 'bg-[#fff7e8]', text: 'text-[#d88c00]' },
    { label: 'Cash Collection', value: formatCurrency(kpis.cash), color: 'bg-[#e8fbf0]', text: 'text-[#24a44b]' },
    { label: 'UPI Collection', value: formatCurrency(kpis.upi), color: 'bg-[#f0f0ff]', text: 'text-[#6366f1]' },
    { label: 'Card Collection', value: formatCurrency(kpis.card), color: 'bg-[#fff0f4]', text: 'text-[#f24343]' },
    { label: 'Pending Amount', value: formatCurrency(kpis.due), color: 'bg-[#fcede8]', text: 'text-[#d35a24]' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card, idx) => (
        <div key={idx} className={clsx("p-3 rounded-[12px] border border-[#eaeaef] flex flex-col justify-between h-[64px]", card.color)}>
          <span className="text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider">{card.label}</span>
          <span className={clsx("text-[18px] font-black leading-none", card.text)}>{card.value}</span>
        </div>
      ))}
    </div>
  );
};
