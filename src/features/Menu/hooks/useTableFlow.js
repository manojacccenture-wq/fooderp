import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { menuOrderSchema } from '../../../validations/order.validation';
import { updateTableOrder } from '../../DineIn/store/tableSlice';
import { useLazyGetCustomerOrderByTableIdQuery } from '../../../shared/api/apiSlice';

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
  
  const [getOrder] = useLazyGetCustomerOrderByTableIdQuery();

  const { register: registerOrder, watch: watchOrder, handleSubmit: handleOrderSubmit, formState: { errors: orderErrors }, setValue: setOrderValue } = useForm({
    resolver: zodResolver(menuOrderSchema),
    defaultValues: { phone: '', guestCount: 4 },
    shouldUnregister: false
  });

  const phone = watchOrder('phone') || '';
  const guestCount = watchOrder('guestCount') || 4;

  const currentTableObj = useMemo(() => allTables.find(t => t.tableNo === selectedTable), [allTables, selectedTable]);
  const displayCustomerName = currentTableObj?.customerName || 'Walk-in Customer';
  const isExistingSessionMode = currentTableObj?.status === 'Occupied' || currentTableObj?.status === 'Reserved';
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

  const currentOrderDataRef = useRef({ draftOrderItems, sentKotItems, heldItems, kotStatus, rightView });
  useEffect(() => {
    currentOrderDataRef.current = { draftOrderItems, sentKotItems, heldItems, kotStatus, rightView };
  }, [draftOrderItems, sentKotItems, heldItems, kotStatus, rightView]);

  useEffect(() => {
    const tableToSave = selectedTable;
    
    const newTableObj = allTablesRef.current.find(t => t.tableNo === selectedTable);
    
    if (newTableObj && newTableObj.status === 'Occupied') {
      // 1. BACKEND RESTORE FLOW
      getOrder({ tableId: newTableObj.id || newTableObj.tableId, tableStatus: 'Occupied' })
        .unwrap()
        .then(response => {
          console.log("Selected Table", newTableObj);
          console.log("Order API Response", response);
          
          let activeOrder = null;
          if (response?.Data && Array.isArray(response.Data)) {
            // Priority: Status === "Placed" Else Status !== "Closed" Else Latest OrderTakenAt Else First item
            activeOrder = response.Data.find(x => x.Status === "Placed") || 
                          response.Data.find(x => x.Status !== "Closed");
            
            if (!activeOrder && response.Data.length > 0) {
              activeOrder = [...response.Data].sort((a, b) => new Date(b.OrderTakenAt) - new Date(a.OrderTakenAt))[0] || response.Data[0];
            }
          }

          console.log("Active Order", activeOrder);

          if (activeOrder) {
            // Restore Customer
            const customer = {
              name: activeOrder.CustomerName || '',
              phone: activeOrder.CustomerMobile || '',
              address: activeOrder.CustomerAddress || ''
            };
            console.log("Restored Customer", customer);
            setOrderValue('guestCount', activeOrder.TotalGuest || newTableObj.guests || 4);
            setOrderValue('phone', customer.phone);

            // Restore Items
            const orderItems = (activeOrder.OrderItems || []).map(item => ({
              id: item.MenuItemId,
              title: item.Name,
              quantity: item.Quantity,
              price: item.Price,
              status: item.Status
            }));
            console.log("Restored Items", orderItems);

            // Restore Workflow Status
            console.log("Restored Workflow Status", activeOrder.Status);
            
            setSentKotItems(orderItems);
            setDraftOrderItems([]); // Do not create Draft status
            setHeldItems([]);
            
            const activeStatus = activeOrder.Status ? activeOrder.Status.toLowerCase() : 'placed';
            setKotStatus(activeStatus);
            setRightView('order');
          } else {
            // Fallback if no order found despite table being occupied
            setRightView('order');
          }
        })
        .catch(err => {
          console.error("Error fetching order", err);
          setRightView('order');
        });

    } else if (newTableObj && newTableObj.orderData) {
      // 2. EXISTING DRAFT / LOCAL RESTORE FLOW (For Empty tables)
      const { draftOrderItems: savedDraft = [], sentKotItems: savedSent = [], heldItems: savedHeld = [], kotStatus: savedKot = 'idle', rightView: savedRightView = 'order' } = newTableObj.orderData;
      const oldOrderItems = newTableObj.orderData.orderItems || [];
      
      const currentDraftLength = currentOrderDataRef.current.draftOrderItems.length;
      const currentSentLength = currentOrderDataRef.current.sentKotItems.length;
      const currentHeldLength = currentOrderDataRef.current.heldItems.length;
      
      if (savedDraft.length > 0 || savedSent.length > 0 || oldOrderItems.length > 0 || savedHeld.length > 0) {
        setDraftOrderItems(prev => prev.length === 0 && currentSentLength === 0 ? (savedDraft.length ? savedDraft : oldOrderItems) : prev);
        setSentKotItems(prev => prev.length === 0 && currentDraftLength === 0 ? savedSent : prev);
        setHeldItems(prev => prev.length === 0 && currentHeldLength === 0 ? savedHeld : prev);
        setKotStatus(prev => prev === 'idle' ? savedKot : prev);
        setRightView(savedRightView);
      } else {
        setRightView('order');
      }
    } else {
      setRightView('order');
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
            kotStatus: currentOrderDataRef.current.kotStatus,
            rightView: currentOrderDataRef.current.rightView
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

