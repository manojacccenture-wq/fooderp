import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { ProductCard } from '../../components/cards/ProductCard/ProductCard';
import image1 from "../../assets/menu/avocadoSandwich.png";
import image2 from "../../assets/menu/non-veg-thali.png";
import image3 from "../../assets/menu/veg-thali.png";
import image4 from "../../assets/menu/paneer.png";

const imgAvocadoSandwich = image1;
const imgAvocadoSandwich1 = image2;
const imgAvocadoSandwich2 = image3;
const imgAvocadoSandwich3 = image4;

export const MenuPage = () => {
  const searchRef = useRef(null);

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState("All Dishes");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

      // Prevent switching tabs if user is actively typing in the search bar
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === '1') setActiveCategory("All Dishes");
      if (e.key === '2') setActiveCategory("Veg");
      if (e.key === '3') setActiveCategory("Non Veg");
      if (e.key === '4') setActiveCategory("Desert");
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  // Auto-switch category tab based on the first character typed in search
  useEffect(() => {
    const firstChar = search.trim().charAt(0);
    if (firstChar === '2') setActiveCategory("Veg");
    else if (firstChar === '4') setActiveCategory("Non Veg");
    else if (firstChar === '5') setActiveCategory("Desert");
    else if (search.trim() === '') setActiveCategory("All Dishes");
  }, [search]);


  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by Category using strictly the starting digit of Item No.
    if (activeCategory === "Veg") filtered = filtered.filter(p => p.itemNo.startsWith('2'));
    if (activeCategory === "Non Veg") filtered = filtered.filter(p => p.itemNo.startsWith('4'));
    if (activeCategory === "Desert") filtered = filtered.filter(p => p.itemNo.startsWith('5'));

    // Filter by Search
    if (search.trim()) {
      const searchValue = search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchValue) ||
        product.itemNo.toLowerCase().startsWith(searchValue) // Changed to startsWith for strict matching
      );
    }

    return filtered;
  }, [search, activeCategory, products]);

  return (
    <div className="flex w-full h-full relative">

      <div className="flex-1 flex flex-col p-8 pl-6">

        {/* Search */}
        <div className={clsx(
          "w-full max-w-[769px] h-[54px] bg-white border rounded-2xl flex items-center px-4 py-3 mb-8 transition-colors",
          isSearchFocused ? "border-[var(--color-secondary-1)]" : "border-[var(--color-neutral-150)]"
        )}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8E8EA9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-3"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search by Item No or Product Name"
            className="flex-1 bg-transparent border-none outline-none text-label-placeholder text-[var(--color-neutral-500)] placeholder:text-[var(--color-neutral-500)]"
          />

          <div className="ml-3 cursor-pointer">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF7B2C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </div>

        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat.label)}
              className={clsx(
                "px-[16px] py-[10px] rounded-[16px] text-button-md whitespace-nowrap transition-colors",
                activeCategory === cat.label
                  ? 'bg-[var(--color-secondary-1)] text-white'
                  : 'bg-transparent text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)]'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="flex flex-col gap-4">
          <h2 className="text-subtitle-1 text-[var(--color-neutral-600)] mb-1">
            Top 10 Today
          </h2>

          <div className="flex gap-4 flex-wrap max-w-[751px]">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p, index) => (
                <ProductCard key={index} {...p} />
              ))
            ) : (
              <div className="w-full flex items-center justify-center py-10">
                <span className="text-[var(--color-neutral-500)] text-body-2">
                  No products found
                </span>
              </div>
            )}
          </div>
        </div>

      </div>

      <OrderPanel />

    </div>
  );
};

// --- Sub-components extracted for full functionality ---

const OrderItem = ({ image, title, price, quantity, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="bg-white border border-[var(--color-secondary-0)] rounded-2xl p-3 flex gap-3 items-center shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] relative">
      <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-label-default text-[var(--color-neutral-800)] font-semibold">{title}</span>
        <div className="flex items-center gap-3 mt-1">
          <button onClick={onDecrease} className="w-6 h-6 rounded-xl bg-[var(--color-tertiary-5)] flex items-center justify-center text-caption-3 font-bold text-[var(--color-neutral-600)] cursor-pointer">-</button>
          <span className="text-label-default text-[var(--color-neutral-600)] font-semibold">{quantity}</span>
          <button onClick={onIncrease} className="w-7 h-7 rounded-xl bg-[var(--color-tertiary-5)] flex items-center justify-center text-caption-3 font-bold text-[var(--color-neutral-600)] cursor-pointer">+</button>
        </div>
      </div>
      <div className="absolute right-3 top-3 flex gap-2">
         <div className="w-5 h-5 flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-600">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
         </div>
         <div onClick={onRemove} className="w-5 h-5 flex items-center justify-center cursor-pointer text-gray-400 hover:text-red-500">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
         </div>
      </div>
      <div className="absolute right-3 bottom-3 flex items-start gap-[2px]">
        <small className="text-[var(--color-tertiary-3)] font-bold pb-1">₹</small>
        <span className="text-price-md text-[var(--color-tertiary-1)]">{price}</span>
      </div>
    </div>
  );
};

