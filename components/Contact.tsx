import { config } from '@/lib/config';

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl text-primary-500 mb-6 pb-2 border-b-4 border-primary-300">
        Contact Us
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-2 text-lg"><strong>Email:</strong> <a href={`mailto:${config.email}`} className="text-primary-500 font-bold hover:underline">{config.email}</a></p>
        <p className="mb-2 text-lg"><strong>Phone:</strong> <a href={`sms:${config.phone.replace(/\D/g, '')}`} className="text-primary-500 font-bold hover:underline">{config.phone}</a></p>
        <p className="mb-2 text-lg"><strong>Venmo:</strong> {config.venmo}</p>
      </div>
    </section>
  );
}

