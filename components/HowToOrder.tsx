import { config } from '@/lib/config';

export default function HowToOrder() {
  return (
    <section id="order" className="py-16 px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl text-primary-500 mb-6 pb-2 border-b-4 border-primary-300">
        How to Order
      </h2>
      <div className="space-y-4 text-lg">
        <p><strong>Step 1:</strong> Create an account by clicking "Sign Up" (we only deliver to Las Vegas, Nevada)</p>
        <p><strong>Step 2:</strong> Browse our products and add items to your cart</p>
        <p><strong>Step 3:</strong> Click the cart icon and proceed to checkout</p>
        <p><strong>Step 4:</strong> Select pickup or delivery, choose your date and time, then submit your order</p>
        <p className="mt-4">You&apos;ll receive a confirmation text with pickup details or delivery information.</p>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <p className="mb-2"><strong>Email:</strong> <a href={`mailto:${config.email}`} className="text-primary-500 font-bold hover:underline">{config.email}</a></p>
          <p className="mb-2"><strong>Text:</strong> <a href={`sms:${config.phone.replace(/\D/g, '')}`} className="text-primary-500 font-bold hover:underline">{config.phone}</a></p>
        </div>
        <p className="mt-6"><strong>Delivery:</strong> Orders can be picked up in person or delivered. Delivery fee is ${config.delivery_fee.toFixed(2)}. Free delivery for orders over ${config.free_delivery_threshold.toFixed(2)}! Minimum order of ${config.min_delivery_order.toFixed(2)} for delivery. Minimum {config.min_advance_days} days advance notice required.</p>
      </div>
    </section>
  );
}

