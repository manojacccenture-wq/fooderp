import React from 'react';
import clsx from 'clsx';

export const TakeawaySidebar = ({ takeaway, onClose, onOpenMenu }) => {
  console.log('takeaway: ', takeaway)
  const allItems = takeaway.items || [];

  return (
    <div className="w-full h-full max-h-screen bg-white flex flex-col relative shrink-0">
      <div 
        className="flex items-center justify-between p-3 mt-[2px] mx-[1px] bg-[#f8faff] border-b border-[#eaeaef]"
      >
        <div className="flex flex-col gap-[2px]">
          <span className="text-[14px] font-semibold text-[#666687] leading-[22px]">Token Details</span>
          <span className="text-[20px] font-black text-[#32324d]">
            #{takeaway.tokenNumber }
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#eaeaef] shadow-sm">
            <div className={clsx("w-2 h-2 rounded-full animate-pulse", takeaway.status === 'Ready' ? 'bg-[#24a44b]' : takeaway.status === 'Packed' ? 'bg-[#6366f1]' : 'bg-[#ffb01d]')} />
            <span className={clsx("text-[10px] font-bold uppercase", takeaway.status === 'Ready' ? 'text-[#24a44b]' : takeaway.status === 'Packed' ? 'text-[#6366f1]' : 'text-[#d88c00]')}>
              {takeaway.status}
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#eaeaef] shadow-sm text-[#8e8ea9] hover:text-[#32324d] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-6">
        
        {/* 1. Parcel Items */}
        <div>
          <h3 className="text-[14px] font-bold text-[#4a4a6a] mb-4 border-b border-[#eaeaef] pb-2">Parcel Items</h3>
          
          {/* Active Items */}
          {allItems.length > 0 && (
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#8e8ea9] uppercase tracking-wider block mb-3 px-1">Active Items</span>
              <div className="flex flex-col gap-2">
                {allItems.length === 0 ? (
                   <div className="text-[12px] text-[#8e8ea9] italic text-center p-4">Waiting for items to sync...</div>
                ) : (
                  <>
                    {[...allItems].reverse().map((item, idx) => (
                      <div key={`active-${idx}`} className="flex gap-3 p-3 border border-[#eaeaef] rounded-[16px] bg-white items-center">
                        <div className="w-[40px] h-[40px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)] bg-[#f3f5f9] rounded-full overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-[#8e8ea9]">Img</div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col gap-[2px]">
                          <span className="text-[14px] font-semibold text-[#32324d]">{item.title}</span>
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[12px] text-[#8e8ea9] font-medium">Qty: {item.fulfillment?.take_away || item.quantity}</span>
                            <span className="text-[13px] font-bold text-[#32324d]">₹{(item.price * (item.fulfillment?.take_away || item.quantity)).toFixed(2)}</span>
                          </div>
                          {item.specialInstructions && (
                            <span className="text-[11px] text-[#ffb01d] bg-[#fff7e8] px-2 py-[2px] rounded-full inline-block w-fit mt-1">Note: {item.specialInstructions}</span>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center p-3 mt-2 bg-[#f8faff] rounded-[16px] border border-[#eaeaef]">
                      <span className="text-[14px] font-bold text-[#32324d]">Total Amount</span>
                      <span className="text-[16px] font-black text-[#6366f1]">
                        ₹{takeaway.totalBill || 0}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. Audit Trail */}
        <div>
          <h3 className="text-[14px] font-bold text-[#4a4a6a] mb-3">Audit Trail</h3>
          <div className="flex flex-col gap-3 p-4 bg-white border border-[#eaeaef] rounded-[16px]">
            <div className="flex justify-between items-center text-[12px]">
              <span className="text-[#8e8ea9]">Created Time</span>
              <span className="font-semibold text-[#32324d]">{takeaway.time}</span>
            </div>
          </div>
        </div>

        {/* 3. Generated From */}
        <div className="flex flex-col gap-3 p-4 bg-[#f8faff] rounded-[16px] border border-[#eaeaef]">
          <span className="text-[10px] font-bold text-[#8e8ea9] uppercase tracking-wider mb-[-8px]">Generated From</span>
          <div className="flex justify-between items-center text-[12px] group cursor-pointer hover:bg-white rounded-md p-1 -mx-1 transition-colors" onClick={onOpenMenu}>
            <span className="text-[#8e8ea9] font-semibold flex items-center gap-1">
              Order Number
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </span>
            <span className="font-bold text-[#6366f1] group-hover:underline">#{takeaway.orderNumber}</span>
          </div>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-[#8e8ea9] font-semibold">Customer</span>
            <span className="font-bold text-[#32324d] truncate max-w-[150px] text-right" title={`${takeaway.customerInfo?.name || 'Walk-in'} - ${takeaway.customerInfo?.phone || ''}`}>
              {takeaway.customerInfo?.name && takeaway.customerInfo?.name !== 'Walk-in Customer' ? takeaway.customerInfo.name : takeaway.customerInfo?.phone || 'Walk-in'}
            </span>
          </div>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-[#8e8ea9] font-semibold">Source</span>
            <span className="font-bold text-[#32324d] capitalize">{takeaway.source.replace('_', ' ')}</span>
          </div>
          {takeaway.tableReference && (
            <div className="flex justify-between items-center text-[12px] group cursor-pointer hover:bg-white rounded-md p-1 -mx-1 transition-colors" onClick={onOpenMenu}>
              <span className="text-[#8e8ea9] font-semibold flex items-center gap-1">
                Table Reference
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </span>
              <span className="font-bold text-[#6366f1] group-hover:underline">{takeaway.tableReference}</span>
            </div>
          )}
        </div>
        
      </div>

      {takeaway.status !== 'Completed' && (
        <div className="p-4 border-t border-[#eaeaef] bg-white">
          <button 
            onClick={onOpenMenu}
            className="w-full h-[54px] rounded-[16px] bg-[#ffb01d] text-white font-bold text-[14px] shadow-sm hover:bg-[#e09b18] transition-colors"
          >
            Edit Order
          </button>
        </div>
      )}

    </div>
  );
};

