import { TrendingUp } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const collegeExpenseSummary = [
  { category: 'Marketing', amount: 12500 },
  { category: 'Operations', amount: 30000 },
  { category: 'Logistics', amount: 8500 },
  { category: 'Development', amount: 15000 },
  { category: 'Customer Support', amount: 9000 },
];

const expenseSums = collegeExpenseSummary.reduce<Record<string, number>>(
  (acc, item) => {
    acc[`${item.category}`] = item.amount;
    return acc;
  },
  {}
);

const expenseCategories = Object.entries(expenseSums).map(([name, value]) => ({
  name,
  value,
}));

const totalExpenses = expenseCategories.reduce(
  (acc, category) => acc + category.value,
  0
);
const formattedTotalExpenses = `${(totalExpenses / 1000).toFixed(1)}k`;

const CardExpenseSummary = () => {
  return (
    <div className="row-span-3 flex flex-col justify-between rounded-2xl bg-white shadow-md">
      {/* HEADER */}
      <div>
        <h2 className="mb-2 px-7 pt-5 font-semibold text-lg">
          Expense Summary
        </h2>
        <hr className="border-gray-100" />
      </div>

      {/* BODY */}
      <div className="justify-between pr-7 xl:flex">
        {/* CHART */}
        <div className="relative basis-3/5">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`]}
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                }}
              />
              <Pie
                data={expenseCategories}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                paddingAngle={2}
              >
                {expenseCategories.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 basis-2/5 transform text-center">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text font-bold text-transparent text-xl">
              ${formattedTotalExpenses}
            </span>
            <p className="text-gray-500 text-xs">Total Expenses</p>
          </div>
        </div>

        {/* LABELS */}
        <ul className="flex flex-col items-center justify-around gap-4 py-5 xl:items-start">
          {expenseCategories.map((entry, index) => (
            <li key={`legend-${index}`} className="flex items-center text-sm">
              <span
                className="mr-2 h-3 w-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="font-medium text-gray-700">{entry.name}</span>
              <span className="ml-2 text-gray-500">
                ${(entry.value / 1000).toFixed(1)}k
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* FOOTER */}
      <div>
        <hr className="border-gray-100" />
        <div className="mt-3 mb-4 flex items-center justify-between px-7">
          <div className="pt-2">
            <p className="text-sm">
              Monthly Average:{' '}
              <span className="font-semibold">
                ${(totalExpenses / 12 / 1000).toFixed(1)}k
              </span>
            </p>
          </div>
          <span className="mt-2 flex items-center font-medium text-green-500">
            <TrendingUp className="mr-2 h-4 w-4" />
            12.5%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardExpenseSummary;
