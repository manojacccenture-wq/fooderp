import { useState } from 'react';
import { startOrderForTable } from '../../../store/slices/tableSlice';
import { getCurrentOrderStatus } from '../../../utils/orderStatus';
import { generateKOT } from '../../../store/slices/kotSlice';
import { generateToken } from '../../../store/slices/takeawaySlice';
import { assignOrderNumber } from '../../../store/slices/orderSlice';

export const useKotFlow = ({
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
  paymentStatus,
  isUpiModalOpen,
  rightView,
  paymentMode,
  sentKotItems,
  sentKotItemsLength,
  globalOrderCounter,
  currentOrderNumber
}) => {
  const [kotStatus, setKotStatus] = useState('idle'); // 'idle' | 'success_anim' | 'sent' | 'kot_sent' | 'preparing' | 'ready'

  const globalOrderStatus = getCurrentOrderStatus({
    paymentStatus,
    isUpiModalOpen,
    rightView,
    paymentMode,
    kotStatus,
    draftOrderItemsCount: draftOrderItems.length,
    sentKotItemsCount: sentKotItemsLength,
    hasSelectedTable: !!selectedTable
  });

  const handleSendKOT = () => {
    // If no order number exists, dispatch to create one.
    // However, since useKotFlow is a hook, we shouldn't rely on state updates being immediately available in this closure.
    // We will calculate the new order number locally if it's null.
    const effectiveOrderNumber = currentOrderNumber || (globalOrderCounter + 1);
    
    if (!currentOrderNumber) {
      dispatch(assignOrderNumber());
    }

    if (orderType === 'dine_in' && !isDineInFlow && selectedTable) {
      dispatch(startOrderForTable({ 
        tableNo: selectedTable, 
        formData: { name: 'Walk-in Customer', guests: guestCount, time: '', mobile: phone } 
      }));
    }

    const nextRound = Math.max(0, ...sentKotItems.map(i => i.kotRound || 0)) + 1;
    const kotTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newItems = draftOrderItems.map(draftItem => ({
      ...draftItem,
      kotRound: nextRound,
      kotTime: kotTime
    }));

    // Split items into dine_in and take_away for KOT generation
    const dineInItems = newItems.filter(item => (item.fulfillment?.dine_in || 0) > 0);
    const takeAwayItems = newItems.filter(item => (item.fulfillment?.take_away || 0) > 0);
    
    let assignedToken = null;

    if (takeAwayItems.length > 0 || orderType === 'take_away') {
      // Dispatch takeaway generation (which generates token)
      dispatch(generateToken({
        orderNumber: effectiveOrderNumber,
        source: orderType,
        tableReference: selectedTable,
        customerInfo: phone ? { phone } : null,
        status: 'Preparing'
      }));
      // We don't have the exact token number synchronously here, but Redux slice will assign it.
      assignedToken = 'Generating...'; 
    }

    if (dineInItems.length > 0) {
      dispatch(generateKOT({
        orderNumber: effectiveOrderNumber,
        type: 'dine_in',
        items: dineInItems,
        tableReference: selectedTable
      }));
    }

    if (takeAwayItems.length > 0) {
      dispatch(generateKOT({
        orderNumber: effectiveOrderNumber,
        type: 'take_away',
        items: takeAwayItems,
        tableReference: selectedTable,
        tokenNumber: assignedToken
      }));
    }

    setSentKotItems(prevSent => [...prevSent, ...newItems]);
    setDraftOrderItems([]);

    setKotStatus('kot_sent');
    
    // Simulate KDS Status changes
    setTimeout(() => {
      setKotStatus(prev => prev === 'kot_sent' ? 'preparing' : prev);
    }, 2000);
    setTimeout(() => {
      setKotStatus(prev => prev === 'preparing' ? 'ready' : prev);
    }, 6000);

    if (orderType === 'take_away') {
      setRightView('checkout');
    }
  };

  return {
    kotStatus, setKotStatus,
    globalOrderStatus,
    handleSendKOT
  };
};
