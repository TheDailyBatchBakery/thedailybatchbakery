'use client';

import { useCartStore } from '@/stores/cartStore';
import { useState } from 'react';

export default function CartIcon() {
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();

  const toggleCart = () => {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar && overlay) {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleCart}
        className="bg-primary-500 text-white p-4 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform w-15 h-15 flex items-center justify-center text-2xl relative"
        aria-label="Shopping cart"
      >
        🛒
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-300 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {itemCount}
          </span>
        )}
      </button>
    </div>
  );
}

