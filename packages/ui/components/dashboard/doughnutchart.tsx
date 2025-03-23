'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import type React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: { label: string; value: number; color: string }[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="flex w-80 flex-col items-center rounded-2xl bg-white p-6 shadow-md">
      <div className="relative h-60 w-60">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm">Top</p>
          <p className="font-semibold text-gray-900 text-lg">Products</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1 space-y-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 rounded-md bg-white px-4 py-2 shadow-sm"
          >
            <span className="font-semibold text-gray-900 text-sm">
              {item.value}%
            </span>
            <span className="text-gray-500 text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
