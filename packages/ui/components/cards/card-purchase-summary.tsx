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

const collegePurchases = [
  { date: '2024-01-01', totalPurchased: 2500, changePercentage: 5 },
  { date: '2024-02-01', totalPurchased: 3200, changePercentage: 8 },
  { date: '2024-03-01', totalPurchased: 4100, changePercentage: -3 },
  { date: '2024-04-01', totalPurchased: 3800, changePercentage: 4 },
  { date: '2024-05-01', totalPurchased: 4600, changePercentage: 6 },
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
          <hr />
        </div>

        {/* BODY */}
        <div>
          {/* BODY HEADER */}
          <div className="mt-7 mb-4 px-7">
            <p className="text-gray-400 text-xs">Purchased</p>
            <div className="flex items-center">
              <p className="font-bold text-2xl">
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
                  } ml-3 flex`}
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
              <XAxis dataKey="date" tick={false} axisLine={false} />
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
              />
              <Area
                type="linear"
                dataKey="totalPurchased"
                stroke="#8884d8"
                fill="#8884d8"
                dot={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </>
    </div>
  );
};

export default CardPurchaseSummary;
