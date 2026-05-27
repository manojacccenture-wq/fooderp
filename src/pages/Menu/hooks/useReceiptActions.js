import { useState } from 'react';
import { connectPrinter, printReceiptElement } from '../../../services/printService';
import { shareToEmail } from '../../../utils/shareReceipt';
import { shareReceiptToCustomer } from '../../../utils/whatsappShare';

export const useReceiptActions = ({
  selectedTable,
  payableAmount,
  subtotal,
  tax,
  discountAmount,
  sentKotItems,
  paymentMode,
  phone,
  currentTableObj
}) => {
  const [isPrinterModalOpen, setIsPrinterModalOpen] = useState(false);

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

      const printSection = document.getElementById('receipt-print-content');
      if (!printSection) {
        window.print();
        return;
      }

      const result = await printReceiptElement(savedPrinter, printSection);
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
    await shareReceiptToCustomer(getOrderData(), phone || currentTableObj?.customerPhone);
  };

  const handleQuickEmail = async () => {
    await shareToEmail(getOrderData());
  };

  return {
    isPrinterModalOpen, setIsPrinterModalOpen,
    getOrderData,
    executeSilentPrint,
    handleQuickPrint,
    handleQuickWhatsApp,
    handleQuickEmail
  };
};
