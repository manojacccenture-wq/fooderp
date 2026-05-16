import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { ProductCard } from '../../components/cards/ProductCard/ProductCard';

// Image assets matching MenuPage
const imgAvocadoSandwich = "http://localhost:3845/assets/457decdb571c02070bc7add243bd80cae81aeb7f.png";
const imgAvocadoSandwich1 = "http://localhost:3845/assets/9c489a346f0d6c27a9687c5b68bc1fef4c902d3c.png";
const imgAvocadoSandwich2 = "http://localhost:3845/assets/438638542561f85f6c89afd6fcf768a0d7b15f3d.png";
const imgAvocadoSandwich3 = "http://localhost:3845/assets/30adbba772edea972a2197ae69ad3d4e02c266e0.png";

const OrderItem = ({ image, title, price, quantity, isSelected, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className={clsx(
        "bg-white border rounded-2xl p-3 flex gap-3 items-center shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] relative cursor-pointer transition-all",
        isSelected ? "border-[#ffb01d] ring-1 ring-[#ffb01d]" : "border-[#eaeaef]"
      )}
    >
      <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-[14px] leading-[22px] text-[#32324d] font-semibold">{title}</span>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[12px] font-semibold text-[#666687]">{quantity} Quantity</span>
        </div>
      </div>
      <div className="absolute right-3 top-3">
         <div className={clsx("w-5 h-5 flex items-center justify-center rounded-full border transition-colors", isSelected ? "bg-[#ffb01d] border-[#ffb01d]" : "border-[#eaeaef]")}>
            {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
         </div>
      </div>
      <div className="absolute right-3 bottom-3 flex items-end gap-[2px]">
        <span className="text-[12px] font-bold text-[#ffb080] pb-[1px]">₹</span>
        <span className="text-[16px] font-extrabold text-[#ff7b2c]">{(Number(price) * quantity).toFixed(2)}</span>
      </div>
    </div>
  );
};

export const ReplaceFoodView = ({ tableNo, onClose, onConfirmReplacement }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [replacementProduct, setReplacementProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState("All Dishes");

  // Mock order items for the table
  const [orderItems, setOrderItems] = useState([
    { id: 1, image: imgAvocadoSandwich, title: "Chicken Biriyani", price: 120, quantity: 2 },
    { id: 2, image: imgAvocadoSandwich1, title: "Non veg thali", price: 120, quantity: 2 }
  ]);

  const products = [
    { itemNo: "401", title: "Mutton Gravy", price: "160", isVeg: false, image: imgAvocadoSandwich },
    { itemNo: "402", title: "Non veg thali", price: "120", isVeg: false, image: imgAvocadoSandwich1 },
    { itemNo: "203", title: "Veg Thali", price: "160", isVeg: true, image: imgAvocadoSandwich2 },
    { itemNo: "204", title: "Panner Gravy", price: "160", isVeg: true, image: imgAvocadoSandwich3 },
  ];

  const categories = ["All Dishes", "Veg", "Non Veg", "Desert"];

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (activeCategory === "Veg") filtered = filtered.filter(p => p.isVeg);
    if (activeCategory === "Non Veg") filtered = filtered.filter(p => !p.isVeg);
    
    if (search.trim()) {
      const searchValue = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchValue) || 
        p.itemNo.includes(searchValue)
      );
    }
    return filtered;
  }, [search, activeCategory]);

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleConfirm = () => {
    if (selectedItemId && replacementProduct) {
      onConfirmReplacement && onConfirmReplacement(tableNo, {
        originalItemId: selectedItemId,
        replacement: replacementProduct
      });
      onClose();
    }
  };

  return (
    <div className="flex w-full animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Left Side: Product Selection */}
      <div className="flex-1 pr-8">
        <h2 className="text-[18px] font-bold text-[#666687] mb-6">Replace Items</h2>

        <div className="bg-[#ffe7bb] border border-[#ffb01d]/20 rounded-[8px] p-3 mb-6">
          <p className="text-[10px] font-bold text-[#32324d]">
            Replace Item: The original item will be replaced with a new item without cancellation. The order amount will be adjusted accordingly.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full h-[54px] bg-white border border-[#eaeaef] rounded-[16px] flex items-center px-4 mb-8">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E8EA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Item No or Product Name"
            className="flex-1 bg-transparent border-none outline-none text-[14px] text-[#666687] placeholder:text-[#8e8ea9]"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                "px-[16px] py-[10px] rounded-[16px] text-[14px] font-bold transition-colors",
                activeCategory === cat ? "bg-[#ffb01d] text-white" : "bg-transparent text-[#666687] hover:bg-[#f3f5f9]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[18px] font-bold text-[#4a4a6a]">Top 10 Today</h3>
          <div className="flex gap-4 flex-wrap">
            {filteredProducts.map((p, idx) => (
              <div 
                key={idx} 
                onClick={() => setReplacementProduct(p)}
                className={clsx(
                  "cursor-pointer rounded-[16px] transition-all",
                  replacementProduct?.title === p.title ? "ring-2 ring-[#ffb01d] transform scale-[1.02]" : ""
                )}
              >
                <ProductCard {...p} quantity={0} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Order Panel */}
      <div className="w-[354px] bg-white border-l border-[#f3f5f9] flex flex-col shrink-0 min-h-[calc(100vh-160px)]">
         <div className="bg-[#fff7e8] flex items-center justify-between p-3 mt-[2px] mx-[1px]">
           <div className="flex flex-col gap-[2px]">
             <span className="text-[18px] font-semibold text-[#32324d] leading-[22px]">Current order</span>
             <span className="text-[12px] text-[#4a4a6a]">Order no : 12345</span>
           </div>
         </div>

         <div className="px-4 mt-4 flex flex-col gap-4 overflow-y-auto max-h-[350px]">
           {orderItems.map((item) => (
             <OrderItem
               key={item.id}
               image={item.image}
               title={item.title}
               price={item.price}
               quantity={item.quantity}
               isSelected={selectedItemId === item.id}
               onSelect={() => setSelectedItemId(item.id)}
             />
           ))}
         </div>

         <div className="px-4 mt-8">
            <div className="bg-[#fff7e8] p-3 rounded-2xl flex justify-center mb-4">
              <span className="text-[16px] font-bold text-[#32324d]">Payment Summary</span>
            </div>

            <div className="bg-white rounded-[16px] shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] p-4 flex flex-col gap-3 border border-[#f3f3f5]">
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-semibold text-[#666687]">Total Amount</span>
                <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-semibold text-[#666687]">Tax</span>
                <span className="text-[14px] font-bold text-[#32324d] flex gap-1"><small className="text-[#ff9556] mt-1">₹</small>{tax.toFixed(2)}</span>
              </div>
              <div className="w-full h-px border-t border-dashed border-[#eaeaef] my-1"></div>
              <div className="flex justify-between items-center">
                <span className="text-[16px] font-bold text-[#32324d]">Total price</span>
                <span className="text-[16px] font-extrabold text-[#ff7b2c] flex gap-1"><small className="text-[#ff9556] mt-[2px]">₹</small>{total.toFixed(2)}</span>
              </div>
            </div>
         </div>

         <div className="px-4 mt-6 flex flex-col gap-3">
            <input 
              type="text" 
              defaultValue="9629917347"
              className="w-full h-[54px] border border-[#ff7b2c] rounded-[16px] px-4 text-[#8e8ea9] font-semibold text-[14px] outline-none" 
            />
         </div>

         <div className="px-4 mt-auto pt-6 flex flex-col gap-3 pb-8">
            <button 
              onClick={handleConfirm}
              disabled={!selectedItemId || !replacementProduct}
              className={clsx(
                "w-full py-4 rounded-2xl text-[16px] font-bold shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)] transition-all",
                (!selectedItemId || !replacementProduct) 
                  ? "bg-[#dcdce4] text-[#32324d] cursor-not-allowed opacity-70" 
                  : "bg-[#ffb01d] text-white hover:bg-[#e69f1a] active:scale-[0.98]"
              )}
            >
              Confirm Replacement
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-[#eaeaef] text-[#4a4a6a] py-4 rounded-2xl text-[16px] font-bold hover:bg-[#dcdce4] transition-colors"
            >
              Cancel
            </button>
         </div>
      </div>
    </div>
  );
};
