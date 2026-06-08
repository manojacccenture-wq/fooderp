import { generateReceiptText } from './receiptFormatter';
import { generateQrBlob, downloadQr } from './shareReceipt';

export const formatPhoneNumber = (phone) => {
  if (!phone) return null;
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 10) return `91${clean}`;
  if (clean.length === 12 && clean.startsWith('91')) return clean;
  return clean;
};

export const validateIndianPhone = (phone) => {
  if (!phone) return false;
  const clean = phone.replace(/\D/g, '');
  return clean.length === 10; // We just rely on length here, Zod handles deeper validation
};

export const generateWhatsAppReceipt = (orderData, phone) => {
  const text = generateReceiptText(orderData);
  const formattedPhone = formatPhoneNumber(phone);
  
  if (formattedPhone) {
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
  }
  
  // Fallback to generic if no phone
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
};

export const shareReceiptToCustomer = async (orderData, customerPhone) => {
  if (!customerPhone) {
    alert('Customer phone number not available.\nPlease update customer details.');
    return;
  }

  const waUrl = generateWhatsAppReceipt(orderData, customerPhone);
  window.open(waUrl, '_blank');
};
