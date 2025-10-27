import React from 'react';
import { Download, Calendar, Shield } from 'lucide-react';

interface Purchase {
  id: number;
  title: string;
  creator: string;
  purchaseDate: string;
  price: number;
  license: string;
  downloads: number;
  image?: string;
}

interface PurchaseCardProps {
  item: Purchase;
  onDownload?: (id: number) => void;
  onViewLicense?: (id: number) => void;
}

const PurchaseCard: React.FC<PurchaseCardProps> = ({ item, onDownload, onViewLicense }) => {
  return (
    <div className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
        <img
          src={item.image}
          alt={item.title}
          className="w-full lg:w-32 h-32 object-cover rounded-lg mb-4 lg:mb-0"
        />

        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 mb-2">by {item.creator}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Purchased {item.purchaseDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>{item.license} License</span>
                </div>
              </div>
            </div>

            <div className="text-lg font-bold text-red-500 lg:text-right mt-2 lg:mt-0">
              ${item.price}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4 sm:mb-0">
              <div className="flex items-center space-x-1">
                <Download className="h-4 w-4" />
                <span>{item.downloads} downloads</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => onDownload?.(item.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              <button
                onClick={() => onViewLicense?.(item.id)}
                className="border border-red-600 text-red-400 hover:bg-red-600/10 px-4 py-2 rounded transition-colors"
              >
                View License
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCard;
