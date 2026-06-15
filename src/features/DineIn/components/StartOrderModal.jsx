import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { startOrderSchema } from '../../../validations/customer.validation';
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5" stroke="#32324D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19L5 12L12 5" stroke="#32324D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="#8E8EA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#8E8EA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7V12L15 15" stroke="#8E8EA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StartOrderModal = ({ isOpen, onClose, tableNo, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(startOrderSchema),
    mode: "onSubmit",
    defaultValues: { customerName: '', customerMobile: '', customerAddress: 'N/A', covers: 0 }
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      reset();
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, reset]);

  if (!isOpen) return null;

  const handleStartOrder = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const inputClass = "w-full h-[54px] bg-white border border-[var(--color-neutral-150)] rounded-[16px] px-4 text-[14px] font-semibold text-[#32324d] placeholder-[#8e8ea9] focus:border-[var(--color-tertiary-1)] focus:outline-none focus:ring-0 transition-colors";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1a4b]/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[26px] w-[400px] p-6 shadow-xl relative animate-in fade-in zoom-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-center relative mb-6">
          <button 
            onClick={onClose}
            className="absolute left-0 p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <BackIcon />
          </button>
          <h2 className="text-[16px] font-bold text-[#32324d]">Start Order</h2>
        </div>

        {/* Read Only Table Info */}
        <div className="flex justify-between items-center bg-[#f8faff] rounded-[12px] p-4 mb-6 border border-[#eaeaef]">
          <div>
            <p className="text-[12px] text-[#8e8ea9] font-medium mb-1">Selected Table</p>
            <p className="text-[16px] font-bold text-[#32324d]">{tableNo}</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-[#8e8ea9] font-medium mb-1">Order Type</p>
            <p className="text-[16px] font-bold text-[#32324d]">Dine In</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <input 
              type="text" 
              placeholder="Customer Name *" 
              className={inputClass}
              {...register('customerName')}
            />
            {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
          </div>
          
          <div>
            <input 
              type="tel" 
              placeholder="Mobile Number *" 
              className={inputClass}
              {...register('customerMobile')}
            />
            {errors.customerMobile && <p className="text-red-500 text-xs mt-1">{errors.customerMobile.message}</p>}
          </div>

          <div>
            <input 
              type="text" 
              placeholder="Customer Address *" 
              className={inputClass}
              {...register('customerAddress')}
            />
            {errors.customerAddress && <p className="text-red-500 text-xs mt-1">{errors.customerAddress.message}</p>}
          </div>

          <div>
            <input 
              type="number" 
              placeholder="Number of Guests" 
              className={inputClass}
              {...register('covers')}
            />
            {errors.covers && <p className="text-red-500 text-xs mt-1">{errors.covers.message}</p>}
          </div>
        </div>

        <div className="mt-8">
          <button 
            onClick={handleSubmit(handleStartOrder)}
            className="w-full h-[54px] bg-[#ffb01d] rounded-[16px] flex items-center justify-center text-white text-[16px] font-bold hover:bg-[#ffb01d]/90 transition-colors"
          >
            Start Order
          </button>
        </div>
      </div>
    </div>
  );
};

