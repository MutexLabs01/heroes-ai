import React, { useMemo } from 'react';
import CartItem from '../components/CartItem';
import { marketplaceItems } from '../data/mockData';
import { ShoppingCart } from 'lucide-react';

interface CartPageProps {
  cart: any[];
  setCart: (value: any[] | ((prev: any[]) => any[])) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, setCart }) => {
  const addToCart = (item: any) => {
    setCart((prev: any[]) => {
      const existsIndex = prev.findIndex((p: any) => p.id === item.id && (p.license || '') === (item.license || ''));
      if (existsIndex >= 0) {
        const copy = [...prev];
        copy[existsIndex] = { ...copy[existsIndex], quantity: (copy[existsIndex].quantity || 1) + 1 };
        return copy;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, license?: string) => {
    setCart((s: any[]) => s.filter((i: any) => !(i.id === id && (i.license || '') === (license || ''))));
  };

  const increaseQuantity = (id: number, license?: string) => {
    setCart((s: any[]) => s.map((i: any) => {
      if (i.id === id && (i.license || '') === (license || '')) {
        return { ...i, quantity: (i.quantity || 1) + 1 };
      }
      return i;
    }));
  };

  const decreaseQuantity = (id: number, license?: string) => {
    setCart((s: any[]) => {
      const copy = s.map((i: any) => {
        if (i.id === id && (i.license || '') === (license || '')) {
          return { ...i, quantity: (i.quantity || 1) - 1 };
        }
        return i;
      });
      // remove items with quantity <= 0
      return copy.filter((i: any) => (i.quantity ?? 1) > 0);
    });
  };

  const downloadItem = (item: any) => {
    // placeholder for download action
    alert(`Starting download: ${item.title}`);
  };

  const total = useMemo(() => (cart || []).reduce((sum, it) => sum + ((it.price || 0) * (it.quantity || 1)), 0), [cart]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-black/95 border border-red-900/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-red-500" />
            Your Cart
          </h1>
        </div>

        

        {(!cart || cart.length === 0) ? (
          <div className="py-12 text-center">
            <p className="text-gray-300 text-lg">Your cart is empty. Add items to get started.</p>
          </div>
        ) : (
          <section className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {cart.map((item) => (
                <CartItem
                  key={`cart-${item.id}-${item.license || 'std'}`}
                  item={item}
                  onRemove={removeFromCart}
                  onDownload={downloadItem}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-gray-300">{cart.length} {cart.length === 1 ? 'item' : 'items'}</div>
              <div className="flex items-center gap-4">
                <div className="text-gray-300">Total</div>
                <div className="text-red-500 font-bold text-2xl">${total}</div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-semibold">
                  Checkout
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default CartPage;
