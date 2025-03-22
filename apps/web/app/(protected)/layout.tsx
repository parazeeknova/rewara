import { ProtectedRoute } from '@rewara/auth/components/protected-route';
import type { JSX, ReactNode } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
