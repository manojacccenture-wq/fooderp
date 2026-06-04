import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutModal } from './LogoutModal';
import { lockPOS, setAutoLockTimeout } from '../../../store/slices/authSlice';

const imgVector = "http://localhost:3845/assets/56c9b6210eb0436b457badfa3ee0358646ef3cb3.svg";
const imgVector1 = "http://localhost:3845/assets/12ceba92ef4e88b4f9c796089133f3191aa892be.svg";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname.includes(path);

  const menuItems = [
    { label: "Lock POS (Ctrl+Shift+L)", action: "lock" },
    { label: "Overview", route: "/dashboard" },
    { label: "Shift Summary", route: "/dashboard/shift-summary" },
    { label: "Item on/off", route: "/dashboard/item-on-off" },
    { label: "Money management", route: "/dashboard/money-management" },
    { label: "Order History", route: "/dashboard/order-history" },
    { label: "End Shift / Log Out", action: "logout" },
  ];

  const autoLockOptions = [0, 5, 10, 15, 30]; // 0 means disabled

  const isMenuItemActive = (route) => {
    if (route === "/dashboard/shift-summary") {
      return location.pathname === "/dashboard/shift-summary";
    }
    if (route === "/dashboard/item-on-off") {
      return location.pathname === "/dashboard/item-on-off";
    }
    if (route === "/dashboard/money-management") {
      return location.pathname === "/dashboard/money-management";
    }
    if (route === "/dashboard/order-history") {
      return location.pathname.startsWith("/dashboard/order-history");
    }
    return location.pathname === "/dashboard" && route === "/dashboard";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleMenuClick = (item) => {
    if (item.action === 'logout') {
      setShowLogout(true);
    } else if (item.action === 'lock') {
      dispatch(lockPOS());
    } else if (item.route) {
      navigate(item.route);
    }
    setIsDropdownOpen(false);
  };

  return (
    <header className="h-[84px] shrink-0 w-full bg-[var(--color-tertiary-5)] border-b border-[var(--color-neutral-10)] flex items-center justify-between px-6 py-6 z-30 relative">
      {showLogout && <LogoutModal onClose={() => setShowLogout(false)} />}
      
      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white p-3 rounded-xl shadow-[0px_4px_20px_0px_rgba(50,50,71,0.02),0px_0px_2px_0px_rgba(12,26,75,0.05)] flex items-center justify-center w-[44px] h-[44px]"
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="2" fill="#32324D"/>
                <circle cx="5" cy="12" r="2" fill="#32324D"/>
                <circle cx="19" cy="12" r="2" fill="#32324D"/>
              </svg>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-[calc(100%+12px)] left-0 w-[260px] bg-[var(--color-neutral-100)] border border-[var(--color-border-light)] rounded-2xl shadow-xl flex flex-col py-4 z-50">
              <nav className="flex flex-col w-full px-4 gap-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleMenuClick(item)}
                    className={`w-full text-left flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                      item.route && isMenuItemActive(item.route)
                        ? 'bg-[var(--color-secondary-5)]'
                        : 'hover:bg-[var(--color-secondary-5)]'
                    }`}
                  >
                    <span className={`text-label-active font-medium ${item.action === 'logout' ? 'text-[#f24343]' : 'text-[var(--color-neutral-800)]'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>
              
              <div className="w-full h-[1px] bg-[var(--color-border-light)] my-4"></div>
              
              <div className="px-8 flex flex-col gap-2">
                <span className="text-[12px] font-bold text-[var(--color-neutral-500)] uppercase tracking-wider">Auto-Lock Inactivity</span>
                <div className="flex flex-wrap gap-2">
                  {autoLockOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => dispatch(setAutoLockTimeout(opt))}
                      className={`px-3 py-1 rounded-[8px] text-[12px] font-bold transition-all ${
                        auth.autoLockTimeout === opt 
                          ? 'bg-[#ffb01d] text-white shadow-sm' 
                          : 'bg-[var(--color-neutral-10)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-20)]'
                      }`}
                    >
                      {opt === 0 ? 'Disabled' : `${opt}m`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-[2px]">
          <span className="text-body-2 text-[var(--color-neutral-500)]">Anna's Kitchen</span>
          <span className="text-subtitle-1 text-[var(--color-neutral-800)]">{auth.shiftName || 'Cashier'}</span>
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
