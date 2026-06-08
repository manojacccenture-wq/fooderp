import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { endShift } from '../../../../features/Auth/store/authSlice';

export const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const auth = useSelector(state => state.auth);
  const transactions = useSelector(state => state.moneyManagement.transactions);

  const summary = useMemo(() => {
    let cashIn = 0;
    let salesCollection = 0;
    let cashOut = 0;
    let upiSales = 0;
    let cardSales = 0;

    const shiftTime = new Date(auth.loginTime).getTime();

    transactions.forEach(tx => {
      const txTime = new Date(tx.createdAt || tx.time).getTime();
      
      // Only aggregate transactions created AFTER the shift started
      if (txTime >= shiftTime) {
        if (tx.type === 'cash_sale' && tx.direction === 'in') {
          salesCollection += tx.amount;
        } else if (tx.type === 'upi_sale' && tx.direction === 'in') {
          upiSales += tx.amount;
        } else if (tx.type === 'card_sale' && tx.direction === 'in') {
          cardSales += tx.amount;
        } else if (tx.type === 'cash_in' || tx.type === 'deposit') {
          cashIn += tx.amount;
        } else if (tx.type === 'cash_out' || tx.type === 'expense' || tx.type === 'refund') {
          cashOut += tx.amount;
        }
      }
    });

    const closingCash = auth.openingCash + cashIn + salesCollection - cashOut;

    return { cashIn, salesCollection, cashOut, closingCash, upiSales, cardSales };
  }, [transactions, auth.loginTime, auth.openingCash]);

  const handleEndShift = () => {
    dispatch(endShift({
      cashSales: summary.salesCollection,
      upiSales: summary.upiSales,
      cardSales: summary.cardSales,
      cashIn: summary.cashIn,
      cashOut: summary.cashOut,
      expectedClosingCash: summary.closingCash
    }));
    
    navigate('/login', { replace: true });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-[#32324d]/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[420px] p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-200">
        
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-[64px] h-[64px] bg-[#fff0f4] rounded-full flex items-center justify-center mb-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f24343" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <h2 className="text-[24px] font-black text-[#32324d] leading-tight">End Shift?</h2>
          <p className="text-[14px] font-medium text-[#8e8ea9]">Are you sure you want to end this shift and log out?</p>
        </div>

        <div className="bg-[#f8faff] border border-[#eaeaef] rounded-[16px] p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center text-[14px]">
            <span className="font-semibold text-[#8e8ea9]">Opening Cash</span>
            <span className="font-bold text-[#32324d]">{formatCurrency(auth.openingCash)}</span>
          </div>
          <div className="w-full h-[1px] bg-[#eaeaef]"></div>
          <div className="flex justify-between items-center text-[16px]">
            <span className="font-semibold text-[#32324d]">Current Cash</span>
            <span className="font-black text-[#24a44b]">{formatCurrency(summary.closingCash)}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button 
            onClick={onClose}
            className="flex-1 h-[48px] bg-white border-2 border-[#eaeaef] hover:bg-[#f3f5f9] text-[#666687] rounded-[12px] text-[15px] font-bold transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleEndShift}
            className="flex-1 h-[48px] bg-[#f24343] hover:bg-[#d63434] text-white rounded-[12px] text-[15px] font-bold shadow-[0_4px_12px_rgba(242,67,67,0.3)] transition-all"
          >
            End Shift
          </button>
        </div>

      </div>
    </div>
  );
};
