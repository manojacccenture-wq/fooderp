import React from 'react';

export const AvailabilityBadge = ({ status = 'Unavailable' }) => {
  let bgColor = 'var(--color-danger-200)';
  let textColor = 'var(--color-error)';

  if (status === 'Available') {
    bgColor = 'var(--color-success-light)';
    textColor = 'var(--color-success)';
  } else if (status === 'Low Stock') {
    bgColor = '#FEF3C7'; // Amber-100
    textColor = '#D97706'; // Amber-600
  } else if (status === 'Unavailable' || status.toLowerCase() === 'out of stock') {
    bgColor = 'var(--color-danger-200)';
    textColor = 'var(--color-error)';
  }

  return (
    <div
      className="px-2 py-1 rounded-full h-6 flex items-center justify-center whitespace-nowrap flex-shrink-0 font-bold text-[10px]"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {status}
    </div>
  );
};
