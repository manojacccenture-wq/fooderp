import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectAllTables } from '../../store/slices/tableSlice';
import clsx from 'clsx';
import { MenuContent } from '../../components/menu/MenuContent';
import { OrderSummarySidebar } from '../../components/orders/OrderSummarySidebar';

export const ReplaceFoodView = ({ tableNo, onClose, onConfirmReplacement }) => {
  const allTables = useAppSelector(selectAllTables);
  const selectedTable = allTables.find(t => t.tableNo === tableNo);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [replacementProduct, setReplacementProduct] = useState(null);

  const [orderItems, setOrderItems] = useState(() => selectedTable?.orderData?.orderItems || []);

  useEffect(() => {
    setOrderItems(selectedTable?.orderData?.orderItems || []);
  }, [selectedTable]);

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleConfirm = () => {
    if (selectedItemId && replacementProduct) {
      onConfirmReplacement && onConfirmReplacement(tableNo, {
        originalItemId: selectedItemId,
        replacement: replacementProduct
      });
      onClose();
    }
  };

  return (
    <div className="flex w-full animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Left Side: Product Selection */}
      <div className="flex-1 pr-8">
        <h2 className="text-[18px] font-bold text-[#666687] mb-6">Replace Items</h2>
        <div className="bg-[#ffe7bb] border border-[#ffb01d]/20 rounded-[8px] p-3 mb-6">
          <p className="text-[10px] font-bold text-[#32324d]">
            Replace Item: The original item will be replaced with a new item without cancellation. The order amount will be adjusted accordingly.
          </p>
        </div>
        <MenuContent 
          orderItems={orderItems}
          isReplaceMode={true}
          replacementSelectedProductId={replacementProduct?.itemNo}
          onProductClick={setReplacementProduct}
          onProductEnter={setReplacementProduct}
        />
      </div>

      <OrderSummarySidebar
        mode="replace-food"
        orderItems={orderItems}
        customerName={selectedTable?.customerName}
        tableNo={tableNo}
        subtotal={subtotal}
        tax={tax}
        total={total}
        mobile={selectedTable?.mobile}
        selectedReplaceItemId={selectedItemId}
        onSelectReplaceItem={setSelectedItemId}
      >
        <button 
          onClick={handleConfirm}
          disabled={!selectedItemId || !replacementProduct}
          className={clsx(
            "w-full py-4 rounded-2xl text-[16px] font-bold shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] transition-all",
            (!selectedItemId || !replacementProduct) 
              ? "bg-[#dcdce4] text-[#32324d] cursor-not-allowed opacity-70" 
              : "bg-[#ffb01d] text-white hover:bg-[#e69f1a] active:scale-[0.98]"
          )}
        >
          Confirm Replacement
        </button>
        <button 
          onClick={onClose}
          className="w-full bg-[#eaeaef] text-[#4a4a6a] py-4 rounded-2xl text-[16px] font-bold hover:bg-[#dcdce4] transition-colors"
        >
          Cancel
        </button>
      </OrderSummarySidebar>
    </div>
  );
};
