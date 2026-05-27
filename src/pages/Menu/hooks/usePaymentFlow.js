import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentCheckoutSchema } from '../../../validations/payment.validation';
import { completeTableOrder } from '../../../store/slices/tableSlice';

export const usePaymentFlow = ({ dispatch, selectedTable, orderType, navigate, resetOrders, setKotStatus }) => {
  const [paymentMode, setPaymentMode] = useState('Cash'); // 'Cash' | 'Upi' | 'Card' | 'Due'
  const [splitMode, setSplitMode] = useState('full');
  const [selectedTip, setSelectedTip] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending' | 'success'
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);

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
      
      if (orderType === 'dine_in') {
        navigate('/dashboard/dine-in');
      } else {
        navigate('/dashboard/menu');
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
