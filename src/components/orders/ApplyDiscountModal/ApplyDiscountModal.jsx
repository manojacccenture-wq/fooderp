import React, { useState } from 'react';

export const ApplyDiscountModal = ({ isOpen, onClose, totalAmount, tax, onApply }) => {
  const [discountValue, setDiscountValue] = useState(5);
  const [coupon, setCoupon] = useState('');
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const discountAmount = (totalAmount * discountValue) / 100;
  const finalPrice = totalAmount + tax - discountAmount;

  const handleApply = () => {
    onApply(discountAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[26px] p-6 w-[375px] shadow-[0px_4px_20px_rgba(0,0,0,0.1)] flex flex-col gap-4">
        
        {/* Header */}
        <div className="flex items-center relative mb-2">
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl text-[#666687] absolute left-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h2 className="text-[18px] font-bold text-[#32324d] w-full text-center">Apply Discount</h2>
        </div>

        {/* Form */}
        <input 
          type="text" 
          value={`${discountValue} %`}
          onChange={(e) => setDiscountValue(Number(e.target.value.replace(/\D/g, '')))}
          className="w-full h-[54px] border border-[#eaeaef] rounded-[16px] px-4 text-[#666687] font-semibold text-[14px] outline-none"
        />

        <input 
          type="text" 
          placeholder="Apply Coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="w-full h-[54px] border border-[#eaeaef] rounded-[16px] px-4 text-[#666687] font-semibold text-[14px] outline-none"
        />

        <textarea 
          placeholder="Reason for discount"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full h-[120px] border border-[#eaeaef] rounded-[16px] p-4 text-[#666687] font-semibold text-[14px] outline-none resize-none align-top"
        ></textarea>

        {/* Summary */}
        <div className="bg-[#fcfcfd] rounded-[16px] p-4 flex flex-col gap-3 shadow-[0px_0px_2px_rgba(0,0,0,0.05)] border border-[#f3f3f5] mt-2">
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-semibold text-[#666687]">Total Amount</span>
            <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-semibold text-[#666687]">Tax</span>
            <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-semibold text-[#666687]">Apply Discount</span>
            <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>-{discountAmount.toFixed(2)}</span>
          </div>
          <div className="w-full h-px bg-[#eaeaef] my-1"></div>
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-bold text-[#32324d]">Total price</span>
            <span className="text-[16px] font-extrabold text-[#ff7b2c] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{finalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Action */}
        <button onClick={handleApply} className="w-full h-[54px] bg-[#ffb01d] text-white rounded-[16px] font-bold text-[16px] mt-2">
          Apply discount
        </button>

      </div>
    </div>
  );
};
