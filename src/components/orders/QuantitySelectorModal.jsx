import React, { useState, useEffect } from 'react';

export const QuantitySelectorModal = ({ isOpen, onClose, onConfirm, maxQuantity, itemName }) => {
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setSelectedQty(maxQuantity);
    }
  }, [isOpen, maxQuantity]);

  if (!isOpen) return null;

  const handleDecrease = () => {
    if (selectedQty > 1) setSelectedQty(selectedQty - 1);
  };

  const handleIncrease = () => {
    if (selectedQty < maxQuantity) setSelectedQty(selectedQty + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1a4b]/40 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-[26px] w-[380px] p-8 shadow-xl relative animate-in fade-in zoom-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className="text-[20px] font-extrabold text-[#32324d] mb-2">Select Quantity</h2>
          <p className="text-[14px] font-semibold text-[#8e8ea9]">
            Apply instructions for how many {itemName}?
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
          <button 
            onClick={handleDecrease}
            disabled={selectedQty <= 1}
            className="w-12 h-12 rounded-full bg-[#f3f5f9] flex items-center justify-center text-[#666687] hover:bg-[#eaeaef] disabled:opacity-50 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          
          <span className="text-[32px] font-extrabold text-[#32324d] w-12 text-center">
            {selectedQty}
          </span>
          
          <button 
            onClick={handleIncrease}
            disabled={selectedQty >= maxQuantity}
            className="w-12 h-12 rounded-full bg-[#f3f5f9] flex items-center justify-center text-[#666687] hover:bg-[#eaeaef] disabled:opacity-50 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 h-[54px] bg-[#eaeaef] text-[#4a4a6a] font-bold rounded-[16px] text-[16px] hover:bg-[#dcdce4] transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
          <button 
            onClick={() => onConfirm(selectedQty)}
            className="flex-1 h-[54px] bg-[#ffb01d] text-white font-bold rounded-[16px] text-[16px] hover:bg-[#ffb01d]/90 transition-all active:scale-[0.98]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
