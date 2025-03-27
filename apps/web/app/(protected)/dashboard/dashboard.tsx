'use client';

import CardExpenseSummary from '@rewara/ui/components/cards/card-expense-summary';
import CardPopularProducts from '@rewara/ui/components/cards/card-popular-products';
import CardPurchaseSummary from '@rewara/ui/components/cards/card-purchase-summary';
import CardSalesSummary from '@rewara/ui/components/cards/card-sales-summary';
import StatCard from '@rewara/ui/components/cards/stat-card';
import {
  Calendar,
  CheckCircle,
  CreditCard,
  Download,
  Filter,
  Package,
  ShoppingCart,
  Tag,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Dashboard Header */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-5 shadow-sm md:flex-row md:items-center">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-gray-500 text-sm">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <select className="bg-transparent font-medium text-sm focus:outline-none">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month" selected>
                This Month
              </option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1.5 font-medium text-blue-600 text-sm transition-colors hover:bg-blue-100"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 font-medium text-sm text-white transition-colors hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <div className="rounded-full bg-blue-50 p-3">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Customers</p>
            <p className="font-bold text-2xl">24,521</p>
            <div className="mt-1 flex items-center text-green-500 text-xs">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <div className="rounded-full bg-green-50 p-3">
            <ShoppingCart className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="font-bold text-2xl">12,346</p>
            <div className="mt-1 flex items-center text-green-500 text-xs">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+8.2% from last month</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <div className="rounded-full bg-purple-50 p-3">
            <CreditCard className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="font-bold text-2xl">$845,012</p>
            <div className="mt-1 flex items-center text-green-500 text-xs">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+16.8% from last month</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <div className="rounded-full bg-amber-50 p-3">
            <Package className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="font-bold text-2xl">1,253</p>
            <div className="mt-1 flex items-center text-red-500 text-xs">
              <TrendingDown className="mr-1 h-3 w-3" />
              <span>-2.3% from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto">
        <CardPopularProducts />
        <CardSalesSummary />
        <CardPurchaseSummary />
        <CardExpenseSummary />
        <StatCard
          title="Customer & Expenses"
          primaryIcon={<Package className="h-6 w-6 text-blue-600" />}
          dateRange="22 - 29 October 2023"
          details={[
            {
              title: 'Customer Growth',
              amount: '$175.00',
              changePercentage: 13.1,
              IconComponent: TrendingUp,
            },
            {
              title: 'Expenses',
              amount: '$10.00',
              changePercentage: -5.6,
              IconComponent: TrendingDown,
            },
          ]}
        />
        <StatCard
          title="Dues & Pending Orders"
          primaryIcon={<CheckCircle className="h-6 w-6 text-blue-600" />}
          dateRange="22 - 29 October 2023"
          details={[
            {
              title: 'Dues',
              amount: '$250.00',
              changePercentage: 13.1,
              IconComponent: TrendingUp,
            },
            {
              title: 'Pending Orders',
              amount: '147',
              changePercentage: -5.6,
              IconComponent: TrendingDown,
            },
          ]}
        />
        <StatCard
          title="Sales & Discount"
          primaryIcon={<Tag className="h-6 w-6 text-blue-600" />}
          dateRange="22 - 29 October 2023"
          details={[
            {
              title: 'Sales',
              amount: '$1,000.00',
              changePercentage: 20.5,
              IconComponent: TrendingUp,
            },
            {
              title: 'Discount',
              amount: '$200.00',
              changePercentage: -10.2,
              IconComponent: TrendingDown,
            },
          ]}
        />
      </div>

      {/* Footer Section */}
      <div className="mt-4 rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">Recent Activity</h3>
          <button
            type="button"
            className="font-medium text-blue-600 text-sm transition-colors hover:text-blue-800"
          >
            View All
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border-gray-100 border-b py-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    New customer registered
                  </p>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
              </div>
              <button
                type="button"
                className="font-medium text-blue-600 text-xs"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
