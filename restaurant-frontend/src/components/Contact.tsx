
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call (replace with actual API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-amber-100 py-16 relative overflow-hidden">
      {/* Fog Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="animate-fog w-full h-full bg-gradient-to-r from-gray-800/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 border-b-4 border-amber-600 pb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-amber-400 font-[Cinzel] tracking-widest drop-shadow-lg">
            UNLEASH YOUR ROAR
          </h1>
          <p className="text-amber-200 mt-4 text-lg flex justify-center items-center gap-3">
            <span className="text-2xl animate-pulse">🦖</span>
            <span>Contact the Jurassic Feast Masters</span>
            <span className="text-2xl animate-pulse">🦕</span>
          </p>
        </motion.div>

        {/* Contact Form and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            className="bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-amber-600/50"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-amber-400 font-[Cinzel] mb-6">
              SEND A SIGNAL
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-amber-200/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your Name"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-amber-200/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your Email"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-amber-200/80 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your Phone"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-amber-200/80 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-gray-800 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your Message"
                  aria-required="true"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-8 py-3 bg-gradient-to-r from-amber-500 to-red-600 text-black font-semibold rounded-lg shadow-lg transition-all ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-amber-600 hover:to-red-700 hover:scale-105'
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <span className="ml-2">🦴</span>
                  </>
                )}
              </motion.button>
              {submitStatus === 'success' && (
                <motion.p
                  className="text-amber-400 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Message sent! Our team will roar back soon! 🦖
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  className="text-red-500 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Oops! Something went wrong. Try again later.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Details and Map */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Contact Details */}
            <div className="bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-amber-600/50">
              <h2 className="text-3xl font-bold text-amber-400 font-[Cinzel] mb-6">
                JURASSIC OUTPOST
              </h2>
              <address className="text-amber-200/80 not-italic space-y-2">
                <p>123 Dino Lane, Jurassic City</p>
                <p>Emergency: +1-800-DINO-HELP</p>
                <p>Email: info@prehistoricgrill.com</p>
                <p className="mt-4 text-xs text-amber-600 animate-pulse">
                  *Beware of roaming raptors. Electric fences active 24/7
                </p>
              </address>
              <div className="mt-4 flex gap-2">
                <span className="text-2xl">🦖</span>
                <span className="text-2xl">🦕</span>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-amber-600/50">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">
                FIND OUR LAIR
              </h3>
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg border border-amber-600/50">
                <img
                  src="https://images.pexels.com/photos/208662/pexels-photo-208662.jpeg"
                  alt="Map of Jurassic City"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-amber-200/80 text-sm mt-4">
                Located in the heart of Jurassic City, just past the T-Rex Gate.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-amber-400 font-[Cinzel] mb-6">
            HUNGRY FOR MORE?
          </h2>
          <p className="text-amber-200/80 mb-8">
            Explore our menu and unleash your inner carnivore!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-red-600 text-black font-semibold rounded-full shadow-lg hover:from-amber-600 hover:to-red-700 transition-all transform hover:scale-105"
          >
            Explore the Menu
            <span className="ml-2">🦖</span>
          </Link>
        </motion.div>
      </div>

      {/* Fog Animation CSS */}
      <style>{`
        @keyframes fog {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-fog {
          animation: fog 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
