import React from 'react';
import { DownloadCloud, FileText, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: any;
  onRemove?: (id: number, license?: string) => void;
  onDownload?: (item: any) => void;
  onIncrease?: (id: number, license?: string) => void;
  onDecrease?: (id: number, license?: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onDownload, onIncrease, onDecrease }) => {
  return (
    <article className="w-full bg-gray-900/50 border border-red-900/20 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
      {/* Left: Image */}
      <div className="relative w-full md:w-40 lg:w-48 aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ display: 'block' }}
        />
      </div>

      {/* Middle: Details */}
      <div className="flex-1 w-full">
        <div className="flex items-start justify-between">
          <div className="pr-4">
            <h4 className="text-lg font-semibold text-white">{item.title}</h4>
            <p className="text-sm text-gray-300 mt-1">by <span className="font-medium text-gray-200">{item.creator?.name}</span></p>
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{item.description}</p>
          </div>

          <div className="text-right">
            <div className="text-red-500 font-bold text-lg">${item.price}</div>
            <div className="text-sm text-gray-400">{item.category}</div>
          </div>
        </div>

        {/* Actions: quantity controls + download / license / delete */}
        <div className="mt-4 flex items-center justify-end gap-3">
          {/* Quantity controls */}
          <div className="flex items-center bg-gray-800/50 border border-white/10 rounded-md overflow-hidden">
            <button
              onClick={() => onDecrease?.(item.id, item.license)}
              className="px-3 py-2 text-white hover:text-red-400 transition-colors"
              aria-label={`Decrease quantity of ${item.title}`}
            >
              −
            </button>
            <div className="px-4 py-2 text-sm text-white font-medium">{item.quantity ?? 1}</div>
            <button
              onClick={() => onIncrease?.(item.id, item.license)}
              className="px-3 py-2 text-white hover:text-red-400 transition-colors"
              aria-label={`Increase quantity of ${item.title}`}
            >
              +
            </button>
          </div>

          <button
            onClick={() => onDownload?.(item)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            aria-label={`Download ${item.title}`}
          >
            <DownloadCloud className="h-4 w-4" />
            Download
          </button>

          <button
            className="flex items-center gap-2 border border-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
            aria-label={`View license for ${item.title}`}
          >
            <FileText className="h-4 w-4" />
            View License
          </button>

          {onRemove && (
            <button
              onClick={() => onRemove(item.id, item.license)}
              className="ml-2 text-gray-300 hover:text-red-400 p-2 rounded-md"
              aria-label={`Remove ${item.title} from cart`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default CartItem;
