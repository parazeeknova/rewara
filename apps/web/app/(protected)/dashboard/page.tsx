import { ProtectedRoute } from '@rewara/auth/components/protected-route';
import type { JSX } from 'react';
import Dashboard from './dashboard';

export default function DashboardPage(): JSX.Element {
  return (
    <ProtectedRoute>
      return <Dashboard />
    </ProtectedRoute>
  );
}
