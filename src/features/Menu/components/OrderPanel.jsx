import React from 'react';

const imgAvocadoSandwich1 = "http://localhost:3845/assets/9c489a346f0d6c27a9687c5b68bc1fef4c902d3c.png";

const OrderItem = ({ image, title, price, quantity }) => {
  return (
    <div className="bg-white border border-[var(--color-secondary-0)] rounded-2xl p-3 flex gap-3 items-center shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] relative">
      <div className="w-[50px] h-[50px] shrink-0 drop-shadow-[0px_0px_4px_rgba(255,255,255,0.7)]">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-label-default text-[var(--color-neutral-800)] font-semibold">{title}</span>
        <div className="flex items-center gap-3 mt-1">
          <button className="w-6 h-6 rounded-xl bg-[var(--color-tertiary-5)] flex items-center justify-center text-caption-3 font-bold text-[var(--color-neutral-600)]">-</button>
          <span className="text-label-default text-[var(--color-neutral-600)] font-semibold">{quantity}</span>
          <button className="w-7 h-7 rounded-xl bg-[var(--color-tertiary-5)] flex items-center justify-center text-caption-3 font-bold text-[var(--color-neutral-600)]">+</button>
        </div>
      </div>
      <div className="absolute right-3 top-3 flex gap-2">
        <div className="w-5 h-5 flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </div>
        <div className="w-5 h-5 flex items-center justify-center cursor-pointer text-gray-400 hover:text-red-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </div>
      </div>
      <div className="absolute right-3 bottom-3 flex items-start gap-[2px]">
        <small className="text-[var(--color-tertiary-3)] font-bold pb-1">₹</small>
        <span className="text-price-md text-[var(--color-tertiary-1)]">{price}</span>
      </div>
    </div>
  );
};

export const OrderPanel = () => {
  return (
    <div className="w-[354px] min-h-full h-fit bg-white border-l border-[var(--color-neutral-150)] flex flex-col relative py-4 shrink-0">
      <div className="flex items-center gap-4 px-4">
        <button className="bg-[var(--color-danger-500)] text-white flex-1 py-3 rounded-[16px] text-button-sm">Cancel order</button>
        {/* <button className="bg-[var(--color-secondary-1)] text-white flex-1 py-3 rounded-[16px] text-button-sm">Pause</button> */}
      </div>

      <div className="px-4 mt-8">
        <h2 className="text-subtitle-1 text-[var(--color-neutral-800)] mb-4">Current order</h2>
        <div className="flex flex-col gap-4">
          <OrderItem image={imgAvocadoSandwich1} title="Chicken Biriyani" price="120" quantity={2} />
          <OrderItem image={imgAvocadoSandwich1} title="Non veg thali" price="120" quantity={2} />
        </div>
      </div>

      <div className="px-4 mt-8">
        <div className="bg-[var(--color-secondary-5)] p-3 rounded-2xl flex justify-center mb-4">
          <span className="text-subtitle-2 text-[var(--color-neutral-800)]">Payment Summary</span>
        </div>

        <div className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04),0px_0px_1px_0px_rgba(12,26,75,0.03)] p-4 flex flex-col gap-3 border border-[var(--color-neutral-150)]">
          <div className="flex justify-between items-center">
            <span className="text-body-2 text-[var(--color-neutral-600)]">Total Amount</span>
            <span className="text-label-default text-[var(--color-neutral-700)] font-bold flex gap-1"><small className="text-[var(--color-tertiary-3)] mt-1">₹</small>450.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-body-2 text-[var(--color-neutral-600)]">Tax</span>
            <span className="text-label-default text-[var(--color-neutral-700)] font-bold flex gap-1"><small className="text-[var(--color-tertiary-3)] mt-1">₹</small>35.00</span>
          </div>
          <div className="w-full h-px border-t border-dashed border-[var(--color-neutral-300)] my-1"></div>
          <div className="flex justify-between items-center">
            <span className="text-subtitle-2 text-[var(--color-neutral-700)]">Total price</span>
            <span className="text-price-md text-[var(--color-tertiary-1)] flex gap-1"><small className="text-[var(--color-tertiary-3)] mt-[2px]">₹</small>465.00</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="bg-[var(--color-secondary-5)] p-3 rounded-2xl flex justify-between items-center px-4">
          <span className="text-subtitle-2 text-[var(--color-neutral-800)]">Total</span>
          <span className="text-subtitle-2 text-[var(--color-neutral-800)]">150</span>
        </div>
      </div>

      <div className="px-4 mt-6 flex flex-col gap-3">
        <input
          type="text"
          defaultValue="9629917347"
          className="w-full h-[54px] border border-[#eaeaef] focus:border-[#ff7b2c] focus:ring-0 focus:outline-none rounded-[16px] px-4 text-[#8e8ea9] font-semibold text-[14px]"
        />
        {/* <textarea
          placeholder="Special Instructions...."
          className="w-full h-[120px] border border-[var(--color-neutral-150)] rounded-2xl p-4 text-label-placeholder text-[var(--color-neutral-500)] outline-none resize-none"
        ></textarea> */}
      </div>

      <div className="px-4 mt-8 flex flex-col gap-3 pb-8">
        <button className="w-full bg-[var(--color-neutral-200)] text-[var(--color-neutral-800)] py-4 rounded-2xl text-button-md">Apply Discount</button>
        <button className="w-full bg-[var(--color-secondary-1)] text-white py-4 rounded-2xl text-button-md shadow-[0px_4px_20px_0px_rgba(50,50,71,0.04)]">Print Billing</button>
      </div>
    </div>
  );
};
