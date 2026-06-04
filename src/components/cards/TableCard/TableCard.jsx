import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom icons to match the design without external libraries
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8e8ea9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const TimerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8e8ea9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
    <path d="M16 2l4 4M8 2L4 6"></path>
  </svg>
);

const GuestsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8e8ea9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ThreeDotsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8e8ea9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="12" r="2" fill="#8e8ea9" stroke="none" />
    <circle cx="12" cy="12" r="2" fill="#8e8ea9" stroke="none" />
    <circle cx="19" cy="12" r="2" fill="#8e8ea9" stroke="none" />
  </svg>
);

const getCardStyleOptions = (status, workflowStatus) => {
  if (status === 'available') {
    return { bg: 'bg-[#e8fbf0]/50', border: 'border-l-[#24a44b]', label: 'AVAILABLE', labelColor: 'text-[#24a44b]' };
  }
  if (status === 'reserved') {
    return { bg: 'bg-[#fff7e8]/50', border: 'border-l-[#ffb01d]', label: 'RESERVED', labelColor: 'text-[#d88c00]' };
  }
  
  switch (workflowStatus) {
    case 'DRAFT': return { bg: 'bg-[#f8faff]/80', border: 'border-l-[#eaeaef]', label: 'DRAFT', labelColor: 'text-[#8e8ea9]' };
    case 'KOT SENT': return { bg: 'bg-[#f0f0ff]/80', border: 'border-l-[#6366f1]', label: 'KOT SENT', labelColor: 'text-[#6366f1]' };
    case 'READY': return { bg: 'bg-[#e8fbf0]/80', border: 'border-l-[#24a44b]', label: 'READY TO SERVE', labelColor: 'text-[#24a44b]' };
    case 'BILLING': return { bg: 'bg-[#fff7e8]/80', border: 'border-l-[#ffb01d]', label: 'BILLING', labelColor: 'text-[#d88c00]' };
    case 'PAYMENT': return { bg: 'bg-[#fff0f0]/80', border: 'border-l-[#f24343]', label: 'PAYMENT PENDING', labelColor: 'text-[#f24343]' };
    case 'COMPLETED': return { bg: 'bg-[#e8fbf0]/80', border: 'border-l-[#166534]', label: 'COMPLETED', labelColor: 'text-[#166534]' };
    default: return { bg: 'bg-[#f8faff]/80', border: 'border-l-[#eaeaef]', label: 'OCCUPIED', labelColor: 'text-[#8e8ea9]' };
  }
};

