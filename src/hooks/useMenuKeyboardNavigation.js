import { useState, useEffect, useRef } from 'react';
import { KEYBOARD_ACTIONS } from '../config/keyboardShortcutsConfig';

export const useMenuKeyboardNavigation = ({
  filteredProducts,
  onProductEnter,
  onProductDecrease,
  searchRef,
  setActiveCategory,
  selectedOrderItem,
  setSelectedOrderItem,
  combinedItems,
  onClearSelected,
  onIncreaseSelected,
  onDecreaseSelected,
  activeKeyboardSection,
  setActiveKeyboardSection,
  isHelperModalOpen
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
      if (isHelperModalOpen) return;
      if (KEYBOARD_ACTIONS.SWITCH_SECTION.match(e)) {
        e.preventDefault();
        setActiveKeyboardSection(prev => {
          if (prev === 'menu') {
            if (!selectedOrderItem && combinedItems && combinedItems.length > 0) {
              setSelectedOrderItem(combinedItems[0].id);
            }
            return 'order';
          }
          return 'menu';
        });
        return;
      }
      
      if (KEYBOARD_ACTIONS.SEARCH.match(e)) {
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
      if (isHelperModalOpen) return;
      if (activeKeyboardSection !== 'menu') return;
      
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      
      if (!filteredProducts || filteredProducts.length === 0) return;

      if (KEYBOARD_ACTIONS.NAVIGATE_MENU.matchRight(e)) {
        e.preventDefault();
        setKeyboardSelectedIndex(prev => Math.min(prev + 1, filteredProducts.length - 1));
        if (onClearSelected) onClearSelected();
      } else if (KEYBOARD_ACTIONS.NAVIGATE_MENU.matchLeft(e)) {
        e.preventDefault();
        setKeyboardSelectedIndex(prev => Math.max(prev - 1, 0));
        if (onClearSelected) onClearSelected();
      } else if (KEYBOARD_ACTIONS.NAVIGATE_MENU.matchUp(e)) {
        e.preventDefault();
        const activeProduct = filteredProducts[keyboardIndexRef.current];
        if (activeProduct) {
          onProductEnter(activeProduct);
        }
      } else if (KEYBOARD_ACTIONS.NAVIGATE_MENU.matchDown(e)) {
        e.preventDefault();
        const activeProduct = filteredProducts[keyboardIndexRef.current];
        if (activeProduct) {
          onProductDecrease(activeProduct);
        }
      } else if (KEYBOARD_ACTIONS.ADD_ITEM.match(e) && e.key === 'Enter') {
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

  // Up/Down arrows for navigating order items, +/- for modifying quantity
  useEffect(() => {
    const handleArrowKeys = (e) => {
      if (isHelperModalOpen) return;
      if (activeKeyboardSection !== 'order') return;
      
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (!combinedItems || combinedItems.length === 0) return;

      const currentIndex = combinedItems.findIndex(i => i.id === selectedOrderItem);
      
      if (KEYBOARD_ACTIONS.NAVIGATE_ORDER?.matchUp?.(e)) {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        if (combinedItems[prevIndex]) {
          setSelectedOrderItem(combinedItems[prevIndex].id);
        }
      } else if (KEYBOARD_ACTIONS.NAVIGATE_ORDER?.matchDown?.(e)) {
        e.preventDefault();
        const nextIndex = (currentIndex !== -1 && currentIndex < combinedItems.length - 1) ? currentIndex + 1 : Math.max(0, combinedItems.length - 1);
        if (combinedItems[nextIndex]) {
          setSelectedOrderItem(combinedItems[nextIndex].id);
        }
      } else if (KEYBOARD_ACTIONS.MODIFY_QUANTITY.matchIncrease(e)) {
        e.preventDefault();
        if (selectedOrderItem) onIncreaseSelected(selectedOrderItem);
      } else if (KEYBOARD_ACTIONS.MODIFY_QUANTITY.matchDecrease(e)) {
        e.preventDefault();
        if (selectedOrderItem) onDecreaseSelected(selectedOrderItem);
      }
    };
    window.addEventListener('keydown', handleArrowKeys);
    return () => window.removeEventListener('keydown', handleArrowKeys);
  }, [selectedOrderItem, combinedItems, onIncreaseSelected, onDecreaseSelected, activeKeyboardSection, isHelperModalOpen, setSelectedOrderItem]);

  return {
    keyboardSelectedIndex,
    setKeyboardSelectedIndex
  };
};
