import React from 'react';

export const AvailabilityBadge = ({ status = 'Unavailable' }) => {
  const isAvailable = status === 'Available';
  
  return (
    <div
      className="px-2 py-1 rounded-full h-6 flex items-center justify-center whitespace-nowrap flex-shrink-0 font-bold text-[10px]"
      style={{
        backgroundColor: isAvailable ? 'var(--color-success-light)' : 'var(--color-danger-200)',
        color: isAvailable ? 'var(--color-success)' : 'var(--color-error)',
      }}
    >
      {status}
    </div>
  );
};
