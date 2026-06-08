import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FinanceSummaryCard } from '../../Cashier/components/Finance/FinanceSummaryCard/FinanceSummaryCard';
import { OrderHistoryCard } from '../components/OrderHistoryCard/OrderHistoryCard';

const imgFrame = "http://localhost:3845/assets/33e4449c59fc3d2f2bea3c360aba404be2ccafb8.svg";
const imgFrame1 = "http://localhost:3845/assets/77d68fadc894812e20aed492e31a68e760cadf4b.svg";
const imgFrame2 = "http://localhost:3845/assets/c0ca9999982e4c6ce5edb4c9404a9eda320f84b0.svg";

export const OrderHistoryPage = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  
  const completedOrders = useSelector(state => state.orderHistory.completedOrders || []);

  const filteredOrders = useMemo(() => {
    let orders = [...completedOrders];

    // Filter by date
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    
    // Calculate week start (Sunday)
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    // Calculate month start
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    orders = orders.filter(o => {
      const orderTime = new Date(o.completedAt || o.orderStartTime).getTime();
      if (activeTab === 'Today') return orderTime >= today;
      if (activeTab === 'This week') return orderTime >= weekStart.getTime();
      if (activeTab === 'This month') return orderTime >= monthStart;
      return true;
    });

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      orders = orders.filter(o => {
        return String(o.id).toLowerCase().includes(q) ||
               (o.kotNumber && String(o.kotNumber).toLowerCase().includes(q)) ||
               (o.tableNumber && String(o.tableNumber).toLowerCase().includes(q)) ||
               (o.customerName && String(o.customerName).toLowerCase().includes(q));
      });
    }

    return orders.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  }, [completedOrders, activeTab, searchQuery]);

  // Compute KPIs
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.finalAmount || 0), 0);
  const avgOrder = filteredOrders.length > 0 ? (totalRevenue / filteredOrders.length) : 0;
  
  // Calculate Today's Revenue specifically for the "Today's Revenue" card, regardless of the active tab.
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todaysRevenue = completedOrders
    .filter(o => new Date(o.completedAt || o.orderStartTime).getTime() >= todayStart.getTime())
    .reduce((sum, o) => sum + (o.finalAmount || 0), 0);

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex flex-col w-full h-full relative pl-[19px] pt-[45px] pb-[40px] overflow-y-auto">
      
      {/* Summary Cards Row */}
      <div className="flex gap-[26px]">
        <FinanceSummaryCard 
          title="Total Orders" 
          amount={filteredOrders.length.toString()} 
          icon={imgFrame} 
          bgClass="bg-[#F6F6F9]" 
        />
        <FinanceSummaryCard 
          title="Completed Orders" 
          amount={filteredOrders.length.toString()} 
          icon={imgFrame1} 
          bgClass="bg-[#F6F6F9]" 
        />
        <FinanceSummaryCard 
          title="Today's Revenue" 
          amount={`₹${formatCurrency(todaysRevenue)}`} 
          icon={imgFrame2} 
          bgClass="bg-[#F6F6F9]" 
        />
        <FinanceSummaryCard 
          title="Average Order Value" 
          amount={`₹${formatCurrency(avgOrder)}`} 
          icon={imgFrame} 
          bgClass="bg-[#F6F6F9]" 
        />
      </div>

      {/* Search Section */}
      <div className="mt-[30px] w-[799px] h-[54px] bg-white border border-[#EAEAEF] rounded-[16px] px-[16px] py-[12px] flex items-center gap-[10px]">
        {/* Left Search Icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <circle cx="8.5" cy="8.5" r="6" stroke="#8E8EA9" strokeWidth="1.5" />
          <path d="M14 14L18 18" stroke="#8E8EA9" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by order ID, KOT, Table, Customer"
          className="flex-1 outline-none text-subtitle-3 font-semibold text-[#8E8EA9] placeholder:text-[#8E8EA9] bg-transparent"
        />
        {/* Right Filter Icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
           <path d="M7 2H13M2 7H18M3 7L17 7" stroke="#666687" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Filter Tabs */}
      <div className="mt-[26px] flex gap-[8px] h-[44px]">
        {['Today', 'This week', 'This month'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center justify-center px-[14px] py-[12px] rounded-[16px] text-subtitle-2 transition-colors ${
              activeTab === tab 
                ? 'bg-[#FFB01D] text-white' 
                : 'bg-transparent text-[#666687] hover:bg-[#F3F5F9]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order History List */}
      <div className="mt-[18px] ml-[6px] flex flex-col gap-[18px]">
        {filteredOrders.length === 0 ? (
          <div className="text-[#8E8EA9] text-[16px] mt-10 ml-4 font-medium">
            No completed orders found for {activeTab.toLowerCase()}.
          </div>
        ) : (
          filteredOrders.map(order => {
            const dateObj = new Date(order.completedAt || order.orderStartTime);
            const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')} ${dateObj.toLocaleString('en-US', { month: 'short' })} • ${dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase()} by ${order.cashier || 'Cashier'}`;
            const guestCount = order.items ? order.items.reduce((s, i) => s + (i.quantity || 1), 0) : 0;
            const tableStr = order.type === 'Takeaway' ? 'Takeaway' : (order.tableNumber ? `Table ${order.tableNumber}` : 'Walk-in');

            return (
              <OrderHistoryCard 
                key={order.id}
                orderId={`ORD-${order.id}`}
                amount={order.finalAmount}
                tableInfo={`${tableStr} • ${order.kotNumber}`}
                serverName={order.cashier || "Cashier"}
                paymentMethod={order.paymentMode || "Cash"}
                guests={guestCount}
                duration={order.duration || "45 min"}
                dateInfo={formattedDate}
              />
            );
          })
        )}
      </div>

    </div>
  );
};



