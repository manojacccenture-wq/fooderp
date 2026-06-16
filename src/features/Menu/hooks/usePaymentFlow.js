import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentCheckoutSchema } from '../../../validations/payment.validation';
import { completeTableOrder } from '../../DineIn/store/tableSlice';
import { clearOrderNumber } from '../../../features/Menu/store/orderSlice';
import { addTransaction } from '../../Cashier/store/moneyManagementSlice';
import { addCompletedOrder } from '../../Orders/store/orderHistorySlice';
import { useSelector } from 'react-redux';
import { selectActiveKots } from '../../../features/Menu/store/kotSlice';
import {
  usePutOrderPaymentStatusMutation,
  useCloseOrderMutation,
  usePutTableStatusMutation,
  apiSlice
} from '../../../shared/api/apiSlice';

export const usePaymentFlow = ({ dispatch, selectedTable, currentTableObj, orderType, navigate, resetOrders, setKotStatus, handleSendKOT, totalPackQuantity, draftOrderItems, combinedItems, phone, currentOrderNumber, globalOrderCounter }) => {
  const activeKots = useSelector(selectActiveKots);
  const [putOrderPaymentStatus] = usePutOrderPaymentStatusMutation();
  const [closeOrder] = useCloseOrderMutation();
  const [putTableStatus] = usePutTableStatusMutation();
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
      customerPaidAmount: 0,
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

  const resetCompleteBillingSession = async (payableAmount = 0) => {
    // Validation Before API
    const isDue = paymentMode === 'Due';
    if (!isDue && customerPaidAmount < payableAmount) {
      alert("Received amount is less than bill amount");
      return;
    }

    const orderId = currentOrderNumber;
    if (!orderId) {
      
      alert("No active order found for settlement.");
      return;
    }

    // Build Payment Payload Dynamically
    let paymentPayload = {
      PaymentStatus: isDue ? "Due" : "Paid"
    };

    if (paymentMode === 'Cash') {
      paymentPayload.PaymentModeCode = 1;
      paymentPayload.CashAmount = payableAmount;
      paymentPayload.CashPaymentMode = "Cash";
      paymentPayload.OnlineAmount = 0;
      paymentPayload.NetPaidAmount = payableAmount;
      paymentPayload.DueAmount = 0;
      paymentPayload.CustomerName = phone || "Walk-in Customer";
      paymentPayload.CustomerMobile = phone || "9999999999";
      paymentPayload.CustomerAddress = "N/A";
    } else if (paymentMode === 'Upi') {
      paymentPayload.PaymentModeCode = 2;
      paymentPayload.CashAmount = 0;
      paymentPayload.OnlineAmount = payableAmount;
      paymentPayload.OnlinePaymentMode = "UPI";
      paymentPayload.NetPaidAmount = payableAmount;
    } else if (paymentMode === 'Card') {
      paymentPayload.PaymentModeCode = 3;
      paymentPayload.OnlineAmount = payableAmount;
      paymentPayload.OnlinePaymentMode = "Card";
      paymentPayload.NetPaidAmount = payableAmount;
    } else if (paymentMode === 'Due') {
      paymentPayload.PaymentModeCode = 4;
      paymentPayload.DueAmount = watchPayment('dueAmount') || payableAmount;
    }

    
    

    try {
      // STEP 1: Update Payment Status
      const paymentResponse = await putOrderPaymentStatus({ orderId, payload: paymentPayload }).unwrap();
      
      if (!paymentResponse?.IsSuccessful) {
        throw new Error("Payment Update Failed");
      }

      // STEP 2: Close Order
      const closeOrderPayload = {
        OrderId: orderId,
        OrderStatus: "Closed",
        PaymentInfo: paymentPayload
      };
      
      const closeOrderResponse = await closeOrder(closeOrderPayload).unwrap();
      
      if (!closeOrderResponse?.IsSuccessful) {
        throw new Error("Close Order Failed");
      }

      // STEP 3: Put Table Status Empty
      const targetTableId = currentTableObj?.id || currentTableObj?.tableId || selectedTable;
      const tableStatusResponse = await putTableStatus({ tableId: targetTableId, status: "Empty" }).unwrap();
      
      if (!tableStatusResponse?.IsSuccessful) {
        alert("Failed to update table status to Empty. Keep billing session open.");
        return;
      }

      // STEP 4: Invalidate RTK Query cache
      dispatch(apiSlice.util.invalidateTags(["Tables", "Customers"]));

      // STEP 5: Perform UI cleanup
      setPaymentStatus('success');
      setTimeout(() => {
        dispatch(clearOrderNumber());
        dispatch(completeTableOrder({ tableNo: selectedTable }));
        resetOrders();
        if (setKotStatus) setKotStatus('idle');
        setPaymentStatus('pending');
        setDiscountAmount(0);
        setPaymentMode('Cash');
        setSplitMode('full');
        resetPaymentForm();
        
        // Navigate back to Dine-In Table Grid
        navigate('/dashboard/dine-in', { replace: true });
      }, 2500);

    } catch (err) {
      
      alert(err.message || "Payment settlement failed.");
    }
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





