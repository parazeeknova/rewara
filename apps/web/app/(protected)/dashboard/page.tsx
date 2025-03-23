import { ProtectedRoute } from '@rewara/auth/components/protected-route';
import type { JSX } from 'react';

export default function DashboardPage(): JSX.Element {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center">
        <h1>Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
}
