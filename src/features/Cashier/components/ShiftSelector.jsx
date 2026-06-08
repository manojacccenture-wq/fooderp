import React from 'react';
import clsx from 'clsx';

export const ShiftSelector = ({ activeShift, onShiftChange }) => {
  return (
    <div className="flex bg-[#f3f5f9] p-[2px] rounded-[10px] shadow-inner border border-[#eaeaef] h-[36px]">
      <button
        onClick={() => onShiftChange('Current Shift')}
        className={clsx(
          "px-4 py-1 rounded-[8px] text-[13px] font-bold transition-all duration-200 h-full flex items-center justify-center",
          activeShift === 'Current Shift' 
            ? "bg-white text-[#ffb01d] shadow-[0_2px_8px_rgba(0,0,0,0.05)]" 
            : "text-[#8e8ea9] hover:text-[#666687]"
        )}
      >
        Current Shift
      </button>
      <button
        onClick={() => onShiftChange('Previous Shifts')}
        className={clsx(
          "px-4 py-1 rounded-[8px] text-[13px] font-bold transition-all duration-200 h-full flex items-center justify-center",
          activeShift === 'Previous Shifts' 
            ? "bg-white text-[#ffb01d] shadow-[0_2px_8px_rgba(0,0,0,0.05)]" 
            : "text-[#8e8ea9] hover:text-[#666687]"
        )}
      >
        Previous Shifts
      </button>
    </div>
  );
};
