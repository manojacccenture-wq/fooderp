import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ShiftSelector } from '../../components/ShiftSelector';
import { ShiftKpiSection } from '../../components/ShiftKpiSection';
import { SalesBreakdownSection } from '../../components/SalesBreakdownSection';
import { PaymentBreakdownSection } from '../../components/PaymentBreakdownSection';
import { CashMovementSection } from '../../components/CashMovementSection';
import { RecentOrdersSection } from '../../components/RecentOrdersSection';
import { ShiftCloseSummary } from '../../components/ShiftCloseSummary';

export const ShiftSummaryPage = () => {
  const [activeTab, setActiveTab] = useState('Current Shift'); // 'Current Shift' | 'Previous Shifts'
  const transactions = useSelector(state => state.moneyManagement.transactions);
  const auth = useSelector(state => state.auth);

  const shiftTransactions = useMemo(() => {
    if (!auth.loginTime) return [];
    const shiftTime = new Date(auth.loginTime).getTime();
    
    return transactions.filter(tx => {
      const txTime = new Date(tx.createdAt || tx.time).getTime();
      return txTime >= shiftTime;
    });
  }, [transactions, auth.loginTime]);

  const isEmpty = shiftTransactions.length === 0;

  const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  const renderPreviousShifts = () => {
    if (!auth.shiftHistory || auth.shiftHistory.length === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center pt-[100px] opacity-70">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#8e8ea9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <h2 className="text-[20px] font-bold text-[#666687] mb-2">No Previous Shifts</h2>
          <p className="text-[14px] font-medium text-[#8e8ea9]">You haven't completed any shifts yet.</p>
        </div>
      );
    }

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    const formatTime = (timeStr) => new Date(timeStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
      <div className="flex flex-col gap-4">
        {auth.shiftHistory.map((shift, idx) => (
          <div key={idx} className="bg-white rounded-[12px] p-5 border border-[#eaeaef] flex justify-between items-center shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-black text-[#32324d]">{shift.shift}</span>
              <span className="text-[13px] font-medium text-[#8e8ea9]">Login: {formatTime(shift.loginTime)} • Logout: {formatTime(shift.logoutTime)}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[12px] font-bold text-[#8e8ea9] uppercase tracking-wider">Closing Cash</span>
              <span className="text-[20px] font-black text-[#24a44b]">{formatCurrency(shift.expectedClosingCash)}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#fafafc] overflow-y-auto">
      <div className="px-4 py-3 border-b border-[#eaeaef] bg-white sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-[20px] font-black text-[#32324d] leading-none mb-1">Shift Summary</h1>
          <span className="text-[12px] font-semibold text-[#8e8ea9]">{todayStr}</span>
        </div>
        <ShiftSelector activeShift={activeTab} onShiftChange={setActiveTab} />
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3 max-w-[1200px] mx-auto w-full">
        {activeTab === 'Previous Shifts' ? (
          renderPreviousShifts()
        ) : isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center pt-[100px] opacity-70">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#8e8ea9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <h2 className="text-[20px] font-bold text-[#666687] mb-2">No data for Current Shift</h2>
            <p className="text-[14px] font-medium text-[#8e8ea9]">No orders or transactions found for this shift.</p>
          </div>
        ) : (
          <>
            <ShiftKpiSection transactions={shiftTransactions} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SalesBreakdownSection transactions={shiftTransactions} />
              <PaymentBreakdownSection transactions={shiftTransactions} />
            </div>

            <CashMovementSection transactions={shiftTransactions} />
            
            <RecentOrdersSection transactions={shiftTransactions} />
            
            <ShiftCloseSummary transactions={shiftTransactions} />
          </>
        )}
      </div>
    </div>
  );
};

