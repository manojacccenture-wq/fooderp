import { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { assignOrderNumber, submitOrderKOT, setCurrentOrderNumber } from '../../../features/Menu/store/orderSlice';
import {
  apiSlice,
  useLazyGetCustomerOrderByTableIdQuery,
  usePutOrderStatusMutation,
  usePutTableStatusMutation
} from '../../../shared/api/apiSlice';
import { startOrderForTable, selectAllTables } from '../../DineIn/store/tableSlice';
import { getCurrentOrderStatus } from '../../../shared/utils/orderStatus';
import { generateKOT, updateKotStatus, selectActiveKots } from '../../../features/Menu/store/kotSlice';

export const useKotFlow = ({
  draftOrderItems,
  setDraftOrderItems,
  setSentKotItems,
  setHeldItems,
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
  currentOrderNumber,
  refreshOrder
}) => {
  const [kotStatus, setKotStatus] = useState('idle'); // 'idle' | 'success_anim' | 'sent' | 'kot_sent' | 'preparing' | 'ready'
  
  const [getCustomerOrder] = useLazyGetCustomerOrderByTableIdQuery();
  const [putOrderStatus] = usePutOrderStatusMutation();
  const [putTableStatus] = usePutTableStatusMutation();

  const activeKots = useAppSelector(selectActiveKots);
  const allTables = useAppSelector(selectAllTables);

  const tableKots = activeKots.filter(k => String(k.tableReference) === String(selectedTable));
  
  let derivedKotStatus = kotStatus;
  if (tableKots.length > 0) {
    if (tableKots.some(k => k.status === 'ready')) {
      derivedKotStatus = 'ready';
    } else if (tableKots.some(k => k.status === 'preparing')) {
      derivedKotStatus = 'preparing';
    } else {
      derivedKotStatus = 'kot_sent';
    }
  }

  const globalOrderStatus = getCurrentOrderStatus({
    paymentStatus,
    isUpiModalOpen,
    rightView,
    paymentMode,
    kotStatus: derivedKotStatus,
    draftOrderItemsCount: draftOrderItems.length,
    sentKotItemsCount: sentKotItemsLength,
    hasSelectedTable: !!selectedTable
  });

  const handleSendKOT = async () => {
    // If no order number exists, dispatch to create one.
    // However, since useKotFlow is a hook, we shouldn't rely on state updates being immediately available in this closure.
    // We will calculate the new order number locally if it's null.
    const effectiveOrderNumber = currentOrderNumber || (globalOrderCounter + 1);
    
    

    if (sentKotItemsLength > 0 && !currentOrderNumber) {
      alert("Please wait for the current order to sync with the server before sending more items.");
      return;
    }

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

    

    const combinedOrderItems = [
      ...sentKotItems,
      ...newItems
    ];
    

    

    let result;

    try {
      
      result = await dispatch(submitOrderKOT({
        orderItems: combinedOrderItems,
        orderType,
        phone,
        selectedTable,
        allTables,
        currentOrderNumber,
        isExistingOrder: sentKotItemsLength > 0
      })).unwrap();
      
    } catch (error) {
      
      
      alert("Failed to send order to KOT via API. Please check connection and try again.");
      return;
    }

    try {
      
      const isSuccess = result?.IsSuccessful || result?.isSuccessful;
      
      
      if (isSuccess) {
        try {
          
          if (!isExistingOrder && result?.Data) {
             
             const newOrderId = typeof result.Data === 'object' ? result.Data.Id : result.Data;
             if (newOrderId) dispatch(setCurrentOrderNumber(newOrderId));
          }
        } catch (e) {
          
          
        }

        try {
          // IMPORTANT: Also invalidate 'Order' so that GetCurrentTakeAwayOrders automatically refetches
          dispatch(apiSlice.util.invalidateTags(['Tables', 'Customers', 'Order']));
        } catch (e) {
          
          
        }

        try {
          
          if (refreshOrder) refreshOrder();
        } catch (e) {
          
          
        }
      } else {
        
        alert("Failed to process order on the server. Please try again.");
        return;
      }
    } catch (error) {
      
      
      alert("Failed to send order to KOT via API. Please check connection and try again.");
      return;
    }

    // Split items into dine_in and take_away for KOT generation
    const dineInItems = newItems.filter(item => (item.fulfillment?.dine_in || 0) > 0);
    const takeAwayItems = newItems.filter(item => (item.fulfillment?.take_away || 0) > 0);
    
    const dineInKotId = `KOT-${Date.now()}-D`;
    const takeAwayKotId = `KOT-${Date.now()}-T`;

    if (dineInItems.length > 0) {
      dispatch(generateKOT({
        id: dineInKotId,
        orderNumber: effectiveOrderNumber,
        type: 'dine_in',
        items: dineInItems,
        tableReference: selectedTable
      }));
    }

    if (takeAwayItems.length > 0) {
      dispatch(generateKOT({
        id: takeAwayKotId,
        orderNumber: effectiveOrderNumber,
        type: 'take_away',
        items: takeAwayItems,
        tableReference: selectedTable,
        tokenNumber: null
      }));
    }

    try {
      if (selectedTable) {
        const tableObj = allTables.find(t => String(t.tableNo) === String(selectedTable));
        const numericTableId = tableObj ? tableObj.id : selectedTable;
        const orderResponse = await getCustomerOrder({ tableId: numericTableId, tableStatus: 'Occupied' }).unwrap();
        if (orderResponse?.IsSuccessful && orderResponse?.Data) {
          let activeOrder = null;
          if (!Array.isArray(orderResponse.Data)) {
            activeOrder = orderResponse.Data;
          } else {
            activeOrder = orderResponse.Data.find(x => x.Status === "Placed") || 
                          orderResponse.Data.find(x => x.Status !== "Closed");
            if (!activeOrder && orderResponse.Data.length > 0) {
              activeOrder = [...orderResponse.Data].sort((a, b) => new Date(b.OrderTakenAt) - new Date(a.OrderTakenAt))[0] || orderResponse.Data[0];
            }
          }
          
          if (activeOrder && activeOrder.OrderItems) {
            
            
            dispatch(setCurrentOrderNumber(activeOrder.Id));
            

            const hydratedItems = activeOrder.OrderItems.map(item => ({
              id: item.Id,
              itemNo: item.MenuItemId,
              orderItemId: item.Id,
              orderId: item.OrderId,
              ticketId: item.TicketId,
              title: item.Name,
              quantity: item.Quantity,
              price: item.Price,
              status: item.Status,
              isCancelled: item.IsCancelled === true || item.Status === "Cancelled" || item.KitchenStatus === "Cancelled"
            }));
            
            setSentKotItems(hydratedItems);
          } else {
            setSentKotItems(prevSent => [...prevSent, ...newItems]);
          }
        } else {
          setSentKotItems(prevSent => [...prevSent, ...newItems]);
        }
      } else {
        setSentKotItems(prevSent => [...prevSent, ...newItems]);
      }
    } catch (err) {
      setSentKotItems(prevSent => [...prevSent, ...newItems]);
    }

    setDraftOrderItems([]);

    setKotStatus('kot_sent');
    
    // Simulate KDS Status changes
    setTimeout(() => {
      setKotStatus(prev => prev === 'kot_sent' ? 'preparing' : prev);
      if (dineInItems.length > 0) dispatch(updateKotStatus({ kotId: dineInKotId, status: 'preparing' }));
      if (takeAwayItems.length > 0) dispatch(updateKotStatus({ kotId: takeAwayKotId, status: 'preparing' }));
    }, 2000);
    setTimeout(() => {
      setKotStatus(prev => prev === 'preparing' ? 'ready' : prev);
      if (dineInItems.length > 0) dispatch(updateKotStatus({ kotId: dineInKotId, status: 'ready' }));
      if (takeAwayItems.length > 0) dispatch(updateKotStatus({ kotId: takeAwayKotId, status: 'ready' }));
    }, 6000);

    if (orderType === 'take_away') {
      setRightView('checkout');
    }
  };

  const handleCompleteOrderSequence = async () => {
    if (!selectedTable) {
      alert("Please select a table to complete the order.");
      return;
    }

    try {
      // Find the actual table object using tableNo
      const tableObj = allTables.find(t => String(t.tableNo) === String(selectedTable));
      const actualTableId = tableObj?.id;
      const currentTableStatus = tableObj?.status || 'Occupied';

      if (!actualTableId) {
        alert("Could not determine the internal Table ID for the selected table.");
        return;
      }
      
      // 1. Get Customer Order By Table Id
      const orderResponse = await getCustomerOrder({ 
        tableId: actualTableId, 
        tableStatus: currentTableStatus 
      }).unwrap();

      if (!orderResponse?.IsSuccessful || !orderResponse?.Data || orderResponse.Data.length === 0) {
        alert("Failed to fetch active order for this table or no orders found.");
        return;
      }

      // 2. Find the correct active order
      const orders = orderResponse.Data;
      const activeOrder = orders.find(o => o.Status !== 'Closed') 
                       || orders.find(o => o.Status === 'Placed') 
                       || orders[0];

      if (!activeOrder) {
        alert("No active order found for this table.");
        return;
      }

      const orderId = activeOrder.Id;

      // 3. Put Order Status -> "completed"
      const putOrderResponse = await putOrderStatus({ 
        orderId: orderId, 
        payload: "completed" 
      }).unwrap();

      if (!putOrderResponse?.IsSuccessful) {
        alert("Failed to update order status to completed.");
        return;
      }

      // 4. Put Table Status -> "billing"
      const putTableResponse = await putTableStatus({ 
        tableId: actualTableId, 
        status: "Billing" 
      }).unwrap();

      if (!putTableResponse?.IsSuccessful) {
        alert("Failed to update table status to billing.");
        return;
      }

      // 5. Invalidate RTK Query Tags to refresh tables and customers
      dispatch(apiSlice.util.invalidateTags(['Tables', 'Customers']));

      // 6. Navigate to Checkout View
      setRightView('checkout');

    } catch (error) {
      
      alert("An error occurred while completing the order. Please try again.");
    }
  };

  const handleSendHeldItem = (heldItem) => {
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
    
    const newItem = {
      ...heldItem,
      kotRound: nextRound,
      kotTime: kotTime
    };

    // Since it's a split item, its fulfillment property is technically still the original item's fulfillment.
    // However, since it's now an isolated item of quantity N, we determine its type based on the orderType.
    const isTakeaway = orderType === 'take_away';
    const dineInItems = !isTakeaway ? [{...newItem, fulfillment: {dine_in: newItem.quantity, take_away: 0}}] : [];
    const takeAwayItems = isTakeaway ? [{...newItem, fulfillment: {dine_in: 0, take_away: newItem.quantity}}] : [];

    const dineInKotId = `KOT-${Date.now()}-D`;
    const takeAwayKotId = `KOT-${Date.now()}-T`;

    if (dineInItems.length > 0) {
      dispatch(generateKOT({
        id: dineInKotId,
        orderNumber: effectiveOrderNumber,
        type: 'dine_in',
        items: dineInItems,
        tableReference: selectedTable
      }));
    }

    if (takeAwayItems.length > 0) {
      dispatch(generateKOT({
        id: takeAwayKotId,
        orderNumber: effectiveOrderNumber,
        type: 'take_away',
        items: takeAwayItems,
        tableReference: selectedTable,
        tokenNumber: null
      }));
    }

    setSentKotItems(prevSent => [...prevSent, newItem]);
    if (setHeldItems) {
      setHeldItems(prevHeld => prevHeld.filter(i => i.id !== heldItem.id));
    }
    
    // Also dispatch Redux actions as requested for cleanup
    dispatch({ type: 'order/removeHeldItem', payload: heldItem.id });
    dispatch({ type: 'order/clearSplitState', payload: heldItem.id });
    dispatch({ type: 'order/refreshHeldItems' });
    
    setKotStatus('kot_sent');
    setTimeout(() => {
      setKotStatus(prev => prev === 'kot_sent' ? 'preparing' : prev);
      if (dineInItems.length > 0) dispatch(updateKotStatus({ kotId: dineInKotId, status: 'preparing' }));
      if (takeAwayItems.length > 0) dispatch(updateKotStatus({ kotId: takeAwayKotId, status: 'preparing' }));
    }, 2000);
    setTimeout(() => {
      setKotStatus(prev => prev === 'preparing' ? 'ready' : prev);
      if (dineInItems.length > 0) dispatch(updateKotStatus({ kotId: dineInKotId, status: 'ready' }));
      if (takeAwayItems.length > 0) dispatch(updateKotStatus({ kotId: takeAwayKotId, status: 'ready' }));
    }, 6000);
  };

  return {
    kotStatus: derivedKotStatus,
    setKotStatus,
    globalOrderStatus,
    handleSendKOT,
    handleCompleteOrderSequence,
    handleSendHeldItem
  };
};




