import React from 'react';
import { useNavigate } from 'react-router-dom';

import { OrderMetaInfo } from '../OrderMetaInfo/OrderMetaInfo';

export const OrderHistoryCard = ({ orderId, amount, tableInfo, serverName, paymentMethod, guests, duration, dateInfo }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/dashboard/order-history/${orderId}`)}
      className="w-[999px] h-[144px] bg-white rounded-[16px] shadow-[0px_0px_1px_0px_rgba(12,26,75,0.03),0px_4px_20px_0px_rgba(50,50,71,0.04)] relative shrink-0 cursor-pointer hover:shadow-md transition-shadow"
    >
      
      {/* Top Left - Order ID */}
      <div className="absolute left-[21px] top-[8px]">
        <h4 className="text-subtitle-3 font-bold text-[#32324D]">{orderId}</h4>
      </div>

      {/* Top Left - Table & KOT */}
      <div className="absolute left-[21px] top-[44px]">
        <span className="text-label-active text-[#8E8EA9]">{tableInfo}</span>
      </div>

      {/* Server Badge */}
      <div className="absolute left-[139px] top-[20px] bg-[#EAEAEF] h-[24px] px-[8px] rounded-[77.6px] flex items-center justify-center">
        <span className="text-caption-3 font-bold text-[#32324D]">Server : {serverName}</span>
      </div>

      {/* Middle Section - Metadata Row */}
      <div className="absolute left-[21px] top-[74px]">
        <OrderMetaInfo guests={guests} duration={duration} dateInfo={dateInfo} />
      </div>

      {/* Right Section - Amount */}
      <div className="absolute right-[25px] top-[50px] -translate-y-1/2">
        <span className="text-heading-4 font-bold text-[#FFC861]">{amount}</span>
      </div>

      {/* Payment Badge */}
      <div className="absolute right-[49px] top-[72px] bg-[#EAEAEF] h-[24px] px-[8px] rounded-[77.6px] flex items-center justify-center min-w-[76px]">
        <span className="text-caption-3 font-bold text-[#32324D]">{paymentMethod}</span>
      </div>

      {/* View Details */}
      <div className="absolute right-[52px] top-[112px] -translate-y-1/2">
        <button className="text-label-active font-bold text-[#FFB01D] cursor-pointer hover:opacity-80">
          View Details
        </button>
      </div>
      
    </div>
  );
};
