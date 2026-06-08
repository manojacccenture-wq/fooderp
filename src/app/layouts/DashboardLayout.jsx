import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../shared/components/layout/Header/Header';
import { LockScreenWrapper } from '../../features/Auth/components/LockScreenWrapper';

export const DashboardLayout = () => {
  return (
    <LockScreenWrapper>
      <div 
        className="flex flex-col h-screen w-full bg-white overflow-hidden relative" 
      >
        <Header />
        <main className="flex-1 relative overflow-hidden">
          <Outlet />
        </main>
      </div>
    </LockScreenWrapper>
  );
};

