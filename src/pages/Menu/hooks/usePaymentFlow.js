import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentCheckoutSchema } from '../../../validations/payment.validation';
import { completeTableOrder } from '../../../store/slices/tableSlice';
import { clearOrderNumber } from '../../../store/slices/orderSlice';
import { createTakeawayEntry } from '../../../store/slices/takeawaySlice';
import { addTransaction } from '../../../store/slices/moneyManagementSlice';
import { addCompletedOrder } from '../../../store/slices/orderHistorySlice';
import { useSelector } from 'react-redux';
import { selectActiveKots } from '../../../store/slices/kotSlice';

export const usePaymentFlow = ({ dispatch, selectedTable, orderType, navigate, resetOrders, setKotStatus, handleSendKOT, totalPackQuantity, draftOrderItems, combinedItems, phone, currentOrderNumber, globalOrderCounter }) => {
  const activeKots = useSelector(selectActiveKots);
  const [paymentMode, setPaymentMode] = useState('Cash'); // 'Cash' | 'Upi' | 'Card' | 'Due'
  const [splitMode, setSplitMode] = useState('full');
  const [selectedTip, setSelectedTip] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending' | 'success'
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);

  const { register: registerPayment, watch: watchPayment, handleSubmit: handlePaymentSubmit, formState: { errors: paymentErrors }, setValue: setPaymentValue, reset: resetPaymentForm } = useForm({
    resolver: zodResolver(paymentCheckoutSchema),
    defaultValues: {
      customerPaidAmount: 600,
      customTip: '',
      dueCustomerName: '',
      dueMobileNumber: '',
      dueGivenAmount: 0,
      dueAmount: 0,
      dueDate: '',
      dueReason: '',
      upiReference: '',
      cardReference: ''
    }
  });

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

  const resetCompleteBillingSession = (payableAmount = 0) => {
    setPaymentStatus('success');

    // Dispatch the money management transaction
    let txType = 'cash_sale';
    if (paymentMode === 'Upi') txType = 'upi_sale';
    else if (paymentMode === 'Card') txType = 'card_sale';
    else if (paymentMode === 'Due') txType = 'due_sale';

    const orderId = currentOrderNumber || (globalOrderCounter + 1);

    dispatch(addTransaction({
      type: txType,
      amount: payableAmount,
      direction: 'in', // Sales are ALWAYS 'in' regardless of payment method
      orderId: orderId,
      tableNumber: selectedTable,
      orderSource: orderType,
      reason: `Order #${orderId} Payment`,
      createdBy: 'Cashier'
    }));

    const allItems = combinedItems || [];
    const subtotal = allItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax match
    const finalAmount = subtotal + tax - discountAmount;

    // Retrieve specific KOTs for this order before they are cleared
    const orderKots = activeKots.filter(k => k.orderNumber === orderId);
    
    // Build Timeline
    const nowISO = new Date().toISOString();
    const nowTimeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    
    const timeline = [];
    if (orderKots.length > 0) {
      const firstKotTime = new Date(orderKots[0].createdAt);
      timeline.push({ time: firstKotTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase(), event: 'Order Created' });
      orderKots.forEach((kot, idx) => {
        timeline.push({ time: new Date(kot.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase(), event: `KOT Round ${idx + 1} Sent` });
      });
    } else {
      timeline.push({ time: nowTimeStr, event: 'Order Created' });
    }
    
    timeline.push({ time: nowTimeStr, event: 'Bill Generated' });
    timeline.push({ time: nowTimeStr, event: 'Payment Completed' });

    // Dispatch full snapshot to history ONLY for Dine-In.
    // Takeaways will be dispatched upon Handover.
    if (orderType !== 'take_away') {
      dispatch(addCompletedOrder({
        id: orderId,
        kotNumber: `KOT-${orderId}`,
        tableNumber: selectedTable,
        customerName: phone || 'Walk-in Customer',
        type: 'Dine-In',
        items: allItems,
        subtotal,
        tax,
        discount: discountAmount,
        finalAmount,
        paymentMode,
        cashier: 'Cashier',
        shift: 'Morning',
        orderStartTime: orderKots.length > 0 ? orderKots[0].createdAt : nowISO,
        duration: '45 min',
        kots: orderKots,
        timeline,
        paymentDetails: {
          customerPaidAmount,
          dueGivenAmount: watchPayment('dueGivenAmount') || 0,
          changeReturned: (customerPaidAmount - finalAmount) > 0 ? (customerPaidAmount - finalAmount) : 0,
        },
        tableAudit: {
          guestCount: 4 // Usually this is tracked in table session, hardcoding to 4 as per current UI mockup
        }
      }));
    }

    // For pure takeaway orders, draft items were never sent to KOT
    // They skipped straight to Print Billing. So we dispatch them now
    // to generate the token and KOT before clearing.
    if (draftOrderItems && draftOrderItems.length > 0 && handleSendKOT) {
      handleSendKOT();
    }

    const parcelItems = allItems.filter(item => (item.fulfillment?.take_away || 0) > 0);
    
    if (parcelItems.length > 0 || orderType === 'take_away') {
      const takeAwayItemsToPass = orderType === 'take_away'
        ? allItems
        : parcelItems.map(item => ({
            ...item,
            quantity: item.fulfillment?.take_away || item.quantity
          }));

      const effectiveOrderNumber = currentOrderNumber || (globalOrderCounter + 1);

      dispatch(createTakeawayEntry({
        orderNumber: effectiveOrderNumber,
        source: orderType,
        tableReference: selectedTable,
        customerInfo: phone ? { phone } : null,
        status: 'Preparing',
        items: takeAwayItemsToPass,
        financials: {
          subtotal,
          tax,
          discount: discountAmount,
          finalAmount,
          paymentMode
        }
      }));
    }

    setTimeout(() => {
      if (selectedTable) {
        dispatch(completeTableOrder({ tableNo: selectedTable }));
      }
      resetOrders(); // callback to reset draft, sent, held, orderItems, rightView
      if (setKotStatus) setKotStatus('idle');
      setPaymentStatus('pending');
      setDiscountAmount(0);
      setPaymentMode('Cash');
      setSplitMode('full');
      resetPaymentForm();
      dispatch(clearOrderNumber());
      
      if (totalPackQuantity > 0 || orderType === 'take_away') {
        navigate('/dashboard/takeaways');
      } else {
        navigate('/dashboard/menu', { replace: true, state: {} });
      }
    }, 2500); // 2.5 second delay to show the green success sidebar
  };

  return {
    paymentMode, setPaymentMode,
    splitMode, setSplitMode,
    selectedTip, setSelectedTip,
    discountAmount, setDiscountAmount,
    paymentStatus, setPaymentStatus,
    isUpiModalOpen, setIsUpiModalOpen,
    isDiscountModalOpen, setIsDiscountModalOpen,
    registerPayment, watchPayment, handlePaymentSubmit, paymentErrors,
    customerPaidAmount, customTip, setCustomerPaidAmount, setCustomTip,
    resetCompleteBillingSession
  };
};
