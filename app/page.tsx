'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import HowToOrder from '@/components/HowToOrder';
import Contact from '@/components/Contact';
import CartSidebar from '@/components/CartSidebar';
import UserStatusIndicator from '@/components/UserStatusIndicator';
import CartIcon from '@/components/CartIcon';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Navigation />
      <UserStatusIndicator />
      <CartIcon />
      <Hero />
      <About />
      <Products />
      <HowToOrder />
      <Contact />
      <CartSidebar />
      <Footer />
    </main>
  );
}

