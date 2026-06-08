import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CATEGORIES } from '../../../../data/menuProducts';
import { AddItemModal } from './AddItemModal';
import { ProductCard } from '../../../Menu/components/ProductCard/ProductCard';
import { ItemDetailsSidebar } from './ItemDetailsSidebar';
import clsx from 'clsx';

export const ItemOnOffPage = () => {
  const items = useSelector(state => state.product.items);
  const [activeCategory, setActiveCategory] = useState('All Dishes');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = CATEGORIES;

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'All Dishes' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.itemNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex w-full h-[100dvh] overflow-hidden bg-white">
      {/* Main Content Area (Left) */}
      <div className="flex flex-col h-full transition-all duration-300 relative w-full lg:w-[68%]">
        <div className="flex-1 overflow-hidden pl-4 md:pl-6 lg:pl-8 pt-4 md:pt-6 lg:pt-[42px] flex flex-col">
          
          {/* Header Action Bar */}
          <div className="mb-6 flex items-center justify-between gap-4 pr-4 md:pr-6 lg:pr-8">
            <div className="flex-1 max-w-[400px] bg-white border border-gray-200 rounded-[12px] px-4 py-2.5 flex items-center gap-3 shadow-sm focus-within:border-[var(--color-primary)] focus-within:ring-1 focus-within:ring-[var(--color-primary)] transition-all">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-gray-400">
                <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="h-[44px] px-5 rounded-[12px] font-semibold text-white bg-orange-400 hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add Item
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-[10px] mb-[10px] shrink-0 overflow-x-auto whitespace-nowrap custom-scrollbar pb-2 pr-4 md:pr-6 lg:pr-8">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-[16px] py-[10px] rounded-[16px] text-[14px] font-bold whitespace-nowrap transition-all duration-200",
                  activeCategory === cat
                    ? 'bg-[#ffb01d] text-white transform scale-[1.02] shadow-sm'
                    : 'bg-transparent text-[#666687] hover:bg-[#f3f5f9]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-4 md:pr-6 lg:pr-8 pb-6 scroll-smooth">
            <div 
              className="grid gap-[10px] pb-[100px] items-stretch"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const isSelected = selectedItem?.itemNo === item.itemNo;
                  return (
                    <div 
                      key={item.itemNo}
                      onClick={() => setSelectedItem(item)}
                      className={clsx(
                        "cursor-pointer transition-all h-full outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 rounded-[16px]"
                      )}
                    >
                      <ProductCard
                        {...item}
                        isKeyboardSelected={isSelected}
                        quantity={0} 
                      />
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-[#f3f5f9] rounded-full flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8e8ea9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#32324d] mb-1">No items found</h3>
                  <p className="text-[#8e8ea9] text-[14px]">Try another search term or select a different category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Area */}
      <div className="flex-1 h-full min-w-[320px] max-w-[450px]">
        <ItemDetailsSidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </div>

      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};


