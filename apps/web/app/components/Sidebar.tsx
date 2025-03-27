'use client';

import { useAppDispatch, useAppSelector } from '@/redux';
import { setIsSidebarCollapsed } from '@/state';
import {
  BarChart,
  Book,
  CircleDollarSign,
  Clipboard,
  Layout,
  type LucideIcon,
  Menu,
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
          isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
        }hover:text-blue-500 gap-3 transition-colors hover:bg-blue-100 ${
          isActive ? 'bg-blue-200 text-white' : ''
        }}`}
      >
        <Icon className="!text-gray-700 h-6 w-6" />

        <span
          className={`${
            isCollapsed ? 'hidden' : 'block'
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex items-center justify-between gap-3 pt-8 md:justify-normal ${
          isSidebarCollapsed ? 'px-5' : 'px-8'
        }`}
      >
        <h1
          className={`${
            isSidebarCollapsed ? 'hidden' : 'block'
          } font-extrabold text-2xl`}
        >
          Customer Grid
        </h1>

        <button
          type="button"
          className="rounded-full bg-gray-100 px-3 py-3 hover:bg-blue-100 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="mt-8 flex-grow">
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
      <div className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10`}>
        <p className="text-center text-gray-500 text-xs">
          &copy; 2025 Customer Grid
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
