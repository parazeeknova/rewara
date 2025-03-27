'use client';

import Header from '@/components/Header';
import {
  Calendar,
  Download,
  Filter,
  Gift,
  Plus,
  Search,
  Ticket,
  Timer,
  TrendingUp,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const mockRewardsData = [
  {
    id: 1,
    category: 'Electronics',
    discount: 15,
    validUntil: '2024-05-30',
    usageCount: 45,
    type: 'Percentage',
    code: 'TECH15',
    status: 'Active',
  },
  {
    id: 2,
    category: 'Clothing',
    discount: 20,
    validUntil: '2024-06-15',
    usageCount: 30,
    type: 'Percentage',
    code: 'STYLE20',
    status: 'Active',
  },
  {
    id: 3,
    category: 'Food',
    discount: 10,
    validUntil: '2024-05-20',
    usageCount: 60,
    type: 'Percentage',
    code: 'FOOD10',
    status: 'Active',
  },
  {
    id: 4,
    category: 'Books',
    discount: 25,
    validUntil: '2024-07-01',
    usageCount: 15,
    type: 'Percentage',
    code: 'BOOK25',
    status: 'Active',
  },
  {
    id: 5,
    category: 'Home & Garden',
    discount: 15,
    validUntil: '2024-08-15',
    usageCount: 22,
    type: 'Fixed',
    code: 'HOME15',
    status: 'Active',
  },
  {
    id: 6,
    category: 'Beauty',
    discount: 30,
    validUntil: '2024-05-10',
    usageCount: 18,
    type: 'Percentage',
    code: 'BEAUTY30',
    status: 'Expired',
  },
  {
    id: 7,
    category: 'Sports',
    discount: 12,
    validUntil: '2024-09-30',
    usageCount: 25,
    type: 'Percentage',
    code: 'SPORT12',
    status: 'Active',
  },
];

type RewardCard = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
};

const CHART_COLORS = [
  '#4F46E5',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
  '#84CC16',
];

const Rewards = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('This Month');

  // Calculate summary statistics
  const summaryCards: RewardCard[] = [
    {
      title: 'Active Coupons',
      value: mockRewardsData.filter((r) => r.status === 'Active').length,
      icon: <Ticket className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Usage',
      value: mockRewardsData.reduce((acc, curr) => acc + curr.usageCount, 0),
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Avg. Discount',
      value: `${Math.round(
        mockRewardsData.reduce((acc, curr) => acc + curr.discount, 0) /
          mockRewardsData.length
      )}%`,
      icon: <Gift className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Expiring Soon',
      value: mockRewardsData.filter(
        (reward) =>
          new Date(reward.validUntil).getTime() - Date.now() <
          7 * 24 * 60 * 60 * 1000
      ).length,
      icon: <Timer className="h-6 w-6" />,
      color: 'bg-red-100 text-red-600',
    },
  ];

  const pieChartData = useMemo(() => {
    return mockRewardsData.map((reward, index) => ({
      name: reward.category,
      value: reward.usageCount,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));
  }, []);

  const filteredRewards = useMemo(() => {
    return mockRewardsData.filter((reward) => {
      const matchesCategory =
        selectedCategory === 'All' || reward.category === selectedCategory;
      const matchesType =
        selectedType === 'All' || reward.type === selectedType;
      const matchesSearch =
        searchTerm === '' ||
        reward.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reward.code.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [selectedCategory, selectedType, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <Header name="Rewards & Coupons" />
          <p className="text-gray-500 text-sm">
            Manage and track your product rewards and coupons
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <select
              className="bg-transparent font-medium text-sm focus:outline-none"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
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
            className="flex items-center gap-1 rounded-md bg-green-50 px-3 py-1.5 font-medium text-green-600 text-sm transition-colors hover:bg-green-100"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 font-medium text-sm text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>New Coupon</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`${card.color} rounded-full p-3`}>{card.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="font-bold text-2xl">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filters Panel */}
        <div className="w-full rounded-lg bg-white p-6 shadow-sm lg:w-1/3">
          <h3 className="mb-4 font-semibold text-lg">Filter Rewards</h3>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search coupons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              {/* biome-ignore lint/a11y/noLabelWithoutControl: */}
              <label className="block font-medium text-gray-700 text-sm">
                Category
              </label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Food</option>
                <option>Books</option>
                <option>Home & Garden</option>
                <option>Beauty</option>
                <option>Sports</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="discount-type"
                className="block font-medium text-gray-700 text-sm"
              >
                Discount Type
              </label>
              <select
                id="discount-type"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option>All</option>
                <option>Percentage</option>
                <option>Fixed</option>
              </select>
            </div>
            <div>
              {/* biome-ignore lint/a11y/noLabelWithoutControl: */}
              <label className="block font-medium text-gray-700 text-sm">
                Status
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="status-active"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <label
                    htmlFor="status-active"
                    className="ml-2 text-gray-700 text-sm"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="status-expired"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="status-expired"
                    className="ml-2 text-gray-700 text-sm"
                  >
                    Expired
                  </label>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* CHART */}
        <div className="flex-grow rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-lg">
            Usage Distribution by Category
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieChartData.map((entry, _index) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} uses`, 'Usage Count']}
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between p-6">
          <h3 className="font-semibold text-lg">Active Rewards</h3>
          <p className="text-gray-500 text-sm">
            Showing {filteredRewards.length} of {mockRewardsData.length} coupons
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Valid Until
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Usage Count
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredRewards.map((reward) => (
                <tr key={reward.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {reward.code}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {reward.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-blue-600">
                    {reward.discount}%
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{reward.type}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {new Date(reward.validUntil).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {reward.usageCount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 font-medium text-xs ${
                        reward.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {reward.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button
                      type="button"
                      className="mr-3 text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-gray-200 border-t px-6 py-4">
          <div className="text-gray-500 text-sm">Page 1 of 1</div>
          <div className="flex gap-1">
            <button
              type="button"
              className="rounded-md border border-gray-200 bg-white px-3 py-1 text-gray-600 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-md bg-blue-600 px-3 py-1 text-white"
            >
              1
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-200 bg-white px-3 py-1 text-gray-600 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
