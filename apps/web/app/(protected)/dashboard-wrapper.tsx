'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import StoreProvider, { useAppSelector } from '@/redux';
import type React from 'react';
import { useEffect } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  });

  return (
    <div
      className={`${
        isDarkMode ? 'dark' : 'light'
      } flex min-h-screen w-full bg-gray-50 text-gray-900`}
    >
      <Sidebar />
      <main
        className={`flex h-full w-full flex-col bg-gray-50 px-9 py-7 ${
          isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
