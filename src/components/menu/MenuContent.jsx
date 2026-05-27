import React, { useState, useMemo, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ProductCard } from '../cards/ProductCard/ProductCard';
import { useMenuKeyboardNavigation } from '../../hooks/useMenuKeyboardNavigation';
import { CATEGORIES, MENU_PRODUCTS } from '../../data/menuProducts';

export const MenuContent = ({
  orderItems = [],
  onProductEnter,
  onProductDecrease,
  onProductClick,
  selectedOrderItem,
  onIncreaseSelected,
  onDecreaseSelected,
  isReplaceMode = false,
  replacementSelectedProductId = null
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState("All Dishes");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const searchRef = useRef(null);
  const productRefs = useRef([]);
  const observerTarget = useRef(null);
  const scrollContainerRef = useRef(null);

  // Memoize filtered products based on exact category matches
  const filteredProducts = useMemo(() => {
    let filtered = MENU_PRODUCTS;
    if (activeCategory !== "All Dishes") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    if (search.trim()) {
      const searchValue = search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchValue) ||
        product.itemNo.toLowerCase().includes(searchValue)
      );
    }
    return filtered;
  }, [search, activeCategory]);

  // Hook for keyboard navigation
  const { keyboardSelectedIndex, setKeyboardSelectedIndex } = useMenuKeyboardNavigation({
    filteredProducts,
    onProductEnter,
    onProductDecrease,
    searchRef,
    setActiveCategory,
    selectedOrderItem,
    onIncreaseSelected,
    onDecreaseSelected
  });

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      if (search.trim() !== '' && filteredProducts.length === 1) {
        onProductEnter(filteredProducts[0]);
      }
    }
  };

  // Remove automatic category switching on search typing to prevent jarring UX
  // It's better to stay in the current category and filter within it.

  // Reset index and visible count on filter change
  useEffect(() => {
    setKeyboardSelectedIndex(0);
    setVisibleCount(12);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [search, activeCategory, setKeyboardSelectedIndex]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => Math.min(prev + 12, filteredProducts.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [filteredProducts.length, visibleCount]);

  // If keyboard selects an item beyond visible, expand visible list
  useEffect(() => {
    if (keyboardSelectedIndex >= visibleCount) {
      setVisibleCount(keyboardSelectedIndex + 12);
    }
  }, [keyboardSelectedIndex, visibleCount]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Scroll to selected
  useEffect(() => {
    if (keyboardSelectedIndex >= 0) {
      productRefs.current[keyboardSelectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [keyboardSelectedIndex]);

  return (
    <div className="flex flex-col w-full h-full max-w-[769px] overflow-hidden">
      <div className={clsx(
        "w-full h-[54px] bg-white border rounded-[16px] flex items-center px-4 py-3 mb-8 transition-colors shrink-0",
        isSearchFocused ? "border-[#ffb01d]" : "border-[#eaeaef]"
      )}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E8EA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 shrink-0">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchEnter}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search by Item No or Product Name"
          className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[14px] text-[#666687] placeholder:text-[#8e8ea9]"
        />
        <div className="ml-3 cursor-pointer shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </div>
      </div>

      <div className="flex gap-2 mb-8 shrink-0 overflow-x-auto custom-scrollbar pb-2">
        {CATEGORIES.map((cat, index) => (
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

      <div 
        ref={scrollContainerRef}
        className="overflow-y-auto custom-scrollbar pr-2 pb-6 scroll-smooth"
        style={{ height: 'calc(100vh - 260px)' }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-[100px]">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((p, index) => {
              const isActiveReplaceTarget = isReplaceMode && replacementSelectedProductId === p.itemNo;
              
              return (
                <div key={index}
                  ref={(el) => (productRefs.current[index] = el)}
                  onClick={() => onProductClick && onProductClick(p)}
                  className={clsx(
                    "cursor-pointer transition-all h-full",
                    isActiveReplaceTarget ? "ring-2 ring-[#ffb01d] rounded-[16px] transform scale-[1.02]" : ""
                  )}
                >
                  <ProductCard
                    {...p}
                    isKeyboardSelected={keyboardSelectedIndex === index}
                    quantity={
                      isReplaceMode
                        ? 0
                        : orderItems.find(item => item.title === p.title)?.quantity || 0
                    }
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
              <p className="text-[#8e8ea9] text-[14px]">No items available in this category</p>
            </div>
          )}
          
          {visibleCount < filteredProducts.length && (
            <div ref={observerTarget} className="col-span-full h-20 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-[#ffb01d] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
