'use client';
import { cn } from '@rewara/ui/lib/utils';
import { Checkbox } from '@rewara/ui/shadui/checkbox';
import { Input } from '@rewara/ui/shadui/input';
import { Label } from '@rewara/ui/shadui/label';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGoogle,
} from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import type React from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await signIn('credentials', {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid credentials');
        return;
      }

      toast.success('Logged in successfully');
      window.location.href = '/';
    } catch {
      toast.error('Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black p-4">
      <div className="mx-auto w-full max-w-md rounded-none border border-neutral-300 bg-white p-4 shadow-input md:rounded-2xl md:p-8 dark:border-neutral-700 dark:bg-black">
        <h2 className="font-bold text-neutral-800 text-xl dark:text-neutral-200">
          Welcome back
        </h2>
        <p className="mt-2 max-w-sm text-neutral-600 text-sm dark:text-neutral-300">
          New to our platform?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="best@business.com"
              type="email"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
            />
          </LabelInputContainer>

          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-primary text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in →'}
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-col space-y-4">
            <button
              type="button"
              onClick={() => signIn('github', { callbackUrl: '/' })}
              className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 text-sm dark:text-neutral-300">
                Continue with GitHub
              </span>
              <BottomGradient />
            </button>
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 text-sm dark:text-neutral-300">
                Continue with Google
              </span>
              <BottomGradient />
            </button>
            <button
              type="button"
              onClick={() => signIn('discord', { callbackUrl: '/' })}
              className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            >
              <IconBrandDiscord className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 text-sm dark:text-neutral-300">
                Continue with Discord
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="-bottom-px absolute inset-x-0 block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="-bottom-px absolute inset-x-10 mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};
