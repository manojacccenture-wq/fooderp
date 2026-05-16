import React, { useState } from 'react';
import clsx from 'clsx';

// Reuse order item card pattern from MenuPage
const OrderItem = ({ image, title, price, quantity, onIncrease, onDecrease, onRemove, showDelete }) => {
  return (
    <div className="bg-white border border-[#eaeaef] rounded-2xl p-3 flex gap-3 items-center shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] relative">
      <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-[14px] leading-[22px] text-[#32324d] font-semibold">{title}</span>
        <div className="flex items-center gap-2 mt-1">
          <button onClick={(e) => { e.stopPropagation(); onDecrease(); }} className="w-6 h-6 rounded-[12.5px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer hover:bg-[#ffe0d3] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <span className="text-[14px] font-semibold text-[#666687] min-w-[9px] text-center">{quantity}</span>
          <button onClick={(e) => { e.stopPropagation(); onIncrease(); }} className="w-7 h-7 rounded-[14px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer hover:bg-[#ffe0d3] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
      <div className="absolute right-3 top-3 flex gap-[6px]">
        <div className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#666687]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C12.0967 2.50789 14.1092 3.32602 15.6167 4.78333L17.5 6.66667" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.4999 2.5V6.66667H13.3333" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.5 10C17.5 11.9891 16.7098 13.8968 15.3033 15.3033C13.8968 16.7098 11.9891 17.5 10 17.5C7.90329 17.4921 5.89081 16.674 4.38333 15.2167L2.5 13.3333" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.66667 13.334H2.5V17.5007" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        {showDelete && (
           <div onClick={(e) => { e.stopPropagation(); onRemove(); }} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#e23744]">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
               <path d="M8.33325 9.16602V14.166" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M11.6667 9.16602V14.166" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M15.8334 5V16.6667C15.8334 17.1087 15.6578 17.5326 15.3453 17.8452C15.0327 18.1577 14.6088 18.3333 14.1667 18.3333H5.83341C5.39139 18.3333 4.96746 18.1577 4.6549 17.8452C4.34234 17.5326 4.16675 17.1087 4.16675 16.6667V5" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M2.5 5H17.5" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M6.66675 4.99935V3.33268C6.66675 2.89065 6.84234 2.46673 7.1549 2.15417C7.46746 1.84161 7.89139 1.66602 8.33341 1.66602H11.6667C12.1088 1.66602 12.5327 1.84161 12.8453 2.15417C13.1578 2.46673 13.3334 2.89065 13.3334 3.33268V4.99935" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
           </div>
        )}
      </div>
      <div className="absolute right-3 bottom-3 flex items-end gap-[2px]">
        <span className="text-[12px] font-bold text-[#ffb080] pb-[1px]">₹</span>
        <span className="text-[16px] font-extrabold text-[#ff7b2c]">{(Number(price) * quantity).toFixed(2)}</span>
      </div>
    </div>
  );
};

