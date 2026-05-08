import React, { useState } from 'react';

export const StockDropdown = ({ value = 'In Stock', onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = ['Out of stock', 'Low Stock', 'In Stock'];

  return (
    <div className="relative w-[143px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-[var(--color-neutral-150)] rounded-[16px] px-4 py-3 h-10 flex items-center justify-between gap-2 text-subtitle-3 text-[var(--color-neutral-600)] font-bold"
      >
        <span className="truncate text-center flex-1">{value}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="var(--color-neutral-600)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--color-neutral-150)] rounded-[12px] shadow-lg z-50 py-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange?.(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-subtitle-3 hover:bg-[var(--color-secondary-5)] transition-colors ${
                value === option ? 'text-[var(--color-secondary-1)] font-semibold' : 'text-[var(--color-neutral-600)]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
