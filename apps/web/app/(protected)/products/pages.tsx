'use client';

import Header from '@/components/Header';
import { useCreateProductMutation, useGetProductsQuery } from '@/state/api';
import Rating from '@rewara/ui/components/rating';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
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

// Sample product list (fallback in case API fails) tldr it failed
const sampleProducts: Product[] = [
  {
    productId: '1',
    name: 'Wireless Mouse',
    price: 29.99,
    stockQuantity: 20,
    rating: 4.5,
    imageUrl: '/images/mouse.png',
  },
  {
    productId: '2',
    name: 'Mechanical Keyboard',
    price: 89.99,
    stockQuantity: 15,
    rating: 4.8,
    imageUrl: '/images/keyboard.png',
  },
  {
    productId: '3',
    name: 'Noise Cancelling Headphones',
    price: 199.99,
    stockQuantity: 10,
    rating: 4.7,
    imageUrl: '/images/headphones.png',
  },
  {
    productId: '4',
    name: 'Portable SSD (1TB)',
    price: 129.99,
    stockQuantity: 30,
    rating: 4.6,
    imageUrl: '/images/ssd.png',
  },
  {
    productId: '5',
    name: 'Smartwatch',
    price: 149.99,
    stockQuantity: 25,
    rating: 4.3,
    imageUrl: '/images/smartwatch.png',
  },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: products, isLoading } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  return (
    <div className="mx-auto w-full pb-5">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center rounded border-2 border-gray-200">
          <SearchIcon className="m-2 h-5 w-5 text-gray-500" />
          <input
            className="w-full rounded bg-white px-4 py-2"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="mb-6 flex items-center justify-between">
        <Header name="Products" />
        <button
          type="button"
          className="flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-gray-200 hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="!text-gray-200 mr-2 h-5 w-5" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 justify-between gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          (products?.length ? products : sampleProducts).map((product) => (
            <div
              key={product.productId}
              className="mx-auto w-full max-w-full rounded-md border p-4 shadow"
            >
              <div className="flex flex-col items-center">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <div className="mt-1 text-gray-600 text-sm">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="mt-2 flex items-center">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
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