export const CancelFoodView = ({ tableNo, onClose, onConfirmCancellation }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [remarks, setRemarks] = useState("");
  
  // Mock order items for the view - in real app this would come from state/props
  const [orderItems, setOrderItems] = useState([
    { id: 1, image: "http://localhost:3845/assets/457decdb571c02070bc7add243bd80cae81aeb7f.png", title: "Chicken Biriyani", price: 120, quantity: 2 },
    { id: 2, image: "http://localhost:3845/assets/9c489a346f0d6c27a9687c5b68bc1fef4c902d3c.png", title: "Non veg thali", price: 120, quantity: 2 }
  ]);

  const reasons = [
    "Customer change mind", "Item out of stock", 
    "Kitchen unable to prepare", "Wrong item ordered", 
    "Item Issue", "Duplicate order", 
    "Customer request", "Other"
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleConfirm = () => {
    onConfirmCancellation && onConfirmCancellation(tableNo, { reason: selectedReason, remarks, orderItems });
    onClose();
  };

  return (
    <div className="flex w-full animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Left Side: Cancellation Form */}
      <div className="flex-1 pr-8">
        <div className="flex gap-4 mb-6">
          <button
            className="px-6 py-[10px] rounded-[16px] font-bold text-[16px] bg-[#e23744] text-white shadow-sm"
          >
            Cancel Item
          </button>
        </div>

        <h2 className="text-[18px] font-bold text-[#666687] mb-6">Reason For cancellation</h2>
        
        <div className="grid grid-cols-2 gap-[10px] mb-8 max-w-[400px]">
          {reasons.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(reason)}
              className={clsx(
                "h-[36px] rounded-[8px] text-[10px] font-bold transition-all duration-200",
                selectedReason === reason 
                  ? "bg-[#ffb01d] text-white shadow-md transform scale-[1.02]" 
                  : "bg-[#f3f5f9] text-[#4a4a6a] hover:bg-[#eaeaef]"
              )}
            >
              {reason}
            </button>
          ))}
        </div>

        <div className="mb-8 max-w-[400px]">
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Additional remarks"
            className="w-full h-[120px] border border-[#eaeaef] rounded-[16px] p-4 text-[14px] font-semibold text-[#32324d] outline-none resize-none placeholder:text-[#8e8ea9] focus:border-[#ffb01d] transition-colors"
          ></textarea>
        </div>

        <div className="flex gap-4 max-w-[400px]">
          <button 
            onClick={onClose}
            className="flex-1 py-[12px] bg-[#eaeaef] text-[#4a4a6a] font-bold rounded-[16px] text-[14px] hover:bg-[#dcdce4] transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={!selectedReason}
            className="flex-1 py-[12px] bg-[#e23744] text-white font-bold rounded-[16px] text-[14px] hover:bg-[#c12e3a] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Cancellation
          </button>
        </div>
      </div>

      {/* Right Side: Order Panel */}
      <div className="w-[354px] bg-white border-l border-[#f3f5f9] flex flex-col shrink-0 min-h-[calc(100vh-160px)]">
         <div className="bg-[#fff7e8] flex items-center justify-between p-3 mt-[2px] mx-[1px]">
           <div className="flex flex-col gap-[2px]">
             <span className="text-[18px] font-semibold text-[#32324d] leading-[22px]">Current order</span>
             <span className="text-[12px] text-[#4a4a6a]">Order no : 12345</span>
           </div>
         </div>

         <div className="px-4 mt-4 flex flex-col gap-4 overflow-y-auto max-h-[350px] custom-scrollbar">
           {orderItems.map((item) => (
             <OrderItem
               key={item.id}
               image={item.image}
               title={item.title}
               price={item.price}
               quantity={item.quantity}
               onIncrease={() => setOrderItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))}
               onDecrease={() => setOrderItems(prev => prev.map(i => i.id === item.id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i))}
               onRemove={() => setOrderItems(prev => prev.filter(i => i.id !== item.id))}
               showDelete={true}
             />
           ))}
           {orderItems.length === 0 && (
             <div className="text-center py-8 text-[#8e8ea9] text-[14px]">No items in order</div>
           )}
         </div>

         <div className="px-4 mt-8">
            <div className="bg-[#fff7e8] p-3 rounded-2xl flex justify-center mb-4">
              <span className="text-[16px] font-bold text-[#32324d]">Payment Summary</span>
            </div>

            <div className="bg-white rounded-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] p-4 flex flex-col gap-3 border border-[#f3f3f5]">
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-semibold text-[#666687]">Total Amount</span>
                <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-semibold text-[#666687]">Tax</span>
                <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{tax.toFixed(2)}</span>
              </div>
              <div className="w-full h-px border-t border-dashed border-[#eaeaef] my-1"></div>
              <div className="flex justify-between items-center">
                <span className="text-[16px] font-bold text-[#32324d]">Total price</span>
                <span className="text-[16px] font-extrabold text-[#ff7b2c] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{total.toFixed(2)}</span>
              </div>
            </div>
         </div>

         <div className="px-4 mt-6 flex flex-col gap-3">
            <input 
              type="text" 
              defaultValue="9629917347"
              className="w-full h-[54px] border border-[#eaeaef] rounded-[16px] px-4 text-[#8e8ea9] font-semibold text-[14px] outline-none focus:border-[#ffb01d] transition-colors" 
            />
         </div>

         <div className="px-4 mt-auto pt-6 flex flex-col gap-3 pb-8">
            <button className="w-full bg-[#dcdce4] text-[#32324d] py-4 rounded-2xl text-[16px] font-bold hover:bg-[#cfcfd8] transition-colors">Apply Discount</button>
            <button className="w-full bg-[#ffb01d] text-white py-4 rounded-2xl text-[16px] font-bold shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] hover:bg-[#e69f1a] transition-colors">Print Billing</button>
         </div>
      </div>
    </div>
  );
};
