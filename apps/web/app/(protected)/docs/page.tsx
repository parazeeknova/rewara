'use client';

import {
  AlertCircle,
  Book,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code,
  Copy,
  ExternalLink,
  Info,
  MessagesSquare,
  Search,
} from 'lucide-react';
import { useState } from 'react';

interface DocSectionProps {
  title: string;
  description: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  requestExample?: string;
  responseExample: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  expanded?: boolean;
}

const DocSection = ({
  title,
  description,
  endpoint,
  method,
  requestExample,
  responseExample,
  parameters,
  expanded = false,
}: DocSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [copied, setCopied] = useState(false);

  const methodColors = {
    GET: 'bg-green-100 text-green-700 border border-green-200',
    POST: 'bg-blue-100 text-blue-700 border border-blue-200',
    PUT: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    DELETE: 'bg-red-100 text-red-700 border border-red-200',
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code className="h-6 w-6 text-blue-600" />
          <h2 className="font-semibold text-xl">{title}</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <p className="mb-4 text-gray-600">{description}</p>

      <div className="mb-4 flex items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 font-medium ${methodColors[method]}`}
        >
          {method}
        </span>
        <div className="flex flex-1 items-center">
          <code className="rounded bg-gray-100 px-3 py-1.5 font-mono text-sm">
            {endpoint}
          </code>
          <button
            type="button"
            className="ml-2 p-1 text-gray-500 hover:text-gray-700"
            onClick={() => copyToClipboard(endpoint)}
            title="Copy endpoint"
          >
            {copied ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {parameters && parameters.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 font-medium text-gray-800">Parameters</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                        Required
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {parameters.map((param, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-4 py-3 font-mono text-sm">
                          {param.name}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className="rounded-full bg-purple-100 px-2 py-1 font-medium text-purple-800 text-xs">
                            {param.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {param.required ? (
                            <span className="text-red-600">Yes</span>
                          ) : (
                            <span className="text-gray-500">No</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">
                          {param.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {requestExample && (
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium text-gray-800">Request Example</h3>
                <button
                  type="button"
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => copyToClipboard(requestExample)}
                  title="Copy request"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 font-mono text-sm text-white">
                <code>{requestExample}</code>
              </pre>
            </div>
          )}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-gray-800">Response Example</h3>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-700"
                onClick={() => copyToClipboard(responseExample)}
                title="Copy response"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-gray-800 p-4 font-mono text-sm text-white">
              <code>{responseExample}</code>
            </pre>
          </div>
        </>
      )}
    </div>
  );
};

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const apiEndpoints = [
    {
      title: 'Get Products',
      description:
        'Retrieve a list of all available products with their details.',
      endpoint: '/api/products',
      method: 'GET' as const,
      parameters: [
        {
          name: 'limit',
          type: 'number',
          required: false,
          description: 'Maximum number of products to return',
        },
        {
          name: 'offset',
          type: 'number',
          required: false,
          description: 'Number of products to skip',
        },
        {
          name: 'sort',
          type: 'string',
          required: false,
          description: "Field to sort by (e.g. 'price', 'name')",
        },
      ],
      responseExample: JSON.stringify(
        {
          status: 'success',
          data: [
            {
              id: 1,
              name: 'Product A',
              price: 99.99,
              stock: 50,
              category: 'Electronics',
              rating: 4.5,
            },
            {
              id: 2,
              name: 'Product B',
              price: 149.99,
              stock: 30,
              category: 'Home & Garden',
              rating: 4.2,
            },
          ],
          pagination: {
            total: 100,
            limit: 10,
            offset: 0,
            hasMore: true,
          },
        },
        null,
        2
      ),
      expanded: true,
    },
    {
      title: 'Create Order',
      description: 'Create a new order in the system.',
      endpoint: '/api/orders',
      method: 'POST' as const,
      parameters: [
        {
          name: 'productId',
          type: 'number',
          required: true,
          description: 'ID of the product being ordered',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          description: 'Quantity of the product',
        },
        {
          name: 'customerDetails',
          type: 'object',
          required: true,
          description: 'Customer information',
        },
      ],
      requestExample: JSON.stringify(
        {
          productId: 1,
          quantity: 2,
          customerDetails: {
            name: 'John Doe',
            email: 'john@example.com',
            address: {
              street: '123 Main St',
              city: 'Anytown',
              zipCode: '12345',
              country: 'US',
            },
          },
          paymentMethod: 'credit_card',
          notes: 'Please deliver before 6pm',
        },
        null,
        2
      ),
      responseExample: JSON.stringify(
        {
          status: 'success',
          orderId: 'ORD-123456',
          total: 199.98,
          estimatedDelivery: '2023-06-15',
          trackingNumber: 'TRK987654321',
        },
        null,
        2
      ),
    },
    {
      title: 'Update User',
      description: 'Update user profile information.',
      endpoint: '/api/users/{userId}',
      method: 'PUT' as const,
      parameters: [
        {
          name: 'userId',
          type: 'string',
          required: true,
          description: 'ID of the user to update',
        },
        {
          name: 'name',
          type: 'string',
          required: false,
          description: "User's full name",
        },
        {
          name: 'email',
          type: 'string',
          required: false,
          description: "User's email address",
        },
        {
          name: 'preferences',
          type: 'object',
          required: false,
          description: 'User preferences',
        },
      ],
      requestExample: JSON.stringify(
        {
          name: 'John Doe',
          email: 'john@example.com',
          preferences: {
            notifications: true,
            theme: 'dark',
            language: 'en-US',
          },
          profilePicture: 'https://example.com/profile.jpg',
        },
        null,
        2
      ),
      responseExample: JSON.stringify(
        {
          status: 'success',
          message: 'User updated successfully',
          user: {
            id: 'usr_123456',
            name: 'John Doe',
            email: 'john@example.com',
            updatedAt: '2023-06-10T15:30:45Z',
          },
        },
        null,
        2
      ),
    },
    {
      title: 'Delete Product',
      description: 'Remove a product from the system.',
      endpoint: '/api/products/{productId}',
      method: 'DELETE' as const,
      parameters: [
        {
          name: 'productId',
          type: 'number',
          required: true,
          description: 'ID of the product to delete',
        },
        {
          name: 'force',
          type: 'boolean',
          required: false,
          description: 'Force deletion even if product has dependencies',
        },
      ],
      responseExample: JSON.stringify(
        {
          status: 'success',
          message: 'Product deleted successfully',
          deletedAt: '2023-06-10T16:20:30Z',
        },
        null,
        2
      ),
    },
  ];

  const filteredEndpoints = apiEndpoints.filter(
    (endpoint) =>
      endpoint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.endpoint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Book className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="font-bold text-2xl">API Documentation</h1>
            <p className="text-gray-600">
              Learn how to integrate with our services
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search endpoints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6 rounded-lg border-blue-500 border-l-4 bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-blue-800 text-sm">API Base URL</h3>
            <div className="mt-2 text-blue-700 text-sm">
              <p>
                All API endpoints are relative to:{' '}
                <code className="rounded bg-blue-100 px-2 py-1 font-mono">
                  https://api.rewara.com/v1
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredEndpoints.length > 0 ? (
          filteredEndpoints.map((endpoint, index) => (
            <DocSection
              key={index}
              title={endpoint.title}
              description={endpoint.description}
              endpoint={endpoint.endpoint}
              method={endpoint.method}
              requestExample={endpoint.requestExample}
              responseExample={endpoint.responseExample}
              parameters={endpoint.parameters}
              expanded={endpoint.expanded}
            />
          ))
        ) : (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 font-medium text-gray-900 text-lg">
              No endpoints found
            </h3>
            <p className="text-gray-500">
              No API endpoints match your search criteria. Try adjusting your
              search term.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-xl bg-blue-50 p-6">
        <div className="mb-4 flex items-center gap-3">
          <MessagesSquare className="h-6 w-6 text-blue-600" />
          <h2 className="font-semibold text-xl">Need Help?</h2>
        </div>
        <p className="mb-4 text-gray-600">
          If you need additional support or have questions about our API
          integration, please contact our developer support team.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="mailto:dev-support@example.com"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            <MessagesSquare className="h-4 w-4" />
            Contact Support
          </a>
          <a
            href="/"
            className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            <ExternalLink className="h-4 w-4" />
            View Full Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
