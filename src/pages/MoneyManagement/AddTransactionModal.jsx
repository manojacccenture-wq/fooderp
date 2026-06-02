import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, selectCashBalance } from '../../store/slices/moneyManagementSlice';

export const AddTransactionModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cashBalance = useSelector(selectCashBalance);
  
  const [type, setType] = useState('cash_in');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    if (!reason.trim()) {
      setError('Reason is required');
      return;
    }

    if (type === 'cash_out' && parsedAmount > cashBalance) {
      setError(`Insufficient funds. Available balance: ₹${cashBalance}`);
      return;
    }

    dispatch(addTransaction({
      type,
      amount: parsedAmount,
      direction: type === 'cash_in' ? 'in' : 'out',
      reason,
      createdBy: 'Cashier'
    }));

    // Reset form
    setAmount('');
    setReason('');
    setType('cash_in');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-[16px] overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-[18px] font-bold text-[#32324D]">Add Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-[14px] font-bold text-[#32324D] mb-2">Transaction Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-[#FFB01D] text-[#32324D] bg-white appearance-none"
              >
                <option value="cash_in">Cash In</option>
                <option value="cash_out">Cash Out</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-bold text-[#32324D] mb-2">Amount (₹)</label>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-[#FFB01D] text-[#32324D]"
              />
            </div>

            <div>
              <label className="block text-[14px] font-bold text-[#32324D] mb-2">Reason</label>
              <input 
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Petty Cash, Vendor Payment"
                className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-[#FFB01D] text-[#32324D]"
              />
            </div>
            
            {error && (
              <div className="text-[14px] text-red-500 font-medium bg-red-50 p-3 rounded-[8px]">
                {error}
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 rounded-[12px] font-bold text-[#32324D] bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 rounded-[12px] font-bold text-white bg-[#FFB01D] hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
