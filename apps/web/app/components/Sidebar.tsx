'use client';

import { useAppSelector } from '@/redux';
import {
  BarChart,
  Book,
  CircleDollarSign,
  Clipboard,
  Layout,
  type LucideIcon,
  MessageSquare,
  SlidersHorizontal,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === '/' && href === '/dashboard');

  return (
    <Link href={href}>
      <div
        className={`flex cursor-pointer items-center ${
          isCollapsed ? 'justify-center py-4' : 'justify-start px-6 py-3'
        } mx-2 my-1 gap-3 rounded-md transition-all duration-200 hover:bg-blue-50 ${
          isActive
            ? 'bg-gradient-to-r from-blue-500 to-blue-400 font-medium text-white shadow-sm'
            : 'text-gray-600 hover:text-blue-600'
        }`}
      >
        <Icon
          className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`}
        />

        <span
          className={`${
            isCollapsed ? 'hidden' : 'block'
          } font-medium transition-colors duration-200`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-gradient-to-b from-white to-blue-50 transition-all duration-300 overflow-hidden h-full shadow-lg z-40 border-r border-gray-100`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex items-center justify-between gap-3 border-gray-100 border-b pt-6 pb-4 ${
          isSidebarCollapsed ? 'px-3' : 'px-6'
        }`}
      >
        <div className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text font-extrabold text-2xl text-transparent">
            Rewara
          </h1>
          <p className="mt-0.5 text-gray-500 text-xs">
            Reward Management Suite
          </p>
        </div>
      </div>

      {/* LINKS */}
      <div className="mt-4 flex-grow px-2">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/analytics"
          icon={BarChart}
          label="Analytics"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Rewards"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/docs"
          icon={Book}
          label="Documentation"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/feedback"
          icon={MessageSquare}
          label="Feedback"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div
        className={`${isSidebarCollapsed ? 'hidden' : 'block'} mt-auto mb-6 border-gray-100 border-t pt-4`}
      >
        <p className="px-4 text-center text-gray-400 text-xs">
          &copy; 2025 Rewara Inc.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
