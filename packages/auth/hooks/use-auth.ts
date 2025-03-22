'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export function useAuth(redirectTo = '/auth/login') {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(redirectTo);
    },
  });

  return { session, status, isAuthenticated: status === 'authenticated' };
}
