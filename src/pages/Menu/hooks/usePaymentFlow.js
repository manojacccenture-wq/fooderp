import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentCheckoutSchema } from '../../../validations/payment.validation';
import { completeTableOrder } from '../../../store/slices/tableSlice';
import { clearOrderNumber } from '../../../store/slices/orderSlice';
import { createTakeawayEntry } from '../../../store/slices/takeawaySlice';

export const usePaymentFlow = ({ dispatch, selectedTable, orderType, navigate, resetOrders, setKotStatus, handleSendKOT, totalPackQuantity, draftOrderItems, combinedItems, phone, currentOrderNumber, globalOrderCounter }) => {
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

  const resetCompleteBillingSession = () => {
    setPaymentStatus('success');

    // For pure takeaway orders, draft items were never sent to KOT
    // They skipped straight to Print Billing. So we dispatch them now
    // to generate the token and KOT before clearing.
    if (draftOrderItems && draftOrderItems.length > 0 && handleSendKOT) {
      handleSendKOT();
    }

    const allItems = combinedItems || [];
    const parcelItems = allItems.filter(item => (item.fulfillment?.take_away || 0) > 0);
    
    if (parcelItems.length > 0 || orderType === 'take_away') {
      const takeAwayItemsToPass = parcelItems.length > 0 ? parcelItems.map(item => ({
        ...item,
        quantity: item.fulfillment?.take_away || item.quantity
      })) : [];

      const effectiveOrderNumber = currentOrderNumber || (globalOrderCounter + 1);

      dispatch(createTakeawayEntry({
        orderNumber: effectiveOrderNumber,
        source: orderType,
        tableReference: selectedTable,
        customerInfo: phone ? { phone } : null,
        status: 'Preparing',
        items: takeAwayItemsToPass
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
