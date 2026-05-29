import React from 'react';
import clsx from 'clsx';

export const TakeawayCard = ({ takeaway, isSelected, onClick }) => {
  const statusColors = {
    'Preparing': 'bg-[#fff7e8] text-[#d88c00] border-[#ffb01d]/30',
    'Packed': 'bg-[#eef2ff] text-[#6366f1] border-[#6366f1]/30',
    'Ready': 'bg-[#e8fbf0] text-[#24a44b] border-[#24a44b]/30',
  };

  const currentStyle = statusColors[takeaway.status] || statusColors['Preparing'];

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "bg-white rounded-[16px] border p-3 cursor-pointer transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md flex flex-col gap-2 relative overflow-hidden",
        isSelected ? "border-[#ffb01d] ring-2 ring-[#ffb01d]/20 transform scale-[1.02]" : "border-[#eaeaef] hover:border-[#ffb01d]/50"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider">Token</span>
          <span className="text-[20px] font-black text-[#32324d] leading-none mt-[2px]">
            #{String(takeaway.tokenNumber).padStart(3, '0')}
          </span>
        </div>
        <div className={clsx("px-2 py-[2px] rounded-full text-[10px] font-bold border", currentStyle)}>
          {takeaway.status}
        </div>
      </div>

      <div className="flex flex-col gap-[2px] mt-1">
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-[#8e8ea9]">Order:</span>
          <span className="font-bold text-[#32324d]">#{takeaway.orderNumber}</span>
        </div>
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-[#8e8ea9]">Customer:</span>
          <span className="font-bold text-[#32324d] truncate max-w-[90px] text-right">{takeaway.customerInfo?.phone || 'Walk-in'}</span>
        </div>
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-[#8e8ea9]">Time:</span>
          <span className="font-bold text-[#32324d]">{takeaway.time}</span>
        </div>
        {takeaway.status === 'Completed' && takeaway.completedAt && (
          <div className="flex justify-between items-center text-[12px] mt-1 pt-1 border-t border-[#eaeaef]">
            <span className="text-[#24a44b]">Completed:</span>
            <span className="font-bold text-[#24a44b]">
              {new Date(takeaway.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
