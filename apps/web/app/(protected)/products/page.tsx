'use client';

import Header from '@/components/Header';
import { useCreateProductMutation, useGetProductsQuery } from '@/state/api';
import Rating from '@rewara/ui/components/rating';
import {
  ArrowUpDown,
  Filter,
  Grid,
  List,
  Package,
  PlusCircleIcon,
  SearchIcon,
  ShoppingCart,
  Tag,
} from 'lucide-react';
import { useState } from 'react';
import CreateProductModal from './create-product-modal';

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type Product = {
  productId: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
  imageUrl: string;
};

// Enhanced sample product list with more details
const sampleProducts: Product[] = [
  {
    productId: '1',
    name: 'Wireless Ergonomic Mouse',
    price: 29.99,
    stockQuantity: 20,
    rating: 4.5,
    imageUrl: '/images/mouse.png',
  },
  {
    productId: '2',
    name: 'Mechanical RGB Keyboard',
    price: 89.99,
    stockQuantity: 15,
    rating: 4.8,
    imageUrl: '/images/keyboard.png',
  },
  {
    productId: '3',
    name: 'Premium Noise Cancelling Headphones',
    price: 199.99,
    stockQuantity: 10,
    rating: 4.7,
    imageUrl: '/images/headphones.png',
  },
  {
    productId: '4',
    name: 'Ultra-Fast Portable SSD (1TB)',
    price: 129.99,
    stockQuantity: 30,
    rating: 4.6,
    imageUrl: '/images/ssd.png',
  },
  {
    productId: '5',
    name: 'Smart Fitness Tracker Watch',
    price: 149.99,
    stockQuantity: 25,
    rating: 4.3,
    imageUrl: '/images/smartwatch.png',
  },
  {
    productId: '6',
    name: 'Bluetooth Wireless Earbuds',
    price: 79.99,
    stockQuantity: 40,
    rating: 4.4,
    imageUrl: '/images/earbuds.png',
  },
  {
    productId: '7',
    name: '4K Ultra HD Webcam',
    price: 69.99,
    stockQuantity: 18,
    rating: 4.2,
    imageUrl: '/images/webcam.png',
  },
  {
    productId: '8',
    name: 'Portable Power Bank 20000mAh',
    price: 49.99,
    stockQuantity: 50,
    rating: 4.5,
    imageUrl: '/images/powerbank.png',
  },
];

// Product categories for filtering
const categories = [
  'All Categories',
  'Electronics',
  'Accessories',
  'Audio',
  'Storage',
  'Wearables',
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortOption, setSortOption] = useState('newest');

  const { data: products, isLoading } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  // Use sample products if API fails or is loading
  const displayProducts = products?.length ? products : sampleProducts;

  // Calculate total stock and value
  const totalStock = displayProducts.reduce(
    (sum, product) => sum + product.stockQuantity,
    0
  );
  const totalValue = displayProducts.reduce(
    (sum, product) => sum + product.price * product.stockQuantity,
    0
  );

  return (
    <div className="mx-auto w-full pb-8">
      {/* HEADER STATS */}
      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="flex items-center">
            <Package className="mr-2 h-6 w-6 text-blue-600" />
            <Header name="Products Management" />
          </div>
          <div className="mt-4 flex gap-2 md:mt-0">
            <button
              type="button"
              className={`rounded-md p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              type="button"
              className={`rounded-md p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircleIcon className="mr-2 h-5 w-5" /> Add Product
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center rounded-lg bg-blue-50 p-4">
            <div className="mr-3 rounded-full bg-blue-100 p-3">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="font-bold text-xl">{displayProducts.length}</p>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-green-50 p-4">
            <div className="mr-3 rounded-full bg-green-100 p-3">
              <ShoppingCart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Stock</p>
              <p className="font-bold text-xl">{totalStock} units</p>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-purple-50 p-4">
            <div className="mr-3 rounded-full bg-purple-100 p-3">
              <Tag className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Inventory Value</p>
              <p className="font-bold text-xl">
                $
                {totalValue.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS AND SEARCH */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* SEARCH BAR */}
        <div className="md:col-span-1">
          <div className="flex items-center rounded-md border border-gray-200 bg-white shadow-sm">
            <SearchIcon className="m-2 h-5 w-5 text-gray-500" />
            <input
              className="w-full rounded-md bg-white px-4 py-2.5 focus:outline-none"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="md:col-span-1">
          <div className="flex items-center rounded-md border border-gray-200 bg-white shadow-sm">
            <Filter className="m-2 h-5 w-5 text-gray-500" />
            <select
              className="w-full rounded-md bg-white px-4 py-2.5 focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SORT OPTIONS */}
        <div className="md:col-span-1">
          <div className="flex items-center rounded-md border border-gray-200 bg-white shadow-sm">
            <ArrowUpDown className="m-2 h-5 w-5 text-gray-500" />
            <select
              className="w-full rounded-md bg-white px-4 py-2.5 focus:outline-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="stock">Stock: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* BODY PRODUCTS LIST */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-blue-500 border-t-2 border-b-2" />
        </div>
        // biome-ignore lint/nursery/noNestedTernary:
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayProducts.map((product) => (
            <div
              key={product.productId}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-40 items-center justify-center bg-gray-100">
                <Package className="h-16 w-16 text-gray-400" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="line-clamp-2 font-semibold text-gray-900 text-lg">
                    {product.name}
                  </h3>
                  <span className="rounded-full bg-blue-100 px-2 py-1 font-medium text-blue-700 text-xs">
                    ID: {product.productId}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-bold text-blue-600 text-xl">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="rounded-md bg-gray-100 px-2 py-1 text-gray-600 text-sm">
                    Stock: {product.stockQuantity}
                  </div>
                </div>
                {product.rating && (
                  <div className="mt-3 flex items-center">
                    <Rating rating={product.rating} />
                    <span className="ml-2 text-gray-500 text-sm">
                      ({product.rating})
                    </span>
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded-md bg-blue-50 py-1.5 font-medium text-blue-600 text-sm transition-colors hover:bg-blue-100"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-md bg-gray-50 py-1.5 font-medium text-gray-600 text-sm transition-colors hover:bg-gray-100"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-right font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {displayProducts.map((product) => (
                <tr key={product.productId} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                    {product.productId}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-blue-600 text-sm">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                    {product.stockQuantity}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {/* @ts-expect-error */}
                    <Rating rating={product.rating} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-sm">
                    <button
                      type="button"
                      className="mr-3 text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-gray-500 text-sm">
          Showing <span className="font-medium">{displayProducts.length}</span>{' '}
          products
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="rounded-md border border-gray-200 bg-white px-3 py-1 text-gray-600 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded-md bg-blue-600 px-3 py-1 text-white"
          >
            1
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-200 bg-white px-3 py-1 text-gray-600 hover:bg-gray-50"
          >
            2
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-200 bg-white px-3 py-1 text-gray-600 hover:bg-gray-50"
          >
            3
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-200 bg-white px-3 py-1 text-gray-600 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
