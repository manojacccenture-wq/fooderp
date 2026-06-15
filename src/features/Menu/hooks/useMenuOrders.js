import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

export const areInstructionsEqual = (inst1, inst2) => {
  if (!inst1 && !inst2) return true;
  if (!inst1 || !inst2) return false;
  return JSON.stringify(inst1) === JSON.stringify(inst2);
};

export const areItemsEqual = (item1, item2) => {
  return item1.title === item2.title && 
         areInstructionsEqual(item1.specialInstructions, item2.specialInstructions);
};

export const useMenuOrders = (setKotStatus, phoneRef) => {
  const dispatch = useDispatch();
  const [draftOrderItems, setDraftOrderItems] = useState([]);
  const [sentKotItems, setSentKotItems] = useState([]);
  const [heldItems, setHeldItems] = useState([]);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);

  const [centerView, setCenterView] = useState('menu'); // 'menu' | 'cancel_item' | 'replace_item'
  const [selectedItemForAction, setSelectedItemForAction] = useState(null);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [isSplitPackModalOpen, setIsSplitPackModalOpen] = useState(false);

  const [isSpecialInstructionsModalOpen, setIsSpecialInstructionsModalOpen] = useState(false);
  const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState(false);
  const [quantityToApply, setQuantityToApply] = useState(1);
  const [itemForInstructions, setItemForInstructions] = useState(null);

  const handleIncrease = (id, type = 'dine_in') => {
    setDraftOrderItems(prev => prev.map(item => {
      if (item.id === id) {
        const currentFulfillment = item.fulfillment || { dine_in: item.quantity, take_away: 0 };
        return { 
          ...item, 
          quantity: item.quantity + 1,
          fulfillment: { ...currentFulfillment, [type]: (currentFulfillment[type] || 0) + 1 }
        };
      }
      return item;
    }));
  };

  const handleDecrease = (id, type = 'dine_in') => {
    setDraftOrderItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (!existing) return prev;
      
      const currentFulfillment = existing.fulfillment || { dine_in: existing.quantity, take_away: 0 };
      
      // If we are trying to decrease a type that is already 0, do nothing
      if ((currentFulfillment[type] || 0) <= 0) return prev;

      if (existing.quantity === 1) {
        return prev.filter((item) => item.id !== id);
      }
      
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
            fulfillment: { ...currentFulfillment, [type]: currentFulfillment[type] - 1 }
          };
        }
        return item;
      });
    });
  };

  const handleRemove = (id) => {
    setDraftOrderItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSplitClick = (item) => {
    setSelectedItemForAction(item);
    setIsSplitModalOpen(true);
  };

  const handleSplitPackClick = (item) => {
    setSelectedItemForAction(item);
    setIsSplitPackModalOpen(true);
  };

  const handleReplaceClick = (item) => {
    setSelectedItemForAction(item);
    setCenterView('cancel_item');
  };

  const handleOpenInstructions = (item) => {
    setItemForInstructions(item);
    if (item.quantity > 1) {
      setIsQuantitySelectorOpen(true);
    } else {
      setQuantityToApply(1);
      setIsSpecialInstructionsModalOpen(true);
    }
  };

  const handleQuantityConfirm = (qty) => {
    setQuantityToApply(qty);
    setIsQuantitySelectorOpen(false);
    setIsSpecialInstructionsModalOpen(true);
  };

  const handleSaveInstructions = (itemId, instructions, targetQty) => {
    const updateList = (list) => {
      const itemIndex = list.findIndex(i => i.id === itemId);
      if (itemIndex === -1) return list;
      
      const item = list[itemIndex];
      const newList = [...list];
      
      if (targetQty === item.quantity) {
        newList[itemIndex] = { ...item, specialInstructions: instructions };
      } else if (targetQty < item.quantity) {
        newList[itemIndex] = { ...item, quantity: item.quantity - targetQty };
        const splitItem = { ...item, id: Date.now() + Math.random(), quantity: targetQty, specialInstructions: instructions };
        newList.splice(itemIndex + 1, 0, splitItem);
      }
      
      const mergedList = [];
      newList.forEach(curr => {
        const existing = mergedList.find(m => areItemsEqual(m, curr));
        if (existing) {
          existing.quantity += curr.quantity;
        } else {
          mergedList.push({ ...curr });
        }
      });
      
      return mergedList;
    };

    setDraftOrderItems(prev => updateList(prev));
    setSentKotItems(prev => updateList(prev));
    setIsSpecialInstructionsModalOpen(false);
  };

  const handleConfirmSplit = ({ item, kitchenQty, heldQty }) => {
    setDraftOrderItems(prev => {
      if (!prev.find(i => i.id === item.id)) return prev;
      if (kitchenQty > 0) return prev.map(i => i.id === item.id ? { ...i, quantity: kitchenQty } : i);
      return prev.filter(i => i.id !== item.id);
    });
    setSentKotItems(prev => {
      if (!prev.find(i => i.id === item.id)) return prev;
      if (kitchenQty > 0) return prev.map(i => i.id === item.id ? { ...i, quantity: kitchenQty } : i);
      return prev.filter(i => i.id !== item.id);
    });

    if (heldQty > 0) {
      setHeldItems(prev => {
        const existing = prev.find(i => i.id === item.id);
        if (existing) {
          return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + heldQty } : i);
        }
        return [...prev, { ...item, quantity: heldQty }];
      });
    }
  };

  const handleConfirmSplitPack = async ({ item, serveQty, packQty }) => {
    const isDraft = draftOrderItems.some(i => i.id === item.id);

    if (isDraft) {
      setDraftOrderItems(prev => prev.map(i => {
        if (i.id === item.id) {
          return {
            ...i,
            fulfillment: { ...i.fulfillment, dine_in: serveQty, take_away: packQty }
          };
        }
        return i;
      }));
    } else {
      setSentKotItems(prev => prev.map(i => {
        if (i.id === item.id) {
          return {
            ...i,
            fulfillment: { ...i.fulfillment, dine_in: serveQty, take_away: packQty }
          };
        }
        return i;
      }));
      // Dispatch to Redux to persist the change across sessions
      dispatch({ 
        type: 'kot/updateKotItemFulfillment', 
        payload: { itemId: item.id, serveQty, packQty } 
      });
      
      // Auto-generate Takeaway order for packed items on existing orders
      if (packQty > 0) {
        try {
          const takeawayItem = {
            ...item,
            quantity: packQty,
            fulfillment: { take_away: packQty, dine_in: 0 }
          };
          
          const { submitOrderKOT } = await import('../store/orderSlice');
          await dispatch(submitOrderKOT({
            orderItems: [takeawayItem],
            orderType: 'take_away',
            phone: phoneRef?.current || '9087397440',
            selectedTable: null,
            allTables: [],
            currentOrderNumber: null,
            isExistingOrder: false
          })).unwrap();
          
          const { apiSlice } = await import('../../../shared/api/apiSlice');
          dispatch(apiSlice.util.invalidateTags(['Tables', 'Customers', 'Order']));
          
        } catch (error) {
          console.error("Failed to auto-generate split Takeaway order:", error);
        }
      }
    }
  };

  const handleProductCardClick = (product) => {
    const newId = Date.now();
    setDraftOrderItems((prev) => {
      const existingItem = prev.find(
        (item) => areItemsEqual(item, { ...product, specialInstructions: product.specialInstructions })
      );

      const idToSelect = existingItem ? existingItem.id : newId;
      setTimeout(() => setSelectedOrderItem(idToSelect), 0);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id === existingItem.id) {
            const currentFulfillment = item.fulfillment || { dine_in: item.quantity, take_away: 0 };
            return { 
              ...item, 
              quantity: item.quantity + 1,
              fulfillment: { ...currentFulfillment, dine_in: currentFulfillment.dine_in + 1 }
            };
          }
          return item;
        });
      }

      return [
        ...prev,
        {
          id: newId,
          itemNo: product.itemNo,
          uom: product.uom,
          image: product.image,
          title: product.title,
          price: Number(product.price),
          quantity: 1,
          fulfillment: { dine_in: 1, take_away: 0 },
          specialInstructionGroups: product.specialInstructionGroups || [],
        },
      ];
    });
    // When a new product is added, reset KOT status to idle so they can send again
    if (setKotStatus) setKotStatus('idle');
  };

  const handleAddToOrder = (product) => {
    setDraftOrderItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id && areInstructionsEqual(item.specialInstructions, undefined));
      
      const idToSelect = existingItem ? existingItem.id : product.id;
      setTimeout(() => setSelectedOrderItem(idToSelect), 0);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id === product.id && areInstructionsEqual(item.specialInstructions, undefined)) {
            const currentFulfillment = item.fulfillment || { dine_in: item.quantity, take_away: 0 };
            return {
              ...item,
              quantity: item.quantity + 1,
              fulfillment: { ...currentFulfillment, dine_in: currentFulfillment.dine_in + 1 }
            };
          }
          return item;
        });
      }
      return [...prev, { ...product, quantity: 1, specialInstructions: undefined, fulfillment: { dine_in: 1, take_away: 0 } }];
    });
  };

  // Removed handleToggleFulfillmentType as we use Dual Counters

  const combinedItems = [...sentKotItems, ...draftOrderItems];
  const subtotal = combinedItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  const totalHeldPrice = heldItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  return {
    draftOrderItems, setDraftOrderItems,
    sentKotItems, setSentKotItems,
    heldItems, setHeldItems,
    selectedOrderItem, setSelectedOrderItem,
    centerView, setCenterView,
    selectedItemForAction, setSelectedItemForAction,
    isSplitModalOpen, setIsSplitModalOpen,
    isSplitPackModalOpen, setIsSplitPackModalOpen,
    isSpecialInstructionsModalOpen, setIsSpecialInstructionsModalOpen,
    isQuantitySelectorOpen, setIsQuantitySelectorOpen,
    quantityToApply, setQuantityToApply,
    itemForInstructions, setItemForInstructions,
    combinedItems, subtotal, totalHeldPrice,
    handleIncrease, handleDecrease, handleRemove,
    handleSplitClick, handleSplitPackClick, handleReplaceClick, handleOpenInstructions,
    handleQuantityConfirm, handleSaveInstructions, handleConfirmSplit, handleConfirmSplitPack,
    handleProductCardClick, handleAddToOrder
  };
};
