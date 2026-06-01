import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { menuOrderSchema } from '../../../validations/order.validation';
import { updateTableOrder } from '../../../store/slices/tableSlice';

export const useTableFlow = ({
  allTables,
  dispatch,
  initialOrderType,
  draftOrderItems,
  sentKotItems,
  heldItems,
  kotStatus,
  setDraftOrderItems,
  setSentKotItems,
  setHeldItems,
  setKotStatus,
}) => {
  const location = useLocation();
  const isDineInFlow = !!location.state?.tableNo;
  const initialTable = location.state?.tableNo || null;
  const stateOrderType = location.state?.orderType || initialOrderType;

  const [orderType, setOrderType] = useState(stateOrderType); // 'dine_in' | 'take_away'
  const [selectedTable, setSelectedTable] = useState(initialTable);
  const [rightView, setRightView] = useState('order'); // 'order' | 'checkout'

  const { register: registerOrder, watch: watchOrder, handleSubmit: handleOrderSubmit, formState: { errors: orderErrors }, setValue: setOrderValue } = useForm({
    resolver: zodResolver(menuOrderSchema),
    defaultValues: { phone: '', guestCount: 4 },
    shouldUnregister: false
  });

  const phone = watchOrder('phone') || '';
  const guestCount = watchOrder('guestCount') || 4;

  const currentTableObj = useMemo(() => allTables.find(t => t.tableNo === selectedTable), [allTables, selectedTable]);
  const displayCustomerName = currentTableObj?.customerName || 'Walk-in Customer';
  const isExistingSessionMode = currentTableObj?.status === 'occupied' || currentTableObj?.status === 'reserved';
  const isPhoneMissingForDineIn = orderType === 'dine_in' && !phone;

  useEffect(() => {
    if (currentTableObj) {
      if (currentTableObj.guests) setOrderValue('guestCount', currentTableObj.guests);
      if (currentTableObj.customerPhone) setOrderValue('phone', currentTableObj.customerPhone);
    } else {
      setOrderValue('guestCount', 4);
      setOrderValue('phone', '');
    }
  }, [currentTableObj, setOrderValue]);

  const allTablesRef = useRef(allTables);
  useEffect(() => {
    allTablesRef.current = allTables;
  }, [allTables]);

  const currentOrderDataRef = useRef({ draftOrderItems, sentKotItems, heldItems, kotStatus });
  useEffect(() => {
    currentOrderDataRef.current = { draftOrderItems, sentKotItems, heldItems, kotStatus };
  }, [draftOrderItems, sentKotItems, heldItems, kotStatus]);

  useEffect(() => {
    const tableToSave = selectedTable;
    
    const newTableObj = allTablesRef.current.find(t => t.tableNo === selectedTable);
    if (newTableObj && newTableObj.orderData) {
      const { draftOrderItems: savedDraft = [], sentKotItems: savedSent = [], heldItems: savedHeld = [], kotStatus: savedKot = 'idle' } = newTableObj.orderData;
      const oldOrderItems = newTableObj.orderData.orderItems || [];
      
      const currentDraftLength = currentOrderDataRef.current.draftOrderItems.length;
      const currentSentLength = currentOrderDataRef.current.sentKotItems.length;
      const currentHeldLength = currentOrderDataRef.current.heldItems.length;
      
      if (savedDraft.length > 0 || savedSent.length > 0 || oldOrderItems.length > 0 || savedHeld.length > 0) {
        setDraftOrderItems(prev => prev.length === 0 && currentSentLength === 0 ? (savedDraft.length ? savedDraft : oldOrderItems) : prev);
        setSentKotItems(prev => prev.length === 0 && currentDraftLength === 0 ? savedSent : prev);
        setHeldItems(prev => prev.length === 0 && currentHeldLength === 0 ? savedHeld : prev);
        setKotStatus(prev => prev === 'idle' ? savedKot : prev);
      }
    }

    return () => {
      if (tableToSave) {
        const existingTable = allTablesRef.current.find(t => t.tableNo === tableToSave);
        const existingOrder = existingTable?.orderData || {};
        
        dispatch(updateTableOrder({
          tableNo: tableToSave,
          orderData: {
            ...existingOrder,
            selectedTable: existingOrder.selectedTable || tableToSave,
            tableId: existingOrder.tableId || existingTable?.id,
            tableNumber: existingOrder.tableNumber || tableToSave,
            draftOrderItems: currentOrderDataRef.current.draftOrderItems,
            sentKotItems: currentOrderDataRef.current.sentKotItems,
            heldItems: currentOrderDataRef.current.heldItems,
            kotStatus: currentOrderDataRef.current.kotStatus
          }
        }));
      }
    };
  }, [selectedTable, dispatch, setDraftOrderItems, setSentKotItems, setHeldItems, setKotStatus]);

  useEffect(() => {
    setOrderType(stateOrderType);
  }, [stateOrderType]);

  return {
    orderType, setOrderType,
    selectedTable, setSelectedTable,
    rightView, setRightView,
    isDineInFlow,
    currentTableObj,
    displayCustomerName,
    isExistingSessionMode,
    isPhoneMissingForDineIn,
    registerOrder, watchOrder, handleOrderSubmit, orderErrors, setOrderValue,
    phone, guestCount
  };
};
