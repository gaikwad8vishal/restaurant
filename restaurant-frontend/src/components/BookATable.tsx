
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BookTable() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: '',
    requests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      setFormData({ name: '', email: '', phone: '', date: '', time: '', partySize: '', requests: '' });
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
            SECURE YOUR JURASSIC TABLE
          </h1>
          <p className="text-amber-200 mt-4 text-lg flex justify-center items-center gap-3">
            <span className="text-2xl animate-pulse">🦖</span>
            <span>Reserve Your Spot for a Prehistoric Feast</span>
            <span className="text-2xl animate-pulse">🦕</span>
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="mb-12 rounded-xl overflow-hidden shadow-2xl border border-amber-600/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=6144&q=80"
            alt="Prehistoric Grill & Bar dining area"
            className="w-full h-96 object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Reservation Form and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Reservation Form */}
          <motion.div
            className="bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-amber-600/50"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-amber-400 font-[Cinzel] mb-6">
              BOOK YOUR TABLE
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
                <label htmlFor="date" className="block text-amber-200/80 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                  className="w-full px-4 py-2 bg-gray-800 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-amber-200/80 mb-2">
                  Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-required="true"
                >
                  <option value="">Select Time</option>
                  {['17:00', '18:00', '19:00', '20:00', '21:00'].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="partySize" className="block text-amber-200/80 mb-2">
                  Party Size
                </label>
                <select
                  id="partySize"
                  name="partySize"
                  value={formData.partySize}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-required="true"
                >
                  <option value="">Select Party Size</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                    <option key={size} value={size}>
                      {size} {size === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="requests" className="block text-amber-200/80 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="requests"
                  name="requests"
                  value={formData.requests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="E.g., near the T-Rex statue"
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
                    Booking...
                  </>
                ) : (
                  <>
                    Book Table <span className="ml-2">🦴</span>
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
                  Table booked! We'll confirm soon! 🦖
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



              {/* Restaurant Details - Enhanced Jurassic Experience */}
<motion.div
  className="bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-amber-600/50 relative overflow-hidden"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
>
  {/* Fossil Texture Background */}
  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/bone.png')] opacity-10 z-0"></div>
  
  {/* Amber Glow Effect */}
  <div className="absolute -right-20 -top-20 w-40 h-40 bg-amber-400/10 rounded-full filter blur-3xl"></div>

  <div className="relative z-10">
    <h2 className="text-3xl font-bold text-amber-400 font-[Cinzel] mb-6 flex items-center gap-3">
      <span className="text-4xl">🦖</span>
      JURASSIC EXPERIENCE
      <span className="text-4xl">🦕</span>
    </h2>

    {/* Interactive Map Section */}
    <div className="mb-8 group relative overflow-hidden rounded-lg border-2 border-amber-600/30">
    <img
  src="https://imgs.search.brave.com/-uLLx_nBOtUeekc7r4kPDxLNvNHwPAMQnngyFViABGw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc2ltcGxldmll/d2luYy5jb20vc2lt/cGxldmlldy9pbWFn/ZS91cGxvYWQvY19m/aWxsLGZfanBnLGhf/NDgwLHFfNjUsd182/NDAvdjEvY2xpZW50/cy9vcmxhbmRvZmwv/NjUxNl9leHRlcmlv/cjFfZjFjY2Q5ZWUt/OTgyNS00ODdkLWI5/ODgtMGEwMWY2ZDMy/ZmE0LmpwZw"
  alt="Dino Jungle Map"
  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
/>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
        <button className="flex items-center gap-2 text-amber-300 hover:text-amber-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          EXPLORE OUR TERRITORY
        </button>
      </div>
    </div>

    {/* Themed Contact Info */}
    <address className="text-amber-200/80 not-italic space-y-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="text-amber-400 mt-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p>123 Dino Lane<br/>Jurassic City, Costa Rica</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-amber-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <p>Emergency: <span className="text-amber-300">911-911-911</span></p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-amber-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p>Email: <span className="text-amber-300">hunt@prehistoricgrill.com</span></p>
      </div>
    </address>

    {/* Dining Hours with Dino Animation */}
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-amber-400 mb-3 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        HUNTING HOURS
      </h3>
      <ul className="text-amber-200/80 space-y-2">
        <li className="flex justify-between">
          <span>Mon–Thu:</span> 
          <span>5:00 PM – 10:00 PM</span>
        </li>
        <li className="flex justify-between">
          <span>Fri–Sat:</span> 
          <span className="text-amber-300">3:00 PM – 11:00 PM</span>
        </li>
        <li className="flex justify-between">
          <span>Sunday:</span> 
          <span>3:00 PM – 10:00 PM</span>
        </li>
      </ul>
    </div>

    {/* Special Notes */}
    <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-600/30">
      <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        SAFETY PROTOCOLS
      </h4>
      <ul className="text-amber-200/80 text-sm space-y-1">
        <li className="flex items-start gap-2">
          <span>⚡</span> Electric fences active after dark
        </li>
        <li className="flex items-start gap-2">
          <span>🦖</span> Do not feed the Velociraptors
        </li>
        <li className="flex items-start gap-2">
          <span>🚨</span> Emergency shelters in every dining area
        </li>
      </ul>
    </div>

    {/* Animated Dino Footer */}
    <div className="mt-6 flex justify-between items-center">
      <div className="text-amber-600 text-xs animate-pulse">
        *Parking available in the Brontosaurus lot
      </div>
      <div className="flex gap-1">
        <motion.span 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl"
        >
          🦖
        </motion.span>
        <motion.span 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="text-2xl"
        >
          🦕
        </motion.span>
      </div>
    </div>
  </div>
</motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-amber-400 font-[Cinzel] mb-6">
            READY TO FEAST?
          </h2>
          <p className="text-amber-200/80 mb-8">
            Explore our menu for a taste of the Mesozoic!
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