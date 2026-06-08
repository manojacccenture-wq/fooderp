import React, { useState, useEffect } from 'react';

export const SplitOrderModal = ({ isOpen, onClose, item, onConfirm }) => {
  const [kitchenQty, setKitchenQty] = useState(0);
  const [heldQty, setHeldQty] = useState(0);
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (isOpen && item) {
      setKitchenQty(item.quantity);
      setHeldQty(0);
      setReason('');
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleKitchenIncrease = () => {
    if (heldQty > 0) {
      setKitchenQty(k => k + 1);
      setHeldQty(h => h - 1);
    }
  };

  const handleKitchenDecrease = () => {
    if (kitchenQty > 0) {
      setKitchenQty(k => k - 1);
      setHeldQty(h => h + 1);
    }
  };

  const handleHeldIncrease = () => {
    if (kitchenQty > 0) {
      setHeldQty(h => h + 1);
      setKitchenQty(k => k - 1);
    }
  };

  const handleHeldDecrease = () => {
    if (heldQty > 0) {
      setHeldQty(h => h - 1);
      setKitchenQty(k => k + 1);
    }
  };

  const handleConfirm = () => {
    onConfirm({
      item,
      kitchenQty,
      heldQty,
      reason
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[26px] p-6 w-[375px] shadow-[0px_4px_20px_rgba(0,0,0,0.1)]">
        
        {/* Header */}
        <div className="flex items-center mb-6 relative">
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-[0px_0px_2px_rgba(12,26,75,0.05),0px_4px_20px_rgba(50,50,71,0.02)] text-[var(--color-neutral-600)] absolute left-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h2 className="text-[16px] font-bold text-[var(--color-neutral-800)] w-full text-center">Split order Quantity</h2>
        </div>

        {/* Send to Kitchen Section */}
        <div className="bg-[#b4efc6]/20 border border-[var(--color-success-700)] rounded-[16px] p-3 mb-4">
          <h3 className="text-[16px] font-bold text-[var(--color-neutral-700)] mb-3">Send to Kitchen now</h3>
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <span className="text-[14px] font-semibold text-[var(--color-neutral-800)]">{item.title}</span>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={handleKitchenDecrease} className="w-6 h-6 rounded-[12.5px] bg-white flex items-center justify-center text-[var(--color-neutral-600)] shadow-sm">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span className="text-[14px] font-semibold text-[var(--color-neutral-600)] w-3 text-center">{kitchenQty}</span>
                <button onClick={handleKitchenIncrease} className="w-7 h-7 rounded-[14px] bg-white flex items-center justify-center text-[var(--color-neutral-600)] shadow-sm">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
            <div className="flex items-end gap-[2px]">
              <span className="text-[12px] font-bold text-[var(--color-success-500)] mb-[2px]">₹</span>
              <span className="text-[16px] font-extrabold text-[var(--color-success-500)]">{(item.price * kitchenQty).toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Hold for Later Section */}
        <div className="bg-[#ffc861]/20 border border-[var(--color-tertiary-2)] border-[#ff9556] rounded-[16px] p-3 mb-6">
          <h3 className="text-[16px] font-bold text-[var(--color-neutral-700)] mb-3">Hold for later</h3>
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <span className="text-[14px] font-semibold text-[var(--color-neutral-800)]">{item.title}</span>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={handleHeldDecrease} className="w-6 h-6 rounded-[12.5px] bg-white flex items-center justify-center text-[var(--color-neutral-600)] shadow-sm">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span className="text-[14px] font-semibold text-[var(--color-neutral-600)] w-3 text-center">{heldQty}</span>
                <button onClick={handleHeldIncrease} className="w-7 h-7 rounded-[14px] bg-white flex items-center justify-center text-[var(--color-neutral-600)] shadow-sm">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
            <div className="flex items-end gap-[2px]">
              <span className="text-[12px] font-bold text-[#ff9556] mb-[2px]">₹</span>
              <span className="text-[16px] font-extrabold text-[#ff9556]">{(item.price * heldQty).toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Reason for split */}
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Reason for split"
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full h-[120px] rounded-[16px] border border-[var(--color-neutral-150)] p-4 text-[14px] font-semibold text-[var(--color-neutral-800)] placeholder:text-[var(--color-neutral-500)] outline-none align-top pb-[80px]"
          />
        </div>

        {/* Confirm Button */}
        <button onClick={handleConfirm} className="w-full h-[54px] bg-[var(--color-secondary-1)] text-white rounded-[16px] font-bold text-[16px]">
          Confirm split
        </button>

      </div>
    </div>
  );
};
