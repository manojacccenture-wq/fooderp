import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectActiveTakeaways, selectCompletedTakeaways, updateTakeawayStatus, completeTakeaway } from '../../store/slices/takeawaySlice';
import { selectActiveKots, removeKots } from '../../store/slices/kotSlice';
import { addCompletedOrder } from '../../store/slices/orderHistorySlice';
import { TakeawayCard } from './components/TakeawayCard';
import { TakeawaySidebar } from './components/TakeawaySidebar';

export const TakeawayPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activeTakeaways = useAppSelector(selectActiveTakeaways);
  const completedTakeaways = useAppSelector(selectCompletedTakeaways);
  const activeKots = useAppSelector(selectActiveKots);
  
  const [selectedTakeawayId, setSelectedTakeawayId] = useState(null);
  const [filter, setFilter] = useState('Active'); // 'Active' | 'Completed' | 'All'

  const displayedTakeaways = filter === 'Active' ? activeTakeaways
    : filter === 'Completed' ? completedTakeaways
    : [...activeTakeaways, ...completedTakeaways].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Auto-select first token if none is selected
  useEffect(() => {
    if (!selectedTakeawayId && displayedTakeaways.length > 0) {
      setSelectedTakeawayId(displayedTakeaways[0].id);
    }
  }, [selectedTakeawayId, displayedTakeaways]);

  const selectedTakeaway = displayedTakeaways.find(t => t.id === selectedTakeawayId);
  const relatedKots = selectedTakeaway 
    ? activeKots.filter(k => k.orderNumber === selectedTakeaway.orderNumber && k.type === 'take_away' && k.tokenNumber === selectedTakeaway.tokenNumber)
    : [];

  const handleStatusChange = (tokenNumber, newStatus) => {
    dispatch(updateTakeawayStatus({ tokenNumber, status: newStatus }));
  };

  const handleHandover = (tokenNumber) => {
    // Extract items to store in completed batch
    const currentActiveItems = relatedKots.flatMap(k => k.items);
    const currentKotIds = relatedKots.map(k => k.id);
    
    dispatch(completeTakeaway({ tokenNumber, items: currentActiveItems }));
    
    // Dispatch to Order History only if it's a pure takeaway
    // Dine-in parcels are already captured during billing
    if (selectedTakeaway && selectedTakeaway.source === 'take_away') {
      const nowTimeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase();
      const timeline = [];
      
      const firstKotTime = relatedKots.length > 0 ? new Date(relatedKots[0].createdAt) : new Date(selectedTakeaway.createdAt);
      timeline.push({ time: firstKotTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase(), event: 'Order Created' });
      
      relatedKots.forEach((kot, idx) => {
        timeline.push({ time: new Date(kot.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase(), event: `KOT Round ${idx + 1} Sent` });
      });
      
      timeline.push({ time: nowTimeStr, event: 'Payment Completed' });
      timeline.push({ time: nowTimeStr, event: 'Order Completed' });
      timeline.push({ time: nowTimeStr, event: 'Handed Over' });

      dispatch(addCompletedOrder({
        id: selectedTakeaway.orderNumber,
        kotNumber: `KOT-${selectedTakeaway.orderNumber}`,
        tableNumber: selectedTakeaway.tableReference,
        customerName: selectedTakeaway.customerInfo?.phone || 'Walk-in Customer',
        type: 'Takeaway',
        items: currentActiveItems.length ? currentActiveItems : selectedTakeaway.items,
        subtotal: selectedTakeaway.financials?.subtotal || 0,
        tax: selectedTakeaway.financials?.tax || 0,
        discount: selectedTakeaway.financials?.discount || 0,
        finalAmount: selectedTakeaway.financials?.finalAmount || 0,
        paymentMode: selectedTakeaway.financials?.paymentMode || 'Cash',
        cashier: 'Cashier',
        shift: 'Morning',
        orderStartTime: selectedTakeaway.createdAt || new Date().toISOString(),
        duration: '30 min',
        kots: relatedKots,
        timeline,
        paymentDetails: {
          customerPaidAmount: selectedTakeaway.financials?.finalAmount || 0,
          dueGivenAmount: 0,
          changeReturned: 0,
        },
        takeawayAudit: {
          tokenNumber: selectedTakeaway.tokenNumber,
          status: 'Handed Over',
          packedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
          handedOverTime: nowTimeStr
        }
      }));
    }
    
    if (currentKotIds.length > 0) {
      dispatch(removeKots(currentKotIds));
    }
    
    if (selectedTakeaway && selectedTakeaway.tokenNumber === tokenNumber) {
      setSelectedTakeawayId(null);
    }
  };

  const handleOpenMenu = () => {
    if (!selectedTakeaway) return;
    
    if (selectedTakeaway.source === 'dine_in' && selectedTakeaway.tableReference) {
      navigate('/dashboard/menu', { state: { tableNo: selectedTakeaway.tableReference, orderType: 'dine_in' } });
    } else {
      navigate('/dashboard/menu', { state: { orderType: 'take_away' } });
    }
  };

  return (
    <div className="grid h-full w-full relative overflow-hidden bg-[#f8faff]" style={{ gridTemplateColumns: `minmax(0, 1fr) 400px` }}>
      <div className="flex flex-col min-h-0 overflow-hidden p-[14px]">
        <div className="flex justify-between items-center shrink-0">
          <h1 className="text-[20px] font-bold text-[#32324d]">Takeaways</h1>
          <button 
            onClick={() => navigate('/dashboard/menu', { state: { orderType: 'take_away' } })}
            className="px-6 py-2 bg-[#ffb01d] text-white font-bold rounded-[16px] text-[14px] hover:bg-[#e09b18] transition-colors shadow-sm"
          >
            New Takeaway
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-[14px] mt-4 shrink-0">
          {['Active', 'Completed', 'All'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setFilter(tab);
                setSelectedTakeawayId(null);
              }}
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-colors ${
                filter === tab 
                  ? 'bg-[#32324d] text-white' 
                  : 'bg-white text-[#666687] border border-[#eaeaef] hover:bg-[#f3f5f9]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {displayedTakeaways.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-[#8e8ea9]">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <p className="text-[18px]">No {filter.toLowerCase()} parcel orders.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 pb-6 scroll-smooth">
            <div className="grid gap-[10px] items-stretch pb-[100px]" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
              {displayedTakeaways.map((takeaway) => (
                <TakeawayCard
                  key={takeaway.id}
                  takeaway={takeaway}
                  isSelected={selectedTakeawayId === takeaway.id}
                  onClick={() => setSelectedTakeawayId(takeaway.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="overflow-hidden h-full flex flex-col relative bg-white z-10 shadow-[-4px_0_15px_rgba(0,0,0,0.02)] border-l border-[#eaeaef]">
        {selectedTakeaway ? (
          <TakeawaySidebar
            takeaway={selectedTakeaway}
            relatedKots={relatedKots}
            onClose={() => setSelectedTakeawayId(null)}
            onStatusChange={handleStatusChange}
            onHandover={() => handleHandover(selectedTakeaway.tokenNumber)}
            onOpenMenu={handleOpenMenu}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-[#8e8ea9] p-6 text-center">
             <div className="w-16 h-16 bg-[#f3f5f9] rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </div>
            <h3 className="text-[16px] font-bold text-[#32324d] mb-1">No Token Selected</h3>
            <p className="text-[14px]">Select a token from the list to view details and manage status.</p>
          </div>
        )}
      </div>
    </div>
  );
};
