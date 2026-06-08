import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {applyDiscountSchema} from "../../../../validations/common.validation.js"


export const ApplyDiscountModal = ({ isOpen, onClose, totalAmount, tax, onApply }) => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: zodResolver(applyDiscountSchema),
    defaultValues: { discountValue: 5, coupon: '', reason: '' }
  });

  const discountValue = watch('discountValue') || 0;
  const discountAmount = (totalAmount * discountValue) / 100;
  const finalPrice = totalAmount + tax - discountAmount;

  useEffect(() => {
    if (isOpen) {
      reset({ discountValue: 5, coupon: '', reason: '' });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const handleApply = (data) => {
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
        {/* Form */}
        <div>
          <div className="relative w-full">
            <input 
              type="number" 
              {...register('discountValue')}
              className="w-full h-[54px] border border-[#eaeaef] rounded-[16px] px-4 pr-8 text-[#666687] font-semibold text-[14px] outline-none focus:border-[#ffb01d]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666687] font-semibold">%</span>
          </div>
          {errors.discountValue && <p className="text-red-500 text-xs mt-1">{errors.discountValue.message}</p>}
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Apply Coupon code"
            {...register('coupon')}
            className="w-full h-[54px] border border-[#eaeaef] rounded-[16px] px-4 text-[#666687] font-semibold text-[14px] outline-none focus:border-[#ffb01d]"
          />
          {errors.coupon && <p className="text-red-500 text-xs mt-1">{errors.coupon.message}</p>}
        </div>

        <div>
          <textarea 
            placeholder="Reason for discount"
            {...register('reason')}
            className="w-full h-[120px] border border-[#eaeaef] rounded-[16px] p-4 text-[#666687] font-semibold text-[14px] outline-none resize-none align-top focus:border-[#ffb01d]"
          ></textarea>
          {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
        </div>

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
        <button onClick={handleSubmit(handleApply)} className="w-full h-[54px] bg-[#ffb01d] text-white rounded-[16px] font-bold text-[16px] mt-2 transition-transform active:scale-[0.98]">
          Apply discount
        </button>

      </div>
    </div>
  );
};


