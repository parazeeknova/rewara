'use client';

import { DesignSystemProvider } from '@rewara/ui';
import { SessionProvider } from 'next-auth/react';
import type { JSX, ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }): JSX.Element {
  return (
    <SessionProvider>
      <DesignSystemProvider>{children}</DesignSystemProvider>
    </SessionProvider>
  );
}
