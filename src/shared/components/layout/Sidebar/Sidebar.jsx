import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const imgDivider = "http://localhost:3845/assets/afc64b00775d8e6e11d363c5f26b69021ca280ea.svg";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Overview", route: "/dashboard" },
    { label: "Shift Summary", route: "/dashboard" },
    { label: "Item on/off", route: "/dashboard/item-on-off" },
    { label: "Money management", route: "/dashboard/money-management" },
    { label: "Order History", route: "/dashboard/order-history" },
    { label: "Log Out", route: "/dashboard" },
  ];

  const isActive = (route) => {
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

  return (
    <aside className="w-full h-full bg-[var(--color-neutral-100)] border-r border-[var(--color-border-light)] flex flex-col gap-4 py-6 px-4 z-20 overflow-y-auto">
      <div className="flex flex-col justify-end text-center">
        <h1 style={{ color: 'var(--color-tertiary-1)' }}>Annas Kitchen</h1>
      </div>
      
      <div className="w-full h-px relative shrink-0">
        <img alt="divider" className="w-full h-full object-cover" src={imgDivider} />
      </div>
      
      <nav className="flex flex-col gap-3 w-full mt-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.route)}
            className={`w-full text-left flex items-center px-2 py-2 rounded-lg cursor-pointer transition-colors ${
              isActive(item.route)
                ? 'bg-[var(--color-secondary-5)]'
                : 'hover:bg-[var(--color-secondary-5)]'
            }`}
          >
            <span className="text-label-active text-[var(--color-neutral-800)]">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
