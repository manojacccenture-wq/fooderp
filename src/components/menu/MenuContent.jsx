import React, { useState, useMemo, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ProductCard } from '../cards/ProductCard/ProductCard';
import { useMenuKeyboardNavigation } from '../../hooks/useMenuKeyboardNavigation';
import { CATEGORIES, MENU_PRODUCTS } from '../../data/menuProducts';
import { KEYBOARD_ACTIONS } from '../../config/keyboardShortcutsConfig';

export const MenuContent = ({
  orderItems = [],
  onProductEnter,
  onProductDecrease,
  onProductClick,
  selectedOrderItem,
  onClearSelected,
  onIncreaseSelected,
  onDecreaseSelected,
  isReplaceMode = false,
  replacementSelectedProductId = null,
  isFocusMode,
  onToggleFocusMode,
  onOpenHelperModal,
  activeKeyboardSection,
  setActiveKeyboardSection,
  isHelperModalOpen,
  setSelectedOrderItem
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState("All Dishes");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const searchRef = useRef(null);
  const productRefs = useRef([]);
  const observerTarget = useRef(null);
  const scrollContainerRef = useRef(null);

  const filteredProducts = useMemo(() => {
    let filtered = MENU_PRODUCTS;
    
    if (search.trim()) {
      const searchValue = search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchValue) ||
        product.itemNo.toLowerCase().includes(searchValue)
      );
    } else if (activeCategory !== "All Dishes") {
      filtered = filtered.filter(p => p.category === activeCategory);
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
    setSelectedOrderItem,
    combinedItems: orderItems,
    onClearSelected,
    onIncreaseSelected,
    onDecreaseSelected,
    activeKeyboardSection,
    setActiveKeyboardSection,
    isHelperModalOpen
  });

  const handleSearchKeyDown = (e) => {
    if (KEYBOARD_ACTIONS.ADD_ITEM.match(e) && e.key === 'Enter') {
      if (search.trim() !== '' && filteredProducts.length === 1) {
        onProductEnter(filteredProducts[0]);
      }
    } else if (KEYBOARD_ACTIONS.EXIT_SEARCH.match(e)) {
      searchRef.current?.blur();
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
    <div className="flex flex-col w-full h-[100vh] max-w-full overflow-hidden">
      <div className="flex items-center gap-[14px] mb-[14px] shrink-0">
        <div className={clsx(
          "flex-1 h-[54px] bg-white border rounded-[16px] flex items-center px-4 py-3 transition-colors",
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
            onKeyDown={handleSearchKeyDown}
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
        
        
        <div className="flex gap-[14px]">
          <button 
            onClick={onOpenHelperModal}
            className="h-[54px] w-[54px] border rounded-[16px] flex items-center justify-center transition-colors text-[20px] shrink-0 bg-white text-[#ffb01d] border-[#eaeaef] hover:bg-[#fff7e8] hover:border-[#ffb01d]/50"
            title="Keyboard Shortcuts"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>

          <button 
            onClick={onToggleFocusMode}
            className={clsx(
              "h-[54px] w-[54px] border rounded-[16px] flex items-center justify-center transition-colors text-[24px] shrink-0",
              isFocusMode ? "bg-[#ffb01d] text-white border-[#ffb01d]" : "bg-white text-[#666687] border-[#eaeaef] hover:bg-gray-50"
            )}
            title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
          >
            ⛶
          </button>
        </div>
      </div>

      <div className="flex items-center gap-[14px] mb-[14px] shrink-0 overflow-x-auto whitespace-nowrap custom-scrollbar pb-2">
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
        className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 pb-6 scroll-smooth"
      >
        <div 
          className="grid gap-[14px] pb-[100px] items-stretch"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}
        >
          {visibleProducts.length > 0 ? (
            visibleProducts.map((p, index) => {
              const isActiveReplaceTarget = isReplaceMode && replacementSelectedProductId === p.itemNo;
              
              return (
                <div key={index}
                  ref={(el) => (productRefs.current[index] = el)}
                  onClick={() => onProductClick && onProductClick(p)}
                  onFocus={() => {
                    setActiveKeyboardSection('menu');
                    if (setKeyboardSelectedIndex) setKeyboardSelectedIndex(index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (onProductClick) onProductClick(p);
                    }
                  }}
                  tabIndex={0}
                  className={clsx(
                    "cursor-pointer transition-all h-full outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 rounded-[16px]",
                    isActiveReplaceTarget ? "ring-2 ring-[#ffb01d] transform scale-[1.02]" : ""
                  )}
                >
                  <ProductCard
                    {...p}
                    isKeyboardSelected={keyboardSelectedIndex === index && activeKeyboardSection === 'menu'}
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
