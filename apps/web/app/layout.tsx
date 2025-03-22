import type { Metadata } from 'next';
import './globals.css';
import { SofiaProSoft } from '@rewara/ui';
import type { JSX, ReactNode } from 'react';
import { Providers } from './providers';

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
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
