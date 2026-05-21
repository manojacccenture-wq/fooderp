import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectAllTables } from '../../store/slices/tableSlice';
import { OrderSummarySidebar } from '../../components/orders/OrderSummarySidebar';

export const CancelFoodView = ({ tableNo, onClose, onConfirmCancellation }) => {
  const allTables = useAppSelector(selectAllTables);
  const selectedTable = allTables.find(t => t.tableNo === tableNo);

  const [selectedReason, setSelectedReason] = useState("");
  const [remarks, setRemarks] = useState("");
  
  const [orderItems, setOrderItems] = useState(() => selectedTable?.orderData?.orderItems || []);

  useEffect(() => {
    setOrderItems(selectedTable?.orderData?.orderItems || []);
  }, [selectedTable]);

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
          <button className="px-6 py-[10px] rounded-[16px] font-bold text-[16px] bg-[#e23744] text-white shadow-sm">
            Cancel Item
          </button>
        </div>

        <h2 className="text-[18px] font-bold text-[#666687] mb-6">Reason For cancellation</h2>
        
        <div className="grid grid-cols-2 gap-[10px] mb-8 max-w-[400px]">
          {reasons.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(reason)}
              className={`h-[36px] text-[10px] font-bold rounded-[8px] transition-colors ${
                selectedReason === reason 
                  ? "bg-[#e23744] text-white" 
                  : "bg-[#f3f5f9] text-[#4a4a6a] hover:bg-[#eaeaef]"
              }`}
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
      </div>

      {/* Right Side: Order Panel */}
      <OrderSummarySidebar
        mode="cancel-food"
        orderItems={orderItems}
        customerName={selectedTable?.customerName}
        tableNo={tableNo}
        subtotal={subtotal}
        tax={tax}
        total={total}
        mobile={selectedTable?.mobile}
      >
        <div className="flex gap-4 w-full">
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
      </OrderSummarySidebar>
    </div>
  );
};
