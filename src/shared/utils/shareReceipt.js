import { generateWhatsAppMessage, generateReceiptText } from './receiptFormatter';

export const getQrUrl = (upiString) => {
  if (!upiString) return null;
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiString)}&margin=0`;
};

export const generateQrBlob = async (upiString) => {
  const url = getQrUrl(upiString);
  if (!url) return null;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch QR image');
    return await response.blob();
  } catch (error) {
    
    return null;
  }
};

export const downloadQr = (blob, filename = 'payment-qr.png') => {
  if (!blob) return;
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
};



export const shareToEmail = async (orderData) => {
  let qrBlob = null;
  if (orderData.upiString) {
    qrBlob = await generateQrBlob(orderData.upiString);
  }

  // NOTE: True email attachments require a backend. 
  // This is a placeholder for FormSubmit / EmailJS / Custom Backend integration.
  const attemptBackendEmail = async () => {
    /*
    Example using FormSubmit (You need to configure your target email):
    const formData = new FormData();
    formData.append("name", "Annas Kitchen");
    formData.append("email", "customer@example.com"); // Get from user input
    formData.append("message", generateReceiptText(orderData));
    if (qrBlob) {
      formData.append("attachment", qrBlob, "payment-qr.png");
    }
    
    await fetch("https://formsubmit.co/ajax/your-email@example.com", {
      method: "POST",
      body: formData,
    });
    */
    return false; // Returning false to force the fallback for now
  };

  const emailSent = await attemptBackendEmail();

  if (!emailSent) {
    // Fallback: auto-download QR and open mailto:
    if (qrBlob) {
      downloadQr(qrBlob);
      alert('QR downloaded successfully.\nPlease attach the QR image to your Email.');
    }
    
    const subject = `Bill Details - Order #${orderData.orderId || 'N/A'}`;
    const body = generateReceiptText(orderData).replace(/\*/g, '');
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_self');
  } else {
    alert('Email sent successfully!');
  }
};
