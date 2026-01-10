'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/userStore';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement API call to create user
      // const response = await fetch('/api/users', { ... });
      console.log('Signup not yet fully implemented');
      setError('Signup functionality coming soon');
    } catch (err) {
      setError('Unable to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-md w-full my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-primary-500 mb-4">Create Account</h2>
        <p className="mb-4 text-gray-600">
          Please sign up to place an order. We only deliver to Las Vegas, Nevada.
        </p>

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border-2 border-primary-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border-2 border-primary-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3 border-2 border-primary-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Zip Code *</label>
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              pattern="[0-9]{5}"
              maxLength={5}
              required
              className="w-full p-3 border-2 border-primary-300 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-500 text-white py-3 rounded font-bold hover:bg-primary-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

