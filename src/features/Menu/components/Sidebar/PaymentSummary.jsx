import React from 'react';

export const PaymentSummary = ({
  subtotal,
  tax,
  discountAmount,
  payableAmount,
  showTitle = false,
  isCheckoutView = false
}) => {
  return (
    <>
      {showTitle && (
        <div className="bg-[#fff7e8] rounded-[8px] py-[10px] px-4 mb-4">
          <span className="text-[14px] font-bold text-[#32324d]">Payment Summary</span>
        </div>
      )}
      <div className={`bg-white rounded-[16px] p-4 flex flex-col gap-3 border border-[#f3f3f5] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] ${!isCheckoutView ? 'mb-4' : ''}`}>
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-semibold text-[#666687]">Total Amount</span>
          <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-semibold text-[#666687]">Tax</span>
          <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{tax.toFixed(2)}</span>
        </div>
        {discountAmount > 0 && isCheckoutView && (
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-semibold text-[#666687]">Apply Discount</span>
            <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>-{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="w-full h-px border-t border-dashed border-[#eaeaef] my-1"></div>
        <div className="flex justify-between items-center">
          <span className="text-[16px] font-bold text-[#32324d]">Total price</span>
          <span className="text-[16px] font-extrabold text-[#ff7b2c] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{payableAmount.toFixed(2)}</span>
        </div>
      </div>
      {!isCheckoutView && (
        <div className="bg-[#fff7e8] rounded-[16px] p-4 flex justify-between items-center border border-[#ffb01d]/20">
          <span className="text-[16px] font-bold text-[#32324d]">Total</span>
          <span className="text-[16px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{payableAmount.toFixed(2)}</span>
        </div>
      )}
    </>
  );
};
