'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/login');
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
