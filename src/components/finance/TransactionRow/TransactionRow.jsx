import React from 'react';

export const TransactionRow = ({ title, amount, type, badgeText, dateText, icon, iconBgClass }) => {
  const isPositive = amount > 0;
  const formattedAmount = isPositive ? `+${amount}` : `${amount}`;
  const amountColor = isPositive ? 'text-[#4AD775]' : 'text-[#F24343]'; // Success-500 : Danger-500

  return (
    <div className="w-full max-w-[1020px] h-[70px] bg-white rounded-[16px] shadow-[0px_0px_1px_0px_rgba(12,26,75,0.03),0px_4px_20px_0px_rgba(50,50,71,0.04)] flex items-center relative shrink-0">
      
      {/* Icon Area */}
      <div className={`absolute left-[18px] top-[10px] w-12 h-12 rounded-[36.667px] flex items-center justify-center ${iconBgClass}`}>
        <img src={icon} alt="" className="w-6 h-6 object-contain" />
      </div>
      
      {/* Title & Badge */}
      <div className="absolute left-[74px] top-[5px] flex flex-col items-start w-[183px]">
        <h4 className="text-subtitle-3 text-[#32324D] truncate w-full">{title}</h4>
      </div>
      
      <div className="absolute left-[74px] top-[31px] bg-[#EAEAEF] h-[24px] px-[8px] py-[8px] rounded-[77.6px] flex items-center justify-center">
        <span className="text-caption-3 font-bold text-[#32324D] whitespace-nowrap">{badgeText}</span>
      </div>

      {/* Date */}
      {dateText && (
        <div className="absolute left-[189px] top-[50px] text-label-active text-[#8E8EA9] whitespace-nowrap">
          {dateText}
        </div>
      )}

      {/* Amount */}
      <div className="absolute right-[14px] top-1/2 -translate-y-1/2">
        <span className={`text-heading-4 whitespace-nowrap ${amountColor}`}>
          {formattedAmount}
        </span>
      </div>
    </div>
  );
};
