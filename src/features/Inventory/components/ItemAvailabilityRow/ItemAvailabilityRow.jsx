import React from 'react';
import { AvailabilityToggle } from '../AvailabilityToggle/AvailabilityToggle';
import { AvailabilityBadge } from '../AvailabilityBadge/AvailabilityBadge';
import { StockDropdown } from '../StockDropdown/StockDropdown';

export const ItemAvailabilityRow = ({
  id,
  image,
  title,
  price,
  category,
  isAvailable = true,
  status = 'Unavailable',
  stock = 'In Stock',
  onToggle,
  onStockChange,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-[12px] hover:shadow-md hover:border-gray-300 transition-all duration-200 h-[64px] relative flex items-center px-4 py-2">
      {/* LEFT: Image, Name, No, Category */}
      <div className="flex items-center gap-4 w-1/2">
        <div className="w-12 h-12 flex-shrink-0 rounded-[8px] overflow-hidden shadow-sm">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate max-w-[200px]">{title}</h3>
            <span className="text-sm text-gray-500 font-medium">#{id}</span>
          </div>
          {category && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md w-max mt-0.5 font-medium">
              {category}
            </span>
          )}
        </div>
      </div>

      {/* CENTER: Price */}
      <div className="w-1/6 flex items-center justify-start">
        <div className="flex gap-1 items-baseline">
          <span className="text-sm font-bold text-orange-400">₹</span>
          <span className="text-xl font-bold text-orange-500">{price}</span>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex-1 flex items-center justify-end gap-6">
        <AvailabilityToggle
          isOn={isAvailable}
          onChange={(newState) => onToggle?.(id, newState)}
        />
        <AvailabilityBadge status={status} />
        <StockDropdown
          value={stock}
          onChange={(newStock) => onStockChange?.(id, newStock)}
        />
      </div>
    </div>
  );
};
