import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5" stroke="#32324D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19L5 12L12 5" stroke="#32324D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="#8E8EA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#8E8EA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7V12L15 15" stroke="#8E8EA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StartOrderModal = ({ isOpen, onClose, tableNo, onSubmit }) => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('');
  const [reserve, setReserve] = useState('');
  const [time, setTime] = useState('');
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Reset state when opened
      setName('');
      setGuests('');
      setReserve('');
      setTime('');
      setMobile('');
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStartOrder = () => {
    if (onSubmit) {
      onSubmit({ name, guests, reserve, time, mobile });
    }
  };

  const inputClass = "w-full h-[54px] bg-white border border-[var(--color-neutral-150)] rounded-[16px] px-4 text-[14px] font-semibold text-[#32324d] placeholder-[#8e8ea9] focus:border-[var(--color-tertiary-1)] focus:outline-none focus:ring-0 transition-colors";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1a4b]/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[26px] w-[400px] p-6 shadow-xl relative animate-in fade-in zoom-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-center relative mb-6">
          <button 
            onClick={onClose}
            className="absolute left-0 p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <BackIcon />
          </button>
          <h2 className="text-[16px] font-bold text-[#32324d]">Book table</h2>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <input 
              type="text" 
              placeholder="Name" 
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <input 
              type="text" 
              placeholder="Guests" 
              className={inputClass}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          <div className="relative">
            <select 
              className={`${inputClass} appearance-none cursor-pointer`}
              value={reserve}
              onChange={(e) => setReserve(e.target.value)}
            >
              <option value="" disabled hidden>Reserve</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon />
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ClockIcon />
            </div>
            <input 
              type="text" 
              placeholder="12:30" 
              className={`${inputClass} pl-12 pr-12`}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8e8ea9] text-[14px] font-semibold">
              AM
            </div>
          </div>

          <div>
            <input 
              type="tel" 
              placeholder="Mobile No" 
              className={inputClass}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button 
            onClick={handleStartOrder}
            className="w-full h-[54px] bg-[#ffb01d] rounded-[16px] flex items-center justify-center text-white text-[16px] font-bold hover:bg-[#ffb01d]/90 transition-colors"
          >
            Start Order
          </button>
        </div>
      </div>
    </div>
  );
};
