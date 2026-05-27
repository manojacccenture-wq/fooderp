import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllTables } from '../../store/slices/tableSlice';

// Components
import { MenuContent } from '../../components/menu/MenuContent';
import { SplitOrderModal } from '../../components/orders/SplitOrderModal/SplitOrderModal';
import { ApplyDiscountModal } from '../../components/orders/ApplyDiscountModal/ApplyDiscountModal';
import { UpiPaymentModal } from '../../components/payment/UpiPaymentModal';
import { SpecialInstructionsModal } from '../../components/orders/SpecialInstructionsModal';
import { QuantitySelectorModal } from '../../components/orders/QuantitySelectorModal';
import { PrinterSelectionModal } from '../../components/orders/PrinterSelectionModal';
import { ReceiptPrintTemplate } from '../../components/orders/ReceiptPrintTemplate';
import { OrderSidebar } from './components/Sidebar/OrderSidebar';

// Hooks
import { useMenuOrders } from './hooks/useMenuOrders';
import { usePaymentFlow } from './hooks/usePaymentFlow';
import { useKotFlow } from './hooks/useKotFlow';
import { useTableFlow } from './hooks/useTableFlow';
import { useReceiptActions } from './hooks/useReceiptActions';

// Utils
import { getOrderStatusStyles } from '../../utils/orderStatus';

