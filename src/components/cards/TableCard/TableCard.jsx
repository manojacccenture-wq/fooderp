import React, { useState } from 'react';
import { TableActionMenu } from '../TableActionMenu/TableActionMenu';

export const TableCard = ({ 
  tableNumber, 
  variant = 'available',
  amount,
  guests,
  timer,
  onBookTable,
  onCompleteOrder,
  onStartOrder,
  onCancel,
  onActionMenuSelect
}) => {
  const [showMenu, setShowMenu] = useState(false);

  if (variant === 'available') {
    return (
      <div className="bg-white border-2 border-[var(--color-neutral-150)] h-[183px] w-[293px] rounded-[16px] flex flex-col relative">
        {/* Available Badge */}
        <div className="absolute bg-[var(--color-success-200)] px-4 py-3 rounded-[16px] top-3 right-3 h-[28px] flex items-center justify-center">
          <span className="text-[8px] font-bold text-[var(--color-success-700)]">Available</span>
        </div>

        {/* Table Number and Subtitle */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4">
          <h3 className="text-heading-5 text-[var(--color-neutral-700)] leading-[22px]">Table {tableNumber}</h3>
          <p className="text-caption-1 text-[var(--color-neutral-500)] text-center leading-[8px]">Ready for new order</p>
        </div>

        {/* Book Table Button */}
        <button
          onClick={onBookTable}
          className="absolute bottom-[17px] left-5 right-5 bg-[var(--color-secondary-1)] text-white px-[10.182px] py-[8.727px] rounded-[11.636px] text-[12px] font-bold hover:opacity-90 transition-opacity leading-[14.545px]"
        >
          Book Table
        </button>
      </div>
    );
  }

  if (variant === 'occupied') {
    return (
      <div className="bg-white border-2 border-[var(--color-neutral-150)] h-[183px] w-[293px] rounded-[16px] flex flex-col relative">
        {/* Top Row: Table Number and Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <h3 className="text-heading-5 text-[var(--color-neutral-700)] leading-[22px]">Table {tableNumber}</h3>
          <div className="bg-[var(--color-danger-200)] px-4 py-3 rounded-[16px] h-[28px] flex items-center justify-center">
            <span className="text-[8px] font-bold text-[var(--color-danger-500)]">Occupied</span>
          </div>
        </div>

        {/* Amount, Guests, Timer Section */}
        <div className="absolute top-[61px] left-4 h-[132px] w-[115px] flex flex-col gap-4">
          {/* Amount Row */}
          <div className="flex gap-3 h-9 items-center">
            <div className="bg-[var(--color-neutral-100)] px-2 py-2 rounded-[32px] flex-shrink-0">
              <span className="text-[12px]">₹</span>
            </div>
            <span className="text-subtitle-1 text-[var(--color-neutral-500)] leading-[22px]">{amount}</span>
          </div>

          {/* Timer Row */}
          <div className="flex gap-3 h-9 items-center">
            <div className="bg-[var(--color-neutral-100)] px-2 py-2 rounded-[30px] flex-shrink-0">
              <span className="text-[12px]">⏱</span>
            </div>
            <span className="text-subtitle-1 text-[var(--color-neutral-500)] leading-[22px]">{timer}</span>
          </div>
        </div>

        {/* Guests Section (Top Right) */}
        <div className="absolute top-[62px] left-[133px] right-[41px] h-9 flex gap-3 items-center">
          <div className="bg-[var(--color-neutral-100)] px-2 py-2 rounded-[25px] flex-shrink-0">
            <span className="text-[12px]">👥</span>
          </div>
          <span className="text-subtitle-1 text-[var(--color-neutral-500)] leading-[22px]">{guests} Guests</span>
        </div>

        {/* Complete Order Button */}
        <div className="absolute bottom-[17px] left-[156px] right-[41px]">
          <button
            onClick={onCompleteOrder}
            className="w-[121px] bg-[var(--color-secondary-1)] text-white px-[10.182px] py-[8.727px] rounded-[11.636px] text-[12px] font-bold hover:opacity-90 transition-opacity leading-[14.545px]"
          >
            Completer Order
          </button>
        </div>

        {/* Action Menu Button */}
        <div className="absolute bottom-[17px] left-4 relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] px-3 py-2 rounded-[8px] hover:opacity-80 transition-opacity text-[16px]"
          >
            ⋮
          </button>
          {showMenu && (
            <TableActionMenu 
              onSelect={(action) => {
                onActionMenuSelect(action);
                setShowMenu(false);
              }}
              onClose={() => setShowMenu(false)}
            />
          )}
        </div>
      </div>
    );
  }

  if (variant === 'reserved') {
    return (
      <div className="bg-white border-2 border-[var(--color-neutral-150)] h-[183px] w-[293px] rounded-[16px] flex flex-col relative">
        {/* Top Row: Table Number and Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <h3 className="text-heading-5 text-[var(--color-neutral-700)] leading-[22px]">Table {tableNumber}</h3>
          <div className="bg-[var(--color-secondary-4)] px-4 py-3 rounded-[16px] h-[28px] flex items-center justify-center">
            <span className="text-[8px] font-bold text-[var(--color-secondary-1)]">Reserved</span>
          </div>
        </div>

        {/* Guests Section */}
        <div className="absolute top-[61px] left-4 right-4 flex gap-3 items-center">
          <div className="bg-white px-2 py-2 rounded-[25px] flex-shrink-0">
            <span className="text-[12px]">👥</span>
          </div>
          <span className="text-subtitle-1 text-[var(--color-neutral-500)] leading-[22px] whitespace-nowrap">{guests} Guests Excepted</span>
        </div>

        {/* Buttons Section */}
        <div className="absolute bottom-[17px] left-4 right-4 flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 bg-[var(--color-danger-500)] text-white px-[10.182px] py-[8.727px] rounded-[11.636px] text-[12px] font-bold hover:opacity-90 transition-opacity leading-[14.545px]"
          >
            Cancel
          </button>
          <button
            onClick={onStartOrder}
            className="flex-1 bg-[var(--color-secondary-1)] text-white px-[10.182px] py-[8.727px] rounded-[11.636px] text-[12px] font-bold hover:opacity-90 transition-opacity leading-[14.545px]"
          >
            Start Order
          </button>
        </div>
      </div>
    );
  }

  return null;
};
