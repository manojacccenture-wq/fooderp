import { useState } from 'react';
import { startOrderForTable } from '../../../store/slices/tableSlice';
import { getCurrentOrderStatus } from '../../../utils/orderStatus';

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
  sentKotItemsLength
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
    if (orderType === 'take_away') {
      setRightView('checkout');
      return;
    }
    
    if (orderType === 'dine_in' && !isDineInFlow && selectedTable) {
      dispatch(startOrderForTable({ 
        tableNo: selectedTable, 
        formData: { name: 'Walk-in Customer', guests: guestCount, time: '', mobile: phone } 
      }));
    }

    setSentKotItems(prevSent => {
      const nextRound = Math.max(0, ...prevSent.map(i => i.kotRound || 0)) + 1;
      const kotTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newItems = draftOrderItems.map(draftItem => ({
        ...draftItem,
        kotRound: nextRound,
        kotTime: kotTime
      }));
      
      return [...prevSent, ...newItems];
    });
    setDraftOrderItems([]);

    setKotStatus('kot_sent');
    
    // Simulate KDS Status changes
    setTimeout(() => {
      setKotStatus(prev => prev === 'kot_sent' ? 'preparing' : prev);
    }, 2000);
    setTimeout(() => {
      setKotStatus(prev => prev === 'preparing' ? 'ready' : prev);
    }, 6000);
  };

  return {
    kotStatus, setKotStatus,
    globalOrderStatus,
    handleSendKOT
  };
};
