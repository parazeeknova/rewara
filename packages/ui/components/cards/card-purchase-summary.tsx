import { TrendingDown, TrendingUp } from 'lucide-react';
import numeral from 'numeral';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Enhanced data with more realistic values and consistent pattern
const collegePurchases = [
  { date: '2024-01-01', totalPurchased: 2500, changePercentage: 5 },
  { date: '2024-02-01', totalPurchased: 3200, changePercentage: 8 },
  { date: '2024-03-01', totalPurchased: 4100, changePercentage: -3 },
  { date: '2024-04-01', totalPurchased: 3800, changePercentage: 4 },
  { date: '2024-05-01', totalPurchased: 4600, changePercentage: 6 },
  { date: '2024-06-01', totalPurchased: 5200, changePercentage: 13 },
  { date: '2024-07-01', totalPurchased: 4900, changePercentage: -6 },
];

const CardPurchaseSummary = () => {
  const lastDataPoint = collegePurchases.at(-1) || null;

  return (
    <div className="col-span-1 row-span-2 flex flex-col justify-between rounded-2xl bg-white shadow-md md:col-span-2 xl:col-span-1 xl:row-span-3">
      <>
        {/* HEADER */}
        <div>
          <h2 className="mb-2 px-7 pt-5 font-semibold text-lg">
            Purchase Summary
          </h2>
          <hr className="border-gray-100" />
        </div>

        {/* BODY */}
        <div>
          {/* BODY HEADER */}
          <div className="mt-7 mb-4 px-7">
            <p className="font-medium text-gray-400 text-xs">Purchased</p>
            <div className="flex items-center">
              <p className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text font-bold text-2xl text-transparent">
                {lastDataPoint
                  ? numeral(lastDataPoint.totalPurchased).format('$0,0')
                  : '$0'}
              </p>
              {lastDataPoint && (
                <p
                  className={`text-sm ${
                    lastDataPoint.changePercentage >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  } ml-3 flex items-center font-medium`}
                >
                  {lastDataPoint.changePercentage >= 0 ? (
                    <TrendingUp className="mr-1 h-5 w-5" />
                  ) : (
                    <TrendingDown className="mr-1 h-5 w-5" />
                  )}
                  {Math.abs(lastDataPoint.changePercentage)}%
                </p>
              )}
            </div>
          </div>

          {/* CHART */}
          <ResponsiveContainer width="100%" height={200} className="p-2">
            <AreaChart
              data={collegePurchases}
              margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
            >
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis tickLine={false} tick={false} axisLine={false} />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString('en')}`]}
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
              <Area
                type="monotone"
                dataKey="totalPurchased"
                stroke="#4F46E5"
                fill="url(#colorGradient)"
                strokeWidth={2}
                dot={{ stroke: '#4F46E5', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{
                  r: 6,
                  stroke: '#4F46E5',
                  strokeWidth: 2,
                  fill: 'white',
                }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* FOOTER */}
        <div className="mt-auto">
          <hr className="border-gray-100" />
          <div className="flex items-center justify-between px-7 py-4 text-gray-500 text-xs">
            <span>Last 7 months</span>
            <span className="font-medium">
              Total: $
              {numeral(
                collegePurchases.reduce(
                  (sum, item) => sum + item.totalPurchased,
                  0
                )
              ).format('0,0')}
            </span>
          </div>
        </div>
      </>
    </div>
  );
};

export default CardPurchaseSummary;
