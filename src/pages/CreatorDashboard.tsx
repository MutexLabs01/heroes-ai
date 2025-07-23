import React, { useState } from 'react';
import { Upload, DollarSign, Eye, Download, Plus, Star, TrendingUp, Users } from 'lucide-react';

interface CreatorDashboardProps {
  user: any;
}

const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ user }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'character-pack',
    price: '',
    license: 'both',
    files: null
  });

  const stats = [
    { label: 'Total Earnings', value: '$2,450', icon: DollarSign, color: 'text-green-500' },
    { label: 'Items Sold', value: '34', icon: Download, color: 'text-blue-500' },
    { label: 'Total Views', value: '1,245', icon: Eye, color: 'text-purple-500' },
    { label: 'Followers', value: '156', icon: Users, color: 'text-red-500' }
  ];

  const recentSales = [
    { id: 1, item: 'Shadow Warrior Pack', price: 45, buyer: 'John D.', date: '2 hours ago' },
    { id: 2, item: 'Phoenix Rising Story', price: 25, buyer: 'Sarah M.', date: '5 hours ago' },
    { id: 3, item: 'Cyber Hero Bundle', price: 85, buyer: 'Mike R.', date: '1 day ago' },
    { id: 4, item: 'Mystic Guardian Art', price: 35, buyer: 'Lisa K.', date: '2 days ago' }
  ];

  const myListings = [
    { id: 1, title: 'Shadow Warrior Pack', category: 'Character Pack', price: 45, sales: 12, rating: 4.8, status: 'active' },
    { id: 2, title: 'Phoenix Rising Story', category: 'Story Synopsis', price: 25, sales: 8, rating: 4.9, status: 'active' },
    { id: 3, title: 'Cyber Hero Bundle', category: 'IP Bundle', price: 85, sales: 5, rating: 4.7, status: 'active' },
    { id: 4, title: 'Mystic Guardian Art', category: 'Character Pack', price: 35, sales: 9, rating: 4.6, status: 'pending' }
  ];

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle upload logic here
    setShowUploadModal(false);
    setUploadForm({
      title: '',
      description: '',
      category: 'character-pack',
      price: '',
      license: 'both',
      files: null
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to access Creator Dashboard</h2>
          <p className="text-gray-400">You need to be logged in to manage your content and sales.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
            <p className="text-gray-300">Manage your superhero content and track your earnings</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Upload Content</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Sales */}
          <div className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Sales</h2>
            <div className="space-y-4">
              {recentSales.map(sale => (
                <div key={sale.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                  <div>
                    <div className="font-medium">{sale.item}</div>
                    <div className="text-sm text-gray-400">{sale.buyer} • {sale.date}</div>
                  </div>
                  <div className="text-green-500 font-semibold">
                    +${sale.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Listings */}
          <div className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">My Listings</h2>
            <div className="space-y-4">
              {myListings.map(listing => (
                <div key={listing.id} className="border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{listing.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      listing.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mb-3">{listing.category}</div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-red-500 font-semibold">${listing.price}</span>
                      <span>{listing.sales} sales</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{listing.rating}</span>
                      </div>
                    </div>
                    <button className="text-red-400 hover:text-red-300 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-red-900/20 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6">Upload New Content</h3>
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                    className="w-full px-4 py-2 bg-black border border-red-900/20 rounded-lg text-white focus:outline-none focus:border-red-600"
                    placeholder="Enter content title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                    className="w-full px-4 py-2 bg-black border border-red-900/20 rounded-lg text-white focus:outline-none focus:border-red-600 h-32 resize-none"
                    placeholder="Describe your content..."
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                      className="w-full px-4 py-2 bg-black border border-red-900/20 rounded-lg text-white focus:outline-none focus:border-red-600"
                    >
                      <option value="character-pack">Character Pack</option>
                      <option value="story-synopsis">Story Synopsis</option>
                      <option value="ip-bundle">IP Bundle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Price ($)</label>
                    <input
                      type="number"
                      value={uploadForm.price}
                      onChange={(e) => setUploadForm({...uploadForm, price: e.target.value})}
                      className="w-full px-4 py-2 bg-black border border-red-900/20 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="0.00"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">License Options</label>
                  <select
                    value={uploadForm.license}
                    onChange={(e) => setUploadForm({...uploadForm, license: e.target.value})}
                    className="w-full px-4 py-2 bg-black border border-red-900/20 rounded-lg text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="non-exclusive">Non-Exclusive Only</option>
                    <option value="exclusive">Exclusive Only</option>
                    <option value="both">Both Options</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Upload Files</label>
                  <div className="border-2 border-dashed border-red-900/20 rounded-lg p-8 text-center hover:border-red-600/50 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">Drag and drop your files here</p>
                    <p className="text-sm text-gray-400 mb-4">or click to browse</p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => setUploadForm({...uploadForm, files: e.target.files})}
                    />
                    <button
                      type="button"
                      className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Choose Files
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 border border-gray-600 text-gray-300 py-3 px-6 rounded-lg transition-colors hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors"
                  >
                    Upload Content
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;