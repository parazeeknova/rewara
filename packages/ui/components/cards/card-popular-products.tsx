import { ShoppingBag } from 'lucide-react';
import Rating from '../rating';

const collegePopularProducts = [
  {
    productId: 1,
    name: 'MacBook Air',
    price: 999,
    rating: 4.8,
    stockQuantity: 12000,
    id: 'P001',
  },
  {
    productId: 2,
    name: 'AirPods Pro',
    price: 249,
    rating: 4.7,
    stockQuantity: 8000,
    id: 'P002',
  },
  {
    productId: 3,
    name: 'JBL Bluetooth Speaker',
    price: 99,
    rating: 4.5,
    stockQuantity: 10000,
    id: 'P003',
  },
  {
    productId: 4,
    name: 'Noise-Canceling Headphones',
    price: 299,
    rating: 4.6,
    stockQuantity: 9000,
    id: 'P004',
  },
  {
    productId: 5,
    name: 'Hydro Flask Water Bottle',
    price: 45,
    rating: 4.4,
    stockQuantity: 7000,
    id: 'P005',
  },
  {
    productId: 6,
    name: 'Nike Sneakers',
    price: 120,
    rating: 4.5,
    stockQuantity: 11000,
    id: 'P006',
  },
  {
    productId: 7,
    name: 'Gaming Chair',
    price: 200,
    rating: 4.3,
    stockQuantity: 5000,
    id: 'P007',
  },
  {
    productId: 8,
    name: 'Mechanical Keyboard',
    price: 150,
    rating: 4.6,
    stockQuantity: 6000,
    id: 'P008',
  },
];

const CardPopularProducts = () => {
  return (
    <div className="row-span-3 rounded-2xl bg-white pb-16 shadow-md xl:row-span-6">
      <h3 className="px-7 pt-5 pb-2 font-semibold text-lg">Popular Products</h3>
      <hr />
      <div className="h-full overflow-auto">
        {collegePopularProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center justify-between gap-3 border-b px-5 py-7"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col justify-between gap-1">
                <div className="font-bold text-gray-700">
                  {product.name} (ID: {product.id})
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-bold text-blue-500 text-xs">
                    ${product.price}
                  </span>
                  <span className="mx-2">|</span>
                  <Rating rating={product.rating || 0} />
                </div>
              </div>
            </div>

            <div className="flex items-center text-xs">
              <button
                type="button"
                className="mr-2 rounded-full bg-blue-100 p-2 text-blue-600"
              >
                <ShoppingBag className="h-4 w-4" />
              </button>
              {Math.round(product.stockQuantity / 1000)}k Sold
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPopularProducts;
