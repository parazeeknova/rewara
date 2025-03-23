import { ProtectedRoute } from '@rewara/auth/components/protected-route';
import DoughnutChart from '@rewara/ui/components/dashboard/doughnutchart';
import LineChart from '@rewara/ui/components/dashboard/linechart';
import RevenueCard from '@rewara/ui/components/dashboard/revenuecards';
import type { JSX } from 'react';

const piChartData = [
  { label: 'Product A', value: 30, color: '#FF6384' },
  { label: 'Product B', value: 25, color: '#36A2EB' },
  { label: 'Product C', value: 45, color: '#FFCE56' },
];

const lineGraphData = [
  { label: 'Jan', value: 1000 },
  { label: 'Feb', value: 1500 },
  { label: 'Mar', value: 1200 },
  { label: 'Apr', value: 1800 },
  // Add more data points as needed
];

export default function DashboardPage(): JSX.Element {
  return (
    <ProtectedRoute>
      <div>
        <p className="font-normal text-l text-zinc-950">Performance Overview</p>
        <div className="flex w-[100%] gap-[48px]">
          <RevenueCard
            title="Revenue"
            subtitle="This month"
            amount="₹1020"
            description="profits earned"
            className="flex-1/3"
          />
          <RevenueCard
            title="Rewards"
            subtitle="used this month"
            amount="₹1020"
            description="worth of rewards given"
            className="flex-1/3"
          />

          <RevenueCard
            title="Trending"
            subtitle="Product"
            amount="Product name"
            description=""
            className="flex-1/3"
          />
        </div>

        <DoughnutChart data={piChartData} />

        <LineChart data={lineGraphData} />
      </div>
    </ProtectedRoute>
  );
}
