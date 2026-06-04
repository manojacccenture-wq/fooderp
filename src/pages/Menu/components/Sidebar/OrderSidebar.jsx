import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ORDER_STATUS_COLORS } from '../../../../utils/orderStatus';
import { CurrentOrders } from './CurrentOrders';
import { OrderTypeSelector } from './OrderTypeSelector';
import { TableSelector } from './TableSelector';
import { PaymentSummary } from './PaymentSummary';
import { ActionButtons } from './ActionButtons';
import { useAppSelector } from '../../../../store/hooks';
import { selectActiveTakeaways, selectCompletedTakeaways } from '../../../../store/slices/takeawaySlice';

export const OrderSidebar = ({
  rightView,
  setRightView,
  statusStyles,
  displayCustomerName,
  selectedTable,
  globalOrderStatus,
  setDraftOrderItems,
  setSentKotItems,
  setHeldItems,
  setKotStatus,
  kotStatus,
  sentKotItems,
  draftOrderItems,
  combinedItems,
  selectedOrderItem,
  setSelectedOrderItem,
  itemRefs,
  handleSplitClick,
  handleSplitPackClick,
  handleReplaceClick,
  handleIncrease,
  handleDecrease,
  handleRemove,
  handleOpenInstructions,
  isSplitView,
  totalHeldPrice,
  heldItems,
  shouldShowOrderControls,
  isExistingSessionMode,
  orderType,
  setOrderType,
  isTakeawayPage,
  allTables,
  isDineInFlow,
  setSelectedTable,
  subtotal,
  tax,
  payableAmount,
  discountAmount,
  setDiscountAmount,
  registerOrder,
  orderErrors,
  paymentStatus,
  paymentMode,
  setPaymentMode,
  splitMode,
  setSplitMode,
  splitCalculatedAmount,
  customTip,
  selectedTip,
  setSelectedTip,
  setCustomTip,
  registerPayment,
  paymentErrors,
  paymentInputRef,
  changeToReturn,
  setCustomerPaidAmount,
  handlePrintBilling,
  handleOrderSubmit,
  handleSendKOT,
  handleSendHeldItem,
  handlePaymentSubmit,
  setOrderItems,
  setIsDiscountModalOpen,
  setIsUpiModalOpen,
  handleQuickPrint,
  handleQuickWhatsApp,
  handleQuickEmail,
  resetCompleteBillingSession,
  isPhoneMissingForDineIn,
  activeKeyboardSection,
  setActiveKeyboardSection,
  currentOrderNumber,
  totalPackQuantity,
  hasPackedItems,
  handleSendPackToTakeaway
}) => {
  const [isSplitBillExpanded, setIsSplitBillExpanded] = useState(false);



  const activeTakeaways = useAppSelector(selectActiveTakeaways);
  const completedTakeaways = useAppSelector(selectCompletedTakeaways);
  const activeKots = useAppSelector(state => state.kot.activeKots);

  // Determine the correct order number for the current view
  let actualOrderNumber = null;
  if (isDineInFlow && selectedTable) {
    // For dine-in, fetch the table's specific order number from its active KOTs
    const tableKot = activeKots.find(k => k.tableReference === selectedTable);
    if (tableKot) {
      actualOrderNumber = tableKot.orderNumber;
    }
  } else {
    // For native takeaway, use the passed currentOrderNumber
    actualOrderNumber = currentOrderNumber;
  }

  const allLinkedTakeaways = [...activeTakeaways, ...completedTakeaways].filter(t => {
    if (!actualOrderNumber) return false;
    
    // Must match the table's actual order number
    if (t.orderNumber !== actualOrderNumber) return false;

    // Additional safety check for dine-in
    if (isDineInFlow && selectedTable) {
      return t.tableReference === selectedTable;
    }
    return true;
  });
  
  const linkedTakeaway = allLinkedTakeaways.length > 0 ? allLinkedTakeaways[allLinkedTakeaways.length - 1] : null;

  return (
    <div className="w-full h-full max-h-screen bg-white flex flex-col relative shrink-0">
      {rightView === 'order' && (
        <div className="flex-1 overflow-y-auto pb-4 flex flex-col">
          {/* Header */}
          <div 
            className="flex items-center justify-between p-3 mt-[2px] mx-[1px]"
            style={{ backgroundColor: statusStyles.bg, transition: 'all 0.3s ease' }}
          >
            <div className="flex flex-col gap-[2px]">
              <span className="text-[80%] font-semibold leading-[22px]" style={{ color: statusStyles.text }}>Current order</span>
              <span className="text-[80%] opacity-80" style={{ color: statusStyles.text }}>
                Customer: {displayCustomerName} {selectedTable ? `| Table: ${selectedTable}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border shadow-sm" style={{ borderColor: statusStyles.border }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: statusStyles.text }} />
                <span className="text-[10px] font-bold" style={{ color: statusStyles.text }}>
                  {ORDER_STATUS_COLORS[globalOrderStatus]?.label || 'AVAILABLE'}
                </span>
              </div>
              {linkedTakeaway && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f8faff] border border-[#6366f1]/30 shadow-sm">
                  <span className="text-[10px] font-bold text-[#6366f1] uppercase">Parcel #{String(linkedTakeaway.tokenNumber).padStart(3, '0')}</span>
                </div>
              )}
              <button className="bg-[#e23744] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold" onClick={() => { setDraftOrderItems([]); setSentKotItems([]); setHeldItems([]); setKotStatus('idle'); }}>Cancel order</button>
              {/* <button className="bg-[#ffb01d] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold">Pause</button> */}
            </div>
          </div>

          {kotStatus === 'success_anim' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <span className="text-[14px] font-bold text-[#24a44b] mb-12">Order has been sent to Kot sucessfully</span>
              <div className="relative w-[150px] h-[150px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#b4efc6] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40"></div>
                <div className="absolute inset-4 rounded-full border border-[#24a44b]/30 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60"></div>
                <div className="w-[70px] h-[70px] bg-[#b4efc6]/40 rounded-full flex items-center justify-center relative z-10">
                  <div className="w-[44px] h-[44px] bg-[#24a44b] rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(36,164,75,0.3)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <CurrentOrders
                sentKotItems={sentKotItems}
                draftOrderItems={draftOrderItems}
                combinedItems={combinedItems}
                globalOrderStatus={globalOrderStatus}
                statusStyles={statusStyles}
                selectedOrderItem={selectedOrderItem}
                setSelectedOrderItem={setSelectedOrderItem}
                itemRefs={itemRefs}
                handleSplitClick={handleSplitClick}
                handleSplitPackClick={handleSplitPackClick}
                handleReplaceClick={handleReplaceClick}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
                handleRemove={handleRemove}
                handleOpenInstructions={handleOpenInstructions}
                activeKeyboardSection={activeKeyboardSection}
                setActiveKeyboardSection={setActiveKeyboardSection}
              />

              {isSplitView && (
                <div className="mt-8 px-4">
                  <div className="bg-[#ffc861]/20 border border-[#ff9556] rounded-[16px] overflow-hidden shadow-[0px_0px_1px_0px_rgba(12,26,75,0.03),0px_4px_20px_0px_rgba(50,50,71,0.04)]">
                    <div className="flex justify-between items-center p-3">
                      <span className="text-[16px] font-bold text-[#4a4a6a]">Held Items</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[12px] font-bold text-[#ff9556] mb-[2px]">₹</span>
                        <span className="text-[16px] font-extrabold text-[#ff9556]">{totalHeldPrice}</span>
                      </div>
                    </div>
                    <div className="p-3 pt-0 flex flex-col gap-4">
                      {heldItems.map((item) => (
                        <div key={`held-${item.id}`} className="flex items-center gap-3">
                          <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <span className="text-[14px] font-semibold text-[#32324d]">{item.title}</span>
                            <span className="text-[14px] font-semibold text-[#666687]">{item.quantity} Quantity</span>
                          </div>
                          <button 
                            onClick={() => handleSendHeldItem(item)}
                            className="bg-[#ffb01d] text-white rounded-[16px] px-4 py-[8px] text-[12px] font-bold shadow-[0px_4px_20px_0px_rgba(50,50,71,0.02)]"
                          >
                            Send now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {shouldShowOrderControls && kotStatus !== 'sent' && (combinedItems.length > 0 || heldItems.length > 0) && !isExistingSessionMode && (
                    <>
                      <OrderTypeSelector
                        orderType={orderType}
                        setOrderType={setOrderType}
                        isTakeawayPage={isTakeawayPage}
                        totalPackQuantity={totalPackQuantity}
                      />

                      <TableSelector
                        orderType={orderType}
                        allTables={allTables}
                        isDineInFlow={isDineInFlow}
                        selectedTable={selectedTable}
                        setSelectedTable={setSelectedTable}
                      />

                      {orderType === 'take_away' && (
                        <div className="px-4 mt-6">
                          <PaymentSummary
                            subtotal={subtotal}
                            tax={tax}
                            discountAmount={discountAmount}
                            payableAmount={payableAmount}
                            showTitle={true}
                            isCheckoutView={false}
                          />
                        </div>
                      )}

                      <div className="px-4 mt-6 flex flex-col gap-[16px]">
                        <div>
                          <input type="text" {...registerOrder('phone')} placeholder='Phone Number' className={clsx("w-full h-[54px] border rounded-[16px] px-4 text-[#8e8ea9] font-semibold text-[14px] outline-none", orderErrors.phone ? "border-red-500 focus:border-red-500" : "border-[#eaeaef] focus:border-[#ff7b2c]")} />
                          {orderErrors.phone && <p className="text-red-500 text-xs mt-1">{orderErrors.phone.message}</p>}
                        </div>
                        {orderType === 'dine_in' && (
                          <div>
                            <input
                              type="number"
                              {...registerOrder('guestCount')}
                              placeholder="Guests"
                              className={clsx("w-full h-[54px] border rounded-[16px] px-4 text-[#8e8ea9] font-semibold text-[14px] outline-none", orderErrors.guestCount ? "border-red-500 focus:border-red-500" : "border-[#eaeaef] focus:border-[#ff7b2c]")}
                            />
                            {orderErrors.guestCount && <p className="text-red-500 text-xs mt-1">{orderErrors.guestCount.message}</p>}
                          </div>
                        )}
                      </div>
                    </>
                  )}
            </>
          )}
        </div>
      )}

      {rightView === 'checkout' && (
        <div className="flex-1 overflow-y-auto pb-4 flex flex-col">
          {paymentStatus === 'success' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 h-full animate-in fade-in zoom-in duration-300">
              <span className="text-[18px] font-extrabold text-[#32324d] mb-8">Payment Successful</span>
              <div className="relative w-[120px] h-[120px] flex items-center justify-center mb-6">
                <div className="absolute inset-0 rounded-full border border-[#b4efc6] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40"></div>
                <div className="absolute inset-4 rounded-full border border-[#24a44b]/30 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60"></div>
                <div className="w-[60px] h-[60px] bg-[#b4efc6]/40 rounded-full flex items-center justify-center relative z-10">
                  <div className="w-[36px] h-[36px] bg-[#24a44b] rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(36,164,75,0.3)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              <span className="text-[14px] font-bold text-[#4a4a6a]">Order {currentOrderNumber ? `#${currentOrderNumber}` : ''} Complete</span>
              {selectedTable && <span className="text-[13px] text-[#8e8ea9] mt-2">Table {selectedTable} is now available</span>}
            </div>
          ) : (
            <>
              <div 
            className="flex items-center justify-between p-3 mt-[2px] mx-[1px]"
            style={{ backgroundColor: statusStyles.bg, transition: 'all 0.3s ease' }}
          >
            <div className="flex flex-col gap-[2px]">
              <span className="text-[18px] font-semibold leading-[22px]" style={{ color: statusStyles.text }}>Current order</span>
              <span className="text-[12px] opacity-80" style={{ color: statusStyles.text }}>Customer: {displayCustomerName} {selectedTable ? `| Table: ${selectedTable}` : ''}</span>
            </div>
            <div className="flex gap-[10px] items-center">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border shadow-sm mr-2" style={{ borderColor: statusStyles.border }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: statusStyles.text }} />
                <span className="text-[10px] font-bold" style={{ color: statusStyles.text }}>
                  {ORDER_STATUS_COLORS[globalOrderStatus]?.label || 'BILLING'}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  className="bg-white hover:bg-[#f3f5f9] text-[#32324d] border border-[#eaeaef] rounded-[16px] px-3 py-2 text-[12px] font-bold shadow-[0px_2px_4px_rgba(50,50,71,0.02)] transition-all" 
                  onClick={() => setRightView('order')}
                >
                  ← Edit Order
                </button>
                <button 
                  className="bg-[#e23744] hover:bg-[#c92e3a] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold transition-all" 
                  onClick={() => { 
                    setDraftOrderItems([]); 
                    setSentKotItems([]); 
                    setHeldItems([]); 
                    setRightView('order'); 
                    setKotStatus('idle'); 
                  }}
                >
                  Cancel
                </button>
              </div>
              {/* <button className="bg-[#ffb01d] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold">Pause</button> */}
            </div>
          </div>

          <div className="px-4 mt-6">
            <PaymentSummary
              subtotal={subtotal}
              tax={tax}
              discountAmount={discountAmount}
              payableAmount={payableAmount}
              showTitle={false}
              isCheckoutView={true}
            />

            <div className="mt-6 mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[14px] font-semibold text-[#666687] block">Payment Mode</span>
                <button 
                  className="flex items-center gap-1.5 border border-[#eaeaef] bg-white text-[#4a4a6a] px-3 py-1.5 rounded-[10px] font-bold text-[12px] shadow-sm hover:bg-[#f3f5f9] transition-all"
                  onClick={handleQuickPrint}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                  Print Bill
                </button>
              </div>
              <div className="flex gap-2">
                {['Cash', 'Upi', 'Card', 'Due'].map(mode => (
                  <button key={mode} className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", paymentMode === mode ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")} onClick={() => setPaymentMode(mode)}>{mode}</button>
                ))}
              </div>
            </div>

            {paymentMode === 'Cash' && (
              <div className="mb-6 border border-[#eaeaef] rounded-[16px] p-4 bg-[#fcfcfd]">
                <span className="text-[14px] font-semibold text-[#666687] block mb-3">Received Amount</span>
                <input ref={paymentInputRef} type="number" {...registerPayment('customerPaidAmount')} className={clsx("w-full h-[40px] border focus:ring-0 focus:outline-none rounded-[16px] px-4 text-[14px] font-bold text-[#666687] mb-1 transition-all duration-200", paymentErrors.customerPaidAmount ? "border-red-500 focus:border-red-500" : "border-[#ffb01d] focus:border-[#ff7b2c]")} />
                {paymentErrors.customerPaidAmount && <p className="text-red-500 text-xs mb-3 ml-2">{paymentErrors.customerPaidAmount.message}</p>}
                
                <div className="grid grid-cols-2 gap-2 mb-3 mt-2">
                  {['500', '200', '100', '50', '20', '10'].map(amt => (
                    <button key={amt} onClick={() => setCustomerPaidAmount(prev => Number(prev) + Number(amt))} className="h-[36px] border border-[#ffb01d] rounded-[16px] flex items-center justify-center gap-1 text-[12px] font-bold text-[#32324d] hover:bg-[#fff7e8] transition-all duration-200 active:scale-[0.98]">
                      <span className="text-[#ff9556] text-center text-2xl">-</span>{amt}<span className="text-[#ff9556] text-center text-2xl">+</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => paymentInputRef.current?.focus()} className="w-full h-[36px] border border-[#ffb01d] rounded-[16px] text-[#666687] text-[12px] font-bold hover:bg-[#fff7e8] mb-4 transition-all duration-200 active:scale-[0.98]">Custom amount</button>

                <div className="bg-[#b4efc6]/20 py-2 rounded-[16px] text-center">
                  <span className="text-[12px] font-bold text-[#24a44b]">₹{changeToReturn.toFixed(2)} change to return</span>
                </div>
              </div>
            )}

            {paymentMode === 'Upi' && (
              <div className="flex gap-2 w-full mt-2 mb-6">
                <button 
                  className="flex-1 border border-[#eaeaef] bg-white text-[#24a44b] py-[10px] rounded-[12px] font-bold text-[13px] hover:bg-[#b4efc6]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={handleQuickWhatsApp}
                  disabled={isPhoneMissingForDineIn}
                >
                  WhatsApp
                </button>
                <button className="flex-1 border border-[#eaeaef] bg-white text-[#6b4eff] py-[10px] rounded-[12px] font-bold text-[13px] hover:bg-[#d4cbfc]/30 transition-all" onClick={handleQuickEmail}>
                  Email
                </button>
              </div>
            )}

            {paymentMode === 'Card' && (
              <div className="mb-6 border border-[#eaeaef] rounded-[16px] p-4 bg-[#fcfcfd]">
                <span className="text-[14px] font-semibold text-[#666687] block mb-3">Card Reference Number</span>
                <input type="text" {...registerPayment('cardReference')} placeholder="Enter Card Ref No." className="w-full h-[40px] border border-[#eaeaef] rounded-[16px] px-4 text-[12px] font-semibold outline-none text-[#32324d]" />
              </div>
            )}

            {paymentMode === 'Due' && (
              <div className="mb-6 border border-[#eaeaef] rounded-[16px] p-4 bg-[#fcfcfd]">
                <span className="text-[14px] font-semibold text-[#666687] block mb-3">Due Details</span>
                <div className="flex flex-col gap-3">
                  <div>
                    <input type="text" {...registerPayment('dueCustomerName')} placeholder="Customer name" className={clsx("w-full h-[48px] border rounded-[16px] px-4 text-[12px] font-semibold outline-none text-[#32324d] placeholder:text-[#8e8ea9]", paymentErrors.dueCustomerName ? "border-red-500" : "border-[#eaeaef]")} />
                    {paymentErrors.dueCustomerName && <p className="text-red-500 text-xs mt-1">{paymentErrors.dueCustomerName.message}</p>}
                  </div>
                  <div>
                    <input type="text" {...registerPayment('dueMobileNumber')} placeholder="Mobile Number" className={clsx("w-full h-[48px] border rounded-[16px] px-4 text-[12px] font-semibold outline-none text-[#32324d] placeholder:text-[#8e8ea9]", paymentErrors.dueMobileNumber ? "border-red-500" : "border-[#eaeaef]")} />
                    {paymentErrors.dueMobileNumber && <p className="text-red-500 text-xs mt-1">{paymentErrors.dueMobileNumber.message}</p>}
                  </div>
                  <div>
                    <input type="number" {...registerPayment('dueGivenAmount')} placeholder="Customer given amount" className={clsx("w-full h-[48px] border rounded-[16px] px-4 text-[12px] font-semibold outline-none text-[#32324d] placeholder:text-[#8e8ea9]", paymentErrors.dueGivenAmount ? "border-red-500" : "border-[#eaeaef]")} />
                    {paymentErrors.dueGivenAmount && <p className="text-red-500 text-xs mt-1">{paymentErrors.dueGivenAmount.message}</p>}
                  </div>
                  <div>
                    <input type="number" {...registerPayment('dueAmount')} placeholder="Due amount" className={clsx("w-full h-[48px] border rounded-[16px] px-4 text-[12px] font-semibold outline-none text-[#32324d] placeholder:text-[#8e8ea9]", paymentErrors.dueAmount ? "border-red-500" : "border-[#eaeaef]")} />
                    {paymentErrors.dueAmount && <p className="text-red-500 text-xs mt-1">{paymentErrors.dueAmount.message}</p>}
                  </div>
                  <div><input type="date" {...registerPayment('dueDate')} placeholder="Due date" className="w-full h-[48px] border border-[#eaeaef] rounded-[16px] px-4 text-[12px] font-semibold outline-none text-[#32324d] placeholder:text-[#8e8ea9]" /></div>
                  <div><textarea {...registerPayment('dueReason')} placeholder="Reason for discount" className="w-full h-[80px] border border-[#eaeaef] rounded-[16px] p-4 text-[12px] font-semibold outline-none resize-none text-[#32324d] placeholder:text-[#8e8ea9]"></textarea></div>
                </div>
              </div>
            )}

            <div className="mt-2 mb-6">
              <button 
                onClick={() => setIsSplitBillExpanded(!isSplitBillExpanded)}
                className="flex items-center gap-2 px-4 py-2 bg-[#fff7e8] text-[#ff9556] rounded-full border border-[#ffb01d]/30 text-[12px] font-bold shadow-sm transition-all hover:bg-[#ffb01d] hover:text-white group"
              >
                <span>Split Bill</span>
                <span className="text-[14px]">⚡</span>
                <svg className={clsx("w-3 h-3 ml-1 transition-transform", isSplitBillExpanded ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {isSplitBillExpanded && (
                <div className="mt-4 p-4 border border-[#eaeaef] rounded-[16px] bg-[#fcfcfd] animate-fade-in-up">
                  <div className="flex gap-2">
                    <button onClick={() => setSplitMode('full')} className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", splitMode === 'full' ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")}>Full Bill</button>
                    <button onClick={() => setSplitMode('equal')} className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", splitMode === 'equal' ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")}>Equal Split</button>
                    <button onClick={() => setSplitMode('by_item')} className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", splitMode === 'by_item' ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")}>By Item</button>
                  </div>
                  <span className="text-[12px] font-semibold text-[#8e8ea9] block mt-3 text-center">
                    {splitMode === 'equal' ? `Each guest pays ₹${splitCalculatedAmount.toFixed(2)}` : `Full bill amount ₹${payableAmount.toFixed(2)}`}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 mb-6">
              <span className="text-[14px] font-semibold text-[#666687] block mb-3">Add Tip</span>
              <div className="flex gap-2 mb-3">
                {[20, 50, 100].map((tip) => (
                  <button key={tip} onClick={() => { setSelectedTip(tip); setCustomTip(''); }} className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", selectedTip === tip && customTip === '' ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")}>{tip}</button>
                ))}
                <button onClick={() => { setSelectedTip(0); setCustomTip(''); }} className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", selectedTip === 0 && customTip === '' ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")}>No tip</button>
              </div>
              <div>
                <input type="number" {...registerPayment('customTip')} placeholder="Custom tip amount-" className={clsx("w-full h-[40px] border rounded-[16px] px-4 text-[12px] font-semibold outline-none", paymentErrors.customTip ? "border-red-500" : "border-[#ffb01d]")} />
                {paymentErrors.customTip && <p className="text-red-500 text-xs mt-1">{paymentErrors.customTip.message}</p>}
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      )}

      <ActionButtons
        combinedItems={combinedItems}
        rightView={rightView}
        orderType={orderType}
        kotStatus={kotStatus}
        draftOrderItemsCount={draftOrderItems.length}
        sentKotItemsCount={sentKotItems.length}
        isPhoneMissingForDineIn={isPhoneMissingForDineIn}
        selectedTable={selectedTable}
        paymentMode={paymentMode}
        handlePrintBilling={handlePrintBilling}
        handleOrderSubmit={handleOrderSubmit}
        handleSendKOT={handleSendKOT}
        setRightView={setRightView}
        handlePaymentSubmit={handlePaymentSubmit}
        setOrderItems={setOrderItems}
        setKotStatus={setKotStatus}
        setDiscountAmount={setDiscountAmount}
        setPaymentMode={setPaymentMode}
        setIsDiscountModalOpen={setIsDiscountModalOpen}
        setIsUpiModalOpen={setIsUpiModalOpen}
        handleQuickPrint={handleQuickPrint}
        handleQuickWhatsApp={handleQuickWhatsApp}
        handleQuickEmail={handleQuickEmail}
        resetCompleteBillingSession={resetCompleteBillingSession}
        paymentStatus={paymentStatus}
        payableAmount={payableAmount}
        hasPackedItems={hasPackedItems}
        handleSendPackToTakeaway={handleSendPackToTakeaway}
      />
    </div>
  );
};
