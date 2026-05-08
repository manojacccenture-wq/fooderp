import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { Header } from '../../components/layout/Header/Header';

export const DashboardLayout = () => {
  return (
    <div className="flex w-full min-h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[251px]">
        <Header />
        <main className="flex-1 relative mt-[84px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