export const OrderPanel = () => {
  // State to track order items
  const [orderItems, setOrderItems] = useState([
    { id: 1, image: imgAvocadoSandwich1, title: "Chicken Biriyani", price: 120, quantity: 2 },
    { id: 2, image: imgAvocadoSandwich1, title: "Non veg thali", price: 120, quantity: 2 },
    { id: 3, image: imgAvocadoSandwich1, title: "Example Extra Item", price: 120, quantity: 1 } // Added to demonstrate scroll
  ]);

  // Handlers for + / - / Remove
  const handleIncrease = (id) => {
    setOrderItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (id) => {
    setOrderItems(prev => prev.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemove = (id) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
  };

  // Dynamic calculations
  const totalAmount = orderItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  const tax = totalAmount > 0 ? totalAmount * 0.05 : 0; 
  const finalPrice = totalAmount + tax;

  return (
    // Changed: Used h-full and max-h-screen to restrict height, added flex-col to parent 
    <div className="w-[354px] h-full max-h-screen bg-white border-l border-[var(--color-neutral-150)] flex flex-col relative shrink-0">
      
      {/* 1. FIXED TOP BUTTONS */}
      <div className="flex items-center gap-4 px-4 pt-4 shrink-0">
         <button className="bg-[var(--color-danger-500)] text-white flex-1 py-3 rounded-[16px] text-button-sm cursor-pointer" onClick={() => setOrderItems([])}>Cancel order</button>
         <button className="bg-[var(--color-secondary-1)] text-white flex-1 py-3 rounded-[16px] text-button-sm cursor-pointer">Pause</button>
      </div>

      {/* 2. SCROLLABLE MIDDLE SECTION */}
      {/* Changed: Added flex-1 and overflow-y-auto to create the scroll zone */}
      <div className="flex-1 overflow-y-auto mt-8 pb-4">
        
        <div className="px-4">
           <h2 className="text-subtitle-1 text-[var(--color-neutral-800)] mb-4">Current order</h2>
           <div className="flex flex-col gap-4">
             {orderItems.map((item) => (
                <OrderItem 
                  key={item.id}
                  image={item.image} 
                  title={item.title} 
                  price={item.price} 
                  quantity={item.quantity} 
                  onIncrease={() => handleIncrease(item.id)}
                  onDecrease={() => handleDecrease(item.id)}
                  onRemove={() => handleRemove(item.id)}
                />
             ))}
             {orderItems.length === 0 && (
               <span className="text-sm text-[var(--color-neutral-500)] text-center my-4">No items in the order.</span>
             )}
           </div>
        </div>

        <div className="px-4 mt-8">
           <div className="bg-[var(--color-secondary-5)] p-3 rounded-2xl flex justify-center mb-4">
             <span className="text-subtitle-2 text-[var(--color-neutral-800)]">Payment Summary</span>
           </div>

           <div className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] p-4 flex flex-col gap-3 border border-[var(--color-neutral-150)]">
             <div className="flex justify-between items-center">
               <span className="text-body-2 text-[var(--color-neutral-600)]">Total Amount</span>
               <span className="text-label-default text-[var(--color-neutral-700)] font-bold flex gap-1"><small className="text-[var(--color-tertiary-3)] mt-1">₹</small>{totalAmount.toFixed(2)}</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-body-2 text-[var(--color-neutral-600)]">Tax (5%)</span>
               <span className="text-label-default text-[var(--color-neutral-700)] font-bold flex gap-1"><small className="text-[var(--color-tertiary-3)] mt-1">₹</small>{tax.toFixed(2)}</span>
             </div>
             <div className="w-full h-px border-t border-dashed border-[var(--color-neutral-300)] my-1"></div>
             <div className="flex justify-between items-center">
               <span className="text-subtitle-2 text-[var(--color-neutral-700)]">Total price</span>
               <span className="text-price-md text-[var(--color-tertiary-1)] flex gap-1"><small className="text-[var(--color-tertiary-3)] mt-[2px]">₹</small>{finalPrice.toFixed(2)}</span>
             </div>
           </div>
        </div>

        <div className="px-4 mt-6">
          <div className="bg-[var(--color-secondary-5)] p-3 rounded-2xl flex justify-between items-center px-4">
            <span className="text-subtitle-2 text-[var(--color-neutral-800)]">Total</span>
            <span className="text-subtitle-2 text-[var(--color-neutral-800)]">{finalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="px-4 mt-6 flex flex-col gap-3">
          <input 
            type="text" 
            defaultValue="9629917347" 
            className="w-full h-[54px] border border-[var(--color-tertiary-1)] rounded-2xl px-4 text-label-placeholder text-[var(--color-neutral-500)] outline-none shrink-0"
          />
          <textarea 
            placeholder="Special Instructions...."
            className="w-full h-[120px] border border-[var(--color-neutral-150)] rounded-2xl p-4 text-label-placeholder text-[var(--color-neutral-500)] outline-none resize-none shrink-0"
          ></textarea>
        </div>

      </div>

      {/* 3. FIXED BOTTOM BUTTONS */}
      {/* Changed: Placed outside the scroll zone and added shrink-0 */}
      <div className="px-4 pt-4 pb-8 flex flex-col gap-3 shrink-0 bg-white">
        <button className="w-full bg-[var(--color-neutral-200)] text-[var(--color-neutral-800)] py-4 rounded-2xl text-button-md cursor-pointer">Apply Discount</button>
        <button className="w-full bg-[var(--color-secondary-1)] text-white py-4 rounded-2xl text-button-md shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] cursor-pointer">Print Billing</button>
      </div>

    </div>
  );
};