'use client';

import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import RedditIcon from '@mui/icons-material/Reddit';
import { Button } from '@rewara/ui/shadui/button';
import { Plane } from 'lucide-react';
import { signIn } from 'next-auth/react';

interface OAuthButtonsProps {
  callbackUrl: string;
}

export function OAuthButtons({ callbackUrl }: OAuthButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() => signIn('google', { callbackUrl })}
        className="bg-white text-black hover:bg-gray-100"
      >
        <GoogleIcon className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn('github', { callbackUrl })}
        className="bg-[#24292F] text-white hover:bg-[#24292F]/90"
      >
        <GitHubIcon className="mr-2 h-4 w-4" />
        Github
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn('discord', { callbackUrl })}
        className="bg-[#5865F2] text-white hover:bg-[#5865F2]/90"
      >
        <Plane className="mr-2 h-4 w-4" />
        Discord
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn('reddit', { callbackUrl })}
        className="bg-[#FF4500] text-white hover:bg-[#FF4500]/90"
      >
        <RedditIcon className="mr-2 h-4 w-4" />
        Reddit
      </Button>
    </div>
  );
}
