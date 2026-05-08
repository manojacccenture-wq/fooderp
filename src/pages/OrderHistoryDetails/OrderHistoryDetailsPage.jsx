import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderMetaInfo } from '../../components/orders/OrderMetaInfo/OrderMetaInfo';
import { OrderSummaryCard } from '../../components/orders/OrderSummaryCard/OrderSummaryCard';

export const OrderHistoryDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full relative pl-[26px] pt-[45px] pb-[40px]">
      
      {/* Top Header Section */}
      <div className="flex justify-between items-start w-[999px]">
        {/* Order Info */}
        <div className="flex flex-col gap-[9px]">
          <h2 className="text-subtitle-3 font-bold text-[#32324D]">{orderId || 'ORD-101'}</h2>
          <span className="text-label-active font-semibold text-[#8E8EA9]">Table 5 • KOT-101</span>
        </div>

        {/* Export Button */}
        <button className="bg-[#FFB01D] text-white flex items-center justify-center px-[24px] py-[16px] rounded-[16px] w-[161px] hover:opacity-90 transition-opacity">
          <span className="text-button-md text-white font-bold">Export</span>
        </button>
      </div>

      {/* Metadata Row */}
      <div className="mt-[20px]">
        <OrderMetaInfo 
          guests="4" 
          duration="25 min" 
          dateInfo="06 May • 02:43 pm by Cashier" 
        />
      </div>

      {/* Summary Card */}
      <div className="mt-[40px]">
        <OrderSummaryCard 
          totalAmount="450.00"
          tax="35.00"
          discount="-35.00"
          totalPrice="435.00"
          discountNote="Note: 10% regular customer discount"
          paymentType="UPI"
        />
      </div>

    </div>
  );
};
