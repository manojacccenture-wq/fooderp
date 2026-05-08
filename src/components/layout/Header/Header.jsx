import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const imgVector = "http://localhost:3845/assets/56c9b6210eb0436b457badfa3ee0358646ef3cb3.svg";
const imgVector1 = "http://localhost:3845/assets/12ceba92ef4e88b4f9c796089133f3191aa892be.svg";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <header className="fixed top-0 left-[251px] right-0 h-[84px] bg-[var(--color-tertiary-5)] border-b border-[var(--color-neutral-10)] flex items-center justify-between px-6 py-6 z-20">
      
      <div className="flex items-center gap-3">
        <button className="bg-white p-3 rounded-xl shadow-[0px_4px_20px_0px_rgba(50,50,71,0.02),0px_0px_2px_0px_rgba(12,26,75,0.05)] flex items-center justify-center w-[44px] h-[44px]">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="#32324D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="#32324D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
        
        <div className="flex flex-col gap-[2px]">
          <span className="text-body-2 text-[var(--color-neutral-500)]">Anna's Kitchen</span>
          <span className="text-subtitle-1 text-[var(--color-neutral-800)]">Cashier</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/dashboard/menu')}
          className={`text-button-md px-4 py-3 rounded-2xl transition-colors ${
            isActive('menu') 
              ? 'bg-[var(--color-secondary-1)] text-white' 
              : 'text-[var(--color-neutral-800)] hover:bg-black/5'
          }`}
        >
          Menus
        </button>
        <button 
          onClick={() => navigate('/dashboard/dine-in')}
          className={`text-button-md px-4 py-3 rounded-2xl transition-colors ${
            isActive('dine-in') 
              ? 'bg-[var(--color-secondary-1)] text-white' 
              : 'text-[var(--color-neutral-800)] hover:bg-black/5'
          }`}
        >
          Dine-In
        </button>
        <button 
          onClick={() => navigate('/dashboard/takeaways')}
          className={`text-button-md px-4 py-3 rounded-2xl transition-colors ${
            isActive('takeaways') 
              ? 'bg-[var(--color-secondary-1)] text-white' 
              : 'text-[var(--color-neutral-800)] hover:bg-black/5'
          }`}
        >
          Takeaways
        </button>
      </div>
    </header>
  );
};
