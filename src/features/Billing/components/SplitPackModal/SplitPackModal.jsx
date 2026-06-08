import React, { useState, useEffect } from 'react';

export const SplitPackModal = ({ isOpen, onClose, item, onConfirm }) => {
  const [serveQty, setServeQty] = useState(0);
  const [packQty, setPackQty] = useState(0);

  useEffect(() => {
    if (isOpen && item) {
      // Pre-fill current values
      const currentFulfillment = item.fulfillment || { dine_in: item.quantity, take_away: 0 };
      setServeQty(currentFulfillment.dine_in || 0);
      setPackQty(currentFulfillment.take_away || 0);
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleServeIncrease = () => {
    if (packQty > 0) {
      setServeQty(s => s + 1);
      setPackQty(p => p - 1);
    }
  };

  const handleServeDecrease = () => {
    if (serveQty > 0) {
      setServeQty(s => s - 1);
      setPackQty(p => p + 1);
    }
  };

  const handlePackIncrease = () => {
    if (serveQty > 0) {
      setPackQty(p => p + 1);
      setServeQty(s => s - 1);
    }
  };

  const handlePackDecrease = () => {
    if (packQty > 0) {
      setPackQty(p => p - 1);
      setServeQty(s => s + 1);
    }
  };

  const handleConfirm = () => {
    onConfirm({
      item,
      serveQty,
      packQty
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-[26px] p-6 w-[375px] shadow-[0px_4px_20px_rgba(0,0,0,0.1)]">
        
        {/* Header */}
        <div className="flex items-center mb-6 relative">
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-[0px_0px_2px_rgba(12,26,75,0.05),0px_4px_20px_rgba(50,50,71,0.02)] text-[#8e8ea9] hover:text-[#32324d] absolute left-0 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h2 className="text-[16px] font-bold text-[#32324d] w-full text-center">Split Serve/Pack Quantity</h2>
        </div>

        {/* Dine-In (Serve) Section */}
        <div className="bg-[#eef2ff] border border-[#6366f1]/30 rounded-[16px] p-3 mb-4">
          <h3 className="text-[16px] font-bold text-[#6366f1] mb-3">Dine-In (Serve)</h3>
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)] rounded-[8px] overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <span className="text-[14px] font-semibold text-[#32324d]">{item.title}</span>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={handleServeDecrease} className="w-6 h-6 rounded-[12.5px] bg-white flex items-center justify-center text-[#6366f1] shadow-sm hover:bg-[#f8faff] transition-colors border border-[#6366f1]/20">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span className="text-[14px] font-bold text-[#32324d] w-4 text-center">{serveQty}</span>
                <button onClick={handleServeIncrease} className="w-7 h-7 rounded-[14px] bg-white flex items-center justify-center text-[#6366f1] shadow-sm hover:bg-[#f8faff] transition-colors border border-[#6366f1]/20">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
            <div className="flex items-end gap-[2px]">
              <span className="text-[12px] font-bold text-[#6366f1] mb-[2px]">₹</span>
              <span className="text-[16px] font-extrabold text-[#6366f1]">{(item.price * serveQty).toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Takeaway / Parcel (Pack) Section */}
        <div className="bg-[#fff7e8] border border-[#ffb01d]/30 rounded-[16px] p-3 mb-6">
          <h3 className="text-[16px] font-bold text-[#d88c00] mb-3">Takeaway (Pack)</h3>
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)] rounded-[8px] overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <span className="text-[14px] font-semibold text-[#32324d]">{item.title}</span>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={handlePackDecrease} className="w-6 h-6 rounded-[12.5px] bg-white flex items-center justify-center text-[#d88c00] shadow-sm hover:bg-[#fffcf5] transition-colors border border-[#ffb01d]/30">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span className="text-[14px] font-bold text-[#32324d] w-4 text-center">{packQty}</span>
                <button onClick={handlePackIncrease} className="w-7 h-7 rounded-[14px] bg-white flex items-center justify-center text-[#d88c00] shadow-sm hover:bg-[#fffcf5] transition-colors border border-[#ffb01d]/30">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
            <div className="flex items-end gap-[2px]">
              <span className="text-[12px] font-bold text-[#d88c00] mb-[2px]">₹</span>
              <span className="text-[16px] font-extrabold text-[#d88c00]">{(item.price * packQty).toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button onClick={handleConfirm} className="w-full h-[54px] bg-[#6366f1] text-white hover:bg-[#4f46e5] transition-colors rounded-[16px] font-bold text-[16px] shadow-[0_4px_12px_rgba(99,102,241,0.2)]">
          Confirm split
        </button>

      </div>
    </div>
  );
};
