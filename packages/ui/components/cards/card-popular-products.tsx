import { ShoppingBag, Star } from 'lucide-react';

// Enhanced product data with more realistic values
const collegePopularProducts = [
  {
    productId: 1,
    name: 'Premium Wireless Earbuds',
    price: 129.99,
    rating: 4.8,
    stockQuantity: 12000,
    id: 'PRD-001',
    image: '/images/products/earbuds.jpg',
  },
  {
    productId: 2,
    name: 'Smart Fitness Tracker',
    price: 89.99,
    rating: 4.7,
    stockQuantity: 8500,
    id: 'PRD-002',
    image: '/images/products/fitness.jpg',
  },
  {
    productId: 3,
    name: 'Ultra HD Webcam',
    price: 79.99,
    rating: 4.5,
    stockQuantity: 10000,
    id: 'PRD-003',
    image: '/images/products/webcam.jpg',
  },
  {
    productId: 4,
    name: 'Noise-Canceling Headphones',
    price: 199.99,
    rating: 4.6,
    stockQuantity: 9000,
    id: 'PRD-004',
    image: '/images/products/headphones.jpg',
  },
  {
    productId: 5,
    name: 'Portable Power Bank',
    price: 49.99,
    rating: 4.4,
    stockQuantity: 15000,
    id: 'PRD-005',
    image: '/images/products/powerbank.jpg',
  },
  {
    productId: 6,
    name: 'Wireless Charging Pad',
    price: 39.99,
    rating: 4.5,
    stockQuantity: 11000,
    id: 'PRD-006',
    image: '/images/products/charger.jpg',
  },
  {
    productId: 7,
    name: 'Ergonomic Keyboard',
    price: 129.99,
    rating: 4.3,
    stockQuantity: 5000,
    id: 'PRD-007',
    image: '/images/products/keyboard.jpg',
  },
  {
    productId: 8,
    name: 'Bluetooth Speaker',
    price: 69.99,
    rating: 4.6,
    stockQuantity: 7500,
    id: 'PRD-008',
    image: '/images/products/speaker.jpg',
  },
];

const CardPopularProducts = () => {
  return (
    <div className="row-span-3 rounded-2xl bg-white pb-4 shadow-md xl:row-span-6">
      <h3 className="flex items-center px-7 pt-5 pb-2 font-semibold text-lg">
        <ShoppingBag className="mr-2 h-5 w-5 text-blue-500" />
        Popular Products
      </h3>
      <hr className="border-gray-100" />
      <div className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent h-full overflow-auto">
        {collegePopularProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center justify-between gap-3 border-gray-100 border-b px-5 py-4 transition-colors duration-150 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
                <ShoppingBag className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex flex-col justify-between gap-1">
                <div className="font-bold text-gray-800">{product.name}</div>
                <div className="flex items-center text-sm">
                  <span className="font-bold text-blue-600 text-xs">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-gray-600 text-xs">
                      {product.rating}
                    </span>
                  </div>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-gray-500 text-xs">
                    ID: {product.id}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center font-medium text-xs">
              <span className="rounded-full bg-green-100 px-2 py-1 text-green-700">
                {Math.round(product.stockQuantity / 1000)}k Sold
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 text-center">
        <button
          type="button"
          className="font-medium text-blue-500 text-sm transition-colors hover:text-blue-700"
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default CardPopularProducts;
