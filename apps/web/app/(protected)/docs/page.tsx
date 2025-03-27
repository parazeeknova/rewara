'use client';

import { Book, Code, MessagesSquare } from 'lucide-react';

interface DocSectionProps {
  title: string;
  description: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  requestExample?: string;
  responseExample: string;
}

const DocSection = ({
  title,
  description,
  endpoint,
  method,
  requestExample,
  responseExample,
}: DocSectionProps) => {
  const methodColors = {
    GET: 'bg-green-100 text-green-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-yellow-100 text-yellow-700',
    DELETE: 'bg-red-100 text-red-700',
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <Code className="h-6 w-6 text-blue-600" />
        <h2 className="font-semibold text-xl">{title}</h2>
      </div>
      <p className="mb-4 text-gray-600">{description}</p>

      <div className="mb-4 flex items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 font-medium ${methodColors[method]}`}
        >
          {method}
        </span>
        <code className="rounded bg-gray-100 px-3 py-1">{endpoint}</code>
      </div>

      {requestExample && (
        <div className="mb-4">
          <h3 className="mb-2 font-medium">Request Example:</h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4">
            <code>{requestExample}</code>
          </pre>
        </div>
      )}

      <div>
        <h3 className="mb-2 font-medium">Response Example:</h3>
        <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4">
          <code>{responseExample}</code>
        </pre>
      </div>
    </div>
  );
};

const Documentation = () => {
  return (
    <div className="w-full">
      <div className="mb-8 flex items-center gap-4">
        <Book className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="font-bold text-2xl">API Documentation</h1>
          <p className="text-gray-600">
            Learn how to integrate with our services
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <DocSection
          title="Get Products"
          description="Retrieve a list of all available products with their details."
          endpoint="/api/products"
          method="GET"
          responseExample={JSON.stringify(
            {
              status: 'success',
              data: [
                {
                  id: 1,
                  name: 'Product A',
                  price: 99.99,
                  stock: 50,
                },
              ],
            },
            null,
            2
          )}
        />

        <DocSection
          title="Create Order"
          description="Create a new order in the system."
          endpoint="/api/orders"
          method="POST"
          requestExample={JSON.stringify(
            {
              productId: 1,
              quantity: 2,
              customerDetails: {
                name: 'John Doe',
                email: 'john@example.com',
              },
            },
            null,
            2
          )}
          responseExample={JSON.stringify(
            {
              status: 'success',
              orderId: 'ORD-123456',
              total: 199.98,
            },
            null,
            2
          )}
        />

        <DocSection
          title="Update User"
          description="Update user profile information."
          endpoint="/api/users/{userId}"
          method="PUT"
          requestExample={JSON.stringify(
            {
              name: 'John Doe',
              email: 'john@example.com',
              preferences: {
                notifications: true,
                theme: 'dark',
              },
            },
            null,
            2
          )}
          responseExample={JSON.stringify(
            {
              status: 'success',
              message: 'User updated successfully',
            },
            null,
            2
          )}
        />

        <DocSection
          title="Delete Product"
          description="Remove a product from the system."
          endpoint="/api/products/{productId}"
          method="DELETE"
          responseExample={JSON.stringify(
            {
              status: 'success',
              message: 'Product deleted successfully',
            },
            null,
            2
          )}
        />
      </div>

      <div className="mt-8 rounded-lg bg-blue-50 p-6">
        <div className="mb-4 flex items-center gap-3">
          <MessagesSquare className="h-6 w-6 text-blue-600" />
          <h2 className="font-semibold text-xl">Need Help?</h2>
        </div>
        <p className="text-gray-600">
          If you need additional support or have questions about our API
          integration, please contact our developer support team at{' '}
          <a
            href="mailto:dev-support@example.com"
            className="text-blue-600 hover:underline"
          >
            dev-support@example.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Documentation;
