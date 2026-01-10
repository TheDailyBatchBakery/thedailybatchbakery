'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function Navigation() {
  const { user, clearUser } = useUserStore();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const isLoggedIn = user !== null;

  return (
    <>
      <nav className="bg-primary-500 flex justify-center gap-8 p-4 sticky top-0 z-50 shadow-md flex-wrap">
        <Link href="#about" className="text-white font-bold px-4 py-2 rounded transition hover:bg-white/20 hover:-translate-y-0.5">
          About
        </Link>
        <Link href="#menu" className="text-white font-bold px-4 py-2 rounded transition hover:bg-white/20 hover:-translate-y-0.5">
          Products
        </Link>
        <Link href="#order" className="text-white font-bold px-4 py-2 rounded transition hover:bg-white/20 hover:-translate-y-0.5">
          Order
        </Link>
        <Link href="#contact" className="text-white font-bold px-4 py-2 rounded transition hover:bg-white/20 hover:-translate-y-0.5">
          Contact
        </Link>
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="text-white font-bold px-4 py-2 rounded transition hover:bg-white/20 hover:-translate-y-0.5"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="text-white font-bold px-4 py-2 rounded transition hover:bg-white/20 hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            onClick={clearUser}
            className="text-white font-bold px-4 py-2 rounded transition hover:bg-white/20 hover:-translate-y-0.5"
          >
            Logout
          </button>
        )}
      </nav>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </>
  );
}

