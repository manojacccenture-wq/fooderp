import React from 'react';
import clsx from 'clsx';
import { ORDER_STATUS_COLORS } from '../../../../utils/orderStatus';
import { CurrentOrders } from './CurrentOrders';
import { OrderTypeSelector } from './OrderTypeSelector';
import { TableSelector } from './TableSelector';
import { PaymentSummary } from './PaymentSummary';
import { ActionButtons } from './ActionButtons';

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
  handlePaymentSubmit,
  setOrderItems,
  setIsDiscountModalOpen,
  setIsUpiModalOpen,
  handleQuickPrint,
  handleQuickWhatsApp,
  handleQuickEmail,
  resetCompleteBillingSession,
  isPhoneMissingForDineIn
}) => {
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
              <button className="bg-[#e23744] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold" onClick={() => { setDraftOrderItems([]); setSentKotItems([]); setHeldItems([]); setKotStatus('idle'); }}>Cancel order</button>
              <button className="bg-[#ffb01d] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold">Pause</button>
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
                handleReplaceClick={handleReplaceClick}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
                handleRemove={handleRemove}
                handleOpenInstructions={handleOpenInstructions}
              />

              {isSplitView ? (
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
                          <button className="bg-[#ffb01d] text-white rounded-[16px] px-4 py-[8px] text-[12px] font-bold shadow-[0px_4px_20px_0px_rgba(50,50,71,0.02)]">
                            Send now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {shouldShowOrderControls && kotStatus !== 'sent' && combinedItems.length > 0 && !isExistingSessionMode && (
                    <>
                      <OrderTypeSelector
                        orderType={orderType}
                        setOrderType={setOrderType}
                        isTakeawayPage={isTakeawayPage}
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
            </>
          )}
        </div>
      )}

      {rightView === 'checkout' && (
        <div className="flex-1 overflow-y-auto pb-4 flex flex-col">
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
              <button className="bg-[#e23744] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold" onClick={() => { setOrderItems([]); setHeldItems([]); setRightView('order'); setKotStatus('idle'); }}>Cancel order</button>
              <button className="bg-[#ffb01d] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold">Pause</button>
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

            <div className="mt-6">
              <span className="text-[14px] font-semibold text-[#666687] block mb-3">Split bill</span>
              <div className="flex gap-2">
                <button onClick={() => setSplitMode('full')} className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", splitMode === 'full' ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")}>Full Bill</button>
                <button onClick={() => setSplitMode('equal')} className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", splitMode === 'equal' ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")}>Equal Split</button>
                <button onClick={() => setSplitMode('by_item')} className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", splitMode === 'by_item' ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")}>By Item</button>
              </div>
              <span className="text-[12px] text-[#8e8ea9] block mt-2">
                {splitMode === 'equal' ? `Each guest pays ₹${splitCalculatedAmount.toFixed(2)}` : `Full bill amount ₹${payableAmount.toFixed(2)}`}
              </span>
            </div>

            <div className="mt-6">
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

            <div className="mt-6 mb-6">
              <span className="text-[14px] font-semibold text-[#666687] block mb-3">Payment Mode</span>
              <div className="flex gap-2 mb-4">
                {['Cash', 'Upi', 'Card', 'Due'].map(mode => (
                  <button key={mode} className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", paymentMode === mode ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")} onClick={() => setPaymentMode(mode)}>{mode}</button>
                ))}
              </div>

              {paymentMode === 'Due' ? (
                <div className="flex flex-col gap-3 mb-6">
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
              ) : (
                <>
                  <div>
                    <input ref={paymentInputRef} type="number" {...registerPayment('customerPaidAmount')} className={clsx("w-full h-[40px] border focus:ring-0 focus:outline-none rounded-[16px] px-4 text-[14px] font-bold text-[#666687] mb-1 transition-all duration-200", paymentErrors.customerPaidAmount ? "border-red-500 focus:border-red-500" : "border-[#ffb01d] focus:border-[#ff7b2c]")} />
                    {paymentErrors.customerPaidAmount && <p className="text-red-500 text-xs mb-3 ml-2">{paymentErrors.customerPaidAmount.message}</p>}
                  </div>
                  <div className="bg-[#b4efc6]/20 py-2 rounded-[16px] text-center mb-4 mt-2">
                    <span className="text-[12px] font-bold text-[#24a44b]">₹{changeToReturn.toFixed(2)} change to return</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {['500', '200', '100', '50', '20', '10'].map(amt => (
                      <button key={amt} onClick={() => setCustomerPaidAmount(prev => Number(prev) + Number(amt))} className="h-[36px] border border-[#ffb01d] rounded-[16px] flex items-center justify-center gap-1 text-[12px] font-bold text-[#32324d] hover:bg-[#fff7e8] transition-all duration-200 active:scale-[0.98]">
                        <span className="text-[#ff9556] text-center text-2xl">-</span>{amt}<span className="text-[#ff9556] text-center text-2xl">+</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => paymentInputRef.current?.focus()} className="w-full h-[36px] border border-[#ffb01d] rounded-[16px] text-[#666687] text-[12px] font-bold hover:bg-[#fff7e8] mb-6 transition-all duration-200 active:scale-[0.98]">Custom amount</button>
                </>
              )}
            </div>
          </div>
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
      />
    </div>
  );
};
