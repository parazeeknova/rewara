'use client';

import Header from '@/components/Header';
import {
  Download,
  Filter,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Feedback {
  id: string;
  customerId: string;
  customerName: string;
  customerTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  text: string;
  rating: number;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  category: string[];
  subCategory: string;
  source: 'App' | 'Website' | 'Email' | 'Phone' | 'Social';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'In Review' | 'Addressed' | 'Closed';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  response?: string;
  responseTime?: number;
  tags: string[];
  productId?: string;
  productName?: string;
  resolved: boolean;
  resolution?: string;
  nps?: number;
  sentiment_score: number;
  engagement_metrics: {
    likes: number;
    replies: number;
    shares: number;
  };
}

const generateMockFeedback = (count: number): Feedback[] => {
  const categories = [
    'Product',
    'Service',
    'UX',
    'Pricing',
    'Support',
    'Feature',
  ];
  const subCategories = {
    Product: ['Quality', 'Durability', 'Performance', 'Design'],
    Service: ['Speed', 'Reliability', 'Support', 'Communication'],
    UX: ['Ease of Use', 'Navigation', 'Mobile Experience', 'Accessibility'],
    Pricing: ['Value', 'Plans', 'Discounts', 'Transparency'],
    Support: ['Response Time', 'Knowledge', 'Follow-up', 'Resolution'],
    Feature: ['Functionality', 'Integration', 'Customization', 'Innovation'],
  };
  const sources = ['App', 'Website', 'Email', 'Phone', 'Social'];
  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];
  const statuses = ['New', 'In Review', 'Addressed', 'Closed'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const sentiments = ['Positive', 'Negative', 'Neutral'];

  // @ts-expect-error
  return Array.from({ length: count }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    return {
      id: `FB-${i + 1000}`,
      customerId: `CUS-${Math.floor(Math.random() * 10000)}`,
      customerName: `Customer ${i + 1}`,
      // biome-ignore lint/suspicious/noExplicitAny:
      customerTier: tiers[Math.floor(Math.random() * tiers.length)] as any,
      text: `Sample feedback text ${i + 1}`,
      rating: Math.floor(Math.random() * 5) + 1,
      sentiment: sentiment,
      category: [category],
      subCategory:
        subCategories[category as keyof typeof subCategories][
          Math.floor(
            Math.random() *
              subCategories[category as keyof typeof subCategories].length
          )
        ],
      // biome-ignore lint/suspicious/noExplicitAny:
      source: sources[Math.floor(Math.random() * sources.length)] as any,
      priority: priorities[
        Math.floor(Math.random() * priorities.length)
        // biome-ignore lint/suspicious/noExplicitAny:
      ] as any,
      // biome-ignore lint/suspicious/noExplicitAny:
      status: statuses[Math.floor(Math.random() * statuses.length)] as any,
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000
      ).toISOString(),
      tags: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => `Tag-${Math.floor(Math.random() * 10)}`
      ),
      resolved: Math.random() > 0.5,
      sentiment_score:
        sentiment === 'Positive'
          ? Math.random() * 0.5 + 0.5
          : // biome-ignore lint/nursery/noNestedTernary: required
            sentiment === 'Negative'
            ? Math.random() * 0.5
            : Math.random() * 0.3 + 0.35,
      engagement_metrics: {
        likes: Math.floor(Math.random() * 100),
        replies: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 10),
      },
      nps: Math.floor(Math.random() * 10),
    };
  });
};

