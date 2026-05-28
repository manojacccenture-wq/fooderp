import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { Header } from '../../components/layout/Header/Header';

export const DashboardLayout = () => {
  return (
    <div 
      className="grid h-screen w-full bg-white overflow-hidden" 
      style={{ gridTemplateColumns: '260px minmax(0, 1fr)' }}
    >
      <Sidebar />
      <div className="flex flex-col h-full min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 relative overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
