import { ProtectedRoute } from '@rewara/auth/components/protected-route';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import DashboardWrapper from './dashboard-wrapper';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Customer Grid',
  description: 'Dashboard for managing customers',
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={inter.className}>
      <ProtectedRoute>
        <DashboardWrapper>{children}</DashboardWrapper>
      </ProtectedRoute>
    </body>
  );
}
