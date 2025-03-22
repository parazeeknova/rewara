'use client';

import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@rewara/ui/shadui/button';
import { signIn } from 'next-auth/react';

interface OAuthButtonsProps {
  callbackUrl: string;
}

export function OAuthButtons({ callbackUrl }: OAuthButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button onClick={() => signIn('google', { callbackUrl })}>
        <GoogleIcon className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button onClick={() => signIn('github', { callbackUrl })}>
        <GitHubIcon className="mr-2 h-4 w-4" />
        Github
      </Button>
    </div>
  );
}
