import React from 'react';

/**
 * Isolated print component for thermal receipts (80mm width).
 * This component should only be visible during @media print.
 */
export const ReceiptPrintTemplate = ({ 
  orderId, 
  tableNo, 
  amount, 
  subtotal, 
  tax, 
  discount = 0, 
  items = [], 
  paymentMode, 
  date,
  upiString = ''
}) => {
  // Generate QR code URL if UPI
  const qrUrl = upiString 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiString)}&margin=0`
    : null;

  return (
    <div id="printable-receipt" className="print-only" style={{ display: 'none' }}>
      <div className="receipt-container" style={{ width: '80mm', backgroundColor: '#fff', color: '#000', fontFamily: 'monospace', padding: '10px', margin: '0 auto', fontSize: '12px', lineHeight: '1.4' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Annas Kitchen</h2>
          <p style={{ margin: '0' }}>123 Food Street, Flavor Town</p>
          <p style={{ margin: '0' }}>Phone: +91 9876543210</p>
          <p style={{ margin: '0' }}>GSTIN: 22AAAAA0000A1Z5</p>
        </div>

        <div style={{ borderTop: '1px dashed #000', margin: '10px 0' }}></div>

        {/* Order Info */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Order No:</span>
            <span style={{ fontWeight: 'bold' }}>#{orderId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Table:</span>
            <span>{tableNo || 'Walk-in'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Date:</span>
            <span>{date || new Date().toLocaleString()}</span>
          </div>
        </div>

        <div style={{ borderTop: '1px dashed #000', margin: '10px 0' }}></div>

        {/* Items */}
        <div style={{ marginBottom: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #000', paddingBottom: '4px' }}>Item</th>
                <th style={{ textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '4px' }}>Qty</th>
                <th style={{ textAlign: 'right', borderBottom: '1px solid #000', paddingBottom: '4px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ paddingTop: '4px', verticalAlign: 'top' }}>
                    {item.title}
                    {item.specialInstructions && (
                      <div style={{ fontSize: '10px', fontStyle: 'italic', marginLeft: '5px' }}>
                        - {JSON.stringify(item.specialInstructions)}
                      </div>
                    )}
                  </td>
                  <td style={{ paddingTop: '4px', textAlign: 'center', verticalAlign: 'top' }}>{item.quantity}</td>
                  <td style={{ paddingTop: '4px', textAlign: 'right', verticalAlign: 'top' }}>{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ borderTop: '1px dashed #000', margin: '10px 0' }}></div>

        {/* Totals */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
            <span>Subtotal:</span>
            <span>{subtotal?.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
            <span>Taxes (8%):</span>
            <span>{tax?.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>Discount:</span>
              <span>-{discount.toFixed(2)}</span>
            </div>
          )}
          
          <div style={{ borderTop: '1px solid #000', margin: '5px 0' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
            <span>GRAND TOTAL:</span>
            <span>₹{amount?.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ borderTop: '1px dashed #000', margin: '10px 0' }}></div>

        {/* Payment Mode & QR */}
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <p style={{ margin: '0 0 10px 0' }}>Payment Mode: <strong>{paymentMode}</strong></p>
          
          {paymentMode === 'Upi' && qrUrl && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '10px' }}>Scan to Pay</p>
              <img src={qrUrl} alt="UPI QR Code" style={{ width: '120px', height: '120px' }} />
              <p style={{ margin: '5px 0 0 0', fontSize: '10px' }}>Ref: {orderId}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>Thank You For Visiting!</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '10px' }}>Have a nice day!</p>
        </div>

      </div>
    </div>
  );
};
