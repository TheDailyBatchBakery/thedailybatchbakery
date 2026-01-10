'use client';

import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { useUserStore } from '@/stores/userStore';
import { formatCurrency } from '@/lib/utils';
import { config } from '@/lib/config';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, clearCart, getTotal } = useCartStore();
  const { user } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = getTotal();

  // This is a placeholder - full implementation needed
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement full checkout flow
    console.log('Checkout not yet implemented');
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-primary-500 mb-6">Checkout</h2>

        {!user ? (
          <div className="bg-yellow-50 p-4 rounded mb-4 text-center">
            <p className="mb-2"><strong>Please login or sign up to continue</strong></p>
            <p className="text-sm text-gray-600">Login/Signup modals coming soon...</p>
          </div>
        ) : (
          <>
            {showSuccess ? (
              <div className="bg-green-50 p-4 rounded mb-4">
                <p className="text-green-800">
                  Order submitted successfully! You&apos;ll receive a text once your order and payment have been confirmed.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-green-50 p-4 rounded mb-4">
                  <p><strong>Ordering as:</strong></p>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="bg-primary-50 p-4 rounded mb-4">
                    <h3 className="font-bold mb-2">Order Summary</h3>
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between mb-2">
                        <span>
                          {item.name}{item.size ? ` (${item.size})` : ''} x{item.quantity}
                        </span>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t-2 border-primary-300 pt-2 mt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded mb-4 border-2 border-dashed border-primary-300 text-center">
                    <p className="text-yellow-800 font-bold">
                      Checkout form coming soon...
                    </p>
                    <p className="text-sm mt-2">
                      Date/time selection, delivery options, and order submission will be implemented next.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-500 text-white py-3 rounded font-bold hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Order (Coming Soon)'}
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

