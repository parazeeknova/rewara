'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  CategoryScale
);

interface LineChartProps {
  data: { label: string; value: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        borderColor: '#F4A261',
        backgroundColor: '#F4A261',
        pointBackgroundColor: '#F4A261',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: '#F2F2F2',
        },
        ticks: {
          callback: (value: number) => `₹${value}`,
        },
      },
    },
  };

  return (
    <div className="h-60 w-96 rounded-2xl bg-white p-6 shadow-md">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
