import { TrendingUp } from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const staticSalesData = {
  daily: [
    { date: '2024-07-01', totalValue: 1200000, changePercentage: 5.2 },
    { date: '2024-07-02', totalValue: 1350000, changePercentage: 12.5 },
    { date: '2024-07-03', totalValue: 980000, changePercentage: -27.4 },
    { date: '2024-07-04', totalValue: 1100000, changePercentage: 12.2 },
    { date: '2024-07-05', totalValue: 1450000, changePercentage: 31.8 },
    { date: '2024-07-06', totalValue: 1600000, changePercentage: 10.3 },
    { date: '2024-07-07', totalValue: 1750000, changePercentage: 9.4 },
  ],
  weekly: [
    { date: '2024-06-01', totalValue: 5800000, changePercentage: 8.2 },
    { date: '2024-06-08', totalValue: 6200000, changePercentage: 6.9 },
    { date: '2024-06-15', totalValue: 5500000, changePercentage: -11.3 },
    { date: '2024-06-22', totalValue: 6800000, changePercentage: 23.6 },
    { date: '2024-06-29', totalValue: 7200000, changePercentage: 5.9 },
    { date: '2024-07-06', totalValue: 7800000, changePercentage: 8.3 },
  ],
  monthly: [
    { date: '2024-01-01', totalValue: 22000000, changePercentage: 12.5 },
    { date: '2024-02-01', totalValue: 24500000, changePercentage: 11.4 },
    { date: '2024-03-01', totalValue: 23800000, changePercentage: -2.9 },
    { date: '2024-04-01', totalValue: 26200000, changePercentage: 10.1 },
    { date: '2024-05-01', totalValue: 28500000, changePercentage: 8.8 },
    { date: '2024-06-01', totalValue: 31000000, changePercentage: 8.8 },
  ],
};

const CardSalesSummary = () => {
  const [timeframe, setTimeframe] = useState('weekly');

  const salesData = staticSalesData[timeframe as keyof typeof staticSalesData];

  const totalValueSum =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + (curr.changePercentage ?? 0) / array.length;
    }, 0) || 0;

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
      })
    : 'N/A';

  return (
    <div className="row-span-3 flex flex-col justify-between rounded-2xl bg-white shadow-md xl:row-span-6">
      <>
        {/* HEADER */}
        <div>
          <h2 className="mb-2 px-7 pt-5 font-semibold text-lg">
            Sales Summary
          </h2>
          <hr className="border-gray-100" />
        </div>

        {/* BODY */}
        <div>
          {/* BODY HEADER */}
          <div className="mt-5 mb-6 flex items-center justify-between px-7">
            <div className="font-medium text-lg">
              <p className="text-gray-400 text-xs">Value</p>
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text font-extrabold text-2xl text-transparent">
                $
                {(totalValueSum / 1000000).toLocaleString('en', {
                  maximumFractionDigits: 2,
                })}
                m
              </span>
              <span className="ml-2 flex items-center text-green-500 text-sm">
                <TrendingUp className="mr-1 inline h-4 w-4" />
                {averageChangePercentage.toFixed(2)}%
              </span>
            </div>
            <select
              className="rounded-md border border-gray-200 bg-white p-2 font-medium text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timeframe}
              onChange={(e) => {
                setTimeframe(e.target.value);
              }}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          {/* CHART */}
          <ResponsiveContainer width="100%" height={350} className="px-7">
            <BarChart
              data={salesData}
              margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray=""
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tickFormatter={(value) => {
                  return `$${(value / 1000000).toFixed(0)}m`;
                }}
                tick={{ fontSize: 12, dx: -1, fill: '#9CA3AF' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString('en')}`,
                ]}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                }}
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                }}
              />
              <Bar
                dataKey="totalValue"
                fill="url(#barGradient)"
                barSize={
                  // biome-ignore lint/nursery/noNestedTernary:
                  timeframe === 'daily' ? 15 : timeframe === 'weekly' ? 25 : 35
                }
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={1} />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity={1} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* FOOTER */}
        <div>
          <hr className="border-gray-100" />
          <div className="mt-6 mb-4 flex items-center justify-between px-7 text-sm">
            <p className="text-gray-500">
              {salesData.length}{' '}
              {timeframe === 'daily'
                ? 'days'
                : // biome-ignore lint/nursery/noNestedTernary:
                  timeframe === 'weekly'
                  ? 'weeks'
                  : 'months'}
            </p>
            <p className="text-sm">
              Highest Sales Date:{' '}
              <span className="font-bold text-blue-600">
                {highestValueDate}
              </span>
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default CardSalesSummary;
