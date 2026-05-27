/**
 * Centralized utility for formatting receipt data.
 */

export const generateReceiptText = ({
  orderId,
  tableNo,
  amount,
  items = [],
  upiString = '',
}) => {
  const formattedAmount = Number(amount || 0).toFixed(2);

  let text = `*ANNAS KITCHEN*\n`;
  text += `━━━━━━━━━━━━━━\n\n`;

  text += `*Order:* #${orderId || 'N/A'}\n`;

  if (tableNo) {
    text += `*Table:* ${tableNo}\n`;
  }

  text += `*Amount:* ₹${formattedAmount}\n\n`;

  text += `*Items Ordered*\n`;

  if (items.length > 0) {
    text += items
      .map((item, index) => {
        return `${index + 1}. ${item.title} × ${item.quantity}`;
      })
      .join('\n');
  } else {
    text += `No items`;
  }

  if (upiString) {
    text += `\n\n━━━━━━━━━━━━━━\n`;
    text += `*Pay via UPI*\n`;
    text += `${upiString}`;
  }

  text += `\n\nThank you for dining with us!`;

  return text;
};

export const generateWhatsAppMessage = (orderData) => {
  const text = generateReceiptText(orderData);
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
};

export const generateEmailTemplate = (orderData) => {
  const subject = `Bill Details - Order #${orderData.orderId || 'N/A'}`;

  // Remove WhatsApp markdown formatting for email
  const body = generateReceiptText(orderData).replace(/\*/g, '');

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};