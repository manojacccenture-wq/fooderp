import React, { useState } from 'react';
import { ItemAvailabilityRow } from '../../components/inventory/ItemAvailabilityRow/ItemAvailabilityRow';

const itemsData = [
  {
    id: 1,
    image: 'http://localhost:3845/assets/457decdb571c02070bc7add243bd80cae81aeb7f.png',
    title: 'Chicken Briyani',
    price: '120',
    isAvailable: true,
    status: 'Unavailable',
    stock: 'Out of stock',
    category: 'Non Veg',
  },
  {
    id: 2,
    image: 'http://localhost:3845/assets/457decdb571c02070bc7add243bd80cae81aeb7f.png',
    title: 'Non Veg Thali',
    price: '120',
    isAvailable: true,
    status: 'Unavailable',
    stock: 'Low Stock',
    category: 'Non Veg',
  },
  {
    id: 3,
    image: 'http://localhost:3845/assets/30adbba772edea972a2197ae69ad3d4e02c266e0.png',
    title: 'Veg Thali',
    price: '120',
    isAvailable: false,
    status: 'Unavailable',
    stock: 'In Stock',
    category: 'Veg',
  },
];

export const ItemOnOffPage = () => {
  const [items, setItems] = useState(itemsData);
  const [activeCategory, setActiveCategory] = useState('All Dishes');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All Dishes', 'Veg', 'Desert', 'Non Veg'];

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'All Dishes' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggle = (itemId, newState) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, isAvailable: newState } : item
      )
    );
  };

  const handleStockChange = (itemId, newStock) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, stock: newStock } : item
      )
    );
  };

  return (
    <div className="w-full bg-white p-8">
      {/* Search Section */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex-1 max-w-4xl bg-white border border-[var(--color-neutral-150)] rounded-[16px] px-4 py-3 flex items-center gap-3 h-[54px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <circle cx="8.5" cy="8.5" r="6" stroke="var(--color-neutral-500)" strokeWidth="1.5" />
            <path d="M14 14L18 18" stroke="var(--color-neutral-500)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-subtitle-1 text-[var(--color-neutral-500)] placeholder-[var(--color-neutral-500)] bg-transparent"
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <path d="M7 2H13M2 7H18M3 7L17 7" stroke="var(--color-neutral-600)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-3 rounded-[16px] text-button-md font-bold transition-colors ${
              activeCategory === category
                ? 'bg-[var(--color-secondary-1)] text-white'
                : 'bg-transparent text-[var(--color-neutral-600)] hover:bg-[var(--color-secondary-5)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="space-y-5">
        {filteredItems.map((item) => (
          <ItemAvailabilityRow
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            isAvailable={item.isAvailable}
            status={item.status}
            stock={item.stock}
            onToggle={handleToggle}
            onStockChange={handleStockChange}
          />
        ))}
      </div>
    </div>
  );
};
