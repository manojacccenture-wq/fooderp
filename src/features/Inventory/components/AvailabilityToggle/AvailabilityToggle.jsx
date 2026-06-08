import React from 'react';

export const AvailabilityToggle = ({ isOn = true, onChange }) => {
  return (
    <button
      onClick={() => onChange?.(!isOn)}
      className="relative h-6 w-12 rounded-full transition-colors flex-shrink-0"
      style={{
        backgroundColor: isOn ? 'var(--color-success-500)' : 'var(--color-error)',
      }}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white transition-transform ${
          isOn ? 'right-0.5' : 'left-0.5'
        }`}
      />
    </button>
  );
};
