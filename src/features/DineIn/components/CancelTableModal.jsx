import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cancelTableSchema } from '../../../validations/cancellation.validation';

const reasons = [
  "Customer left",
  "Wrong table assigned",
  "Duplicate booking",
  "Customer request",
  "Order canceled",
  "Payment issue",
  "Test order",
  "Other"
];

export const CancelTableModal = ({ isOpen, onClose, onConfirm }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
    resolver: zodResolver(cancelTableSchema),
    defaultValues: { reason: "", remarks: "" }
  });

  const selectedReason = watch('reason');

  useEffect(() => {
    if (isOpen) {
      reset({ reason: "", remarks: "" });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const handleConfirm = (data) => {
    if (onConfirm) {
      onConfirm(data.reason, data.remarks);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1a4b]/40 backdrop-blur-sm transition-opacity"
    >
      <div 
        className="bg-white rounded-[26px] w-[460px] p-8 shadow-xl relative animate-in fade-in zoom-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className="text-[24px] font-extrabold text-[#32324d] mb-2">Cancel Table</h2>
          <p className="text-[14px] font-semibold text-[#8e8ea9]">Please select reason for table cancellation</p>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-2 gap-[10px]">
            {reasons.map((reason) => (
              <button
                type="button"
                key={reason}
                onClick={() => setValue('reason', reason, { shouldValidate: true })}
                className={`h-[42px] text-[12px] font-bold rounded-[12px] transition-all active:scale-[0.98] ${
                  selectedReason === reason 
                    ? "bg-[#ffb01d] text-white shadow-md" 
                    : "bg-[#f3f5f9] text-[#4a4a6a] hover:bg-[#eaeaef]"
                }`}
              >
                {reason}
              </button>
            ))}
          </div>
          {errors.reason && <p className="text-red-500 text-xs mt-2">{errors.reason.message}</p>}
        </div>

        <div className="mb-8">
          <textarea
            {...register('remarks')}
            placeholder="Additional remarks"
            className="w-full h-[100px] border border-[var(--color-neutral-150)] rounded-[16px] p-4 text-[14px] font-semibold text-[#32324d] outline-none resize-none placeholder-[#8e8ea9] focus:border-[#ffb01d] transition-colors"
          />
          {errors.remarks && <p className="text-red-500 text-xs mt-1">{errors.remarks.message}</p>}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 h-[54px] bg-[#eaeaef] text-[#4a4a6a] font-bold rounded-[16px] text-[16px] hover:bg-[#dcdce4] transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit(handleConfirm)}
            className="flex-1 h-[54px] bg-[#ffb01d] text-white font-bold rounded-[16px] text-[16px] hover:bg-[#ffb01d]/90 transition-all active:scale-[0.98]"
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};

