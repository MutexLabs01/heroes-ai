import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Eye, Download, Shield, ShoppingCart, Lock, Users, Calendar } from 'lucide-react';
import { marketplaceItems } from '../data/mockData';

interface ItemDetailProps {
  cart: any[];
  setCart: (cart: any[]) => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ cart, setCart }) => {
  const { id } = useParams();
  const [selectedLicense, setSelectedLicense] = useState('non-exclusive');
  const [showCheckout, setShowCheckout] = useState(false);

  const item = marketplaceItems.find(item => item.id === parseInt(id || '0'));

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Item not found</h2>
          <Link to="/marketplace" className="text-red-400 hover:text-red-300">
            Return to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    setShowCheckout(true);
  };

  const addToCart = () => {
    setCart([...cart, { ...item, license: selectedLicense }]);
  };

  const licenseOptions = [
    {
      type: 'non-exclusive',
      name: 'Non-Exclusive License',
      price: item.price,
      description: 'Use in commercial projects. Others can also license this content.',
      features: ['Commercial use allowed', 'Attribution required', 'Resale not permitted']
    },
    {
      type: 'exclusive',
      name: 'Exclusive License',
      price: item.price * 3,
      description: 'Exclusive rights to this content. No one else can license it.',
      features: ['Exclusive commercial rights', 'No attribution required', 'Full ownership rights']
    }
  ];

  const selectedLicenseData = licenseOptions.find(l => l.type === selectedLicense)!;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/marketplace"
          className="inline-flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image and Preview */}
          <div>
            <div className="relative rounded-lg overflow-hidden mb-6">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover"
              />
              {!item.purchased && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <p className="text-white font-semibold">Purchase to unlock full content</p>
                  </div>
                </div>
              )}
            </div>

            {/* Creator Info */}
            <div className="bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={item.creator.avatar}
                  alt={item.creator.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{item.creator.name}</h3>
                  <p className="text-gray-400 text-sm">{item.creator.title}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{item.creator.bio}</p>
              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{item.creator.followers} followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {item.creator.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details and Purchase */}
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                  {item.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{item.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{item.views} views</span>
                  </div>
                  <span>{item.sales} sales</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            {/* License Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Choose Your License</h3>
              <div className="space-y-4">
                {licenseOptions.map(license => (
                  <div
                    key={license.type}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedLicense === license.type
                        ? 'border-red-600 bg-red-600/10'
                        : 'border-red-900/20 hover:border-red-600/50'
                    }`}
                    onClick={() => setSelectedLicense(license.type)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{license.name}</h4>
                      <div className="text-xl font-bold text-red-500">
                        ${license.price}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{license.description}</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {license.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="space-y-4">
              <button
                onClick={handlePurchase}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Buy Now - ${selectedLicenseData.price}</span>
              </button>
              
              <button
                onClick={addToCart}
                className="w-full border border-red-600 text-red-400 hover:bg-red-600/10 py-4 px-6 rounded-lg text-lg font-semibold transition-colors"
              >
                Add to Cart
              </button>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Secure payment processed by Stripe</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="mt-8 bg-gray-900/50 border border-red-900/20 rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Download className="h-5 w-5 text-red-400" />
                <span>What's Included</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {item.includes.map((include, index) => (
                  <li key={index}>• {include}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-red-900/20 rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-6">Complete Purchase</h3>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span>{item.title}</span>
                  <span>${selectedLicenseData.price}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {selectedLicenseData.name}
                </div>
              </div>
              <div className="text-center text-gray-400 mb-6">
                <p>This would redirect to Stripe Checkout</p>
                <p className="text-sm mt-2">Secure payment processing</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 border border-gray-600 text-gray-300 py-2 px-4 rounded transition-colors hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors">
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;