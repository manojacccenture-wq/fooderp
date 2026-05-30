import React from 'react';

export const ActionButtons = ({
  combinedItems,
  rightView,
  orderType,
  kotStatus,
  draftOrderItemsCount,
  sentKotItemsCount,
  isPhoneMissingForDineIn,
  selectedTable,
  paymentMode,
  handlePrintBilling,
  handleOrderSubmit,
  handleSendKOT,
  setRightView,
  handlePaymentSubmit,
  setOrderItems,
  setKotStatus,
  setDiscountAmount,
  setPaymentMode,
  setIsDiscountModalOpen,
  setIsUpiModalOpen,
  handleQuickPrint,
  handleQuickWhatsApp,
  handleQuickEmail,
  resetCompleteBillingSession
}) => {
  if (combinedItems.length === 0) return null;

  return (
    <div className="px-4 pt-4 pb-8 shrink-0 bg-white sticky bottom-0 z-10">
      {rightView === 'order' ? (
        orderType === 'take_away' ? (
          <button 
            className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handlePrintBilling}
            disabled={combinedItems.length === 0}
          >
            Print Billing
          </button>
        ) : kotStatus === 'success_anim' ? null : draftOrderItemsCount > 0 ? (
          <button 
            className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handleOrderSubmit(handleSendKOT)}
            disabled={(orderType === 'dine_in' && !selectedTable) || isPhoneMissingForDineIn}
          >
            Send to KOT
          </button>
        ) : sentKotItemsCount > 0 ? (
          <button 
            className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={() => setRightView('checkout')}
            disabled={isPhoneMissingForDineIn}
          >
            Complete Order
          </button>
        ) : null
      ) : rightView === 'checkout' && (
        <div className="flex flex-col gap-3">
          {paymentMode === 'Due' ? (
            <button className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]" onClick={handlePaymentSubmit(() => { setOrderItems([]); setRightView('order'); setKotStatus('idle'); setDiscountAmount(0); setPaymentMode('Cash'); })}>
              Mark as Due
            </button>
          ) : paymentMode === 'Upi' ? (
            <>
              <button className="w-full bg-[#dcdce4] text-[#32324d] py-[14px] rounded-[16px] font-bold text-[16px]" onClick={() => setIsDiscountModalOpen(true)}>
                Apply Discount
              </button>
              <button className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]" onClick={() => setIsUpiModalOpen(true)}>
                Generate UPI QR & Pay
              </button>
            </>
          ) : (
            <>
              <button className="w-full bg-[#dcdce4] text-[#32324d] py-[14px] rounded-[16px] font-bold text-[16px]" onClick={() => setIsDiscountModalOpen(true)}>
                Apply Discount
              </button>
              <button className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]" onClick={handlePaymentSubmit(() => { 
                resetCompleteBillingSession();
              })}>
                Mark as paid
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
