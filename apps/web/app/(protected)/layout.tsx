import { ProtectedRoute } from '@rewara/auth/components/protected-route';
import type React from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
