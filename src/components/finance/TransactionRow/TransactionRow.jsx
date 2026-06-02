import React from 'react';

const getBadgeColor = (text) => {
  const t = text.toLowerCase();
  if (t.includes('cash sale')) return 'text-green-600 bg-green-50';
  if (t.includes('upi sale')) return 'text-blue-600 bg-blue-50';
  if (t.includes('expense') || t.includes('cash out')) return 'text-red-600 bg-red-50';
  if (t.includes('vendor')) return 'text-orange-600 bg-orange-50';
  if (t.includes('refund')) return 'text-purple-600 bg-purple-50';
  return 'text-gray-600 bg-gray-100'; // Default
};

export const TransactionRow = ({ title, amount, badgeText, dateText }) => {
  const isPositive = amount > 0;
  
  // Format with INR
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(Math.abs(amount));

  const amountColor = isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]';
  const prefix = isPositive ? '+' : '-';
  const badgeClasses = getBadgeColor(badgeText);

  return (
    <div className="w-full max-w-[1020px] h-[66px] bg-white rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-between px-5 shrink-0 hover:bg-gray-50 transition-colors">
      
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-3">
          <h4 className="text-[15px] font-semibold text-[#32324D]">{title}</h4>
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${badgeClasses}`}>
            {badgeText}
          </span>
        </div>
        
        {dateText && (
          <span className="text-[12px] font-medium text-[#8E8EA9]">
            {dateText}
          </span>
        )}
      </div>

      <div className="flex flex-col items-end">
        <span className={`text-[16px] font-bold ${amountColor}`}>
          {prefix} {formattedAmount}
        </span>
      </div>
      
    </div>
  );
};
