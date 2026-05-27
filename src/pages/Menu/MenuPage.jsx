import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { menuOrderSchema } from '../../validations/order.validation';
import { paymentCheckoutSchema } from '../../validations/payment.validation';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllTables, startOrderForTable, updateTableOrder, completeTableOrder } from '../../store/slices/tableSlice';
import { SplitOrderModal } from '../../components/orders/SplitOrderModal/SplitOrderModal';
import { ApplyDiscountModal } from '../../components/orders/ApplyDiscountModal/ApplyDiscountModal';
import { UpiPaymentModal } from '../../components/payment/UpiPaymentModal';
import { MenuContent } from '../../components/menu/MenuContent';
import { SpecialInstructionTags } from '../../components/orders/SpecialInstructionTags';
import { SpecialInstructionsModal } from '../../components/orders/SpecialInstructionsModal';
import { QuantitySelectorModal } from '../../components/orders/QuantitySelectorModal';
import { ReceiptPrintTemplate } from '../../components/orders/ReceiptPrintTemplate';
import { shareToEmail } from '../../utils/shareReceipt';
import { shareReceiptToCustomer } from '../../utils/whatsappShare';
import { PrinterSelectionModal } from '../../components/orders/PrinterSelectionModal';
import { connectPrinter, printReceipt } from '../../services/printService';
const areInstructionsEqual = (inst1, inst2) => {
  if (!inst1 && !inst2) return true;
  if (!inst1 || !inst2) return false;
  return JSON.stringify(inst1) === JSON.stringify(inst2);
};

