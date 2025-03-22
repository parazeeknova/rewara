'use client';

import { Button } from '@rewara/ui/shadui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@rewara/ui/shadui/card';
import { useSearchParams } from 'next/navigation';
import { OAuthButtons } from './oauth-buttons';

export function AuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center font-bold text-2xl">
            Welcome to Rewara
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm">
            Sign in to your account to continue
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthButtons callbackUrl={callbackUrl} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Button>Sign in with Email</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
