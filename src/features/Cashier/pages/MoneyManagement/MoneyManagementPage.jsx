import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FinanceSummaryCard } from '../../components/Finance/FinanceSummaryCard/FinanceSummaryCard';
import { TransactionRow } from '../../components/Finance/TransactionRow/TransactionRow';
import { AddTransactionModal } from './AddTransactionModal';
import { 
  selectCashBalance, 
  selectTotalCashIn, 
  selectTotalCashOut, 
  selectTransactions 
} from '../../store/moneyManagementSlice';

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val || 0);
};

const getTransactionDisplayInfo = (tx) => {
  let title = tx.reason || 'Transaction';
  let badgeText = 'Unknown';
  let isPositive = false;

  if (tx.type === 'cash_sale') {
    title = tx.tableNumber ? `Table ${tx.tableNumber} Payment` : `Order #${tx.orderId} Payment`;
    badgeText = 'Cash sale';
    isPositive = true;
  } else if (tx.type === 'upi_sale') {
    title = tx.tableNumber ? `Table ${tx.tableNumber} Payment` : `Order #${tx.orderId} Payment`;
    badgeText = 'UPI sale';
    isPositive = true;
  } else if (tx.type === 'card_sale') {
    title = tx.tableNumber ? `Table ${tx.tableNumber} Payment` : `Order #${tx.orderId} Payment`;
    badgeText = 'Card sale';
    isPositive = true;
  } else if (tx.type === 'cash_in') {
    badgeText = 'Cash In';
    isPositive = true;
  } else if (tx.type === 'cash_out') {
    badgeText = 'Cash Out';
    isPositive = false;
  } else if (tx.type === 'expense') {
    badgeText = 'Expense';
    isPositive = false;
  } else if (tx.type === 'vendor_payment') {
    badgeText = 'Vendor Payment';
    isPositive = false;
  } else if (tx.type === 'refund') {
    badgeText = 'Refund';
    isPositive = false;
  }

  const dateObj = new Date(tx.createdAt);
  const dateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase();
  const dateText = `${dateStr} • ${timeStr}`;

  return { title, badgeText, isPositive, dateText };
};

