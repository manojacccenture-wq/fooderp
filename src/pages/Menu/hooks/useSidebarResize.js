import { useState, useEffect, useCallback } from 'react';

const MIN_WIDTH = 320;
const MAX_WIDTH = 650;
const DEFAULT_WIDTH = 420;

export const useSidebarResize = (isFocusMode) => {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('menuSidebarWidth');
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      localStorage.setItem('menuSidebarWidth', sidebarWidth.toString());
    }
  }, [isDragging, sidebarWidth]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    // The sidebar is mounted on the right side of the screen.
    // So the width of the sidebar is: screen width - mouse X position
    let newWidth = window.innerWidth - e.clientX;
    
    if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
    if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
    
    // Use requestAnimationFrame for smooth non-blocking updates if necessary, 
    // but React handles this fast enough for simple numeric state updates.
    setSidebarWidth(newWidth);
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return { sidebarWidth, isDragging, handleMouseDown };
};
