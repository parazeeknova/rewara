'use client';

import Header from '@/components/Header';
import { useGetUsersQuery } from '@/state/api';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
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
  { field: 'customerId', headerName: 'Customer ID', width: 120 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'age', headerName: 'Age', width: 100 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'averageBuyingPrice', headerName: 'Total Saving ($)', width: 150 },
  { field: 'discountApplied', headerName: 'Coupons Applied', width: 150 },
  { field: 'totalSpending', headerName: 'Total Spending ($)', width: 180 },
];

// Sample user data (fallback)
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
  },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const userData = users?.length ? users : sampleUsers;
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000'];

  return (
    <div className="flex flex-col p-5">
      <Header name="Users" />
      {isLoading ? (
        <div className="py-4">Loading...</div>
        // biome-ignore lint/nursery/noNestedTernary: This is a false positive
      ) : isError || !users ? (
        <div className="py-4 text-center text-red-500">loading data</div>
      ) : null}

      {/* DataGrid Table */}
      <DataGrid
        rows={userData}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="!text-gray-700 mt-5 rounded-lg border border-gray-200 bg-white shadow"
      />

      {/* Bar Chart for Spending */}
      <div className="mt-10">
        <h2 className="mb-4 text-center font-semibold text-gray-700 text-xl">
          User Spending Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={userData}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="totalSpending"
              fill="#8884d8"
              name="Total Spending ($)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-center font-semibold text-gray-700 text-xl">
          Coupons Applied by Users
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userData}
              dataKey="discountApplied"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {userData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Users;
