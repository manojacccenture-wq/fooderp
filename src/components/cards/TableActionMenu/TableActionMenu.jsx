import React from 'react';

export const TableActionMenu = ({ onSelect, onClose }) => {
  const menuItems = [
    { label: 'Change table', action: 'change-table' },
    { label: 'Merge Table', action: 'merge-table' },
    { label: 'Cancel Food', action: 'cancel-food' },
    { label: 'Replace Food', action: 'replace-food' },
  ];

  return (
    <div className="absolute top-full right-0 mt-2 bg-white border border-[var(--color-border-light)] rounded-[12px] shadow-lg z-50 min-w-[150px] py-2">
      {menuItems.map((item) => (
        <button
          key={item.action}
          onClick={() => onSelect(item.action)}
          className="w-full text-left px-4 py-2 text-[14px] text-[var(--color-neutral-800)] hover:bg-[var(--color-secondary-5)] transition-colors"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
