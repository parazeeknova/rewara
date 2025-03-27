import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import DashboardWrapper from './dashboard-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Customer Grid',
  description: 'Dashboard for managing customers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
