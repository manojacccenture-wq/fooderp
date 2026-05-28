import { useState, useEffect, useRef } from 'react';

export const useMenuKeyboardNavigation = ({
  filteredProducts,
  onProductEnter,
  onProductDecrease,
  searchRef,
  setActiveCategory,
  selectedOrderItem,
  onIncreaseSelected,
  onDecreaseSelected
}) => {
  const [keyboardSelectedIndex, setKeyboardSelectedIndex] = useState(0);
  const keyboardIndexRef = useRef(keyboardSelectedIndex);

  useEffect(() => {
    keyboardIndexRef.current = keyboardSelectedIndex;
  }, [keyboardSelectedIndex]);

  // Adjust selection when list shrinks
  useEffect(() => {
    setKeyboardSelectedIndex(prev => {
      if (prev >= filteredProducts.length) {
        return Math.max(filteredProducts.length - 1, 0);
      }
      return prev;
    });
  }, [filteredProducts.length]);

  // CTRL+S and Number keys for categories
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
  }, [setActiveCategory, searchRef]);

  // Arrow keys for grid navigation
  useEffect(() => {
    const handleGridKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      
      if (selectedOrderItem && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) return;
      
      if (!filteredProducts || filteredProducts.length === 0) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setKeyboardSelectedIndex(prev => Math.min(prev + 1, filteredProducts.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setKeyboardSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const activeProduct = filteredProducts[keyboardIndexRef.current];
        if (activeProduct) {
          onProductEnter(activeProduct);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const activeProduct = filteredProducts[keyboardIndexRef.current];
        if (activeProduct) {
          onProductDecrease(activeProduct);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const activeProduct = filteredProducts[keyboardIndexRef.current];
        if (activeProduct) {
          onProductEnter(activeProduct);
        }
      }
    };

    window.addEventListener('keydown', handleGridKeyDown);
    return () => window.removeEventListener('keydown', handleGridKeyDown);
  }, [filteredProducts, onProductEnter, onProductDecrease]);

  // Up/Down arrows for selected order item in the sidebar
  useEffect(() => {
    const handleArrowKeys = (e) => {
      if (!selectedOrderItem) return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      
      if (e.key === 'ArrowUp' || e.key === '+' || e.key === '=') {
        e.preventDefault();
        onIncreaseSelected(selectedOrderItem);
      } else if (e.key === 'ArrowDown' || e.key === '-') {
        e.preventDefault();
        onDecreaseSelected(selectedOrderItem);
      }
    };
    window.addEventListener('keydown', handleArrowKeys);
    return () => window.removeEventListener('keydown', handleArrowKeys);
  }, [selectedOrderItem, onIncreaseSelected, onDecreaseSelected]);

  return {
    keyboardSelectedIndex,
    setKeyboardSelectedIndex
  };
};