export const MenuPage = ({ initialOrderType = 'dine_in' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allTables = useAppSelector(selectAllTables);
  const isTakeawayPage = location.pathname === '/dashboard/takeaways';
  
  const itemRefs = useRef({});
  const paymentInputRef = useRef(null);

  // 1. Menu Orders Hook
  const {
    draftOrderItems, setDraftOrderItems,
    sentKotItems, setSentKotItems,
    heldItems, setHeldItems,
    selectedOrderItem, setSelectedOrderItem,
    centerView, setCenterView,
    selectedItemForAction,
    isSplitModalOpen, setIsSplitModalOpen,
    isSpecialInstructionsModalOpen, setIsSpecialInstructionsModalOpen,
    isQuantitySelectorOpen, setIsQuantitySelectorOpen,
    quantityToApply,
    itemForInstructions,
    combinedItems, subtotal, totalHeldPrice,
    handleIncrease, handleDecrease, handleRemove,
    handleSplitClick, handleReplaceClick, handleOpenInstructions,
    handleQuantityConfirm, handleSaveInstructions, handleConfirmSplit,
    handleProductCardClick
  } = useMenuOrders();

  // 2. Table Flow Hook
  const {
    orderType, setOrderType,
    selectedTable, setSelectedTable,
    rightView, setRightView,
    isDineInFlow,
    currentTableObj,
    displayCustomerName,
    isExistingSessionMode,
    isPhoneMissingForDineIn,
    registerOrder, watchOrder, handleOrderSubmit, orderErrors,
    phone, guestCount
  } = useTableFlow({
    allTables,
    dispatch,
    initialOrderType,
    draftOrderItems,
    sentKotItems,
    heldItems,
    kotStatus: 'idle', // will sync with useKotFlow
    setDraftOrderItems,
    setSentKotItems,
    setHeldItems,
    setKotStatus: () => {} // will sync with useKotFlow
  });

  // 3. KOT Flow Hook
  const {
    kotStatus, setKotStatus,
    globalOrderStatus,
    handleSendKOT
  } = useKotFlow({
    draftOrderItems,
    setDraftOrderItems,
    setSentKotItems,
    orderType,
    isDineInFlow,
    selectedTable,
    dispatch,
    phone,
    guestCount,
    setRightView,
    paymentStatus: 'pending', // Will sync below
    isUpiModalOpen: false, // Will sync below
    rightView,
    paymentMode: 'Cash', // Will sync below
    sentKotItemsLength: sentKotItems.length
  });

  // Reset function to clear all orders
  const resetOrders = () => {
    setDraftOrderItems([]);
    setSentKotItems([]);
    setHeldItems([]);
    setRightView('order');
    setKotStatus('idle');
  };

  // 4. Payment Flow Hook
  const {
    paymentMode, setPaymentMode,
    splitMode, setSplitMode,
    selectedTip, setSelectedTip,
    discountAmount, setDiscountAmount,
    paymentStatus,
    isUpiModalOpen, setIsUpiModalOpen,
    isDiscountModalOpen, setIsDiscountModalOpen,
    registerPayment, watchPayment, handlePaymentSubmit, paymentErrors,
    customerPaidAmount, customTip, setCustomerPaidAmount, setCustomTip,
    resetCompleteBillingSession
  } = usePaymentFlow({
    dispatch,
    selectedTable,
    orderType,
    navigate,
    resetOrders,
    setKotStatus
  });

  const tax = subtotal * 0.08;
  const finalPrice = subtotal + tax - discountAmount;
  const splitCalculatedAmount = splitMode === 'equal' ? finalPrice / guestCount : finalPrice;
  const appliedTip = customTip !== '' ? Number(customTip) : selectedTip;
  const payableAmount = splitCalculatedAmount + appliedTip;
  const changeToReturn = customerPaidAmount > payableAmount ? customerPaidAmount - payableAmount : 0;
  const isSplitView = heldItems.length > 0;
  const shouldShowOrderControls = sentKotItems.length === 0 && rightView !== 'checkout';
  const statusStyles = getOrderStatusStyles(globalOrderStatus);

  // 5. Receipt Actions Hook
  const {
    isPrinterModalOpen, setIsPrinterModalOpen,
    getOrderData,
    executeSilentPrint,
    handleQuickPrint,
    handleQuickWhatsApp,
    handleQuickEmail
  } = useReceiptActions({
    selectedTable,
    payableAmount,
    subtotal,
    tax,
    discountAmount,
    sentKotItems,
    paymentMode,
    phone,
    currentTableObj
  });

  const handlePrintBilling = () => {
    if (orderType === 'take_away') {
      setRightView('checkout');
    }
  };

  // Render Logic
  const renderMenuContent = (isReplaceMode = false) => (
    <MenuContent
      orderItems={combinedItems}
      isReplaceMode={isReplaceMode}
      replacementSelectedProductId={selectedItemForAction?.itemNo}
      onProductClick={(p) => {
        if (isReplaceMode && selectedItemForAction) {
          setSentKotItems(prev => prev.map(i => i.id === selectedItemForAction.id ? { ...p, id: i.id, quantity: i.quantity } : i));
          setDraftOrderItems(prev => prev.map(i => i.id === selectedItemForAction.id ? { ...p, id: i.id, quantity: i.quantity } : i));
          setCenterView('menu');
          return;
        }
        handleProductCardClick(p);
      }}
      onProductEnter={(p) => {
        if (isReplaceMode && selectedItemForAction) {
          setSentKotItems(prev => prev.map(i => i.id === selectedItemForAction.id ? { ...p, id: i.id, quantity: i.quantity } : i));
          setDraftOrderItems(prev => prev.map(i => i.id === selectedItemForAction.id ? { ...p, id: i.id, quantity: i.quantity } : i));
          setCenterView('menu');
          return;
        }
        handleProductCardClick(p);
      }}
      onProductDecrease={(p) => {
        setDraftOrderItems(prev => {
          const existingItem = prev.find(item => item.title === p.title);
          if (!existingItem) return prev;
          if (existingItem.quantity === 1) return prev.filter(item => item.title !== p.title);
          return prev.map(item => item.title === p.title ? { ...item, quantity: item.quantity - 1 } : item);
        });
      }}
      selectedOrderItem={selectedOrderItem}
      onIncreaseSelected={handleIncrease}
      onDecreaseSelected={handleDecrease}
    />
  );

  return (
    <div className="flex w-full h-full relative overflow-hidden">
      {/* Center Main Panel */}
      <div className="flex-1 flex flex-col p-8 pl-6 min-h-0 overflow-hidden">
        {centerView === 'menu' && renderMenuContent()}

        {(centerView === 'cancel_item' || centerView === 'replace_item') && selectedItemForAction && (
          <div className="flex flex-col h-full w-full max-w-[769px]">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setCenterView('cancel_item')}
                className={clsx("px-6 py-[10px] rounded-[16px] font-bold text-[16px]", centerView === 'cancel_item' ? "bg-[#e23744] text-white" : "bg-[#ffb01d] text-white")}
                style={centerView !== 'cancel_item' ? { opacity: 0.5 } : {}}
              >
                Cancel Item
              </button>
              <button
                onClick={() => setCenterView('replace_item')}
                className={clsx("px-6 py-[10px] rounded-[16px] font-bold text-[16px]", centerView === 'replace_item' ? "bg-[#ffb01d] text-white" : "bg-[#ffc861] text-white")}
                style={centerView !== 'replace_item' ? { opacity: 0.5 } : {}}
              >
                Replace Item
              </button>
            </div>
            {centerView === 'cancel_item' && (
              <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#eaeaef] flex flex-col gap-6 w-full max-w-[400px]">
                <h3 className="text-[18px] font-bold text-[#32324d] m-0">Confirm Cancellation</h3>
                <p className="text-[#666687] m-0">Are you sure you want to cancel <strong>{selectedItemForAction.title}</strong>?</p>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => setCenterView('menu')} className="flex-1 py-3 rounded-[12px] bg-[#f3f5f9] text-[#32324d] font-bold hover:bg-[#eaeaef] transition-colors">No, keep it</button>
                  <button
                    onClick={() => {
                      setSentKotItems(prev => prev.filter(i => i.id !== selectedItemForAction.id));
                      setDraftOrderItems(prev => prev.filter(i => i.id !== selectedItemForAction.id));
                      setCenterView('menu');
                    }}
                    className="flex-1 py-3 rounded-[12px] bg-[#e23744] text-white font-bold hover:bg-[#c92f3a] transition-colors"
                  >
                    Yes, cancel item
                  </button>
                </div>
              </div>
            )}
            {centerView === 'replace_item' && (
              <div className="flex flex-col h-full">
                <div className="bg-[#fff7e8] border border-[#ffb01d]/30 rounded-[12px] p-4 mb-6 flex items-center justify-between">
                  <span className="text-[#d88c00] font-semibold">Select an item below to replace <strong>{selectedItemForAction.title}</strong></span>
                </div>
                <div className="flex-1 overflow-y-auto min-h-0 pr-2">
                  {renderMenuContent(true)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Panel Wrapper */}
      <OrderSidebar
        rightView={rightView}
        setRightView={setRightView}
        statusStyles={statusStyles}
        displayCustomerName={displayCustomerName}
        selectedTable={selectedTable}
        globalOrderStatus={globalOrderStatus}
        setDraftOrderItems={setDraftOrderItems}
        setSentKotItems={setSentKotItems}
        setHeldItems={setHeldItems}
        setKotStatus={setKotStatus}
        kotStatus={kotStatus}
        sentKotItems={sentKotItems}
        draftOrderItems={draftOrderItems}
        combinedItems={combinedItems}
        selectedOrderItem={selectedOrderItem}
        setSelectedOrderItem={setSelectedOrderItem}
        itemRefs={itemRefs}
        handleSplitClick={handleSplitClick}
        handleReplaceClick={handleReplaceClick}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
        handleRemove={handleRemove}
        handleOpenInstructions={handleOpenInstructions}
        isSplitView={isSplitView}
        totalHeldPrice={totalHeldPrice}
        heldItems={heldItems}
        shouldShowOrderControls={shouldShowOrderControls}
        isExistingSessionMode={isExistingSessionMode}
        orderType={orderType}
        setOrderType={setOrderType}
        isTakeawayPage={isTakeawayPage}
        allTables={allTables}
        isDineInFlow={isDineInFlow}
        setSelectedTable={setSelectedTable}
        subtotal={subtotal}
        tax={tax}
        payableAmount={payableAmount}
        discountAmount={discountAmount}
        setDiscountAmount={setDiscountAmount}
        registerOrder={registerOrder}
        orderErrors={orderErrors}
        paymentMode={paymentMode}
        setPaymentMode={setPaymentMode}
        splitMode={splitMode}
        setSplitMode={setSplitMode}
        splitCalculatedAmount={splitCalculatedAmount}
        customTip={customTip}
        selectedTip={selectedTip}
        setSelectedTip={setSelectedTip}
        setCustomTip={setCustomTip}
        registerPayment={registerPayment}
        paymentErrors={paymentErrors}
        paymentInputRef={paymentInputRef}
        changeToReturn={changeToReturn}
        setCustomerPaidAmount={setCustomerPaidAmount}
        handlePrintBilling={handlePrintBilling}
        handleOrderSubmit={handleOrderSubmit}
        handleSendKOT={handleSendKOT}
        handlePaymentSubmit={handlePaymentSubmit}
        setOrderItems={resetOrders}
        setIsDiscountModalOpen={setIsDiscountModalOpen}
        setIsUpiModalOpen={setIsUpiModalOpen}
        handleQuickPrint={handleQuickPrint}
        handleQuickWhatsApp={handleQuickWhatsApp}
        handleQuickEmail={handleQuickEmail}
        resetCompleteBillingSession={resetCompleteBillingSession}
        isPhoneMissingForDineIn={isPhoneMissingForDineIn}
      />

      {/* Hidden Print Template */}
      <ReceiptPrintTemplate {...getOrderData()} />

      {/* Modals */}
      <SplitOrderModal
        isOpen={isSplitModalOpen}
        onClose={() => setIsSplitModalOpen(false)}
        item={selectedItemForAction}
        onConfirm={handleConfirmSplit}
      />
      <ApplyDiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        totalAmount={subtotal}
        tax={tax}
        onApply={(amount) => setDiscountAmount(amount)}
      />
      <SpecialInstructionsModal
        isOpen={isSpecialInstructionsModalOpen}
        item={itemForInstructions}
        targetQuantity={quantityToApply}
        onClose={() => setIsSpecialInstructionsModalOpen(false)}
        onSave={handleSaveInstructions}
      />
      <QuantitySelectorModal
        isOpen={isQuantitySelectorOpen}
        itemName={itemForInstructions?.title}
        maxQuantity={itemForInstructions?.quantity || 1}
        onClose={() => setIsQuantitySelectorOpen(false)}
        onConfirm={handleQuantityConfirm}
      />
      <UpiPaymentModal
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
        onConfirm={() => {
          setIsUpiModalOpen(false);
          resetCompleteBillingSession();
        }}
        amount={payableAmount}
        orderId={Date.now().toString().slice(-6)}
        tableNo={selectedTable}
        items={sentKotItems}
        date={new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
        customerPhone={phone || currentTableObj?.customerPhone}
      />
      <PrinterSelectionModal
        isOpen={isPrinterModalOpen}
        onClose={() => setIsPrinterModalOpen(false)}
        onSelect={(printer) => {
          setIsPrinterModalOpen(false);
          executeSilentPrint();
        }}
      />
    </div>
  );
};