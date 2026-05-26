/**
 * Centralized utility for formatting receipt data.
 */

export const generateReceiptText = ({ orderId, tableNo, amount, items = [], upiString = '' }) => {
  let text = `*Bill Details - Annas Kitchen*\n`;
  text += `Order: #${orderId || 'N/A'}\n`;
  if (tableNo) {
    text += `Table: ${tableNo}\n`;
  }
  text += `Amount: ₹${Number(amount || 0).toFixed(2)}\n\n`;
  text += `*Items:*\n`;
  if (items.length > 0) {
    text += items.map(i => `${i.title} x${i.quantity}`).join('\n');
  } else {
    text += `No items\n`;
  }
  
  if (upiString) {
    text += `\n\nPay via UPI: ${upiString}`;
  }

  return text;
};

export const generateWhatsAppMessage = (orderData) => {
  const text = generateReceiptText(orderData);
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
};

export const generateEmailTemplate = (orderData) => {
  const subject = `Bill Details - Order #${orderData.orderId || 'N/A'}`;
  // For email we might not want the asterisks used for WhatsApp bolding
  let body = generateReceiptText(orderData).replace(/\*/g, '');
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
