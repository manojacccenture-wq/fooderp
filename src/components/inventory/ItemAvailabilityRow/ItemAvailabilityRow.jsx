import React from 'react';
import { AvailabilityToggle } from '../AvailabilityToggle/AvailabilityToggle';
import { AvailabilityBadge } from '../AvailabilityBadge/AvailabilityBadge';
import { StockDropdown } from '../StockDropdown/StockDropdown';

export const ItemAvailabilityRow = ({
  id,
  image,
  title,
  price,
  isAvailable = true,
  status = 'Unavailable',
  stock = 'In Stock',
  onToggle,
  onStockChange,
}) => {
  return (
    <div className="bg-white border border-[var(--color-neutral-150)] rounded-[16px] shadow-[0px_0px_1px_0px_rgba(12,26,75,0.03),0px_4px_20px_0px_rgba(50,50,71,0.04)] h-[70px] relative flex items-center px-4 py-3">
      {/* Item Image */}
      <div className="w-[50px] h-[50px] flex-shrink-0 rounded-[8px] overflow-hidden shadow-[0px_0px_4px_0px_rgba(255,255,255,0.7)]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Item Details */}
      <div className="flex flex-col gap-1 ml-4 flex-1">
        <h3 className="text-subtitle-3 text-[var(--color-neutral-800)] truncate">{title}</h3>
        <div className="flex gap-1 items-baseline">
          <span className="text-[8px] font-bold text-[var(--color-tertiary-3)]">₹</span>
          <span className="text-price-sm text-[var(--color-tertiary-1)]">{price}</span>
        </div>
      </div>

      {/* Toggle */}
      <div className="mx-6 flex-shrink-0">
        <AvailabilityToggle
          isOn={isAvailable}
          onChange={(newState) => onToggle?.(id, newState)}
        />
      </div>

      {/* Badge */}
      <div className="mx-6 flex-shrink-0">
        <AvailabilityBadge status={status} />
      </div>

      {/* Stock Dropdown */}
      <div className="flex-shrink-0">
        <StockDropdown
          value={stock}
          onChange={(newStock) => onStockChange?.(id, newStock)}
        />
      </div>
    </div>
  );
};
