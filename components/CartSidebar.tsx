'use client';

import { useCartStore } from '@/stores/cartStore';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const total = getTotal();

  const closeCart = () => {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar && overlay) {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowCheckout(true);
    closeCart();
  };

  return (
    <>
      <div
        id="cartOverlay"
        className="hidden fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
      ></div>
      <div
        id="cartSidebar"
        className="fixed top-0 -right-[400px] w-[400px] max-w-[90%] h-full bg-white shadow-2xl z-50 transition-right duration-300 overflow-y-auto flex flex-col"
      >
        <div className="bg-primary-500 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl m-0">Your Cart</h2>
          <button
            onClick={closeCart}
            className="bg-transparent border-none text-white text-3xl cursor-pointer p-0 w-8 h-8 flex items-center justify-center hover:text-primary-200"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 p-6">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-600">Your cart is empty</div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-primary-50 p-4 rounded-lg flex justify-between items-center">
                  <div className="flex-1">
                    <div className="font-bold text-primary-500 mb-1">
                      {item.name}{item.size ? ` (${item.size})` : ''}
                    </div>
                    <div className="text-sm text-gray-600">
                      Qty: 
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-12 ml-2 px-2 py-1 border border-primary-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="text-primary-300 font-bold mr-4">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-6 bg-primary-50 border-t-2 border-primary-300">
            <div className="flex justify-between text-2xl font-bold mb-4 text-primary-500">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="mb-4 p-4 bg-yellow-100 rounded text-center">
              <p className="text-sm text-yellow-800 m-0">
                <strong>Payment:</strong> Venmo @Crosbie-Bohannon or Cash
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary-500 text-white border-none py-4 rounded text-lg font-bold cursor-pointer hover:bg-primary-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      {showCheckout && (
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => {
            setShowCheckout(false);
            clearCart();
          }}
        />
      )}
      <style jsx>{`
        #cartSidebar.open {
          right: 0;
        }
        #cartOverlay.show {
          display: block;
        }
      `}</style>
    </>
  );
}

