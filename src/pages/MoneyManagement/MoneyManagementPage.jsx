import React from 'react';
import { FinanceSummaryCard } from '../../components/finance/FinanceSummaryCard/FinanceSummaryCard';
import { TransactionRow } from '../../components/finance/TransactionRow/TransactionRow';

const imgFrame = "http://localhost:3845/assets/33e4449c59fc3d2f2bea3c360aba404be2ccafb8.svg";
const imgFrame1 = "http://localhost:3845/assets/a1b23b353ee69d1caab8f40bf5c992ecfff0c71c.svg";
const imgFrame2 = "http://localhost:3845/assets/b4b123a6235ee7401201847e4b4c1dc5a9660a76.svg";

export const MoneyManagementPage = () => {
  return (
    <div className="flex flex-col w-full h-full relative pl-[19px] pt-[45px]">
      
      {/* Header / Summary Section */}
      <div className="flex justify-between items-center w-[1020px]">
        {/* Summary Cards Row */}
        <div className="flex gap-[26px]">
          <FinanceSummaryCard 
            title="Cash balance" 
            amount="9080" 
            icon={imgFrame} 
            bgClass="bg-[#F6F6F9]" 
          />
          <FinanceSummaryCard 
            title="Cash In" 
            amount="850" 
            icon={imgFrame1} 
            bgClass="bg-[#B4EFC6]" 
          />
          <FinanceSummaryCard 
            title="Cash Out" 
            amount="700" 
            icon={imgFrame2} 
            bgClass="bg-[#FCCCCC]" 
          />
        </div>
        
        {/* Action Button */}
        <button className="bg-[#FFB01D] text-white px-[24px] py-[16px] rounded-[16px] text-button-md hover:opacity-90 transition-opacity whitespace-nowrap h-[54px] flex items-center justify-center min-w-[161px]">
          Add Transaction
        </button>
      </div>

      {/* Recent Transactions Section */}
      <div className="mt-[85px] w-full max-w-[1020px]">
        <h2 className="text-subtitle-2 text-[#32324D] mb-[19px] ml-[72px]">
          Recent transaction
        </h2>
        
        <div className="flex flex-col gap-[19px]">
          <TransactionRow 
            title="Vegetable vendor payment"
            amount={120}
            badgeText="Vendor Payment"
            dateText="06 May • 02:43 pm by Cashier"
            icon={imgFrame1}
            iconBgClass="bg-[#B4EFC6]"
          />
          <TransactionRow 
            title="Table 5 Payment"
            amount={120}
            badgeText="Cash sale"
            dateText="06 May • 02:43 pm by Cashier"
            icon={imgFrame1}
            iconBgClass="bg-[#B4EFC6]"
          />
          <TransactionRow 
            title="Vegetable vendor payment"
            amount={120}
            badgeText="Vendor Payment"
            dateText="06 May • 02:43 pm by Cashier"
            icon={imgFrame1}
            iconBgClass="bg-[#B4EFC6]"
          />
          <TransactionRow 
            title="Change For Customer"
            amount={-200}
            badgeText="Change given"
            dateText="06 May • 02:43 pm by Cashier"
            icon={imgFrame1}
            iconBgClass="bg-[#FCCCCC]"
          />
          <TransactionRow 
            title="Vegetable vendor payment"
            amount={-200}
            badgeText="Vendor Payment"
            dateText="06 May • 02:43 pm by Cashier"
            icon={imgFrame1}
            iconBgClass="bg-[#FCCCCC]"
          />
        </div>
      </div>
    </div>
  );
};
