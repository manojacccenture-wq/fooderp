import React, { useMemo } from 'react';
import clsx from 'clsx';

export const RecentOrdersSection = ({ transactions }) => {
  const recentOrders = useMemo(() => {
    const sales = transactions.filter(tx => tx.type.includes('_sale') && tx.direction === 'in');
    
    // Sort descending by time
    sales.sort((a, b) => {
      return new Date(b.createdAt || b.time).getTime() - new Date(a.createdAt || a.time).getTime();
    });

    return sales.slice(0, 10);
  }, [transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return new Date(timeStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getPaymentBadge = (type) => {
    if (type === 'cash_sale') return <span className="bg-[#e8fbf0] text-[#24a44b] px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase border border-[#24a44b]/20">Cash</span>;
    if (type === 'upi_sale') return <span className="bg-[#f0f0ff] text-[#6366f1] px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase border border-[#6366f1]/20">UPI</span>;
    if (type === 'card_sale') return <span className="bg-[#fff0f4] text-[#f24343] px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase border border-[#f24343]/20">Card</span>;
    if (type === 'due_sale') return <span className="bg-[#fcede8] text-[#d35a24] px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase border border-[#d35a24]/20">Due</span>;
    return <span className="bg-[#f3f5f9] text-[#666687] px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase border border-[#eaeaef]">Other</span>;
  };

  if (recentOrders.length === 0) return null;

  return (
    <div className="bg-white rounded-[12px] border border-[#eaeaef] flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="p-3 border-b border-[#eaeaef]">
        <h3 className="text-[14px] font-bold text-[#32324d]">Recent Orders (Last 10)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8faff] border-b border-[#eaeaef] h-[36px]">
              <th className="px-4 py-2 text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider">Order No</th>
              <th className="px-4 py-2 text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider">Time</th>
              <th className="px-4 py-2 text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider">Type</th>
              <th className="px-4 py-2 text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider">Payment</th>
              <th className="px-4 py-2 text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, idx) => (
              <tr key={order.id || idx} className="border-b border-[#eaeaef] last:border-none hover:bg-[#fcfcfd] transition-colors h-[48px]">
                <td className="px-4 py-2 text-[13px] font-bold text-[#6366f1]">#{order.orderId || '---'}</td>
                <td className="px-4 py-2 text-[12px] font-medium text-[#666687]">{formatTime(order.createdAt || order.time)}</td>
                <td className="px-4 py-2 text-[12px] font-semibold text-[#4a4a6a] capitalize">
                  {order.orderSource ? order.orderSource.replace('_', ' ') : 'Dine in'}
                  {order.tableNumber && ` (T${order.tableNumber})`}
                </td>
                <td className="px-4 py-2">{getPaymentBadge(order.type)}</td>
                <td className="px-4 py-2 text-[13px] font-bold text-[#32324d] text-right">{formatCurrency(order.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
