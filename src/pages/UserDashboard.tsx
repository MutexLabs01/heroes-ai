import React from 'react';
import { Star } from 'lucide-react';
import PurchaseCard from '../components/PurchaseCard';

interface UserDashboardProps {
  user: any;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const purchasedItems = [
    {
      id: 1,
      title: 'Shadow Warrior Character Pack',
      creator: 'Alex Thompson',
      purchaseDate: '2024-01-15',
      price: 45,
      license: 'Non-Exclusive',
      downloads: 3,
      image: 'https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Phoenix Rising Story Synopsis',
      creator: 'Sarah Chen',
      purchaseDate: '2024-01-10',
      price: 25,
      license: 'Exclusive',
      downloads: 1,
      image: 'https://images.pexels.com/photos/3791463/pexels-photo-3791463.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Cyber Hero Complete Bundle',
      creator: 'Mike Rodriguez',
      purchaseDate: '2024-01-05',
      price: 85,
      license: 'Non-Exclusive',
      downloads: 5,
      image: 'https://images.pexels.com/photos/3791465/pexels-photo-3791465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const favorites = [
    {
      id: 4,
      title: 'Mystic Guardian Art Pack',
      creator: 'Lisa Wang',
      price: 35,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3791464/pexels-photo-3791464.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Stellar Knight Story Collection',
      creator: 'David Park',
      price: 55,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3791467/pexels-photo-3791467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h2>
          <p className="text-gray-400">You need to be logged in to view your purchases and favorites.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-300">Manage your purchases, downloads, and favorites</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
            <div className="text-2xl font-bold text-red-500 mb-1">{purchasedItems.length}</div>
            <div className="text-gray-400 text-sm">Items Purchased</div>
          </div>
          <div className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
            <div className="text-2xl font-bold text-red-500 mb-1">
              ${purchasedItems.reduce((sum, item) => sum + item.price, 0)}
            </div>
            <div className="text-gray-400 text-sm">Total Spent</div>
          </div>
          <div className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
            <div className="text-2xl font-bold text-red-500 mb-1">
              {purchasedItems.reduce((sum, item) => sum + item.downloads, 0)}
            </div>
            <div className="text-gray-400 text-sm">Total Downloads</div>
          </div>
          <div className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
            <div className="text-2xl font-bold text-red-500 mb-1">{favorites.length}</div>
            <div className="text-gray-400 text-sm">Favorites</div>
          </div>
        </div>

        {/* My Purchases */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">My Purchases</h2>
          <div className="space-y-6">
            {purchasedItems.map(item => (
              <PurchaseCard
                key={item.id}
                item={item}
                onDownload={(id) => {
                  // placeholder: hook up real download behavior
                  console.log('download', id);
                }}
                onViewLicense={(id) => {
                  // placeholder: show license modal or navigate to license view
                  console.log('view-license', id);
                }}
              />
            ))}
          </div>
        </div>

        {/* Favorites */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">My Favorites</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(item => (
              <div key={item.id} className="bg-gray-900/50 border border-red-900/20 rounded-lg overflow-hidden hover:border-red-600/50 transition-all duration-200 group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">by {item.creator}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                    <div className="text-lg font-bold text-red-500">
                      ${item.price}
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;