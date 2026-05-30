import React from 'react';
import { OrderItem } from '../OrderItem';
import { ORDER_STATUS_COLORS } from '../../../../utils/orderStatus';
import { useAppSelector } from '../../../../store/hooks';
import { selectActiveKots } from '../../../../store/slices/kotSlice';

export const CurrentOrders = ({
  sentKotItems,
  draftOrderItems,
  combinedItems,
  globalOrderStatus,
  statusStyles,
  selectedOrderItem,
  itemRefs,
  handleSplitClick,
  handleSplitPackClick,
  handleReplaceClick,
  handleIncrease,
  handleDecrease,
  handleRemove,
  handleOpenInstructions,
  setSelectedOrderItem,
  activeKeyboardSection,
  setActiveKeyboardSection
}) => {
  const activeKots = useAppSelector(selectActiveKots);

  return (
    <div className="px-4 mt-4 flex flex-col gap-4">
      {(() => {
        const sentKotRounds = sentKotItems.reduce((acc, item) => {
          const round = item.kotRound || 1;
          if (!acc[round]) {
            acc[round] = { round, time: item.kotTime, items: [] };
          }
          acc[round].items.push(item);
          return acc;
        }, {});
        const roundsArray = Object.values(sentKotRounds).sort((a, b) => a.round - b.round);
        
        return roundsArray.map((roundObj) => {
          const isKOTStatus = ['kot_sent', 'preparing', 'ready'].includes(globalOrderStatus);
          const blockStyle = isKOTStatus ? statusStyles : ORDER_STATUS_COLORS.kot_sent;
          
          return (
            <div key={`round-${roundObj.round}`} className="bg-white rounded-[16px] border border-[#eaeaef] overflow-hidden shadow-sm flex flex-col shrink-0 " >
              <div className="px-4 py-[10px] flex justify-between items-center border-b border-[#eaeaef]" style={{ backgroundColor: blockStyle.bg }}>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-extrabold" style={{ color: blockStyle.text }}>KOT Round {roundObj.round}</span>
                  <div className="px-2 py-[2px] rounded-full bg-white/50 text-[9px] font-bold" style={{ color: blockStyle.text }}>
                    {ORDER_STATUS_COLORS[globalOrderStatus]?.label || 'KOT SENT'}
                  </div>
                </div>
                <span className="text-[12px] font-semibold text-[#8e8ea9]">{roundObj.time || 'Pending'}</span>
              </div>
              <div className="p-3 flex flex-col gap-3">
                {roundObj.items.map((item) => {
                  const isParcelActive = activeKots.some(k => k.type === 'take_away' && k.items.some(i => i.id === item.id));
                  return (
                    <OrderItem
                      key={`sent-${item.id}`}
                      image={item.image}
                      title={item.title}
                      price={item.price}
                      quantity={item.quantity}
                      onSplit={() => handleSplitClick(item)}
                      onSplitPack={() => handleSplitPackClick(item)}
                      onReplace={() => handleReplaceClick(item)}
                      onAddInstruction={undefined}
                      specialInstructions={item.specialInstructions}
                      showDelete={false}
                      showQuantityControls={false}
                      fulfillment={item.fulfillment}
                      isParcelActive={isParcelActive}
                      isSelected={selectedOrderItem === item.id && activeKeyboardSection === 'order'}
                      onSelect={() => { setSelectedOrderItem(item.id); setActiveKeyboardSection('order'); }}
                      itemRef={(el) => { if(itemRefs && itemRefs.current) itemRefs.current[item.id] = el; }}
                    />
                  );
                })}
              </div>
            </div>
          );
        });
      })()}

      {draftOrderItems.length > 0 && (
        <>
          {sentKotItems.length > 0 && (
            <h3 className="text-[18px] font-bold text-[#666687] mt-2 mb-0">New Orders</h3>
          )}
          {draftOrderItems.map((item) => (
            <div key={`curr-${item.id}`} className="border-l-4 rounded-[16px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]" style={{ borderLeftColor: ORDER_STATUS_COLORS.draft.border }}>
              <OrderItem
                image={item.image}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                onIncrease={(type) => handleIncrease(item.id, type)}
                onDecrease={(type) => handleDecrease(item.id, type)}
                onRemove={() => handleRemove(item.id)}
                onSplit={() => handleSplitClick(item)}
                onSplitPack={() => handleSplitPackClick(item)}
                onAddInstruction={() => handleOpenInstructions(item)}
                specialInstructions={item.specialInstructions}
                showDelete={true}
                showQuantityControls={true}
                fulfillment={item.fulfillment}
                isSelected={selectedOrderItem === item.id && activeKeyboardSection === 'order'}
                onSelect={() => { setSelectedOrderItem(item.id); setActiveKeyboardSection('order'); }}
                itemRef={(el) => { if(itemRefs && itemRefs.current) itemRefs.current[item.id] = el; }}
              />
            </div>
          ))}
        </>
      )}

      {combinedItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 opacity-60">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8e8ea9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="text-[14px] font-bold text-[#8e8ea9]">Please select a item</span>
        </div>
      )}
    </div>
  );
};
