import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  Eye,
  ShoppingCart,
} from "lucide-react";
import { marketplaceItems } from "../data/mockData";

interface MarketplaceProps {
  cart: any[];
  setCart: (cart: any[]) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ cart, setCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all")

  const categories = ["all", "character-pack", "story-synopsis", "ip-bundle"];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-25", label: "$0 - $25" },
    { value: "26-50", label: "$26 - $50" },
    { value: "51-100", label: "$51 - $100" },
    { value: "100+", label: "$100+" },
  ];

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPrice = true;
    if (priceRange !== "all") {
      const price = item.price;
      switch (priceRange) {
        case "0-25":
          matchesPrice = price <= 25;
          break;
        case "26-50":
          matchesPrice = price >= 26 && price <= 50;
          break;
        case "51-100":
          matchesPrice = price >= 51 && price <= 100;
          break;
        case "100+":
          matchesPrice = price > 100;
          break;
      }
    }

    return matchesSearch && matchesPrice;
  });

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "character-pack":
        return "Character Pack";
      case "story-synopsis":
        return "Story Synopsis";
      case "ip-bundle":
        return "IP Bundle";
      default:
        return "All Categories";
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
            Discover the perfect characters for your next story. Each hero is
            waiting to find their storyteller.
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

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-red-900/20 rounded-lg text-white focus:outline-none focus:border-red-600"
            >
              {priceRanges.map((range) => (
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
        
        {/* Items */}
        {/* Category-wise displaying content */}
        {categories.map((category) => (
          <>
            <h1 className="text-2xl font-bold text-white mb-2">
              {getCategoryLabel(category)}
            </h1>
            <div className="flex justify-start gap-8 overflow-x-scroll relative no-scrollbar mb-12">
              {filteredItems.map(
                (item) =>
                  item.category === category && (
                    <div
                      key={item.id}
                      className={`bg-gray-900/50 border shrink-0 w-[250px] border-red-900/20 rounded-lg overflow-hidden hover:border-red-600/50 transition-all duration-200 group`}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {item.isPremium && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                            Premium
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-white">
                              {item.rating}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4 text-gray-300" />
                            <span className="text-sm text-white">
                              {item.views}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs font-medium">
                            {getCategoryLabel(item.category)}
                          </span>
                          <div className="text-lg font-bold text-red-500">
                            ${item.price}
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <img
                              src={item.creator.avatar}
                              alt={item.creator.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm text-gray-300">
                              {item.creator.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400">
                            {item.sales} sales
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <Link
                            to={`/item/${item.id}`}
                            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded text-center text-sm font-medium transition-colors"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </>
        ))}

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