export const MoneyManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [filterDate, setFilterDate] = useState('Today');
  
  const cashBalance = useSelector(selectCashBalance);
  const totalCashIn = useSelector(selectTotalCashIn);
  const totalCashOut = useSelector(selectTotalCashOut);
  const transactions = useSelector(selectTransactions);

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions].reverse();
    
    // Date Filter Logic
    const now = new Date();
    filtered = filtered.filter(tx => {
      const txDate = new Date(tx.createdAt);
      if (filterDate === 'Today') {
        return txDate.toDateString() === now.toDateString();
      } else if (filterDate === 'This Week') {
        const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
        return txDate >= firstDay;
      } else if (filterDate === 'This Month') {
        return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
      }
      return true;
    });

    // Type Filter Logic
    if (filterType !== 'All') {
      filtered = filtered.filter(tx => {
        if (filterType === 'Cash In') return tx.type === 'cash_in';
        if (filterType === 'Cash Out') return tx.type === 'cash_out';
        if (filterType === 'Sales') return ['cash_sale', 'upi_sale', 'card_sale'].includes(tx.type);
        if (filterType === 'Expenses') return ['cash_out', 'expense', 'vendor_payment'].includes(tx.type);
        return true;
      });
    }

    return filtered;
  }, [transactions, filterType, filterDate]);

  // Compute Quick Stats for Today
  const { todayCollection, todayExpenses, netCashFlow } = useMemo(() => {
    const todayTxs = transactions.filter(tx => new Date(tx.createdAt).toDateString() === new Date().toDateString());
    
    let collection = 0;
    let expenses = 0;
    
    todayTxs.forEach(tx => {
      const { isPositive } = getTransactionDisplayInfo(tx);
      if (isPositive) collection += tx.amount;
      else expenses += tx.amount;
    });

    return {
      todayCollection: collection,
      todayExpenses: expenses,
      netCashFlow: collection - expenses
    };
  }, [transactions]);

  const transactionsTodayCount = transactions.filter(tx => new Date(tx.createdAt).toDateString() === new Date().toDateString()).length;

  return (
    <div className="flex flex-col w-full h-screen bg-[#fafafc] overflow-hidden">
      <style>
        {`
          .money-scrollbar::-webkit-scrollbar { width: 8px; }
          .money-scrollbar::-webkit-scrollbar-track { background: transparent; border-radius: 999px; }
          .money-scrollbar:hover::-webkit-scrollbar-track { background: #F3F4F6; }
          .money-scrollbar::-webkit-scrollbar-thumb { background: transparent; border-radius: 999px; }
          .money-scrollbar:hover::-webkit-scrollbar-thumb { background: #FBBF24; }
          .money-scrollbar::-webkit-scrollbar-thumb:hover { background: #F59E0B !important; }
        `}
      </style>

      {/* Sticky Header */}
      <div className="flex justify-between items-center w-full px-8 py-6 bg-white border-b border-gray-100 sticky top-0 z-10 shrink-0">
        <div>
          <h1 className="text-[24px] font-bold text-[#32324D]">Money Management</h1>
          <p className="text-[14px] text-[#8e8ea9] mt-1">Manage cash flow, daily collections, and expenses</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FFB01D] text-white px-6 py-3 rounded-[12px] font-bold text-[15px] hover:opacity-90 transition-opacity whitespace-nowrap shadow-[0px_4px_20px_0px_rgba(50,50,71,0.08)]"
        >
          + Add Transaction
        </button>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto money-scrollbar p-8">
        <div className="max-w-[1020px] mx-auto w-full flex flex-col gap-8 pb-12">
          
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FinanceSummaryCard title="Cash balance" amount={formatCurrency(cashBalance)} />
            <FinanceSummaryCard title="Cash In" amount={formatCurrency(totalCashIn)} />
            <FinanceSummaryCard title="Cash Out" amount={formatCurrency(totalCashOut)} />
            <FinanceSummaryCard title="Transactions" amount={`${transactionsTodayCount} Today`} isCurrency={false} />
          </div>

          {/* Quick Stats Bar */}
          <div className="flex gap-3 flex-wrap">
            <div className="bg-green-50 border border-green-100 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-green-700 font-bold text-[13px]">Today's Collection:</span>
              <span className="text-green-900 font-bold text-[14px]">{formatCurrency(todayCollection)}</span>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-red-700 font-bold text-[13px]">Today's Expenses:</span>
              <span className="text-red-900 font-bold text-[14px]">{formatCurrency(todayExpenses)}</span>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-blue-700 font-bold text-[13px]">Net Cash Flow:</span>
              <span className="text-blue-900 font-bold text-[14px]">{formatCurrency(netCashFlow)}</span>
            </div>
          </div>

          {/* Filters & Transaction List Area */}
          <div className="flex flex-col gap-4 bg-white p-6 rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] border border-gray-100">
            
            {/* Filter Bar */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-50 flex-wrap gap-4">
              <div className="flex gap-2 bg-gray-50 p-1 rounded-[10px]">
                {['All', 'Cash In', 'Cash Out', 'Sales', 'Expenses'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-1.5 rounded-[8px] text-[13px] font-bold transition-colors ${
                      filterType === type 
                        ? 'bg-white text-[#32324D] shadow-sm' 
                        : 'text-[#8e8ea9] hover:text-[#32324D]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                {['Today', 'This Week', 'This Month'].map(date => (
                  <button
                    key={date}
                    onClick={() => setFilterDate(date)}
                    className={`px-4 py-1.5 rounded-[8px] border text-[13px] font-bold transition-colors ${
                      filterDate === date 
                        ? 'border-[#FFB01D] bg-[#FFF7E8] text-[#FFB01D]' 
                        : 'border-gray-200 text-[#8e8ea9] hover:border-gray-300'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction List */}
            <div className="flex flex-col gap-2 mt-2">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(tx => {
                  const { title, badgeText, isPositive, dateText } = getTransactionDisplayInfo(tx);
                  const displayAmount = isPositive ? tx.amount : -tx.amount;

                  return (
                    <TransactionRow 
                      key={tx.id}
                      title={title}
                      amount={displayAmount}
                      badgeText={badgeText}
                      dateText={dateText}
                    />
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-[48px] mb-4">📊</div>
                  <h3 className="text-[16px] font-bold text-[#32324D]">No transactions found</h3>
                  <p className="text-[14px] text-[#8e8ea9] mt-1">Try changing filters to view older records</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