export const TableCard = ({ 
  tableNo, 
  status,
  customerName,
  guests,
  duration,
  reservedGuests,
  workflowStatus,
  onStartOrder,
  onChangeTable,
  onMergeTable,
  onCancelFood,
  onReplaceFood,
  onCancelTable,
  onResumeOrder,
  isSelected,
  minimalView
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate=useNavigate()
  
  const styles = getCardStyleOptions(status, workflowStatus);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action) => {
    setShowMenu(false);
    if (action === 'Change table') {
      onChangeTable && onChangeTable(tableNo);
    } else if (action === 'Merge table') {
      onMergeTable && onMergeTable(tableNo);
    } else if (action === 'Cancel Food') {
      onCancelFood && onCancelFood(tableNo);
    } else if (action === 'Replace Food') {
      onReplaceFood && onReplaceFood(tableNo);
    } else if (action === 'Cancel Table') {
      onCancelTable && onCancelTable(tableNo);
    }
    // Other actions...
  };

  const renderDropdown = () => {
    if (minimalView || status !== 'occupied') return null;
    return (
      <div className="absolute top-[16px] left-[16px] z-20" ref={menuRef}>
        <button 
          onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
          className="p-1 -ml-1 rounded-[8px] hover:bg-[#f6f6f9] transition-colors flex items-center justify-center"
        >
          <ThreeDotsIcon />
        </button>
        
        {showMenu && (
          <div className="absolute top-[32px] left-0 w-[140px] bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-2 border border-[#eaeaef] flex flex-col gap-1">
            {['Change table', 'Merge table'/* , 'Cancel Food', 'Replace Food' */,'Cancel Table'].map(opt => (
              <button 
                key={opt} 
                onClick={(e) => { e.stopPropagation(); handleAction(opt); }} 
                className="w-full text-left px-4 py-2 text-[12px] font-semibold text-[#4a4a6a] hover:bg-[#f6f6f9] transition-all duration-200 active:scale-[0.98]"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  
  if (status === 'available') {
    return (
      <div 
        className={`w-[293px] h-[183px] cursor-pointer border-2 border-l-[6px] rounded-[16px] relative shrink-0 transition-all duration-200 focus:outline-none focus-visible:shadow-[0_0_0_3px_rgba(251,191,36,0.25)] hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] ${
          isSelected 
            ? 'border-[#4ad775] border-l-[#4ad775] bg-[rgba(251,191,36,0.02)] shadow-[0_0_0_3px_rgba(251,191,36,0.18),0_4px_12px_rgba(251,191,36,0.15)]' 
            : `border-[#eaeaef] ${styles.border} ${styles.bg}`
        }`}
        tabIndex={0}
        onClick={onStartOrder}
      >
        {renderDropdown()}
        
        {/* Tiny Dot Indicator for Selected State */}
        {isSelected && (
          <div className="absolute top-[-4px] right-[-4px] w-[8px] h-[8px] bg-[#FBBF24] rounded-full shadow-[0_0_0_2px_white]" />
        )}

        <div className="absolute top-[16px] right-[16px] pointer-events-none">
          <span className={`text-[10px] font-black uppercase tracking-[0.08em] ${styles.labelColor}`}>{styles.label}</span>
        </div>

        <div className={`absolute left-0 right-0 flex flex-col items-center w-full ${minimalView ? 'top-[80px]' : 'top-[64px] gap-[6px]'}`}>
          <h3 className={`text-[16px] leading-none text-[#4a4a6a] ${isSelected ? 'font-[700]' : 'font-extrabold'}`}>Table {tableNo}</h3>
          
          {!minimalView && <p className="text-[12px] font-medium text-[#8e8ea9] mt-[2px]">Ready for new order</p>}
        </div>
        {!minimalView && (
          <button 
            onClick={onStartOrder}
            className="absolute top-[127px] right-[9px] w-[130px] h-[32px] bg-[#ffb01d] rounded-[12px] flex items-center justify-center text-white text-[12px] font-bold"
          >
            Book Table
          </button>
        )}
      </div>
    );
  }

  if (status === 'occupied') {
    return (
      <div 
        className={`w-[293px] h-[183px] border-2 border-l-[6px] border-[#eaeaef] ${styles.border} ${styles.bg} rounded-[16px] relative shrink-0 cursor-pointer transition-colors duration-200`}
        onClick={onResumeOrder ? () => onResumeOrder(tableNo) : undefined}
      >
        {renderDropdown()}
        <h3 className="absolute top-[20px] left-[48px] text-[16px] leading-none font-extrabold text-[#4a4a6a]">Table {tableNo}</h3>
        
        <div className="absolute top-[16px] right-[16px] pointer-events-none">
          <span className={`text-[10px] font-black uppercase tracking-[0.08em] ${styles.labelColor}`}>{styles.label}</span>
        </div>
        
        {/* Customer Name Row */}
        <div className="absolute top-[61px] left-[19px] flex items-center gap-[12px] h-[36px]">
          <div className="w-[36px] h-[36px] bg-[#f6f6f9] rounded-[32px] flex items-center justify-center shrink-0">
            <UserIcon />
          </div>
          <span className="text-[12px] font-semibold text-[#8e8ea9]">{customerName}</span>
        </div>

        {/* Timer Row */}
        <div className="absolute top-[127px] left-[19px] flex items-center gap-[12px] h-[36px]">
          <div className="w-[36px] h-[36px] bg-[#f6f6f9] rounded-[32px] flex items-center justify-center shrink-0">
            <TimerIcon />
          </div>
          <span className="text-[12px] font-semibold text-[#8e8ea9]">{duration}</span>
        </div>

        {/* Guests Row */}
        <div className="absolute top-[61px] left-[133px] flex items-center gap-[12px] h-[36px]">
          <div className="w-[36px] h-[36px] bg-[#f6f6f9] rounded-[32px] flex items-center justify-center shrink-0">
            <GuestsIcon />
          </div>
          <span className="text-[12px] font-semibold text-[#8e8ea9]">{guests} Guests</span>
        </div>

        {/* Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); if(onResumeOrder) onResumeOrder(tableNo); }}
          className="absolute top-[127px] right-[16px] w-[121px] h-[32px] bg-[#ffb01d] rounded-[12px] flex items-center justify-center text-white text-[12px] font-bold">
          Complete Order
        </button>
      </div>
    );
  }

  if (status === 'reserved') {
    return (
      <div className={`w-[293px] h-[183px] border-2 border-l-[6px] border-[#eaeaef] ${styles.border} ${styles.bg} rounded-[16px] relative shrink-0`}>
        {renderDropdown()}
        <h3 className="absolute top-[20px] left-[48px] text-[20px] leading-none font-extrabold text-[#4a4a6a]">Table {tableNo}</h3>
        
        <div className="absolute top-[16px] right-[16px] pointer-events-none">
          <span className={`text-[10px] font-black uppercase tracking-[0.08em] ${styles.labelColor}`}>{styles.label}</span>
        </div>

        {/* Expected Guests Row */}
        <div className="absolute top-[61px] left-[19px] flex items-center gap-[12px] h-[36px]">
          <div className="w-[36px] h-[36px] bg-white rounded-[32px] flex items-center justify-center shrink-0">
            <GuestsIcon />
          </div>
          <span className="text-[16px] font-semibold text-[#8e8ea9]">{reservedGuests} Guests Excepted</span>
        </div>

        {/* Buttons */}
        <button className="absolute top-[127px] left-[82px] w-[92px] h-[32px] bg-[#f24343] rounded-[12px] flex items-center justify-center text-white text-[12px] font-bold">
          Cancel
        </button>
        <button 
          onClick={()=>navigate("/dashboard/menu")}
          className="absolute top-[127px] right-[16px] w-[92px] h-[32px] bg-[#ffb01d] rounded-[12px] flex items-center justify-center text-white text-[12px] font-bold"
        >
          Start Order
        </button>
      </div>
    );
  }

  return null;
};
