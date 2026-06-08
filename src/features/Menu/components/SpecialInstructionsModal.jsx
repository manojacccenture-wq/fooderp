import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { specialInstructionsSchema } from '../../../validations/common.validation';

export const SpecialInstructionsModal = ({ isOpen, item, targetQuantity, onClose, onSave }) => {
  const [selections, setSelections] = useState({});

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(specialInstructionsSchema),
    defaultValues: { additionalNote: '' }
  });

  // Initialize state when modal opens or item changes
  useEffect(() => {
    if (isOpen && item) {
      const instructions = item.specialInstructions || {};
      
      // Separate additionalNote from the rest of the dynamic selections
      const { additionalNote: note, ...rest } = instructions;
      
      setSelections(rest);
      reset({ additionalNote: note || '' });
    }
  }, [isOpen, item, reset]);

  if (!isOpen || !item) return null;

  const handleToggleSelection = (groupKey, selectionType, option) => {
    setSelections(prev => {
      const currentGroupSelections = prev[groupKey] || [];
      
      if (selectionType === 'single') {
        // Toggle off if clicking the same option, otherwise replace
        return {
          ...prev,
          [groupKey]: currentGroupSelections.includes(option) ? [] : [option]
        };
      } else {
        // Multiple select
        if (currentGroupSelections.includes(option)) {
          return {
            ...prev,
            [groupKey]: currentGroupSelections.filter(o => o !== option)
          };
        } else {
          return {
            ...prev,
            [groupKey]: [...currentGroupSelections, option]
          };
        }
      }
    });
  };

  const handleSave = (data) => {
    const specialInstructions = {
      ...selections,
      additionalNote: data.additionalNote
    };
    onSave(item.id, specialInstructions, targetQuantity);
  };

  // Count active selections for the button text (excluding note)
  const selectionCount = Object.values(selections).reduce((acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 0);

  const groups = item.specialInstructionGroups || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[24px] w-full max-w-[500px] max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative">
        
        {/* Header */}
        <div className="flex items-center justify-center p-6 border-b border-[#f3f5f9] relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute left-6 w-8 h-8 flex items-center justify-center text-[#8e8ea9] hover:text-[#32324d] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h2 className="text-[18px] font-bold text-[#32324d]">Special Instructions</h2>
        </div>

        {/* Item Context Card */}
        <div className="mx-6 mt-6 bg-[#f3f5f9] rounded-[16px] p-4 flex items-center gap-4">
          <div className="w-[60px] h-[60px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[16px] font-bold text-[#32324d]">{item.title}</span>
            <span className="text-[14px] font-semibold text-[#ffb01d]">Quantity: {targetQuantity || item.quantity}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          
          {/* Dynamic Groups */}
          {groups.map((group) => {
            const currentGroupSelections = selections[group.key] || [];

            return (
              <div key={group.key} className="flex flex-col gap-3">
                <span className="text-[14px] font-semibold text-[#8e8ea9]">{group.title}</span>
                <div className="flex flex-wrap gap-3">
                  {group.options.map(option => {
                    const isSelected = currentGroupSelections.includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => handleToggleSelection(group.key, group.selectionType, option)}
                        className={clsx(
                          "px-4 py-2 rounded-[20px] text-[13px] font-bold transition-colors",
                          isSelected
                            ? "bg-[#ffb01d] text-white"
                            : "bg-[#f3f5f9] text-[#666687] hover:bg-[#eaeaef]"
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Additional Instructions Textarea (Always available) */}
          <div className="flex flex-col mt-2">
            <textarea
              {...register('additionalNote')}
              placeholder="Additional Instructions"
              className="w-full h-[120px] border border-[#eaeaef] focus:border-[#ffb01d] rounded-[16px] p-4 text-[14px] font-semibold text-[#32324d] outline-none resize-none placeholder:text-[#8e8ea9]"
            ></textarea>
            {errors.additionalNote && <p className="text-red-500 text-xs mt-1">{errors.additionalNote.message}</p>}
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 pt-0 mt-auto shrink-0 flex flex-col items-center">
          <button
            onClick={handleSubmit(handleSave)}
            className="w-full bg-[#ffb01d] text-white py-4 rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(255,176,29,0.3)] transition-transform active:scale-[0.98]"
          >
            Confirm Instructions {selectionCount > 0 ? `(${selectionCount})` : ''}
          </button>
          
          <div className="w-[100px] h-1 bg-[#eaeaef] rounded-full mt-6"></div>
        </div>

      </div>
    </div>
  );
};

