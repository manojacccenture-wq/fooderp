import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FinanceSummaryCard } from '../../components/finance/FinanceSummaryCard/FinanceSummaryCard';
import { TransactionRow } from '../../components/finance/TransactionRow/TransactionRow';
import { AddTransactionModal } from './AddTransactionModal';
import { 
  selectCashBalance, 
  selectTotalCashIn, 
  selectTotalCashOut, 
  selectTransactions 
} from '../../store/slices/moneyManagementSlice';

const imgFrame = "http://localhost:3845/assets/33e4449c59fc3d2f2bea3c360aba404be2ccafb8.svg";
const imgFrame1 = "http://localhost:3845/assets/a1b23b353ee69d1caab8f40bf5c992ecfff0c71c.svg";
const imgFrame2 = "http://localhost:3845/assets/b4b123a6235ee7401201847e4b4c1dc5a9660a76.svg";

const getTransactionDisplayInfo = (tx) => {
  let title = tx.reason || 'Transaction';
  let badgeText = 'Unknown';
  let isPositive = false;
  let iconBgClass = 'bg-[#B4EFC6]';
  let iconStr = imgFrame1;

  if (tx.type === 'cash_sale') {
    title = tx.tableNumber ? `Table ${tx.tableNumber} Payment` : `Order #${tx.orderId} Payment`;
    badgeText = 'Cash sale';
    isPositive = true;
    iconBgClass = 'bg-[#B4EFC6]';
  } else if (tx.type === 'upi_sale') {
    title = tx.tableNumber ? `Table ${tx.tableNumber} Payment` : `Order #${tx.orderId} Payment`;
    badgeText = 'UPI sale';
    isPositive = true;
    iconBgClass = 'bg-[#B4EFC6]'; // Non-cash, but still income visually
  } else if (tx.type === 'card_sale') {
    title = tx.tableNumber ? `Table ${tx.tableNumber} Payment` : `Order #${tx.orderId} Payment`;
    badgeText = 'Card sale';
    isPositive = true;
    iconBgClass = 'bg-[#B4EFC6]';
  } else if (tx.type === 'cash_in') {
    badgeText = 'Cash In';
    isPositive = true;
    iconBgClass = 'bg-[#B4EFC6]';
  } else if (tx.type === 'cash_out') {
    badgeText = 'Cash Out';
    isPositive = false;
    iconBgClass = 'bg-[#FCCCCC]';
  }

  const dateObj = new Date(tx.createdAt);
  const dateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase();
  const createdByStr = tx.createdBy || 'System';
  const dateText = `${dateStr} • ${timeStr} by ${createdByStr}`;

  return { title, badgeText, isPositive, dateText, iconBgClass, iconStr };
};

export const MoneyManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const cashBalance = useSelector(selectCashBalance);
  const totalCashIn = useSelector(selectTotalCashIn);
  const totalCashOut = useSelector(selectTotalCashOut);
  const transactions = useSelector(selectTransactions);

  // Show latest transactions first
  const sortedTransactions = [...transactions].reverse();

  return (
    <div className="flex flex-col w-full h-full relative pl-[19px] pt-[45px] overflow-y-auto pb-[100px]">
      
      {/* Header / Summary Section */}
      <div className="flex justify-between items-center w-[1020px]">
        {/* Summary Cards Row */}
        <div className="flex gap-[26px]">
          <FinanceSummaryCard 
            title="Cash balance" 
            amount={cashBalance.toString()} 
            icon={imgFrame} 
            bgClass="bg-[#F6F6F9]" 
          />
          <FinanceSummaryCard 
            title="Cash In" 
            amount={totalCashIn.toString()} 
            icon={imgFrame1} 
            bgClass="bg-[#B4EFC6]" 
          />
          <FinanceSummaryCard 
            title="Cash Out" 
            amount={totalCashOut.toString()} 
            icon={imgFrame2} 
            bgClass="bg-[#FCCCCC]" 
          />
        </div>
        
        {/* Action Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FFB01D] text-white px-[24px] py-[16px] rounded-[16px] text-button-md hover:opacity-90 transition-opacity whitespace-nowrap h-[54px] flex items-center justify-center min-w-[161px]"
        >
          Add Transaction
        </button>
      </div>

      {/* Recent Transactions Section */}
      <div className="mt-[85px] w-full max-w-[1020px]">
        <h2 className="text-subtitle-2 text-[#32324D] mb-[19px] ml-[72px]">
          Recent transaction
        </h2>
        
        <div className="flex flex-col gap-[19px]">
          {sortedTransactions.length > 0 ? (
            sortedTransactions.map(tx => {
              const { title, badgeText, isPositive, dateText, iconBgClass, iconStr } = getTransactionDisplayInfo(tx);
              const displayAmount = isPositive ? tx.amount : -tx.amount;

              return (
                <TransactionRow 
                  key={tx.id}
                  title={title}
                  amount={displayAmount}
                  badgeText={badgeText}
                  dateText={dateText}
                  icon={iconStr}
                  iconBgClass={iconBgClass}
                />
              );
            })
          ) : (
            <div className="text-[#8e8ea9] ml-[72px] text-[15px]">No recent transactions.</div>
          )}
        </div>
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
