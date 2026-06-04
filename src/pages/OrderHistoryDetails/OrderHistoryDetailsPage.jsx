import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OrderMetaInfo } from '../../components/orders/OrderMetaInfo/OrderMetaInfo';
import { OrderSummaryCard } from '../../components/orders/OrderSummaryCard/OrderSummaryCard';

export const OrderHistoryDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const rawId = orderId?.replace('ORD-', '');
  const order = useSelector(state => 
    state.orderHistory.completedOrders.find(o => String(o.id) === String(rawId))
  );

  if (!order) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center bg-[#fafafc]">
        <h2 className="text-[20px] font-bold text-[#666687] mb-2">Order Not Found</h2>
        <button onClick={() => navigate(-1)} className="text-[#ffb01d] font-bold">Go Back</button>
      </div>
    );
  }

  const dateObj = new Date(order.completedAt || order.orderStartTime);
  const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')} ${dateObj.toLocaleString('en-US', { month: 'short' })} • ${dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase()} by ${order.cashier || 'Cashier'}`;
  const guestCount = order.items ? order.items.reduce((s, i) => s + (i.quantity || 1), 0) : 0;
  const tableStr = order.type === 'Takeaway' ? 'Takeaway' : (order.tableNumber ? `Table ${order.tableNumber}` : 'Walk-in');

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(order, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `Invoice_ORD-${order.id}.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="flex flex-col w-full h-full relative pl-[26px] pt-[45px] pb-[40px] overflow-y-auto">
      
      {/* Top Header Section */}
      <div className="flex justify-between items-start w-[999px]">
        {/* Order Info */}
        <div className="flex flex-col gap-[9px]">
          <h2 className="text-subtitle-3 font-bold text-[#32324D]">ORD-{order.id}</h2>
          <span className="text-label-active font-semibold text-[#8E8EA9]">{tableStr} • {order.kotNumber}</span>
        </div>

        {/* Export Button */}
        <button onClick={handleExport} className="bg-[#FFB01D] text-white flex items-center justify-center px-[24px] py-[16px] rounded-[16px] w-[161px] hover:opacity-90 transition-opacity">
          <span className="text-button-md text-white font-bold">Export JSON</span>
        </button>
      </div>

      {/* Metadata Row */}
      <div className="mt-[20px]">
        <OrderMetaInfo 
          guests={guestCount.toString()} 
          duration={order.duration || "45 min"} 
          dateInfo={formattedDate} 
        />
      </div>

      {/* Ordered Items List (Item Audit) */}
      <div className="mt-[30px] w-[999px] bg-white border border-[#EAEAEF] rounded-[16px] p-6 shadow-sm">
        <h3 className="text-[18px] font-bold text-[#32324D] mb-4 border-b border-[#EAEAEF] pb-2">Ordered Items</h3>
        <div className="flex flex-col gap-4">
          {order.items?.map((item, idx) => {
            const itemKotIdx = order.kots?.findIndex(k => k.items.some(ki => ki.id === item.id));
            const roundStr = itemKotIdx >= 0 ? `KOT Round ${itemKotIdx + 1}` : '';
            const serveQty = item.fulfillment?.dine_in || item.quantity;
            const packQty = item.fulfillment?.take_away || 0;

            return (
              <div key={idx} className="flex justify-between items-center bg-[#F3F5F9] p-4 rounded-[12px]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#32324D] text-[15px]">{item.title}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {serveQty > 0 && (
                      <span className="text-[#666687] text-[13px] font-medium bg-white px-2 py-0.5 rounded border border-[#EAEAEF]">
                        Serve x{serveQty}
                      </span>
                    )}
                    {packQty > 0 && (
                      <span className="bg-[#ffb01d]/10 text-[#ffb01d] px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                        Pack x{packQty}
                      </span>
                    )}
                    {roundStr && (
                      <span className="text-[#8E8EA9] text-[12px] font-medium">• {roundStr}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-[#32324D] text-[15px]">₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
                  <span className="text-[#8E8EA9] text-[13px] font-medium">₹{Number(item.price).toFixed(2)} / unit</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KOT Audit Section */}
      {order.kots && order.kots.length > 0 && (
        <div className="mt-[24px] w-[999px] bg-white border border-[#EAEAEF] rounded-[16px] p-6 shadow-sm">
          <h3 className="text-[18px] font-bold text-[#32324D] mb-4 border-b border-[#EAEAEF] pb-2">KOT History</h3>
          <div className="flex flex-col gap-4">
            {order.kots.map((kot, kIdx) => {
              const kotTimeObj = new Date(kot.createdAt);
              const kotTimeStr = `${kotTimeObj.getDate().toString().padStart(2, '0')} ${kotTimeObj.toLocaleString('en-US', { month: 'short' })} ${kotTimeObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase()}`;
              
              return (
                <div key={kIdx} className="flex flex-col bg-[#F3F5F9] p-4 rounded-[12px]">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#EAEAEF]">
                    <span className="font-bold text-[#32324D] text-[15px]">KOT Round {kIdx + 1}</span>
                    <span className="text-[#8E8EA9] text-[13px] font-medium">{kotTimeStr}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {kot.items?.map((ki, iIdx) => (
                      <div key={iIdx} className="flex justify-between items-center">
                        <span className="text-[#32324D] text-[14px] font-medium">{ki.title}</span>
                        <div className="flex gap-2">
                          {((ki.fulfillment?.dine_in || ki.quantity) > 0) && (
                            <span className="text-[#666687] text-[12px] font-medium bg-white px-2 py-0.5 rounded border border-[#EAEAEF]">
                              Serve x{ki.fulfillment?.dine_in || ki.quantity}
                            </span>
                          )}
                          {(ki.fulfillment?.take_away > 0) && (
                            <span className="bg-[#ffb01d]/10 text-[#ffb01d] px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                              Pack x{ki.fulfillment.take_away}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order Timeline */}
      {order.timeline && order.timeline.length > 0 && (
        <div className="mt-[24px] w-[999px] bg-white border border-[#EAEAEF] rounded-[16px] p-6 shadow-sm">
          <h3 className="text-[18px] font-bold text-[#32324D] mb-4 border-b border-[#EAEAEF] pb-2">Order Timeline</h3>
          <div className="flex flex-col gap-3">
            {order.timeline.map((event, eIdx) => (
              <div key={eIdx} className="flex items-center gap-4">
                <span className="text-[#8E8EA9] text-[13px] font-bold w-[70px]">{event.time}</span>
                <span className="text-[#32324D] text-[14px] font-medium">{event.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Audit & Shift Audit Container */}
      <div className="mt-[24px] w-[999px] flex gap-[24px]">
        
        {/* Payment Audit (reusing OrderSummaryCard logic but expanded) */}
        <div className="flex-1 bg-white border border-[#EAEAEF] rounded-[16px] p-6 shadow-sm">
          <h3 className="text-[18px] font-bold text-[#32324D] mb-4 border-b border-[#EAEAEF] pb-2">Payment Audit</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Subtotal</span><span className="font-bold text-[#32324D]">₹{(order.subtotal || 0).toFixed(2)}</span></div>
            <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Tax (8%)</span><span className="font-bold text-[#32324D]">₹{(order.tax || 0).toFixed(2)}</span></div>
            {(order.discount > 0) && (
              <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Discount</span><span className="font-bold text-[#EF4444]">-₹{(order.discount || 0).toFixed(2)}</span></div>
            )}
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-dashed border-[#EAEAEF]"><span className="text-[#32324D] font-bold">Grand Total</span><span className="font-bold text-[16px] text-[#32324D]">₹{(order.finalAmount || 0).toFixed(2)}</span></div>
            
            <div className="flex justify-between items-center mt-4"><span className="text-[#8E8EA9] font-medium">Payment Method</span><span className="font-bold text-[#32324D]">{order.paymentMode || 'Cash'}</span></div>
            
            {order.paymentDetails && (
              <>
                <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Cash Received</span><span className="font-bold text-[#32324D]">₹{(order.paymentDetails.customerPaidAmount || 0).toFixed(2)}</span></div>
                <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Change Returned</span><span className="font-bold text-[#32324D]">₹{(order.paymentDetails.changeReturned || 0).toFixed(2)}</span></div>
              </>
            )}
          </div>
        </div>

        {/* Shift & Table Audit */}
        <div className="flex-1 flex flex-col gap-[24px]">
          <div className="bg-white border border-[#EAEAEF] rounded-[16px] p-6 shadow-sm">
            <h3 className="text-[18px] font-bold text-[#32324D] mb-4 border-b border-[#EAEAEF] pb-2">Shift Audit</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Cashier Name</span><span className="font-bold text-[#32324D]">{order.cashier || 'Cashier'}</span></div>
              <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Shift Name</span><span className="font-bold text-[#32324D]">{order.shift || 'Morning Shift'}</span></div>
            </div>
          </div>
          <div className="bg-white border border-[#EAEAEF] rounded-[16px] p-6 shadow-sm">
            <h3 className="text-[18px] font-bold text-[#32324D] mb-4 border-b border-[#EAEAEF] pb-2">Table Audit</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Table Number</span><span className="font-bold text-[#32324D]">{order.tableNumber || 'Walk-in'}</span></div>
              <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Guest Count</span><span className="font-bold text-[#32324D]">{order.tableAudit?.guestCount || guestCount}</span></div>
              <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Order Duration</span><span className="font-bold text-[#32324D]">{order.duration || '45 min'}</span></div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Takeaway Audit */}
      {order.takeawayAudit && (
        <div className="mt-[24px] w-[999px] bg-white border border-[#EAEAEF] rounded-[16px] p-6 shadow-sm">
          <h3 className="text-[18px] font-bold text-[#32324D] mb-4 border-b border-[#EAEAEF] pb-2">Takeaway Audit</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Token Number</span><span className="font-bold text-[#32324D]">{order.takeawayAudit.tokenNumber}</span></div>
            <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Status</span><span className="font-bold text-[#10B981]">{order.takeawayAudit.status}</span></div>
            <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Packed Time</span><span className="font-bold text-[#32324D]">{order.takeawayAudit.packedTime}</span></div>
            <div className="flex justify-between items-center"><span className="text-[#8E8EA9] font-medium">Handed Over Time</span><span className="font-bold text-[#32324D]">{order.takeawayAudit.handedOverTime}</span></div>
          </div>
        </div>
      )}

      {/* Legacy Summary Card (Hidden) */}
      <div className="hidden">
        <OrderSummaryCard 

          totalAmount={(order.subtotal || 0).toFixed(2)}
          tax={(order.tax || 0).toFixed(2)}
          discount={(order.discount || 0) > 0 ? `-${(order.discount || 0).toFixed(2)}` : "0.00"}
          totalPrice={(order.finalAmount || 0).toFixed(2)}
          discountNote={order.discount > 0 ? "Discount applied" : ""}
          paymentType={order.paymentMode || "Cash"}
        />
      </div>

    </div>
  );
};
