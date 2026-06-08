import React from 'react';
import { OrderSummaryRow } from '../OrderSummaryRow/OrderSummaryRow';

const imgDivider = "http://localhost:3845/assets/819a82601eaaed4a5debda63be48d02fa33737ff.svg";

export const OrderSummaryCard = ({ totalAmount, tax, discount, totalPrice, discountNote, paymentType }) => {
  return (
    <div className="w-[565px] h-[242px] bg-white rounded-[16px] shadow-[0px_0px_1px_0px_rgba(12,26,75,0.03),0px_4px_20px_0px_rgba(50,50,71,0.04)] relative shrink-0">
      <div className="absolute left-[16px] top-[20px] w-[533px] flex flex-col gap-[12px]">
        <OrderSummaryRow label="Total Amount" amount={totalAmount} />
        <OrderSummaryRow label="Tax" amount={tax} />
      </div>
      
      <div className="absolute left-[16px] top-[84px] w-[535px]">
        <OrderSummaryRow label="Apply Discount" amount={discount} type="discount" />
      </div>

      <div className="absolute left-[16px] top-[116px] w-[535px] h-0">
        <img alt="divider" className="w-full" src={imgDivider} />
      </div>

      <div className="absolute left-[16px] top-[128px] w-[533px]">
        <OrderSummaryRow label="Total price" amount={totalPrice} type="total" />
      </div>

      <div className="absolute left-[18px] top-[175px] -translate-y-1/2">
        <span className="text-[14px] font-bold text-[var(--color-secondary-1)] leading-[20px]">{discountNote}</span>
      </div>

      <div className="absolute left-[18px] top-[209px] -translate-y-1/2">
        <span className="text-[14px] font-bold text-[var(--color-secondary-1)] leading-[20px]">Payment Type : {paymentType}</span>
      </div>
    </div>
  );
};
