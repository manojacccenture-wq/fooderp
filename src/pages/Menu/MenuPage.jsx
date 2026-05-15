import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { ProductCard } from '../../components/cards/ProductCard/ProductCard';
import image1 from "../../assets/menu/avocadoSandwich.png";
import image2 from "../../assets/menu/non-veg-thali.png";
import image3 from "../../assets/menu/veg-thali.png";
import image4 from "../../assets/menu/paneer.png";
import { SplitOrderModal } from '../../components/orders/SplitOrderModal/SplitOrderModal';
import { ApplyDiscountModal } from '../../components/orders/ApplyDiscountModal/ApplyDiscountModal';

const imgAvocadoSandwich = image1;
const imgAvocadoSandwich1 = image2;
const imgAvocadoSandwich2 = image3;
const imgAvocadoSandwich3 = image4;

const OrderItem = ({ image, title, price, quantity, onIncrease, onDecrease, onRemove, onSplit, onReplace, showDelete }) => {
  return (
    <div className="bg-white border border-[#faa300] rounded-2xl p-3 flex gap-3 items-center shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] relative">
      <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-[14px] leading-[22px] text-[#32324d] font-semibold">{title}</span>
        <div className="flex items-center gap-2 mt-1">
          <button onClick={onDecrease} className="w-6 h-6 rounded-[12.5px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <span className="text-[14px] font-semibold text-[#666687] min-w-[9px] text-center">{quantity}</span>
          <button onClick={onIncrease} className="w-7 h-7 rounded-[14px] bg-[#fff2ea] flex items-center justify-center text-[#666687] cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
      <div className="absolute right-3 top-3 flex gap-[6px]">
        {onSplit && (
          <div onClick={onSplit} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#666687]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13.3333 2.5H17.4999V6.66667" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.66667 2.5H2.5V6.66667" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10 18.3333V11.4167C10.0048 10.9728 9.92082 10.5325 9.75311 10.1215C9.5854 9.71049 9.33728 9.33714 9.02333 9.02333L2.5 2.5" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.5 7.5L17.5 2.5" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        )}
        {onReplace && (
          <div onClick={onReplace} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#ffb01d]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C12.0967 2.50789 14.1092 3.32602 15.6167 4.78333L17.5 6.66667" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.4999 2.5V6.66667H13.3333" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.5 10C17.5 11.9891 16.7098 13.8968 15.3033 15.3033C13.8968 16.7098 11.9891 17.5 10 17.5C7.90329 17.4921 5.89081 16.674 4.38333 15.2167L2.5 13.3333" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.66667 13.334H2.5V17.5007" stroke="#666687" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        )}
        {showDelete && onRemove && (
          <div onClick={onRemove} className="w-5 h-5 flex items-center justify-center cursor-pointer text-[#8e8ea9] hover:text-[#e23744]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8.33325 9.16602V14.166" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M11.6667 9.16602V14.166" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.8334 5V16.6667C15.8334 17.1087 15.6578 17.5326 15.3453 17.8452C15.0327 18.1577 14.6088 18.3333 14.1667 18.3333H5.83341C5.39139 18.3333 4.96746 18.1577 4.6549 17.8452C4.34234 17.5326 4.16675 17.1087 4.16675 16.6667V5" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2.5 5H17.5" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.66675 4.99935V3.33268C6.66675 2.89065 6.84234 2.46673 7.1549 2.15417C7.46746 1.84161 7.89139 1.66602 8.33341 1.66602H11.6667C12.1088 1.66602 12.5327 1.84161 12.8453 2.15417C13.1578 2.46673 13.3334 2.89065 13.3334 3.33268V4.99935" stroke="#666687" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div className="absolute right-3 bottom-3 flex items-end gap-[2px]">
        <span className="text-[12px] font-bold text-[#ffb080] pb-[1px]">₹</span>
        <span className="text-[16px] font-extrabold text-[#ff7b2c]">{price}</span>
      </div>
    </div>
  );
};

export const MenuPage = () => {
  const searchRef = useRef(null);

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState("All Dishes");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // States lifted to MenuPage
  const [orderItems, setOrderItems] = useState([
    { id: 1, image: imgAvocadoSandwich1, title: "Chicken Biriyani", price: 120, quantity: 2 },
    { id: 2, image: imgAvocadoSandwich1, title: "Non veg thali", price: 120, quantity: 2 }
  ]);
  const [heldItems, setHeldItems] = useState([]);

  // View states
  const [kotStatus, setKotStatus] = useState('idle'); // 'idle' | 'success_anim' | 'sent'
  const [rightView, setRightView] = useState('order'); // 'order' | 'checkout'
  const [centerView, setCenterView] = useState('menu'); // 'menu' | 'cancel_item' | 'replace_item'

  const [selectedItemForAction, setSelectedItemForAction] = useState(null);

  // Modals & Discount
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const categories = [
    { label: "All Dishes", active: true },
    { label: "Veg", active: false },
    { label: "Non Veg", active: false },
    { label: "Desert", active: false },
  ];

  const products = [
    { itemNo: "401", title: "Mutton Gravy", price: "160", isVeg: false, quantity: 3, image: imgAvocadoSandwich },
    { itemNo: "402", title: "Non veg thali", price: "120", isVeg: false, quantity: 0, image: imgAvocadoSandwich1 },
    { itemNo: "203", title: "Veg Thali", price: "160", isVeg: true, quantity: 0, image: imgAvocadoSandwich2 },
    { itemNo: "204", title: "Panner Gravy", price: "160", isVeg: true, quantity: 0, image: imgAvocadoSandwich3 },
  ];

  // CTRL + S functionality
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === '1') setActiveCategory("All Dishes");
      if (e.key === '2') setActiveCategory("Veg");
      if (e.key === '3') setActiveCategory("Non Veg");
      if (e.key === '4') setActiveCategory("Desert");
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const firstChar = search.trim().charAt(0);
    if (firstChar === '2') setActiveCategory("Veg");
    else if (firstChar === '4') setActiveCategory("Non Veg");
    else if (firstChar === '5') setActiveCategory("Desert");
    else if (search.trim() === '') setActiveCategory("All Dishes");
  }, [search]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (activeCategory === "Veg") filtered = filtered.filter(p => p.itemNo.startsWith('2'));
    if (activeCategory === "Non Veg") filtered = filtered.filter(p => p.itemNo.startsWith('4'));
    if (activeCategory === "Desert") filtered = filtered.filter(p => p.itemNo.startsWith('5'));
    if (search.trim()) {
      const searchValue = search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchValue) ||
        product.itemNo.toLowerCase().startsWith(searchValue)
      );
    }
    return filtered;
  }, [search, activeCategory, products]);

  // Order Handlers
  const handleIncrease = (id) => {
    setOrderItems(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };
  const handleDecrease = (id) => {
    setOrderItems(prev => prev.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };
  const handleRemove = (id) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
  };
  const handleSplitClick = (item) => {
    setSelectedItemForAction(item);
    setIsSplitModalOpen(true);
  };
  const handleReplaceClick = (item) => {
    setSelectedItemForAction(item);
    setCenterView('cancel_item');
  };

  const handleConfirmSplit = ({ item, kitchenQty, heldQty, reason }) => {
    if (kitchenQty > 0) {
      setOrderItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: kitchenQty } : i));
    } else {
      setOrderItems(prev => prev.filter(i => i.id !== item.id));
    }
    if (heldQty > 0) {
      setHeldItems(prev => {
        const existing = prev.find(i => i.id === item.id);
        if (existing) {
          return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + heldQty } : i);
        }
        return [...prev, { ...item, quantity: heldQty }];
      });
    }
  };

  const handleSendKOT = () => {
    setKotStatus('success_anim');
    setTimeout(() => {
      setKotStatus('sent');
    }, 2000);
  };

  // Calculations
  const totalAmount = orderItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  const tax = totalAmount > 0 ? totalAmount * 0.05 : 0;
  const finalPrice = totalAmount + tax - discountAmount;
  const totalHeldPrice = heldItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  const isSplitView = heldItems.length > 0;

  // Render components
  const renderMenuContent = (isReplaceMode = false) => (
    <>
      <div className={clsx(
        "w-full max-w-[769px] h-[54px] bg-white border rounded-[16px] flex items-center px-4 py-3 mb-8 transition-colors",
        isSearchFocused ? "border-[#ffb01d]" : "border-[#eaeaef]"
      )}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E8EA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search by Item No or Product Name"
          className="flex-1 bg-transparent border-none outline-none text-[14px] text-[#666687] placeholder:text-[#8e8ea9]"
        />
        <div className="ml-3 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(cat.label)}
            className={clsx(
              "px-[16px] py-[10px] rounded-[16px] text-[14px] font-bold whitespace-nowrap transition-colors",
              activeCategory === cat.label
                ? 'bg-[#ffb01d] text-white'
                : 'bg-transparent text-[#666687] hover:bg-[#f3f5f9]'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-[18px] font-bold text-[#4a4a6a] mb-1">Top 10 Today</h2>
        <div className="flex gap-4 flex-wrap max-w-[751px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p, index) => (
              <div key={index} onClick={() => {
                if (isReplaceMode && selectedItemForAction) {
                  // Replace flow
                  setOrderItems(prev => prev.map(i => i.id === selectedItemForAction.id ? { ...p, id: i.id, quantity: i.quantity } : i));
                  setCenterView('menu');
                }
              }} className={isReplaceMode ? "cursor-pointer" : ""}>
                <ProductCard {...p} quantity={isReplaceMode ? 0 : p.quantity} />
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center py-10">
              <span className="text-[#8e8ea9] text-[14px]">No products found</span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex w-full h-full relative">

      {/* Center Main Panel */}
      <div className="flex-1 flex flex-col p-8 pl-6">

        {centerView === 'menu' && renderMenuContent()}

        {(centerView === 'cancel_item' || centerView === 'replace_item') && selectedItemForAction && (
          <div className="flex flex-col h-full w-full max-w-[769px]">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setCenterView('cancel_item')}
                className={clsx("px-6 py-[10px] rounded-[16px] font-bold text-[16px]", centerView === 'cancel_item' ? "bg-[#e23744] text-white" : "bg-[#ffb01d] text-white")}
                style={centerView !== 'cancel_item' ? { opacity: 0.5 } : {}}
              >
                Cancel Item
              </button>
              <button
                onClick={() => setCenterView('replace_item')}
                className={clsx("px-6 py-[10px] rounded-[16px] font-bold text-[16px]", centerView === 'replace_item' ? "bg-[#ffb01d] text-white" : "bg-[#ffb01d] text-white")}
                style={centerView !== 'replace_item' ? { opacity: 100 } : {}}
              >
                Replace Item
              </button>
            </div>

            {centerView === 'cancel_item' && (
              <div className="flex flex-col gap-6 w-full max-w-[400px]">
                <div className="grid grid-cols-2 gap-[10px]">
                  {["Customer change mind", "Item out of stock", "Kitchen unable to prepare", "Wrong item ordered", "Item Issue", "Duplicate order", "Customer request", "Other"].map(reason => (
                    <button key={reason} className="h-[36px] bg-[#f3f5f9] text-[#4a4a6a] text-[10px] font-bold rounded-[8px] hover:bg-[#eaeaef]">
                      {reason}
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Additional remarks"
                  className="w-full h-[120px] border border-[#eaeaef] rounded-[16px] p-4 text-[14px] font-semibold text-[#32324d] outline-none resize-none placeholder:text-[#8e8ea9]"
                ></textarea>
                <div className="flex gap-4">
                  <button className="flex-1 py-[12px] bg-[#eaeaef] text-[#4a4a6a] font-bold rounded-[16px] text-[14px]" onClick={() => setCenterView('menu')}>Cancel</button>
                  <button className="flex-1 py-[12px] bg-[#e23744] text-white font-bold rounded-[16px] text-[14px]" onClick={() => {
                    setOrderItems(prev => prev.filter(i => i.id !== selectedItemForAction.id));
                    setCenterView('menu');
                  }}>Confirm Cancellation</button>
                </div>
              </div>
            )}

            {centerView === 'replace_item' && (
              <div className="flex flex-col gap-6 w-full">
                <div className="bg-[#ffc861]/20 border border-[#ffb01d] rounded-[16px] p-4 text-[#32324d] font-semibold text-[14px]">
                  Replace Item: The original item will be replaced with a new item without cancellation. The order amount will be adjusted accordingly.
                </div>
                {renderMenuContent(true)}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Right Panel */}
      <div className="w-[354px] h-full max-h-screen bg-white border-l border-[#f3f5f9] flex flex-col relative shrink-0">

        {rightView === 'order' && (
          <div className="flex-1 overflow-y-auto pb-4 flex flex-col">

            {/* Header */}
            <div className="bg-[#fff7e8] flex items-center justify-between p-3 mt-[2px] mx-[1px]">
              <div className="flex flex-col gap-[2px]">
                <span className="text-[18px] font-semibold text-[#32324d] leading-[22px]">Current order</span>
                <span className="text-[12px] text-[#4a4a6a]">Order no : 12345</span>
              </div>
              <div className="flex gap-[10px]">
                <button className="bg-[#e23744] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold" onClick={() => { setOrderItems([]); setHeldItems([]); setKotStatus('idle'); }}>Cancel order</button>
                <button className="bg-[#ffb01d] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold">Pause</button>
              </div>
            </div>

            {kotStatus === 'success_anim' ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <span className="text-[14px] font-bold text-[#24a44b] mb-12">Order has been sent to Kot sucessfully</span>
                <div className="relative w-[150px] h-[150px] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#b4efc6] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40"></div>
                  <div className="absolute inset-4 rounded-full border border-[#24a44b]/30 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60"></div>
                  <div className="w-[70px] h-[70px] bg-[#b4efc6]/40 rounded-full flex items-center justify-center relative z-10">
                    <div className="w-[44px] h-[44px] bg-[#24a44b] rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(36,164,75,0.3)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="px-4 mt-4 flex flex-col gap-4">
                  {orderItems.map((item) => (
                    <OrderItem
                      key={`curr-${item.id}`}
                      image={item.image}
                      title={item.title}
                      price={item.price}
                      quantity={item.quantity}
                      onIncrease={() => handleIncrease(item.id)}
                      onDecrease={() => handleDecrease(item.id)}
                      onRemove={() => handleRemove(item.id)}
                      onSplit={() => handleSplitClick(item)}
                      onReplace={kotStatus === 'sent' ? () => handleReplaceClick(item) : undefined}
                      showDelete={kotStatus === 'idle'}
                    />
                  ))}
                  {orderItems.length === 0 && (
                    <span className="text-sm text-[#8e8ea9] text-center my-4">No items in the order.</span>
                  )}
                </div>

                {isSplitView ? (
                  <div className="mt-8 px-4">
                    <div className="bg-[#ffc861]/20 border border-[#ff9556] rounded-[16px] overflow-hidden shadow-[0px_0px_1px_0px_rgba(12,26,75,0.03),0px_4px_20px_0px_rgba(50,50,71,0.04)]">
                      <div className="flex justify-between items-center p-3">
                        <span className="text-[16px] font-bold text-[#4a4a6a]">Held Items</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[12px] font-bold text-[#ff9556] mb-[2px]">₹</span>
                          <span className="text-[16px] font-extrabold text-[#ff9556]">{totalHeldPrice}</span>
                        </div>
                      </div>
                      <div className="p-3 pt-0 flex flex-col gap-4">
                        {heldItems.map((item) => (
                          <div key={`held-${item.id}`} className="flex items-center gap-3">
                            <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col">
                              <span className="text-[14px] font-semibold text-[#32324d]">{item.title}</span>
                              <span className="text-[14px] font-semibold text-[#666687]">{item.quantity} Quantity</span>
                            </div>
                            <button className="bg-[#ffb01d] text-white rounded-[16px] px-4 py-[8px] text-[12px] font-bold shadow-[0px_4px_20px_0px_rgba(50,50,71,0.02)]">
                              Send now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="px-4 mt-6">
                      <h3 className="text-[16px] font-bold text-[#32324d] mb-4">Order Type :</h3>
                      <div className="flex gap-4">
                        <button className="bg-[#ffb01d] text-white rounded-[16px] px-4 py-[12px] font-bold text-[16px]">Dine In</button>
                        <button className="bg-transparent text-[#212134] rounded-[16px] px-4 py-[12px] font-bold text-[16px]">Take away</button>
                      </div>
                      <div className="grid grid-cols-4 gap-[16px] mt-6">
                        {['01', '02', '03', '04', '05', '06', '07', '08'].map((num) => {
                          let borderColor = '#b4efc6';
                          let textColor = '#24a44b';
                          if (num === '01') { borderColor = '#faa300'; textColor = '#faa300'; }
                          if (num === '06' || num === '08') { borderColor = '#e23744'; textColor = '#e23744'; }
                          return (
                            <button key={num} className="h-[54px] border rounded-[16px] flex items-center justify-center font-bold text-[14px]" style={{ borderColor, color: textColor }}>{num}</button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="px-4 mt-8 flex flex-col gap-[16px]">
                      <input type="text" defaultValue="9629917347" className="w-full h-[54px] border border-[#ff7b2c] rounded-[16px] px-4 text-[#8e8ea9] font-semibold text-[14px] outline-none" />
                      <input type="text" placeholder="Guests" className="w-full h-[54px] border border-[#eaeaef] rounded-[16px] px-4 text-[#8e8ea9] font-semibold text-[14px] outline-none" />
                      <textarea placeholder="Special Instructions...." className="w-full h-[120px] border border-[#eaeaef] rounded-[16px] p-4 text-[#8e8ea9] font-semibold text-[14px] outline-none resize-none"></textarea>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {rightView === 'checkout' && (
          <div className="flex-1 overflow-y-auto pb-4 flex flex-col">
            <div className="bg-[#fff7e8] flex items-center justify-between p-3 mt-[2px] mx-[1px]">
              <div className="flex flex-col gap-[2px]">
                <span className="text-[18px] font-semibold text-[#32324d] leading-[22px]">Current order</span>
                <span className="text-[12px] text-[#4a4a6a]">Order no : 12345</span>
              </div>
              <div className="flex gap-[10px]">
                <button className="bg-[#e23744] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold" onClick={() => { setOrderItems([]); setHeldItems([]); setRightView('order'); setKotStatus('idle'); }}>Cancel order</button>
                <button className="bg-[#ffb01d] text-white rounded-[16px] px-3 py-2 text-[12px] font-bold">Pause</button>
              </div>
            </div>

            <div className="px-4 mt-6">
              <div className="bg-white rounded-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] p-4 flex flex-col gap-3 border border-[#f3f3f5]">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-semibold text-[#666687]">Total Amount</span>
                  <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-semibold text-[#666687]">Tax</span>
                  <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{tax.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] font-semibold text-[#666687]">Apply Discount</span>
                    <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>-{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="w-full h-px border-t border-dashed border-[#eaeaef] my-1"></div>
                <div className="flex justify-between items-center">
                  <span className="text-[16px] font-bold text-[#32324d]">Total price</span>
                  <span className="text-[16px] font-extrabold text-[#ff7b2c] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{finalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <span className="text-[14px] font-semibold text-[#666687] block mb-3">Split bill</span>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-[16px] bg-[#f3f5f9] text-[#32324d] text-[12px] font-bold hover:bg-[#eaeaef]">Full Bill</button>
                  <button className="flex-1 py-2 rounded-[16px] bg-[#ffb01d] text-white text-[12px] font-bold">Equal Split</button>
                  <button className="flex-1 py-2 rounded-[16px] bg-[#f3f5f9] text-[#32324d] text-[12px] font-bold hover:bg-[#eaeaef]">By Item</button>
                </div>
                <span className="text-[12px] text-[#8e8ea9] block mt-2">Split among 2 guests</span>
              </div>

              <div className="mt-6">
                <span className="text-[14px] font-semibold text-[#666687] block mb-3">Add Tip</span>
                <div className="flex gap-2 mb-3">
                  <button className="flex-1 py-2 rounded-[16px] bg-[#f3f5f9] text-[#32324d] text-[12px] font-bold hover:bg-[#eaeaef]">20</button>
                  <button className="flex-1 py-2 rounded-[16px] bg-[#ffb01d] text-white text-[12px] font-bold">50</button>
                  <button className="flex-1 py-2 rounded-[16px] bg-[#f3f5f9] text-[#32324d] text-[12px] font-bold hover:bg-[#eaeaef]">100</button>
                  <button className="flex-1 py-2 rounded-[16px] bg-[#f3f5f9] text-[#32324d] text-[12px] font-bold hover:bg-[#eaeaef]">No tip</button>
                </div>
                <input type="text" placeholder="Custom tip amount-" className="w-full h-[40px] border border-[#ffb01d] rounded-[16px] px-4 text-[12px] font-semibold outline-none" />
              </div>

              <div className="mt-6 mb-6">
                <span className="text-[14px] font-semibold text-[#666687] block mb-3">Payment Mode</span>
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 py-2 rounded-[16px] bg-[#ffb01d] text-white text-[12px] font-bold">Cash</button>
                  <button className="flex-1 py-2 rounded-[16px] bg-[#f3f5f9] text-[#32324d] text-[12px] font-bold hover:bg-[#eaeaef]">Upi</button>
                  <button className="flex-1 py-2 rounded-[16px] bg-[#f3f5f9] text-[#32324d] text-[12px] font-bold hover:bg-[#eaeaef]">Card</button>
                  <button className="flex-1 py-2 rounded-[16px] bg-[#f3f5f9] text-[#32324d] text-[12px] font-bold hover:bg-[#eaeaef]">Due</button>
                </div>

                <input type="text" defaultValue="600" className="w-full h-[40px] border border-[#ffb01d] rounded-[16px] px-4 text-[14px] font-bold text-[#666687] outline-none mb-3" />
                <div className="bg-[#b4efc6]/20 py-2 rounded-[16px] text-center mb-4">
                  <span className="text-[12px] font-bold text-[#24a44b]">85 change to return</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {['500', '200', '100', '50', '20', '10'].map(amt => (
                    <button key={amt} className="h-[36px] border border-[#ffb01d] rounded-[16px] flex items-center justify-center gap-1 text-[12px] font-bold text-[#32324d] hover:bg-[#fff7e8]">
                      <span className="text-[#ff9556]">-</span> {amt} <span className="text-[#ff9556]">+</span>
                    </button>
                  ))}
                </div>
                <button className="w-full h-[36px] border border-[#ffb01d] rounded-[16px] text-[#666687] text-[12px] font-bold hover:bg-[#fff7e8]">
                  Custom amount
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Button Fixed */}
        <div className="px-4 pt-4 pb-8 shrink-0 bg-white">
          {rightView === 'order' ? (
            kotStatus === 'sent' ? (
              <button className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]" onClick={() => setRightView('checkout')}>
                Complete Order
              </button>
            ) : kotStatus === 'idle' ? (
              <button className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]" onClick={handleSendKOT}>
                Send to KOT
              </button>
            ) : null
          ) : rightView === 'checkout' && (
            <div className="flex flex-col gap-3">
              <button className="w-full bg-[#dcdce4] text-[#32324d] py-[14px] rounded-[16px] font-bold text-[16px]" onClick={() => setIsDiscountModalOpen(true)}>
                Apply Discount
              </button>
              <button className="w-full bg-[#ffb01d] text-white py-[14px] rounded-[16px] font-bold text-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]" onClick={() => { setOrderItems([]); setRightView('order'); setKotStatus('idle'); setDiscountAmount(0); }}>
                Mark as paid
              </button>
            </div>
          )}
        </div>
      </div>

      <SplitOrderModal
        isOpen={isSplitModalOpen}
        onClose={() => setIsSplitModalOpen(false)}
        item={selectedItemForAction}
        onConfirm={handleConfirmSplit}
      />

      <ApplyDiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        totalAmount={totalAmount}
        tax={tax}
        onApply={(amount) => setDiscountAmount(amount)}
      />

    </div>
  );
};