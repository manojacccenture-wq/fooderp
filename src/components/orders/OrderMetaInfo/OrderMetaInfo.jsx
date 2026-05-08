import React from 'react';

export const OrderMetaInfo = ({ guests, duration, dateInfo }) => {
  return (
    <div className="flex items-center gap-[30px]">
      {/* Guests */}
      <div className="flex items-center gap-[12px] h-[36px]">
        <div className="bg-[#F6F6F9] w-[36px] h-[36px] rounded-[25px] flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10Z" stroke="#8E8EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.41663 17.5C3.41663 15.1988 5.28211 13.3333 7.58329 13.3333H12.4166C14.7178 13.3333 16.5833 15.1988 16.5833 17.5" stroke="#8E8EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-subtitle-2 font-semibold text-[#8E8EA9]">{guests} Guests</span>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-[12px] h-[36px]">
        <div className="bg-[#F6F6F9] w-[36px] h-[36px] rounded-[30px] flex items-center justify-center shrink-0">
           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="7.5" stroke="#8E8EA9" strokeWidth="1.5"/>
            <path d="M10 6.66667V10L12.5 12.5" stroke="#8E8EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-subtitle-2 font-semibold text-[#8E8EA9]">{duration}</span>
      </div>

      {/* Date Info */}
      <div className="flex items-center gap-[12px] h-[36px]">
        <div className="bg-[#F6F6F9] w-[36px] h-[36px] rounded-[30px] flex items-center justify-center shrink-0">
           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3.33337" y="4.16667" width="13.3333" height="13.3333" rx="2" stroke="#8E8EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.3334 2.5V5.83333M6.66663 2.5V5.83333M3.33337 8.33333H16.6667" stroke="#8E8EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-subtitle-2 font-semibold text-[#8E8EA9]">{dateInfo}</span>
      </div>
    </div>
  );
};
