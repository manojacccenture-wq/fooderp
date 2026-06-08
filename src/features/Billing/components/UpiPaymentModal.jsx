import React, { useState } from 'react';
import { shareToEmail, getQrUrl, generateQrBlob, downloadQr } from '../../../shared/utils/shareReceipt';
import { shareReceiptToCustomer } from '../../../shared/utils/whatsappShare';

export const UpiPaymentModal = ({ isOpen, onClose, onConfirm, amount, orderId, tableNo, items = [], date, customerPhone }) => {
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle' | 'success'

  if (!isOpen) return null;

  // Real API for QR generation.
  // UPI format: upi://pay?pa=restaurant@upi&pn=Restaurant&am=100.00
  const upiId = "9031006009-1@okbizaxis";
  const upiString = `upi://pay?pa=${upiId}&pn=AnnasKitchen&am=${amount}&tr=${orderId}`;
  const qrUrl = getQrUrl(upiString);

  const handleDownloadQR = async () => {
    try {
      const blob = await generateQrBlob(upiString);
      if (blob) downloadQr(blob, `QR_Order_${orderId}.png`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
  };

  const handleWhatsAppShare = async () => {
    await shareReceiptToCustomer({ orderId, tableNo, amount, items, upiString }, customerPhone);
  };

  const handleEmailShare = async () => {
    await shareToEmail({ orderId, tableNo, amount, items, upiString });
  };

  const handleConfirm = () => {
    setPaymentStatus('success');
    setTimeout(() => {
      onConfirm();
      setTimeout(() => setPaymentStatus('idle'), 300);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0c1a4b]/40 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-[24px] w-[800px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#f3f5f9] shrink-0">
          <h2 className="text-[20px] font-bold text-[#32324d]">UPI Payment</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#8e8ea9] hover:text-[#32324d] transition-colors bg-[#f3f5f9] rounded-full hover:bg-[#eaeaef]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {paymentStatus === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white animate-in fade-in zoom-in duration-300 rounded-b-[24px]">
            <div className="w-[80px] h-[80px] bg-[#b4efc6]/30 rounded-full flex items-center justify-center mb-6 relative">
               <div className="absolute inset-0 rounded-full border border-[#24a44b] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30"></div>
               <div className="w-[50px] h-[50px] bg-[#24a44b] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(36,164,75,0.4)]">
                 <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                 </svg>
               </div>
            </div>
            <h2 className="text-[24px] font-extrabold text-[#32324d] mb-2">Payment Successful</h2>
            <p className="text-[16px] text-[#8e8ea9] font-medium mb-6">UPI Payment Received • ₹{amount.toFixed(2)}</p>
            <div className="bg-[#f3f5f9] px-6 py-3 rounded-[16px] flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-[#24a44b] animate-pulse"></div>
               <span className="text-[14px] font-bold text-[#4a4a6a]">Table {tableNo} is now available</span>
            </div>
            <p className="text-[13px] text-[#8e8ea9] mt-8 animate-pulse">Returning to Dine-In...</p>
          </div>
        ) : (
          <>
            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
              
              {/* Left Side: QR Section */}
              <div className="flex-1 border-r border-[#f3f5f9] p-8 flex flex-col items-center justify-center bg-[#fafbfc]">
                <h3 className="text-[16px] font-bold text-[#32324d] mb-6">Scan QR to Pay</h3>
                
                <div className="bg-white p-4 rounded-[20px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.08)] mb-6 border border-[#eaeaef]">
                  <img src={qrUrl} alt="UPI QR Code" className="w-[200px] h-[200px] object-contain" />
                </div>
                
                <div className="flex flex-col gap-3 w-full max-w-[240px]">
                  <button 
                    onClick={handleDownloadQR}
                    className="w-full h-[48px] border border-[#eaeaef] bg-white text-[#4a4a6a] font-bold rounded-[16px] text-[14px] hover:bg-[#f3f5f9] hover:border-[#dcdce4] transition-all flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download QR
                  </button>
                  <button 
                    onClick={handleCopyUPI}
                    className="w-full h-[48px] border border-[#eaeaef] bg-white text-[#4a4a6a] font-bold rounded-[16px] text-[14px] hover:bg-[#f3f5f9] hover:border-[#dcdce4] transition-all flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy UPI ID
                  </button>
                </div>
              </div>

              {/* Right Side: Bill Details */}
              <div className="flex-1 p-6 flex flex-col overflow-y-auto custom-scrollbar bg-white">
                
                {/* Summary Box */}
                <div className="bg-[#fff7e8] rounded-[16px] p-5 mb-6 border border-[#ffb01d]/20">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[14px] font-semibold text-[#8e8ea9]">Order Number</span>
                    <span className="text-[14px] font-bold text-[#32324d]">#{orderId}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[14px] font-semibold text-[#8e8ea9]">Table / Date</span>
                    <span className="text-[14px] font-bold text-[#32324d]">{tableNo} • {date}</span>
                  </div>
                  <div className="w-full h-px border-t border-dashed border-[#ffb01d]/30 my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-bold text-[#32324d]">Total Amount</span>
                    <span className="text-[20px] font-extrabold text-[#ff7b2c]">₹{amount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Ordered Items */}
                <h4 className="text-[12px] font-bold text-[#8e8ea9] mb-3 uppercase tracking-wider">Ordered Items</h4>
                <div className="flex flex-col gap-2 mb-6">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-2 border-b border-[#f3f5f9] last:border-0 last:pb-0">
                      <span className="text-[14px] font-semibold text-[#4a4a6a]">{item.title} ×{item.quantity}</span>
                      <span className="text-[14px] font-bold text-[#32324d]">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Payment Link */}
                <h4 className="text-[12px] font-bold text-[#8e8ea9] mb-3 uppercase tracking-wider">Payment Link</h4>
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1 h-[44px] bg-[#f3f5f9] rounded-[12px] px-3 flex items-center overflow-hidden border border-[#eaeaef]">
                    <span className="text-[12px] text-[#666687] truncate font-semibold">{upiString}</span>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(upiString)}
                    className="w-[44px] h-[44px] bg-white border border-[#eaeaef] rounded-[12px] flex items-center justify-center text-[#4a4a6a] hover:bg-[#f3f5f9] hover:border-[#dcdce4] transition-colors shrink-0"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </button>
                </div>

                {/* Share */}
                <h4 className="text-[12px] font-bold text-[#8e8ea9] mb-3 uppercase tracking-wider">Share Bill</h4>
                <div className="flex gap-3 mb-4">
                  <button 
                    onClick={handleWhatsAppShare}
                    className="flex-1 h-[44px] border border-[#eaeaef] text-[#24a44b] font-bold rounded-[12px] text-[13px] hover:bg-[#b4efc6]/20 transition-all flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    WhatsApp
                  </button>
                  <button 
                    onClick={handleEmailShare}
                    className="flex-1 h-[44px] border border-[#eaeaef] text-[#6b4eff] font-bold rounded-[12px] text-[13px] hover:bg-[#d4cbfc]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Email
                  </button>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#eaeaef] flex gap-4 shrink-0 bg-[#fafbfc]">
              <button 
                onClick={onClose}
                className="flex-1 h-[54px] bg-white border border-[#eaeaef] text-[#4a4a6a] font-bold rounded-[16px] text-[16px] hover:bg-[#f3f5f9] hover:border-[#dcdce4] transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-[2] h-[54px] bg-[#ffb01d] text-white font-bold rounded-[16px] text-[16px] shadow-[0px_4px_20px_0px_rgba(255,176,29,0.3)] hover:bg-[#ffb01d]/90 transition-all active:scale-[0.98]"
              >
                Confirm Payment Received
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};



