'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { HoveredLink, Menu, MenuItem, ProductItem } from './navbar-menu';

export function NavbarAnimated() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(
        prevScrollPos > currentScrollPos || // Scrolling up
          currentScrollPos < 10 // At the top
      );

      setPrevScrollPos(currentScrollPos);
      setIsScrolled(currentScrollPos > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div className="relative flex w-full items-center justify-center">
      <Navbar
        className={cn(
          'top-2 transition-all duration-300',
          visible ? 'translate-y-0' : '-translate-y-full',
          isScrolled ? '' : 'bg-transparent'
        )}
      />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true,
    });
  };

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-10 z-50 mx-auto mt-5 max-w-2xl px-4',
        className
      )}
    >
      <Menu setActive={setActive}>
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="font-bold text-black dark:text-white">
            Rewara
          </Link>

          <div className="flex items-center space-x-4">
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="grid grid-cols-2 gap-10 p-4 text-sm">
                <ProductItem
                  title="Business Analytics Dashboard"
                  href="https://algochurn.com"
                  src="https://assets.aceternity.com/demos/algochurn.webp"
                  description="1.Sales Analytics 2.Customer Behavior 3.Reward Metrics 4.Sentiment Analysis"
                />
                <ProductItem
                  title="Customer Loyalty & Rewards System"
                  href="https://tailwindmasterkit.com"
                  src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                  description="1.Tiered Rewards 2.Personalized Recommendations 3.Dynamic Offers 4.Reward Tracking"
                />
                <ProductItem
                  title="Customer Feedback & Sentiment Analysis"
                  href="https://gomoonbeam.com"
                  src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                  description="1.Checkout Feedback 2.Sentiment Dashboard 3.Feedback Collection"
                />
                <ProductItem
                  title="Complaint Management System"
                  href="https://userogue.com"
                  src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                  description="1.Ticket System 2.Automated Resolutions 3.Resolution Analytics"
                />
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Dashboard">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/dashboard">Dashboard</HoveredLink>
              </div>
            </MenuItem>

            {status === 'authenticated' ? (
              <MenuItem
                setActive={setActive}
                active={active}
                item={session.user?.name || 'Profile'}
                showChevron={true}
              >
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/profile">My Profile</HoveredLink>
                  <HoveredLink href="/settings">Settings</HoveredLink>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full text-left text-neutral-700 hover:text-black dark:text-neutral-200"
                  >
                    Sign Out
                  </button>
                </div>
              </MenuItem>
            ) : (
              <MenuItem
                setActive={setActive}
                active={active}
                item="Login"
                showChevron={true}
              >
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/auth/login">Sign In</HoveredLink>
                  <HoveredLink href="/auth/signup">Sign Up</HoveredLink>
                </div>
              </MenuItem>
            )}
          </div>
        </div>
      </Menu>
    </div>
  );
}
