import React from 'react';
import clsx from 'clsx';

export const OrderTypeSelector = ({
  orderType,
  setOrderType,
  isTakeawayPage,
  totalPackQuantity = 0
}) => {
  return (
    <div className="px-4 mt-6">
      <h3 className="text-[16px] font-bold text-[#32324d] mb-4">Order Type :</h3>
      <div className="flex gap-4">
        {!isTakeawayPage && (
          <button
            className={clsx("rounded-[16px] px-4 py-[12px] font-bold text-[16px]", orderType === 'dine_in' ? "bg-[#ffb01d] text-white" : "bg-transparent text-[#212134]")}
            onClick={() => setOrderType('dine_in')}
          >
            Dine In
          </button>
        )}
        <button
          className={clsx(
            "rounded-[16px] px-4 py-[12px] font-bold text-[16px] transition-opacity", 
            orderType === 'take_away' ? "bg-[#ffb01d] text-white" : "bg-transparent text-[#212134]"
          )}
          onClick={() => setOrderType('take_away')}
        >
          Take away
        </button>
      </div>
    </div>
  );
};
