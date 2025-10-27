import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { marketplaceItems } from '../data/mockData';
import ItemCard from '../components/ItemCard';

interface MarketplaceProps {
  cart: any[];
  setCart: (cart: any[]) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ cart, setCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = ['all', 'character-pack', 'story-synopsis', 'ip-bundle'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-25', label: '$0 - $25' },
    { value: '26-50', label: '$26 - $50' },
    { value: '51-100', label: '$51 - $100' },
    { value: '100+', label: '$100+' }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = item.price;
      switch (priceRange) {
        case '0-25':
          matchesPrice = price <= 25;
          break;
        case '26-50':
          matchesPrice = price >= 26 && price <= 50;
          break;
        case '51-100':
          matchesPrice = price >= 51 && price <= 100;
          break;
        case '100+':
          matchesPrice = price > 100;
          break;
      }
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'character-pack': return 'Character Pack';
      case 'story-synopsis': return 'Story Synopsis';
      case 'ip-bundle': return 'IP Bundle';
      default: return 'All Categories';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Superhero Marketplace
          </h1>
          <p className="text-xl text-gray-300">
            Discover the perfect characters for your next story. Each hero is waiting to find their storyteller.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search characters, stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-red-900/20 rounded-lg text-white focus:outline-none focus:border-red-600"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryLabel(category)}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-red-900/20 rounded-lg text-white focus:outline-none focus:border-red-600"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredItems.length} of {marketplaceItems.length} items
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No items found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;