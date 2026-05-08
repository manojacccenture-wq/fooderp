import React, { useState } from 'react';
import { FinanceSummaryCard } from '../../components/finance/FinanceSummaryCard/FinanceSummaryCard';
import { OrderHistoryCard } from '../../components/orders/OrderHistoryCard/OrderHistoryCard';

const imgFrame = "http://localhost:3845/assets/33e4449c59fc3d2f2bea3c360aba404be2ccafb8.svg";
const imgFrame1 = "http://localhost:3845/assets/77d68fadc894812e20aed492e31a68e760cadf4b.svg";
const imgFrame2 = "http://localhost:3845/assets/c0ca9999982e4c6ce5edb4c9404a9eda320f84b0.svg";

export const OrderHistoryPage = () => {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <div className="flex flex-col w-full h-full relative pl-[19px] pt-[45px] pb-[40px]">
      
      {/* Summary Cards Row */}
      <div className="flex gap-[26px]">
        <FinanceSummaryCard 
          title="Total Revenue" 
          amount="9080" 
          icon={imgFrame} 
          bgClass="bg-[#F6F6F9]" 
        />
        <FinanceSummaryCard 
          title="Average Order" 
          amount="1080" 
          icon={imgFrame1} 
          bgClass="bg-[#F6F6F9]" 
        />
        <FinanceSummaryCard 
          title="Discounts" 
          amount="1080" 
          icon={imgFrame2} 
          bgClass="bg-[#F6F6F9]" 
        />
      </div>

      {/* Search Section */}
      <div className="mt-[30px] w-[799px] h-[54px] bg-white border border-[#EAEAEF] rounded-[16px] px-[16px] py-[12px] flex items-center gap-[10px]">
        {/* Left Search Icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <circle cx="8.5" cy="8.5" r="6" stroke="#8E8EA9" strokeWidth="1.5" />
          <path d="M14 14L18 18" stroke="#8E8EA9" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input 
          type="text" 
          placeholder="Search by order name ,KOT"
          className="flex-1 outline-none text-subtitle-3 font-semibold text-[#8E8EA9] placeholder:text-[#8E8EA9] bg-transparent"
        />
        {/* Right Filter Icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
           <path d="M7 2H13M2 7H18M3 7L17 7" stroke="#666687" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Filter Tabs */}
      <div className="mt-[26px] flex gap-[8px] h-[44px]">
        {['Today', 'This week', 'This month'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center justify-center px-[14px] py-[12px] rounded-[16px] text-subtitle-2 transition-colors ${
              activeTab === tab 
                ? 'bg-[#FFB01D] text-white' 
                : 'bg-transparent text-[#666687] hover:bg-[#F3F5F9]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order History List */}
      <div className="mt-[18px] ml-[6px] flex flex-col gap-[18px]">
        <OrderHistoryCard 
          orderId="ORD-101"
          amount="810"
          tableInfo="Table 5 • KOT-101"
          serverName="Raj"
          paymentMethod="UPI"
          guests="4"
          duration="25 min"
          dateInfo="06 May • 02:43 pm by Cashier"
        />
        <OrderHistoryCard 
          orderId="ORD-102"
          amount="456"
          tableInfo="Table 7 • KOT-108"
          serverName="Raj"
          paymentMethod="UPI"
          guests="4"
          duration="25 min"
          dateInfo="06 May • 02:43 pm by Cashier"
        />
        <OrderHistoryCard 
          orderId="ORD-103"
          amount="345"
          tableInfo="Table 5 • KOT-110"
          serverName="Raj"
          paymentMethod="UPI"
          guests="4"
          duration="25 min"
          dateInfo="06 May • 02:43 pm by Cashier"
        />
      </div>

    </div>
  );
};
