import type { Metadata } from 'next';
import './globals.css';
import { DesignSystemProvider, SofiaProSoft } from '@rewara/ui';
import type { JSX, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Rewara',
  description: 'Customer experience and engagement',
};

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties): JSX.Element => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${SofiaProSoft.variable} min-h-screen font-sofiaProSoft antialiased`}
    >
      {/* @ts-expect-error */}
      <DesignSystemProvider>{children}</DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
