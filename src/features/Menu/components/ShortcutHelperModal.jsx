import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { SHORTCUTS_LIST } from '../../../config/keyboardShortcutsConfig';

export const ShortcutHelperModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0c1a4b]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={modalRef}
        className="bg-white rounded-[24px] shadow-xl w-full max-w-[400px] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#eaeaef] bg-[#f8faff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#fff0d4] flex items-center justify-center text-[#ffb01d]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                <line x1="6" y1="8" x2="6" y2="8"></line>
                <line x1="10" y1="8" x2="10" y2="8"></line>
                <line x1="14" y1="8" x2="14" y2="8"></line>
                <line x1="18" y1="8" x2="18" y2="8"></line>
                <line x1="6" y1="12" x2="6" y2="12"></line>
                <line x1="10" y1="12" x2="10" y2="12"></line>
                <line x1="14" y1="12" x2="14" y2="12"></line>
                <line x1="18" y1="12" x2="18" y2="12"></line>
                <line x1="8" y1="16" x2="16" y2="16"></line>
              </svg>
            </div>
            <h2 className="text-[18px] font-bold text-[#32324d] m-0">Keyboard Shortcuts</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#8e8ea9] hover:bg-[#f3f5f9] hover:text-[#32324d] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4 bg-white max-h-[60vh] overflow-y-auto custom-scrollbar">
          {SHORTCUTS_LIST.map((shortcut) => (
            <div key={shortcut.id} className="flex items-center justify-between gap-4 pb-4 border-b border-[#f3f5f9] last:border-0 last:pb-0">
              <span className="text-[14px] text-[#666687] font-medium">{shortcut.description}</span>
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {shortcut.displayKeys.map((key, i) => (
                  <span key={i} className="bg-white border border-[#dcdce4] rounded-[6px] px-[8px] py-[3px] font-bold text-[12px] text-[#4a4a68] shadow-sm tracking-wide">
                    {key}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
