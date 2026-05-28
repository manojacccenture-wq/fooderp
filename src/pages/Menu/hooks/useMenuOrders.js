import { useState } from 'react';

export const areInstructionsEqual = (inst1, inst2) => {
  if (!inst1 && !inst2) return true;
  if (!inst1 || !inst2) return false;
  return JSON.stringify(inst1) === JSON.stringify(inst2);
};

export const useMenuOrders = (setKotStatus) => {
  const [draftOrderItems, setDraftOrderItems] = useState([]);
  const [sentKotItems, setSentKotItems] = useState([]);
  const [heldItems, setHeldItems] = useState([]);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);

  const [centerView, setCenterView] = useState('menu'); // 'menu' | 'cancel_item' | 'replace_item'
  const [selectedItemForAction, setSelectedItemForAction] = useState(null);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);

  const [isSpecialInstructionsModalOpen, setIsSpecialInstructionsModalOpen] = useState(false);
  const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState(false);
  const [quantityToApply, setQuantityToApply] = useState(1);
  const [itemForInstructions, setItemForInstructions] = useState(null);

  const handleIncrease = (id) => {
    setDraftOrderItems(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecrease = (id) => {
    setDraftOrderItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const handleRemove = (id) => {
    setDraftOrderItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSplitClick = (item) => {
    setSelectedItemForAction(item);
    setIsSplitModalOpen(true);
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
        const existing = mergedList.find(m => m.title === curr.title && areInstructionsEqual(m.specialInstructions, curr.specialInstructions));
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

  const handleProductCardClick = (product) => {
    const newId = Date.now();
    setDraftOrderItems((prev) => {
      const existingItem = prev.find(
        (item) => item.title === product.title && areInstructionsEqual(item.specialInstructions, product.specialInstructions)
      );

      const idToSelect = existingItem ? existingItem.id : newId;
      setTimeout(() => setSelectedOrderItem(idToSelect), 0);

      if (existingItem) {
        return prev.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: newId,
          image: product.image,
          title: product.title,
          price: Number(product.price),
          quantity: 1,
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
        return prev.map((item) =>
          item.id === product.id && areInstructionsEqual(item.specialInstructions, undefined)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, specialInstructions: undefined }];
    });
  };

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
    isSpecialInstructionsModalOpen, setIsSpecialInstructionsModalOpen,
    isQuantitySelectorOpen, setIsQuantitySelectorOpen,
    quantityToApply, setQuantityToApply,
    itemForInstructions, setItemForInstructions,
    combinedItems, subtotal, totalHeldPrice,
    handleIncrease, handleDecrease, handleRemove,
    handleSplitClick, handleReplaceClick, handleOpenInstructions,
    handleQuantityConfirm, handleSaveInstructions, handleConfirmSplit,
    handleProductCardClick, handleAddToOrder
  };
};
