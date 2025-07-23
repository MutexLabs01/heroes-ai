import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Zap } from 'lucide-react';

interface HeaderProps {
  user: any;
  setUser: (user: any) => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ user, setUser, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleAuth = () => {
    if (user) {
      setUser(null);
    } else {
      // Mock login
      setUser({ id: 1, name: 'John Doe', email: 'john@example.com' });
    }
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-red-900/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-red-600 to-red-500 p-2 rounded-lg group-hover:from-red-500 group-hover:to-red-400 transition-all duration-200">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              Heroes.ai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/marketplace"
              className={`text-sm font-medium transition-colors hover:text-red-400 ${
                isActive('/marketplace') ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              Marketplace
            </Link>
            <Link
              to="/creator"
              className={`text-sm font-medium transition-colors hover:text-red-400 ${
                isActive('/creator') ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              Sell Content
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-red-400 ${
                  isActive('/dashboard') ? 'text-red-500' : 'text-gray-300'
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-300 hover:text-red-400 cursor-pointer transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <button
              onClick={handleAuth}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>{user ? 'Logout' : 'Login'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-red-900/20">
            <div className="flex flex-col space-y-4">
              <Link
                to="/marketplace"
                className="text-gray-300 hover:text-red-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                to="/creator"
                className="text-gray-300 hover:text-red-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell Content
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleAuth}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 w-fit"
              >
                <User className="h-4 w-4" />
                <span>{user ? 'Logout' : 'Login'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;