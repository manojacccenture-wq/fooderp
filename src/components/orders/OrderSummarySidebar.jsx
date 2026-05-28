import React from 'react';
import clsx from 'clsx';
import { SpecialInstructionTags } from './SpecialInstructionTags';

// OrderItem internal component or imported
const OrderItem = ({ image, title, price, quantity, onIncrease, onDecrease, onRemove, showDelete, isSelected, onSelect, onSplit, onReplace, replaceModeSelection, showQuantityControls = true, specialInstructions, onAddInstruction }) => {
  return (
    <div 
      onClick={onSelect}
      className={clsx(
        "bg-white border rounded-2xl p-3 flex gap-3 items-center shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] relative transition-all",
        isSelected ? "border-[#ffb01d] ring-1 ring-[#ffb01d] cursor-pointer" : "border-[#eaeaef]",
        (onSelect || replaceModeSelection) && !isSelected ? "cursor-pointer" : ""
      )}
    >
      <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-[14px] leading-[22px] text-[#32324d] font-semibold">{title}</span>
        {showQuantityControls ? (
          <div className="flex items-center gap-2 mt-1">
            {onDecrease && !replaceModeSelection ? (
              <button onClick={(e) => { e.stopPropagation(); onDecrease(); }} className="w-6 h-6 rounded-[12.5px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer hover:bg-[#ffe0d3] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            ) : null}
            <span className="text-[14px] font-semibold text-[#666687] min-w-[9px] text-center">{quantity} {replaceModeSelection && 'Quantity'}</span>
            {onIncrease && !replaceModeSelection ? (
              <button onClick={(e) => { e.stopPropagation(); onIncrease(); }} className="w-7 h-7 rounded-[14px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer hover:bg-[#ffe0d3] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            ) : null}
          </div>
        ) : (
          <div className="flex items-center mt-1">
            <span className="text-[14px] font-semibold text-[#666687] text-center">{quantity} Quantity</span>
          </div>
        )}
        <SpecialInstructionTags instructions={specialInstructions} />
      </div>
      
      {/* Action Icons Top Right */}
      <div className="absolute right-3 top-3 flex gap-[6px]">
        {replaceModeSelection ? (
          <div className={clsx("w-5 h-5 flex items-center justify-center rounded-full border transition-colors", isSelected ? "bg-[#ffb01d] border-[#ffb01d]" : "border-[#eaeaef]")}>
             {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
          </div>
        ) : (
          <>
            {onAddInstruction && (
              <div onClick={(e) => { e.stopPropagation(); onAddInstruction(); }} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#6b4eff] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sticky-note"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg>
              </div>
            )}
            {onSplit && (
              <div onClick={(e) => { e.stopPropagation(); onSplit(); }} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#666687]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C12.0967 2.50789 14.1092 3.32602 15.6167 4.78333L17.5 6.66667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.4999 2.5V6.66667H13.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.5 10C17.5 11.9891 16.7098 13.8968 15.3033 15.3033C13.8968 16.7098 11.9891 17.5 10 17.5C7.90329 17.4921 5.89081 16.674 4.38333 15.2167L2.5 13.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.66667 13.334H2.5V17.5007" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
              </div>
            )}
            {onReplace && (
               <div onClick={(e) => { e.stopPropagation(); onReplace(); }} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#666687]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.5 13.334V14.1673C17.5 15.0514 17.1488 15.8992 16.5237 16.5244C15.8985 17.1495 15.0507 17.5007 14.1667 17.5007H5.83333C4.94928 17.5007 4.10143 17.1495 3.47631 16.5244C2.85119 15.8992 2.5 15.0514 2.5 14.1673V13.334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.1667 6.66667L10 2.5L5.83337 6.66667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 2.5V12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
               </div>
            )}
            {showDelete && onRemove && (
               <div onClick={(e) => { e.stopPropagation(); onRemove(); }} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#e23744]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                   <path d="M8.33325 9.16602V14.166" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M11.6667 9.16602V14.166" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M15.8334 5V16.6667C15.8334 17.1087 15.6578 17.5326 15.3453 17.8452C15.0327 18.1577 14.6088 18.3333 14.1667 18.3333H5.83341C5.39139 18.3333 4.96746 18.1577 4.6549 17.8452C4.34234 17.5326 4.16675 17.1087 4.16675 16.6667V5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M6.66675 4.99935V3.33268C6.66675 2.89065 6.84234 2.46673 7.1549 2.15417C7.46746 1.84161 7.89139 1.66602 8.33341 1.66602H11.6667C12.1088 1.66602 12.5327 1.84161 12.8453 2.15417C13.1578 2.46673 13.3334 2.89065 13.3334 3.33268V4.99935" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
               </div>
            )}
          </>
        )}
      </div>
      
      <div className="absolute right-3 bottom-3 flex items-end gap-[2px]">
        <span className="text-[12px] font-bold text-[#ffb080] pb-[1px]">₹</span>
        <span className="text-[16px] font-extrabold text-[#ff7b2c]">{(Number(price) * quantity).toFixed(2)}</span>
      </div>
    </div>
  );
};

export const OrderSummarySidebar = ({
  mode = 'menu', // 'menu' | 'cancel-food' | 'replace-food'
  sentKotItems = [],
  draftOrderItems = [],
  customerName,
  tableNo,
  subtotal,
  tax,
  total,
  mobile,
  
  // Handlers for menu items
  onIncrease,
  onDecrease,
  onRemove,
  onSplit,
  onReplace,
  onAddInstruction,
  selectedOrderItemId,
  onSelectOrderItem,
  
  // Replace food specific
  selectedReplaceItemId,
  onSelectReplaceItem,
  
  // Custom render prop for bottom buttons area or additional inputs
  children
}) => {

  const displayCustomerName = customerName || "Walk-in";

  // Group sentKotItems by kotRound
  const sentKotRounds = sentKotItems.reduce((acc, item) => {
    const round = item.kotRound || 1;
    if (!acc[round]) {
      acc[round] = { round, time: item.kotTime, items: [] };
    }
    acc[round].items.push(item);
    return acc;
  }, {});
  
  const roundsArray = Object.values(sentKotRounds).sort((a, b) => a.round - b.round);

  return (
    <div className="w-[354px] bg-white border-l border-[#f3f5f9] flex flex-col shrink-0 min-h-[calc(100vh-160px)] h-full">
      <div className="bg-[#fff7e8] flex items-center justify-between p-3 mt-[2px] mx-[1px]">
        <div className="flex flex-col gap-[2px]">
          <span className="text-[14px] font-semibold text-[#32324d] leading-[22px]">Current order</span>
          <span className="text-[12px] text-[#4a4a6a]">Customer: {displayCustomerName} {tableNo ? `| Table: ${tableNo}` : ''}</span>
        </div>
        {mode === 'menu' && (
           <div className="flex gap-[10px]">
             {/* Note: This is simplified for pure component, handlers can be passed in children if needed */}
             <button className="bg-[#e23744] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold">Cancel order</button>
             <button className="bg-[#ffb01d] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold">Pause</button>
           </div>
        )}
      </div>
      

      <div className="px-4 mt-4 flex flex-col gap-4 overflow-y-auto max-h-[350px] custom-scrollbar">
        {roundsArray.length > 0 && roundsArray.map((roundObj) => (
          <div key={`round-${roundObj.round}`} className="bg-white rounded-[16px] border border-[#eaeaef] overflow-hidden shadow-sm flex flex-col shrink-0">
            <div className="bg-[#f3f5f9] px-4 py-[10px] flex justify-between items-center border-b border-[#eaeaef]">
              <span className="text-[13px] font-extrabold text-[#4a4a6a]">KOT Round {roundObj.round}</span>
              <span className="text-[12px] font-semibold text-[#8e8ea9]">{roundObj.time || 'Pending'}</span>
            </div>
            <div className="p-3 flex flex-col gap-3">
              {roundObj.items.map((item) => (
                <OrderItem
                  key={`sent-${item.id}`}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  quantity={item.quantity}
                  onIncrease={undefined}
                  onDecrease={undefined}
                  onRemove={undefined}
                  onSplit={onSplit ? () => onSplit(item) : undefined}
                  onReplace={onReplace ? () => onReplace(item) : undefined}
                  onAddInstruction={undefined}
                  specialInstructions={item.specialInstructions}
                  showDelete={false}
                  showQuantityControls={false}
                  
                  // Standard selection
                  isSelected={mode === 'menu' && selectedOrderItemId === item.id || mode === 'replace-food' && selectedReplaceItemId === item.id}
                  onSelect={mode === 'menu' && onSelectOrderItem ? () => onSelectOrderItem(item.id) : mode === 'replace-food' && onSelectReplaceItem ? () => onSelectReplaceItem(item.id) : undefined}
                  replaceModeSelection={mode === 'replace-food'}
                />
              ))}
            </div>
          </div>
        ))}

        {draftOrderItems.length > 0 && (
          <>
            {sentKotItems.length > 0 && (
              <h3 className="text-[18px] font-bold text-[#666687] mt-2 mb-0">New Orders</h3>
            )}
            {draftOrderItems.map((item) => (
              <OrderItem
                key={`curr-${item.id}`}
                image={item.image}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                onIncrease={onIncrease ? () => onIncrease(item.id) : undefined}
                onDecrease={onDecrease ? () => onDecrease(item.id) : undefined}
                onRemove={onRemove ? () => onRemove(item.id) : undefined}
                onSplit={onSplit ? () => onSplit(item) : undefined}
                onReplace={undefined}
                onAddInstruction={onAddInstruction ? () => onAddInstruction(item) : undefined}
                specialInstructions={item.specialInstructions}
                showDelete={mode === 'menu' || mode === 'cancel-food'}
                showQuantityControls={true}
                
                // Standard selection
                isSelected={mode === 'menu' && selectedOrderItemId === item.id || mode === 'replace-food' && selectedReplaceItemId === item.id}
                onSelect={mode === 'menu' && onSelectOrderItem ? () => onSelectOrderItem(item.id) : mode === 'replace-food' && onSelectReplaceItem ? () => onSelectReplaceItem(item.id) : undefined}
                replaceModeSelection={mode === 'replace-food'}
              />
            ))}
          </>
        )}

        {sentKotItems.length === 0 && draftOrderItems.length === 0 && (
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

      <div className="px-4 mt-8">
        <div className="bg-[#fff7e8] p-3 rounded-2xl flex justify-center mb-4">
          <span className="text-[16px] font-bold text-[#32324d]">Payment Summary</span>
        </div>

        <div className="bg-white rounded-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] p-4 flex flex-col gap-3 border border-[#f3f3f5]">
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-semibold text-[#666687]">Total Amount</span>
            <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-semibold text-[#666687]">Tax</span>
            <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{tax?.toFixed(2)}</span>
          </div>
          <div className="w-full h-px border-t border-dashed border-[#eaeaef] my-1"></div>
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-bold text-[#32324d]">Total price</span>
            <span className="text-[16px] font-extrabold text-[#ff7b2c] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {(mode === 'cancel-food' || mode === 'replace-food') && (
        <div className="px-4 mt-6 flex flex-col gap-3">
          <input 
            type="text" 
            defaultValue={mobile || ""}
            placeholder="Phone Number"
            className={clsx(
               "w-full h-[54px] border rounded-[16px] px-4 text-[#8e8ea9] font-semibold text-[14px] outline-none transition-colors",
               mode === 'replace-food' ? "border-[#ff7b2c]" : "border-[#eaeaef] focus:border-[#ffb01d]"
            )} 
          />
        </div>
      )}

      {/* Dynamic bottom area for specific buttons */}
      <div className="px-4 mt-auto pt-6 flex flex-col gap-3 pb-8">
        {children}
      </div>
    </div>
  );
};
