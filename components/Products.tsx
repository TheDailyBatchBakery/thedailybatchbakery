'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { Product } from '@/types';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Round Top Sandwich Bread',
    price: 3,
    category: 'breads-rolls',
    has_size: true,
    size_options: [
      { value: '1-loaf', label: '1 Loaf - $3', price: 3 },
      { value: '2-loaves', label: '2 Loaves - $5', price: 5 },
    ],
  },
  {
    id: '2',
    name: 'Dinner Rolls',
    price: 6,
    category: 'breads-rolls',
  },
  {
    id: '3',
    name: 'Lemon Loaf',
    price: 10,
    category: 'sweet-loafs',
  },
  {
    id: '4',
    name: 'Banana Bread',
    price: 10,
    category: 'sweet-loafs',
  },
  {
    id: '5',
    name: 'Cinnamon Rolls',
    price: 18,
    category: 'cinnamon-rolls',
  },
  {
    id: '6',
    name: 'Pecan Rolls',
    price: 18,
    category: 'cinnamon-rolls',
  },
  {
    id: '7',
    name: 'Chocolate Chip Cookies',
    price: 9,
    category: 'cookies',
    has_size: true,
    size_options: [
      { value: 'small', label: 'Small - $8-10', price: 9 },
      { value: 'large', label: 'Large - $14-18', price: 16 },
    ],
  },
  {
    id: '8',
    name: 'Peanut Butter Cookies',
    price: 9,
    category: 'cookies',
    has_size: true,
    size_options: [
      { value: 'small', label: 'Small - $8-10', price: 9 },
      { value: 'large', label: 'Large - $14-18', price: 16 },
    ],
  },
  {
    id: '9',
    name: 'Chocolate Crinkle Cookies',
    price: 9,
    category: 'cookies',
    has_size: true,
    size_options: [
      { value: 'small', label: 'Small - $8-10', price: 9 },
      { value: 'large', label: 'Large - $14-18', price: 16 },
    ],
  },
  {
    id: '10',
    name: 'Cookie Assortment',
    price: 9,
    category: 'cookies',
    has_size: true,
    size_options: [
      { value: 'small', label: 'Small - $8-10', price: 9 },
      { value: 'large', label: 'Large - $14-18', price: 16 },
    ],
  },
];

const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'breads-rolls', name: 'Breads and Rolls' },
  { id: 'sourdough', name: 'Sourdough' },
  { id: 'sweet-loafs', name: 'Sweet Loafs' },
  { id: 'cinnamon-rolls', name: 'Cinnamon Rolls' },
  { id: 'cookies', name: 'Cookies' },
  { id: 'pastries', name: 'Pastries' },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const { addItem } = useCartStore();

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    if (product.has_size && product.size_options) {
      const sizeValue = selectedSizes[product.id] || product.size_options[0].value;
      const selectedOption = product.size_options.find(opt => opt.value === sizeValue);
      if (selectedOption) {
        addItem({
          product_id: product.id,
          name: product.name,
          price: selectedOption.price,
          size: sizeValue,
          quantity: 1,
        });
      }
    } else {
      addItem({
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }
  };

  const getPriceDisplay = (product: Product) => {
    if (product.has_size && product.size_options) {
      const prices = product.size_options.map(opt => opt.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      if (min === max) {
        return `$${min}`;
      }
      return `$${min}-${max}`;
    }
    return `$${product.price}`;
  };

  return (
    <section id="menu" className="py-16 px-8 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl text-primary-500 mb-6 pb-2 border-b-4 border-primary-300">
        Our Products
      </h2>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              selectedCategory === cat.id
                ? 'bg-primary-500 text-white border-2 border-primary-500'
                : 'bg-white text-primary-500 border-2 border-primary-300 hover:bg-primary-300 hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h3 className="text-primary-500 mb-4 text-xl">Fresh new items coming soon!</h3>
          <p className="text-gray-600">We&apos;re working on adding new products to this category. Check back soon!</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-md transition hover:-translate-y-1 hover:shadow-lg flex flex-col"
            >
              <strong className="block text-primary-500 text-xl mb-2">{product.name}</strong>
              <span className="text-primary-300 font-bold text-lg mb-4">
                {getPriceDisplay(product)}
              </span>
              {product.has_size && product.size_options && (
                <div className="mb-4">
                  <label className="block mb-2 font-bold text-gray-700">
                    {product.name.includes('Bread') ? 'Quantity:' : 'Size:'}
                  </label>
                  <select
                    value={selectedSizes[product.id] || product.size_options[0].value}
                    onChange={(e) =>
                      setSelectedSizes({ ...selectedSizes, [product.id]: e.target.value })
                    }
                    className="w-full p-2 border-2 border-primary-300 rounded"
                  >
                    {product.size_options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-primary-500 text-white border-none px-6 py-3 rounded font-bold cursor-pointer hover:bg-primary-300 transition mt-auto"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

