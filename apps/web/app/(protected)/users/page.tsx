'use client';

import Header from '@/components/Header';
import { useGetUsersQuery } from '@/state/api';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  Calendar,
  CreditCard,
  Download,
  Filter,
  Search,
  ShoppingCart,
  Tag,
  UserPlus,
  Users as UsersIcon,
} from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const columns: GridColDef[] = [
  {
    field: 'customerId',
    headerName: 'Customer ID',
    width: 120,
    renderCell: (params) => (
      <div className="font-medium text-blue-600">{params.value}</div>
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
    renderCell: (params) => <div className="font-medium">{params.value}</div>,
  },
  { field: 'age', headerName: 'Age', width: 100 },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'averageBuyingPrice',
    headerName: 'Total Saving ($)',
    width: 150,
    renderCell: (params) => (
      <div className="font-medium text-green-600">
        ${params.value.toFixed(2)}
      </div>
    ),
  },
  {
    field: 'discountApplied',
    headerName: 'Coupons Applied',
    width: 150,
    renderCell: (params) => (
      <div className="rounded-full bg-blue-100 px-2 py-1 font-medium text-blue-800 text-xs">
        {params.value} coupons
      </div>
    ),
  },
  {
    field: 'totalSpending',
    headerName: 'Total Spending ($)',
    width: 180,
    renderCell: (params) => (
      <div className="font-bold">${params.value.toFixed(2)}</div>
    ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    renderCell: () => (
      <div className="flex gap-2">
        <button type="button" className="text-blue-600 hover:text-blue-900">
          Edit
        </button>
        <button type="button" className="text-gray-600 hover:text-gray-900">
          View
        </button>
      </div>
    ),
  },
];

const sampleUsers = [
  {
    userId: '1',
    customerId: 'CUST-101',
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com',
    averageBuyingPrice: 450.99,
    discountApplied: 10,
    totalSpending: 1200.5,
    location: 'New York',
    lastPurchase: '2023-12-15',
  },
  {
    userId: '2',
    customerId: 'CUST-102',
    name: 'Jane Smith',
    age: 25,
    email: 'janesmith@example.com',
    averageBuyingPrice: 320.5,
    discountApplied: 15,
    totalSpending: 850.75,
    location: 'Los Angeles',
    lastPurchase: '2024-01-20',
  },
  {
    userId: '3',
    customerId: 'CUST-103',
    name: 'Michael Johnson',
    age: 40,
    email: 'michaelj@example.com',
    averageBuyingPrice: 780.2,
    discountApplied: 5,
    totalSpending: 2150.3,
    location: 'Chicago',
    lastPurchase: '2024-02-05',
  },
  {
    userId: '4',
    customerId: 'CUST-104',
    name: 'Emily Davis',
    age: 28,
    email: 'emilydavis@example.com',
    averageBuyingPrice: 550.6,
    discountApplied: 12,
    totalSpending: 1435.8,
    location: 'Houston',
    lastPurchase: '2024-01-10',
  },
  {
    userId: '5',
    customerId: 'CUST-105',
    name: 'Chris Brown',
    age: 35,
    email: 'chrisbrown@example.com',
    averageBuyingPrice: 640.4,
    discountApplied: 8,
    totalSpending: 1780.45,
    location: 'Miami',
    lastPurchase: '2023-12-28',
  },
  {
    userId: '6',
    customerId: 'CUST-106',
    name: 'Sarah Wilson',
    age: 32,
    email: 'sarahw@example.com',
    averageBuyingPrice: 420.75,
    discountApplied: 7,
    totalSpending: 1320.8,
    location: 'Seattle',
    lastPurchase: '2024-02-15',
  },
  {
    userId: '7',
    customerId: 'CUST-107',
    name: 'Robert Miller',
    age: 45,
    email: 'robertm@example.com',
    averageBuyingPrice: 890.3,
    discountApplied: 3,
    totalSpending: 2450.6,
    location: 'Boston',
    lastPurchase: '2024-01-05',
  },
];

const CHART_COLORS = [
  '#4F46E5',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const userData = users?.length ? users : sampleUsers;
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('This Month');

  const totalUsers = userData.length;
  const totalSpending = userData.reduce(
    // @ts-expect-error - Not implemented yet
    (sum, user) => sum + user.totalSpending,
    0
  );
  const totalSavings = userData.reduce(
    // @ts-expect-error - Not implemented yet
    (sum, user) => sum + user.averageBuyingPrice,
    0
  );
  const totalCoupons = userData.reduce(
    // @ts-expect-error - Not implemented yet
    (sum, user) => sum + user.discountApplied,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <Header name="Customer Management" />
          <p className="text-gray-500 text-sm">
            View and manage your customer data and analytics
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
            <UserPlus className="h-4 w-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <div className="rounded-full bg-blue-50 p-3">
            <UsersIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Customers</p>
            <p className="font-bold text-2xl">{totalUsers}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <div className="rounded-full bg-green-50 p-3">
            <CreditCard className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Spending</p>
            <p className="font-bold text-2xl">${totalSpending.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <div className="rounded-full bg-purple-50 p-3">
            <Tag className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Savings</p>
            <p className="font-bold text-2xl">${totalSavings.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <div className="rounded-full bg-amber-50 p-3">
            <ShoppingCart className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Coupons Used</p>
            <p className="font-bold text-2xl">{totalCoupons}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search customers by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* DataGrid Table */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-xl bg-white shadow-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-blue-500 border-t-2 border-b-2" />
        </div>
        // biome-ignore lint/nursery/noNestedTernary:
      ) : isError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
          Error loading user data. Please try again later.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={userData}
              columns={columns}
              getRowId={(row) => row.userId}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#F9FAFB',
                  color: '#6B7280',
                  fontWeight: 'bold',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #F3F4F6',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#F9FAFB',
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Analytics Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Spending Distribution Chart */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-lg">
            Customer Spending Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={userData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Total Spending']}
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                }}
              />
              <Bar
                dataKey="totalSpending"
                fill="#4F46E5"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Age Distribution Chart */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-lg">
            Customer Age Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  {
                    name: '18-25',
                    value: userData.filter(
                      // @ts-expect-error - Not implemented yet
                      (user) => user.age >= 18 && user.age <= 25
                    ).length,
                  },
                  {
                    name: '26-35',
                    value: userData.filter(
                      // @ts-expect-error - Not implemented yet
                      (user) => user.age >= 26 && user.age <= 35
                    ).length,
                  },
                  {
                    name: '36-45',
                    value: userData.filter(
                      // @ts-expect-error - Not implemented yet
                      (user) => user.age >= 36 && user.age <= 45
                    ).length,
                  },
                  {
                    name: '46+',
                    // @ts-expect-error - Not implemented yet
                    value: userData.filter((user) => user.age >= 46).length,
                  },
                ]}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {CHART_COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} customers`, 'Count']}
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                }}
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-lg">Customer Insights</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-100 p-4">
            <h4 className="mb-2 font-medium text-gray-700">Top Spender</h4>
            <div className="flex items-center">
              <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {
                    userData.sort(
                      // @ts-expect-error - Not implemented yet
                      (a, b) => b.totalSpending - a.totalSpending
                    )[0]?.name
                  }
                </p>
                <p className="text-gray-500 text-sm">
                  $
                  {userData
                    // @ts-expect-error - Not implemented yet
                    .sort((a, b) => b.totalSpending - a.totalSpending)[0]
                    // @ts-expect-error - Not implemented yet
                    ?.totalSpending.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 p-4">
            <h4 className="mb-2 font-medium text-gray-700">
              Most Coupons Used
            </h4>
            <div className="flex items-center">
              <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Tag className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {
                    userData.sort(
                      // @ts-expect-error - Not implemented yet
                      (a, b) => b.discountApplied - a.discountApplied
                    )[0]?.name
                  }
                </p>
                <p className="text-gray-500 text-sm">
                  {
                    userData.sort(
                      // @ts-expect-error - Not implemented yet
                      (a, b) => b.discountApplied - a.discountApplied
                      // @ts-expect-error - Not implemented yet
                    )[0]?.discountApplied
                  }{' '}
                  coupons
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 p-4">
            <h4 className="mb-2 font-medium text-gray-700">Highest Savings</h4>
            <div className="flex items-center">
              <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {
                    userData.sort(
                      // @ts-expect-error - Not implemented yet
                      (a, b) => b.averageBuyingPrice - a.averageBuyingPrice
                    )[0]?.name
                  }
                </p>
                <p className="text-gray-500 text-sm">
                  $
                  {userData
                    .sort(
                      // @ts-expect-error - Not implemented yet
                      (a, b) => b.averageBuyingPrice - a.averageBuyingPrice
                    )[0]
                    // @ts-expect-error - Not implemented yet
                    ?.averageBuyingPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-lg">Recent Customer Activity</h3>
          <button
            type="button"
            className="font-medium text-blue-600 text-sm transition-colors hover:text-blue-800"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {userData.slice(0, 3).map((user) => (
            <div
              key={user.userId}
              className="flex items-center justify-between border-gray-100 border-b pb-4"
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <UsersIcon className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-500 text-sm">
                    Last purchase on{' '}
                    {/* @ts-expect-error - Not implemented yet */}
                    {new Date(user.lastPurchase).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium text-blue-600">
                  {/* @ts-expect-error - Not implemented yet $ */}
                  {user.totalSpending.toFixed(2)}
                </span>
                <span className="text-gray-500"> spent</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
