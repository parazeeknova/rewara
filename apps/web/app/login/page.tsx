import { AuthForm } from '@rewara/auth/components/auth-form';
import type { Metadata } from 'next';
import type { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage(): JSX.Element {
  return <AuthForm />;
}
