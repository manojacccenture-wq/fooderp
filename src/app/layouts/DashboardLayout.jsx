import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/layout/Header/Header';

export const DashboardLayout = () => {
  return (
    <div 
      className="flex flex-col h-screen w-full bg-white overflow-hidden" 
    >
      <Header />
      <main className="flex-1 relative overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};