const OrderItem = ({ image, title, price, quantity, onIncrease, onDecrease, onRemove, onSplit, onReplace, showDelete, isSelected,
  onSelect, itemRef, showQuantityControls = true, specialInstructions, onAddInstruction }) => {
  return (
    <div
      ref={itemRef}
      onClick={onSelect}
      className={clsx(
        "bg-white border rounded-2xl p-3 flex gap-3 items-center shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] relative cursor-pointer",
        isSelected
          ? "border-[#faa300]"
          : "border-[#eaeaef]"
      )}
    >
      <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-[14px] leading-[22px] text-[#32324d] font-semibold">{title}</span>
        {showQuantityControls ? (
          <div className="flex items-center gap-2 mt-1">
            <button onClick={onDecrease} className="w-6 h-6 rounded-[12.5px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <span className="text-[14px] font-semibold text-[#666687] min-w-[9px] text-center">{quantity}</span>
            <button onClick={onIncrease} className="w-7 h-7 rounded-[14px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center mt-1">
            <span className="text-[14px] font-semibold text-[#666687] text-center">{quantity} Quantity</span>
          </div>
        )}
        <SpecialInstructionTags instructions={specialInstructions} />
      </div>
      <div className="absolute right-3 top-3 flex gap-[6px]">
        {onAddInstruction && (
          <div onClick={(e) => { e.stopPropagation(); onAddInstruction(); }} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#6b4eff] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sticky-note"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg>
          </div>
        )}
        {onSplit && (
          <div onClick={onSplit} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#666687]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13.3333 2.5H17.4999V6.66667" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.66667 2.5H2.5V6.66667" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10 18.3333V11.4167C10.0048 10.9728 9.92082 10.5325 9.75311 10.1215C9.5854 9.71049 9.33728 9.33714 9.02333 9.02333L2.5 2.5" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.5 7.5L17.5 2.5" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        )}
        {onReplace && (
          <div onClick={onReplace} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#ffb01d]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C12.0967 2.50789 14.1092 3.32602 15.6167 4.78333L17.5 6.66667" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.4999 2.5V6.66667H13.3333" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.5 10C17.5 11.9891 16.7098 13.8968 15.3033 15.3033C13.8968 16.7098 11.9891 17.5 10 17.5C7.90329 17.4921 5.89081 16.674 4.38333 15.2167L2.5 13.3333" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.66667 13.334H2.5V17.5007" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        )}
        {showDelete && onRemove && (
          <div onClick={onRemove} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#e23744]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8.33325 9.16602V14.166" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M11.6667 9.16602V14.166" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.8334 5V16.6667C15.8334 17.1087 15.6578 17.5326 15.3453 17.8452C15.0327 18.1577 14.6088 18.3333 14.1667 18.3333H5.83341C5.39139 18.3333 4.96746 18.1577 4.6549 17.8452C4.34234 17.5326 4.16675 17.1087 4.16675 16.6667V5" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2.5 5H17.5" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.66675 4.99935V3.33268C6.66675 2.89065 6.84234 2.46673 7.1549 2.15417C7.46746 1.84161 7.89139 1.66602 8.33341 1.66602H11.6667C12.1088 1.66602 12.5327 1.84161 12.8453 2.15417C13.1578 2.46673 13.3334 2.89065 13.3334 3.33268V4.99935" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div className="absolute right-3 bottom-3 flex items-end gap-[2px]">
        <span className="text-[12px] font-bold text-[#ffb080] pb-[1px]">₹</span>
        <span className="text-[16px] font-extrabold text-[#ff7b2c]">{(Number(price) * quantity).toFixed(2)}</span>
      </div>
    </div>
  );
};

export const MenuPage = ({ initialOrderType = 'dine_in' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allTables = useAppSelector(selectAllTables);
  const isDineInFlow = !!location.state?.tableNo;
  const initialTable = location.state?.tableNo || null;
  const isTakeawayPage = location.pathname === '/dashboard/takeaways';

  const itemRefs = useRef({});

  const paymentInputRef = useRef(null);

  const { register: registerOrder, watch: watchOrder, handleSubmit: handleOrderSubmit, formState: { errors: orderErrors }, setValue: setOrderValue } = useForm({
    resolver: zodResolver(menuOrderSchema),
    defaultValues: { phone: '', guestCount: 4 }
  });

  const { register: registerPayment, watch: watchPayment, handleSubmit: handlePaymentSubmit, formState: { errors: paymentErrors }, setValue: setPaymentValue } = useForm({
    resolver: zodResolver(paymentCheckoutSchema),
    defaultValues: {
      customerPaidAmount: 600,
      customTip: '',
      dueCustomerName: '',
      dueMobileNumber: '',
      dueGivenAmount: 0,
      dueAmount: 0,
      dueDate: '',
      dueReason: ''
    }
  });

  const phone = watchOrder('phone') || '';
  const guestCount = watchOrder('guestCount') || 4;
  const customerPaidAmount = watchPayment('customerPaidAmount') || 0;
  const customTip = watchPayment('customTip') || '';

  const setCustomerPaidAmount = (val) => {
    if (typeof val === 'function') {
      const prev = watchPayment('customerPaidAmount') || 0;
      setPaymentValue('customerPaidAmount', val(prev), { shouldValidate: true });
    } else {
      setPaymentValue('customerPaidAmount', val, { shouldValidate: true });
    }
  };

  const setCustomTip = (val) => setPaymentValue('customTip', val, { shouldValidate: true });

  // States lifted to MenuPage
  const [draftOrderItems, setDraftOrderItems] = useState([]);
  const [sentKotItems, setSentKotItems] = useState([]);
  const [heldItems, setHeldItems] = useState([]);

  // View states
  const [kotStatus, setKotStatus] = useState('idle'); // 'idle' | 'success_anim' | 'sent'
  const [rightView, setRightView] = useState('order'); // 'order' | 'checkout'
  const [centerView, setCenterView] = useState('menu'); // 'menu' | 'cancel_item' | 'replace_item'

  const [selectedItemForAction, setSelectedItemForAction] = useState(null);

  const [orderType, setOrderType] = useState(initialOrderType); // 'dine_in' | 'take_away'
  const [paymentMode, setPaymentMode] = useState('Cash'); // 'Cash' | 'Upi' | 'Card' | 'Due'
  const [splitMode, setSplitMode] = useState('full');
  const [selectedTip, setSelectedTip] = useState(0);

  // Modals & Discount
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isPrinterModalOpen, setIsPrinterModalOpen] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [isSpecialInstructionsModalOpen, setIsSpecialInstructionsModalOpen] = useState(false);
  const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState(false);
  const [quantityToApply, setQuantityToApply] = useState(1);
  const [itemForInstructions, setItemForInstructions] = useState(null);


  const [selectedTable, setSelectedTable] = useState(initialTable);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);

  const currentTableObj = useMemo(() => allTables.find(t => t.tableNo === selectedTable), [allTables, selectedTable]);
  const displayCustomerName = currentTableObj?.customerName || 'Walk-in Customer';
  const isExistingSessionMode = currentTableObj?.status === 'occupied' || currentTableObj?.status === 'reserved';
  const isPhoneMissingForDineIn = orderType === 'dine_in' && !phone;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (currentTableObj) {
      if (currentTableObj.guests) setOrderValue('guestCount', currentTableObj.guests, { shouldValidate: true });
      if (currentTableObj.customerPhone) setOrderValue('phone', currentTableObj.customerPhone, { shouldValidate: true });
    } else {
      setOrderValue('guestCount', 4, { shouldValidate: true });
      setOrderValue('phone', '', { shouldValidate: true });
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
    // If the table already has orderData, restore it ONLY if the current cart is empty.
    // This ensures table selection NEVER modifies existing selected products.
    if (newTableObj && newTableObj.orderData) {
      const { draftOrderItems: savedDraft = [], sentKotItems: savedSent = [], heldItems: savedHeld = [], kotStatus: savedKot = 'idle' } = newTableObj.orderData;
      // Also check if they had the old 'orderItems' array for backwards compatibility
      const oldOrderItems = newTableObj.orderData.orderItems || [];
      
      if (savedDraft.length > 0 || savedSent.length > 0 || oldOrderItems.length > 0) {
        setDraftOrderItems(prev => prev.length === 0 && sentKotItems.length === 0 ? (savedDraft.length ? savedDraft : oldOrderItems) : prev);
        setSentKotItems(prev => prev.length === 0 && draftOrderItems.length === 0 ? savedSent : prev);
        setHeldItems(prev => prev.length === 0 ? savedHeld : prev);
        setKotStatus(prev => prev === 'idle' ? savedKot : prev);
      }
    } else {
      // DO NOT clear existing cart items when assigning a table!
      // This preserves existing selected products and attaches them to the new table.
    }

    return () => {
      if (tableToSave) {
        dispatch(updateTableOrder({
          tableNo: tableToSave,
          orderData: currentOrderDataRef.current
        }));
      }
    };
  }, [selectedTable, dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setOrderType(initialOrderType);
  }, [initialOrderType]);

  // Order Handlers
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

      return prev.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity - 1,
          }
          : item
      );
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
    // If splitting from draft order items
    setDraftOrderItems(prev => {
      if (!prev.find(i => i.id === item.id)) return prev;
      if (kitchenQty > 0) return prev.map(i => i.id === item.id ? { ...i, quantity: kitchenQty } : i);
      return prev.filter(i => i.id !== item.id);
    });
    // If splitting from sent kot items
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

  const handlePrintBilling = () => {
    if (orderType === 'take_away') {
      setRightView('checkout');
      return;
    }
  };

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

    // Move draft items to sent Kot items
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
    setDraftOrderItems([]); // clear drafts

    setKotStatus('success_anim');
    setTimeout(() => {
      setKotStatus('idle'); // Just reset to idle so they can add more items immediately if needed, or keep it sent.
    }, 2000);
  };

  const handleAddToOrder = (product) => {
    setDraftOrderItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id && areInstructionsEqual(item.specialInstructions, undefined));
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

  const resetCompleteBillingSession = () => {
    if (selectedTable) {
      dispatch(completeTableOrder({ tableNo: selectedTable }));
    }
    setDraftOrderItems([]);
    setSentKotItems([]);
    setOrderItems([]);
    setRightView('order');
    setKotStatus('idle');
    setDiscountAmount(0);
    setPaymentMode('Cash');
    setSplitMode('full');
    
    if (orderType === 'dine_in') {
      navigate('/dashboard/dine-in');
    } else {
      navigate('/dashboard/menu');
    }
  };

  const handleProductCardClick = (product) => {
    setDraftOrderItems((prev) => {
      const existingItem = prev.find(
        (item) => item.title === product.title && areInstructionsEqual(item.specialInstructions, product.specialInstructions)
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === existingItem.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }

      return [
        ...prev,
        {
          id: Date.now(),
          image: product.image,
          title: product.title,
          price: Number(product.price),
          quantity: 1,
          specialInstructionGroups: product.specialInstructionGroups || [],
        },
      ];
    });
    // When a new product is added, reset KOT status to idle so they can send again
    setKotStatus('idle');
  };
  // Calculations



  const combinedItems = [...sentKotItems, ...draftOrderItems];

  const shouldShowOrderControls = sentKotItems.length === 0 && rightView !== 'checkout';

  const subtotal = combinedItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const isSplitView = heldItems.length > 0;

  const tax = subtotal * 0.08;

  const finalPrice = subtotal + tax - discountAmount;

  // const guestCount = Number(selectedTable) || 1;

  const splitCalculatedAmount =
    splitMode === 'equal'
      ? finalPrice / guestCount
      : finalPrice;

  const appliedTip =
    customTip !== ''
      ? Number(customTip)
      : selectedTip;

  const payableAmount = splitCalculatedAmount + appliedTip;

  const changeToReturn =
    customerPaidAmount > payableAmount
      ? customerPaidAmount - payableAmount
      : 0;

  const totalHeldPrice = heldItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const getOrderData = () => ({
    orderId: Date.now().toString().slice(-6),
    tableNo: selectedTable,
    amount: payableAmount,
    subtotal,
    tax,
    discount: discountAmount,
    items: sentKotItems,
    paymentMode,
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    upiString: paymentMode === 'Upi' ? `upi://pay?pa=9031006009-1@okbizaxis&pn=AnnasKitchen&am=${payableAmount}&tr=${Date.now().toString().slice(-6)}` : ''
  });

  const executeSilentPrint = async () => {
    try {
      const connected = await connectPrinter();
      if (!connected) {
        alert("QZ Tray not connected.\nPlease install/start QZ Tray for direct printing.");
        window.print();
        return;
      }
      
      const savedPrinter = localStorage.getItem('preferred_printer');
      if (!savedPrinter) {
        setIsPrinterModalOpen(true);
        return;
      }

      const printSection = document.getElementById('printable-receipt');
      if (!printSection) {
        window.print();
        return;
      }

      const result = await printReceipt(savedPrinter, printSection.outerHTML);
      if (!result.success) {
        alert("Print failed: " + result.error + "\nFalling back to browser print.");
        window.print();
      }
    } catch (err) {
      alert("Error printing: " + err.message);
      window.print();
    }
  };

  const handleQuickPrint = () => {
    executeSilentPrint();
  };

  const handleQuickWhatsApp = async () => {
    // If the cashier entered a new phone in the form but hasn't submitted yet, use that local `phone` state
    await shareReceiptToCustomer(getOrderData(), phone || currentTableObj?.customerPhone);
  };

  const handleQuickEmail = async () => {
    await shareToEmail(getOrderData());
  };

  // Render components
  const renderMenuContent = (isReplaceMode = false) => (
    <MenuContent
      orderItems={combinedItems} // Pass combined items so quantity badge displays correctly across draft and sent
      isReplaceMode={isReplaceMode}
      replacementSelectedProductId={selectedItemForAction?.itemNo}
      onProductClick={(p) => {
        if (isReplaceMode && selectedItemForAction) {
          // Replace mode modifies BOTH sent and draft items for simplicity,
          // though usually it's acting on sent.
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
        // Decrease should only operate on draft items via product card clicks if possible.
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
    <div className="flex w-full h-full relative">

      {/* Center Main Panel */}
      <div className="flex-1 flex flex-col p-8 pl-6">

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
                className={clsx("px-6 py-[10px] rounded-[16px] font-bold text-[16px]", centerView === 'replace_item' ? "bg-[#ffb01d] text-white" : "bg-[#ffb01d] text-white")}
                style={centerView !== 'replace_item' ? { opacity: 100 } : {}}
              >
                Replace Item
              </button>
            </div>

            {centerView === 'cancel_item' && (
              <div className="flex flex-col gap-6 w-full max-w-[400px]">
                <div className="grid grid-cols-2 gap-[10px]">
                  {["Customer change mind", "Item out of stock", "Kitchen unable to prepare", "Wrong item ordered", "Item Issue", "Duplicate order", "Customer request", "Other"].map(reason => (
                    <button key={reason} className="h-[36px] bg-[#f3f5f9] text-[#4a4a6a] text-[10px] font-bold rounded-[8px] hover:bg-[#eaeaef]">
                      {reason}
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Additional remarks"
                  className="w-full h-[120px] border border-[#eaeaef] rounded-[16px] p-4 text-[14px] font-semibold text-[#32324d] outline-none resize-none placeholder:text-[#8e8ea9]"
                ></textarea>
                <div className="flex gap-4">
                  <button className="flex-1 py-[12px] bg-[#eaeaef] text-[#4a4a6a] font-bold rounded-[16px] text-[14px]" onClick={() => setCenterView('menu')}>Cancel</button>
                  <button className="flex-1 py-[12px] bg-[#e23744] text-white font-bold rounded-[16px] text-[14px]" onClick={() => {
                    setOrderItems(prev => prev.filter(i => i.id !== selectedItemForAction.id));
                    setCenterView('menu');
                  }}>Confirm Cancellation</button>
                </div>
              </div>
            )}

            {centerView === 'replace_item' && (
              <div className="flex flex-col gap-6 w-full">
                <div className="bg-[#ffc861]/20 border border-[#ffb01d] rounded-[16px] p-4 text-[#32324d] font-semibold text-[14px]">
                  Replace Item: The original item will be replaced with a new item without cancellation. The order amount will be adjusted accordingly.
                </div>
                {renderMenuContent(true)}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Right Panel */}
      {/* Right Panel */}
      <div className="w-[354px] h-full max-h-screen bg-white border-l border-[#f3f5f9] flex flex-col relative shrink-0">

          {rightView === 'order' && (
            <div className="flex-1 overflow-y-auto pb-4 flex flex-col">

              {/* Header */}
              <div className="bg-[#fff7e8] flex items-center justify-between p-3 mt-[2px] mx-[1px]">
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[18px] font-semibold text-[#32324d] leading-[22px]">Current order</span>
                  <span className="text-[12px] text-[#4a4a6a]">Customer: {displayCustomerName} {selectedTable ? `| Table: ${selectedTable}` : ''}</span>
                </div>
                <div className="flex gap-[10px]">
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
                  <div className="px-4 mt-4 flex flex-col gap-4">
                    {(() => {
                      const sentKotRounds = sentKotItems.reduce((acc, item) => {
                        const round = item.kotRound || 1;
                        if (!acc[round]) {
                          acc[round] = { round, time: item.kotTime, items: [] };
                        }
                        acc[round].items.push(item);
                        return acc;
                      }, {});
                      const roundsArray = Object.values(sentKotRounds).sort((a, b) => a.round - b.round);
                      
                      return roundsArray.map((roundObj) => (
                        <div key={`round-${roundObj.round}`} className="bg-white rounded-[16px] border border-[#eaeaef] overflow-hidden shadow-sm flex flex-col shrink-0">
                          <div className="bg-[#f3f5f9] px-4 py-[10px] flex justify-between items-center border-b border-[#eaeaef]">
                            <span className="text-[13px] font-extrabold text-[#4a4a6a]">KOT Round {roundObj.round}</span>
                            <span className="text-[12px] font-semibold text-[#8e8ea9]">{roundObj.time || 'Pending'}</span>
                          </div>
                          <div className="p-3 flex flex-col gap-3">
                            {roundObj.items.map((item) => (
                              <OrderItem
                                key={`sent-${item.id}`}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                quantity={item.quantity}
                                onSplit={() => handleSplitClick(item)}
                                onReplace={() => handleReplaceClick(item)}
                                onAddInstruction={undefined}
                                specialInstructions={item.specialInstructions}
                                showDelete={false}
                                showQuantityControls={false}
                                isSelected={selectedOrderItem === item.id}
                                onSelect={() => setSelectedOrderItem(item.id)}
                                itemRef={(el) => (itemRefs.current[item.id] = el)}
                              />
                            ))}
                          </div>
                        </div>
                      ));
                    })()}

                    {draftOrderItems.length > 0 && (
                      <>
                        {sentKotItems.length > 0 && (
                          <h3 className="text-[18px] font-bold text-[#666687] mt-2 mb-0">New Orders</h3>
                        )}
                        {draftOrderItems.map((item) => (
                          <OrderItem
                            key={`curr-${item.id}`}
                            image={item.image}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            onIncrease={() => handleIncrease(item.id)}
                            onDecrease={() => handleDecrease(item.id)}
                            onRemove={() => handleRemove(item.id)}
                            onSplit={() => handleSplitClick(item)}
                            onAddInstruction={() => handleOpenInstructions(item)}
                            specialInstructions={item.specialInstructions}
                            showDelete={true}
                            showQuantityControls={true}
                            isSelected={selectedOrderItem === item.id}
                            onSelect={() => setSelectedOrderItem(item.id)}
                            itemRef={(el) => (itemRefs.current[item.id] = el)}
                          />
                        ))}
                      </>
                    )}

                    {combinedItems.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 opacity-60">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8e8ea9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span className="text-[14px] font-bold text-[#8e8ea9]">Please select a item</span>
                      </div>
                    )}
                  </div>

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
                          <div className="px-4 mt-6">
                            <h3 className="text-[16px] font-bold text-[#32324d] mb-4">Order Type :</h3>
                            <div className="flex gap-4">
                              {!isTakeawayPage && (
                                <button
                                  className={clsx("rounded-[16px] px-4 py-[12px] font-bold text-[16px]", orderType === 'dine_in' ? "bg-[#ffb01d] text-white" : "bg-transparent text-[#212134]")}
                                  onClick={() => setOrderType('dine_in')}
                                >
                                  Dine In
                                </button>
                              )}
                              <button
                                className={clsx("rounded-[16px] px-4 py-[12px] font-bold text-[16px]", orderType === 'take_away' ? "bg-[#ffb01d] text-white" : "bg-transparent text-[#212134]")}
                                onClick={() => setOrderType('take_away')}
                              >
                                Take away
                              </button>
                            </div>

                            {orderType === 'dine_in' && (
                              <div className="grid grid-cols-4 gap-[16px] mt-6">
                                {allTables.map((table) => {
                                  const num = table.tableNo;
                                  const isAvailable = table.status === 'available';
                                  let borderColor = isAvailable ? '#b4efc6' : '#e23744';
                                  let textColor = isAvailable ? '#24a44b' : '#e23744';
                                  if (selectedTable === num) { borderColor = '#faa300'; textColor = '#faa300'; }
                                  
                                  const isDisabled = isDineInFlow ? (num !== selectedTable) : !isAvailable;

                                  return (
                                    <button
                                      key={num}
                                      disabled={isDisabled}
                                      onClick={() => !isDisabled && setSelectedTable(num)}
                                      className="h-[54px] border rounded-[16px] flex items-center justify-center font-bold text-[14px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      style={{
                                        borderColor: selectedTable === num ? '#faa300' : borderColor,
                                        color: selectedTable === num ? '#faa300' : textColor,
                                        backgroundColor: selectedTable === num ? '#fff7e8' : 'transparent',
                                      }}
                                    >
                                      {num}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {orderType === 'take_away' && (
                            <div className="px-4 mt-6">
                              <div className="bg-[#fff7e8] rounded-[8px] py-[10px] px-4 mb-4">
                                <span className="text-[14px] font-bold text-[#32324d]">Payment Summary</span>
                              </div>
                              <div className="bg-white rounded-[16px] p-4 flex flex-col gap-3 border border-[#f3f3f5] mb-4 shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]">
                                <div className="flex justify-between items-center">
                                  <span className="text-[14px] font-semibold text-[#666687]">Total Amount</span>
                                  <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[14px] font-semibold text-[#666687]">Tax</span>
                                  <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{tax.toFixed(2)}</span>
                                </div>
                                <div className="w-full h-px border-t border-dashed border-[#eaeaef] my-1"></div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[16px] font-bold text-[#32324d]">Total price</span>
                                  <span className="text-[16px] font-extrabold text-[#ff7b2c] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{payableAmount.toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="bg-[#fff7e8] rounded-[16px] p-4 flex justify-between items-center border border-[#ffb01d]/20">
                                <span className="text-[16px] font-bold text-[#32324d]">Total</span>
                                <span className="text-[16px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{payableAmount.toFixed(2)}</span>
                              </div>
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
                            {/* <textarea placeholder="Special Instructions...." className="w-full h-[120px] border border-[#eaeaef] focus:border-[#ff7b2c] focus:ring-0 focus:outline-none rounded-[16px] p-4 text-[#8e8ea9] font-semibold text-[14px] resize-none"></textarea> */}
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
              <div className="bg-[#fff7e8] flex items-center justify-between p-3 mt-[2px] mx-[1px]">
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[18px] font-semibold text-[#32324d] leading-[22px]">Current order</span>
                  <span className="text-[12px] text-[#4a4a6a]">Customer: {displayCustomerName} {selectedTable ? `| Table: ${selectedTable}` : ''}</span>
                </div>
                <div className="flex gap-[10px]">
                  <button className="bg-[#e23744] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold" onClick={() => { setOrderItems([]); setHeldItems([]); setRightView('order'); setKotStatus('idle'); }}>Cancel order</button>
                  <button className="bg-[#ffb01d] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold">Pause</button>
                </div>
              </div>

              <div className="px-4 mt-6">
                <div className="bg-white rounded-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] p-4 flex flex-col gap-3 border border-[#f3f3f5]">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] font-semibold text-[#666687]">Total Amount</span>
                    <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] font-semibold text-[#666687]">Tax</span>
                    <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{tax.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] font-semibold text-[#666687]">Apply Discount</span>
                      <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>-{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="w-full h-px border-t border-dashed border-[#eaeaef] my-1"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-bold text-[#32324d]">Total price</span>
                    <span className="text-[16px] font-extrabold text-[#ff7b2c] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{payableAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="text-[14px] font-semibold text-[#666687] block mb-3">Split bill</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSplitMode('full')}
                      className={clsx(
                        "flex-1 py-2 rounded-[16px] text-[12px] font-bold",
                        splitMode === 'full'
                          ? "bg-[#ffb01d] text-white"
                          : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]"
                      )}
                    >
                      Full Bill
                    </button>

                    <button
                      onClick={() => setSplitMode('equal')}
                      className={clsx(
                        "flex-1 py-2 rounded-[16px] text-[12px] font-bold",
                        splitMode === 'equal'
                          ? "bg-[#ffb01d] text-white"
                          : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]"
                      )}
                    >
                      Equal Split
                    </button>

                    <button
                      onClick={() => setSplitMode('by_item')}
                      className={clsx(
                        "flex-1 py-2 rounded-[16px] text-[12px] font-bold",
                        splitMode === 'by_item'
                          ? "bg-[#ffb01d] text-white"
                          : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]"
                      )}
                    >
                      By Item
                    </button>
                  </div>
                  <span className="text-[12px] text-[#8e8ea9] block mt-2">
                    {splitMode === 'equal'
                      ? `Each guest pays ₹${splitCalculatedAmount.toFixed(2)}`
                      : `Full bill amount ₹${payableAmount.toFixed(2)}`}
                  </span>
                </div>

                <div className="mt-6">
                  <span className="text-[14px] font-semibold text-[#666687] block mb-3">Add Tip</span>
                  <div className="flex gap-2 mb-3">
                    {[20, 50, 100].map((tip) => (
                      <button
                        key={tip}
                        onClick={() => {
                          setSelectedTip(tip);
                          setCustomTip('');
                        }}
                        className={clsx(
                          "flex-1 py-2 rounded-[16px] text-[12px] font-bold",
                          selectedTip === tip && customTip === ''
                            ? "bg-[#ffb01d] text-white"
                            : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]"
                        )}
                      >
                        {tip}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setSelectedTip(0);
                        setCustomTip('');
                      }}
                      className={clsx(
                        "flex-1 py-2 rounded-[16px] text-[12px] font-bold",
                        selectedTip === 0 && customTip === ''
                          ? "bg-[#ffb01d] text-white"
                          : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]"
                      )}
                    >
                      No tip
                    </button>
                  </div>
                  <div>
                    <input
                      type="number"
                      {...registerPayment('customTip')}
                      placeholder="Custom tip amount-"
                      className={clsx("w-full h-[40px] border rounded-[16px] px-4 text-[12px] font-semibold outline-none", paymentErrors.customTip ? "border-red-500" : "border-[#ffb01d]")}
                    />
                    {paymentErrors.customTip && <p className="text-red-500 text-xs mt-1">{paymentErrors.customTip.message}</p>}
                  </div>
                </div>

                <div className="mt-6 mb-6">
                  <span className="text-[14px] font-semibold text-[#666687] block mb-3">Payment Mode</span>
                  <div className="flex gap-2 mb-4">
                    {['Cash', 'Upi', 'Card', 'Due'].map(mode => (
                      <button
                        key={mode}
                        className={clsx("flex-1 py-2 rounded-[16px] text-[12px] font-bold", paymentMode === mode ? "bg-[#ffb01d] text-white" : "bg-[#f3f5f9] text-[#32324d] hover:bg-[#eaeaef]")}
                        onClick={() => setPaymentMode(mode)}
                      >
                        {mode}
                      </button>
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
                      <div>
                        <input type="date" {...registerPayment('dueDate')} placeholder="Due date" className="w-full h-[48px] border border-[#eaeaef] rounded-[16px] px-4 text-[12px] font-semibold outline-none text-[#32324d] placeholder:text-[#8e8ea9]" />
                      </div>
                      <div>
                        <textarea {...registerPayment('dueReason')} placeholder="Reason for discount" className="w-full h-[80px] border border-[#eaeaef] rounded-[16px] p-4 text-[12px] font-semibold outline-none resize-none text-[#32324d] placeholder:text-[#8e8ea9]"></textarea>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <input
                          ref={paymentInputRef}
                          type="number"
                          {...registerPayment('customerPaidAmount')}
                          className={clsx("w-full h-[40px] border focus:ring-0 focus:outline-none rounded-[16px] px-4 text-[14px] font-bold text-[#666687] mb-1 transition-all duration-200", paymentErrors.customerPaidAmount ? "border-red-500 focus:border-red-500" : "border-[#ffb01d] focus:border-[#ff7b2c]")}
                        />
                        {paymentErrors.customerPaidAmount && <p className="text-red-500 text-xs mb-3 ml-2">{paymentErrors.customerPaidAmount.message}</p>}
                      </div>
                      <div className="bg-[#b4efc6]/20 py-2 rounded-[16px] text-center mb-4 mt-2">
                        <span className="text-[12px] font-bold text-[#24a44b]">
                          ₹{changeToReturn.toFixed(2)} change to return
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {['500', '200', '100', '50', '20', '10'].map(amt => (
                          <button
                            key={amt}
                            onClick={() =>
                              setCustomerPaidAmount(
                                prev => Number(prev) + Number(amt)
                              )
                            }
                            className="h-[36px] border border-[#ffb01d] rounded-[16px] flex items-center justify-center gap-1 text-[12px] font-bold text-[#32324d] hover:bg-[#fff7e8] transition-all duration-200 active:scale-[0.98]"
                          >
                            <span className="text-[#ff9556] text-center text-2xl">-</span>
                            {amt}
                            <span className="text-[#ff9556] text-center text-2xl">+</span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => paymentInputRef.current?.focus()}
                        className="w-full h-[36px] border border-[#ffb01d] rounded-[16px] text-[#666687] text-[12px] font-bold hover:bg-[#fff7e8] mb-6 transition-all duration-200 active:scale-[0.98]"
                      >
                        Custom amount
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Button Fixed */}
          {combinedItems.length > 0 && (
            <div className="px-4 pt-4 pb-8 shrink-0 bg-white sticky bottom-0 z-10">
            {rightView === 'order' ? (
              orderType === 'take_away' ? (
                <button 
                  className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={handlePrintBilling}
                  disabled={combinedItems.length === 0}
                >
                  Print Billing
                </button>
              ) : kotStatus === 'success_anim' ? null : draftOrderItems.length > 0 ? (
                <button 
                  className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={handleOrderSubmit(handleSendKOT)}
                  disabled={(orderType === 'dine_in' && !selectedTable) || isPhoneMissingForDineIn}
                >
                  Send to KOT
                </button>
              ) : sentKotItems.length > 0 ? (
                <button 
                  className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={() => setRightView('checkout')}
                  disabled={isPhoneMissingForDineIn}
                >
                  Complete Order
                </button>
              ) : null
            ) : rightView === 'checkout' && (
              <div className="flex flex-col gap-3">
                {paymentMode === 'Due' ? (
                  <button className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]" onClick={handlePaymentSubmit(() => { setOrderItems([]); setRightView('order'); setKotStatus('idle'); setDiscountAmount(0); setPaymentMode('Cash'); })}>
                    Mark as Due
                  </button>
                ) : paymentMode === 'Upi' ? (
                  <>
                    <button className="w-full bg-[#dcdce4] text-[#32324d] py-[14px] rounded-[16px] font-bold text-[16px]" onClick={() => setIsDiscountModalOpen(true)}>
                      Apply Discount
                    </button>
                    <button className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]" onClick={() => setIsUpiModalOpen(true)}>
                      Generate UPI QR & Pay
                    </button>
                    <div className="flex gap-2 w-full mt-2">
                      <button className="flex-1 border border-[#eaeaef] bg-white text-[#4a4a6a] py-[10px] rounded-[12px] font-bold text-[13px] hover:bg-[#f3f5f9] transition-all" onClick={handleQuickPrint}>
                        Print
                      </button>
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
                  </>
                ) : (
                  <>
                    <button className="w-full bg-[#dcdce4] text-[#32324d] py-[14px] rounded-[16px] font-bold text-[16px]" onClick={() => setIsDiscountModalOpen(true)}>
                      Apply Discount
                    </button>
                    <button className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]" onClick={handlePaymentSubmit(() => { 
                      resetCompleteBillingSession();
                    })}>
                      Mark as paid
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          )}
        </div>

      <ReceiptPrintTemplate {...getOrderData()} />

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