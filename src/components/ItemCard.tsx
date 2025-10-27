import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, ShoppingCart } from 'lucide-react';

interface ItemCardProps {
  item: any;
  onAddToCart: (item: any) => void;
}

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'character-pack': return 'Character Pack';
    case 'story-synopsis': return 'Story Synopsis';
    case 'ip-bundle': return 'IP Bundle';
    default: return 'All Categories';
  }
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <div
      key={item.id}
      className="bg-gray-900/50 border border-red-900/20 rounded-lg overflow-hidden hover:border-red-600/50 transition-all duration-200 group"
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
            <span className="text-sm text-white">{item.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4 text-gray-300" />
            <span className="text-sm text-white">{item.views}</span>
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
            <span className="text-sm text-gray-300">{item.creator.name}</span>
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
            onClick={() => onAddToCart(item)}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