// Components
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const SentimentCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="rounded-lg bg-white p-6 shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="mt-2 font-semibold text-2xl">{value}</p>
      </div>
      <div className={`rounded-full p-3 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </div>
);

const SentimentTrends = ({ data }: { data: Feedback[] }) => {
  const trends = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last30Days.map((date) => {
      const dayFeedback = data.filter((f) => f.createdAt.startsWith(date));
      return {
        date,
        positive: dayFeedback.filter((f) => f.sentiment === 'Positive').length,
        negative: dayFeedback.filter((f) => f.sentiment === 'Negative').length,
        neutral: dayFeedback.filter((f) => f.sentiment === 'Neutral').length,
      };
    });
  }, [data]);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="mb-4 font-semibold text-lg">Sentiment Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={trends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="positive"
            stackId="1"
            stroke="#4CAF50"
            fill="#4CAF50"
          />
          <Area
            type="monotone"
            dataKey="negative"
            stackId="1"
            stroke="#f44336"
            fill="#f44336"
          />
          <Area
            type="monotone"
            dataKey="neutral"
            stackId="1"
            stroke="#9e9e9e"
            fill="#9e9e9e"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CategoryDistribution = ({ data }: { data: Feedback[] }) => {
  const distribution = useMemo(() => {
    const categories = data.reduce(
      (acc, feedback) => {
        // biome-ignore lint/complexity/noForEach: static data
        feedback.category.forEach((cat) => {
          acc[cat] = (acc[cat] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [data]);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="mb-4 font-semibold text-lg">Category Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={distribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const FeedbackList = ({ feedback }: { feedback: Feedback[] }) => (
  <div className="overflow-hidden rounded-lg bg-white shadow">
    <div className="p-6">
      <h3 className="font-semibold text-lg">Recent Feedback</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
              Sentiment
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {/* biome-ignore lint/complexity/noExcessiveCognitiveComplexity: static data */}
          {feedback.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {item.customerName}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {item.customerTier}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2 font-semibold text-xs leading-5 ${
                    item.sentiment === 'Positive'
                      ? 'bg-green-100 text-green-800'
                      : // biome-ignore lint/nursery/noNestedTernary: required
                        item.sentiment === 'Negative'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {item.sentiment}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-gray-900 text-sm">
                  {item.category.join(', ')}
                </div>
                <div className="text-gray-500 text-sm">{item.subCategory}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2 font-semibold text-xs leading-5 ${
                    item.priority === 'Critical'
                      ? 'bg-red-100 text-red-800'
                      : // biome-ignore lint/nursery/noNestedTernary: required
                        item.priority === 'High'
                        ? 'bg-orange-100 text-orange-800'
                        : // biome-ignore lint/nursery/noNestedTernary: required
                          item.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                  }`}
                >
                  {item.priority}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2 font-semibold text-xs leading-5 ${
                    item.status === 'New'
                      ? 'bg-blue-100 text-blue-800'
                      : // biome-ignore lint/nursery/noNestedTernary: required
                        item.status === 'In Review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : // biome-ignore lint/nursery/noNestedTernary: required
                          item.status === 'Addressed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const FeedbackDashboard = () => {
  const [filters, _setFilters] = useState({
    sentiment: 'All',
    category: 'All',
    priority: 'All',
    status: 'All',
    dateRange: '30d',
  });

  const mockData = useMemo(() => generateMockFeedback(100), []);

  const filteredData = useMemo(() => {
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Static analysis is not always accurate
    return mockData.filter((feedback) => {
      if (
        filters.sentiment !== 'All' &&
        feedback.sentiment !== filters.sentiment
      ) {
        return false;
      }
      if (
        filters.category !== 'All' &&
        !feedback.category.includes(filters.category)
      ) {
        return false;
      }
      if (
        filters.priority !== 'All' &&
        feedback.priority !== filters.priority
      ) {
        return false;
      }
      if (filters.status !== 'All' && feedback.status !== filters.status) {
        return false;
      }
      return true;
    });
  }, [mockData, filters]);

  const metrics = useMemo(
    () => ({
      positive: mockData.filter((f) => f.sentiment === 'Positive').length,
      negative: mockData.filter((f) => f.sentiment === 'Negative').length,
      neutral: mockData.filter((f) => f.sentiment === 'Neutral').length,
      avgSentiment:
        mockData.reduce((acc, f) => acc + f.sentiment_score, 0) /
        mockData.length,
    }),
    [mockData]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Header name="Customer Feedback Analysis" />
        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-white px-4 py-2 shadow"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white shadow"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SentimentCard
          title="Positive Feedback"
          value={metrics.positive}
          icon={ThumbsUp}
          color="bg-green-100 text-green-600"
        />
        <SentimentCard
          title="Negative Feedback"
          value={metrics.negative}
          icon={ThumbsDown}
          color="bg-red-100 text-red-600"
        />
        <SentimentCard
          title="Neutral Feedback"
          value={metrics.neutral}
          icon={MessageSquare}
          color="bg-gray-100 text-gray-600"
        />
        <SentimentCard
          title="Average Sentiment"
          value={metrics.avgSentiment.toFixed(2)}
          icon={TrendingUp}
          color="bg-blue-100 text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SentimentTrends data={mockData} />
        <CategoryDistribution data={mockData} />
      </div>

      <FeedbackList feedback={filteredData} />
    </div>
  );
};

export default FeedbackDashboard;
