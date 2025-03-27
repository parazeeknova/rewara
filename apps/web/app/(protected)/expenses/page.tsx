'use client';

import Header from '@/components/Header';
import { Gift, Ticket, Timer, TrendingUp } from 'lucide-react';
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
  },
  {
    id: 2,
    category: 'Clothing',
    discount: 20,
    validUntil: '2024-06-15',
    usageCount: 30,
    type: 'Percentage',
  },
  {
    id: 3,
    category: 'Food',
    discount: 10,
    validUntil: '2024-05-20',
    usageCount: 60,
    type: 'Percentage',
  },
  {
    id: 4,
    category: 'Books',
    discount: 25,
    validUntil: '2024-07-01',
    usageCount: 15,
    type: 'Percentage',
  },
];

type RewardCard = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
};

const Rewards = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Calculate summary statistics
  const summaryCards: RewardCard[] = [
    {
      title: 'Active Coupons',
      value: mockRewardsData.length,
      icon: <Ticket className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Total Usage',
      value: mockRewardsData.reduce((acc, curr) => acc + curr.usageCount, 0),
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-green-100 text-green-800',
    },
    {
      title: 'Avg. Discount',
      value: `${Math.round(
        mockRewardsData.reduce((acc, curr) => acc + curr.discount, 0) /
          mockRewardsData.length
      )}%`,
      icon: <Gift className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-800',
    },
    {
      title: 'Expiring Soon',
      value: mockRewardsData.filter(
        (reward) =>
          new Date(reward.validUntil).getTime() - Date.now() <
          7 * 24 * 60 * 60 * 1000
      ).length,
      icon: <Timer className="h-6 w-6" />,
      color: 'bg-red-100 text-red-800',
    },
  ];

  const pieChartData = useMemo(() => {
    return mockRewardsData.map((reward) => ({
      name: reward.category,
      value: reward.usageCount,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }));
  }, []);

  const filteredRewards = useMemo(() => {
    return mockRewardsData.filter((reward) => {
      const matchesCategory =
        selectedCategory === 'All' || reward.category === selectedCategory;
      const matchesType =
        selectedType === 'All' || reward.type === selectedType;
      return matchesCategory && matchesType;
    });
  }, [selectedCategory, selectedType]);

  return (
    <div className="space-y-6">
      <div>
        <Header name="Rewards & Coupons" />
        <p className="text-gray-500 text-sm">
          Manage and track your product rewards and coupons
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 rounded-lg bg-white p-6 shadow"
          >
            <div className={`${card.color} rounded-full p-3`}>{card.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="font-semibold text-2xl">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full rounded-lg bg-white p-6 shadow lg:w-1/3">
          <h3 className="mb-4 font-semibold text-lg">Filter Rewards</h3>
          <div className="space-y-4">
            <div>
              {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
              <label className="block font-medium text-gray-700 text-sm">
                Category
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Food</option>
                <option>Books</option>
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option>All</option>
                <option>Percentage</option>
                <option>Fixed</option>
              </select>
            </div>
          </div>
        </div>

        {/* CHART */}
        <div className="flex-grow rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 font-semibold text-lg">Usage Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, _index) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h3 className="mb-4 font-semibold text-lg">Active Rewards</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Valid Until
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Usage Count
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredRewards.map((reward) => (
                <tr key={reward.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {reward.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {reward.discount}%
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {new Date(reward.validUntil).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {reward.usageCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
