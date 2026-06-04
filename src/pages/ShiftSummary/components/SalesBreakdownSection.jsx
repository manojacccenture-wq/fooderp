import React, { useMemo } from 'react';

export const SalesBreakdownSection = ({ transactions }) => {
  const breakdown = useMemo(() => {
    let dineIn = 0;
    let takeaway = 0;
    let completed = 0;
    let cancelled = 0; // Assuming refunds or specific cancel status

    const processedOrders = new Set();

    transactions.forEach(tx => {
      if (tx.type.includes('_sale') && tx.direction === 'in') {
        if (!processedOrders.has(tx.orderId)) {
          processedOrders.add(tx.orderId);
          completed += 1;
          if (tx.orderSource === 'take_away') {
            takeaway += 1;
          } else {
            dineIn += 1;
          }
        }
      } else if (tx.type === 'refund') {
        if (!processedOrders.has(tx.orderId + '_refund')) {
          processedOrders.add(tx.orderId + '_refund');
          cancelled += 1;
        }
      }
    });

    return { dineIn, takeaway, completed, cancelled };
  }, [transactions]);

  return (
    <div className="bg-white p-4 rounded-[12px] border border-[#eaeaef] flex flex-col gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <h3 className="text-[14px] font-bold text-[#32324d]">Sales Breakdown</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex justify-between items-center p-2 px-3 bg-[#f8faff] rounded-[8px] border border-[#eaeaef] h-[44px]">
          <span className="text-[12px] font-semibold text-[#8e8ea9]">Dine-In Orders</span>
          <span className="text-[15px] font-black text-[#32324d] leading-none">{breakdown.dineIn}</span>
        </div>
        <div className="flex justify-between items-center p-2 px-3 bg-[#f8faff] rounded-[8px] border border-[#eaeaef] h-[44px]">
          <span className="text-[12px] font-semibold text-[#8e8ea9]">Takeaway Orders</span>
          <span className="text-[15px] font-black text-[#32324d] leading-none">{breakdown.takeaway}</span>
        </div>
        <div className="flex justify-between items-center p-2 px-3 bg-[#f8faff] rounded-[8px] border border-[#eaeaef] h-[44px]">
          <span className="text-[12px] font-semibold text-[#8e8ea9]">Completed Orders</span>
          <span className="text-[15px] font-black text-[#24a44b] leading-none">{breakdown.completed}</span>
        </div>
        <div className="flex justify-between items-center p-2 px-3 bg-[#f8faff] rounded-[8px] border border-[#eaeaef] h-[44px]">
          <span className="text-[12px] font-semibold text-[#8e8ea9]">Cancelled Orders</span>
          <span className="text-[15px] font-black text-[#f24343] leading-none">{breakdown.cancelled}</span>
        </div>
      </div>
    </div>
  );
};
