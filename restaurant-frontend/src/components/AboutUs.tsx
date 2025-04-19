
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function About() {



// fixes the issue of autopage by history
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


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
            OUR JURASSIC LEGACY
          </h1>
          <p className="text-amber-200 mt-4 text-lg flex justify-center items-center gap-3">
            <span className="text-2xl animate-pulse">🦖</span>
            <span>Unearthing Epic Feasts Since the Cretaceous</span>
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
            src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg"
            alt="Prehistoric Grill & Bar interior with dinosaur decor"
            className="w-full h-96 object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* History Section */}
        <motion.div
          className="mb-12 bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-amber-600/50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-amber-400 font-[Cinzel] mb-6">
            A TALE OF FIRE AND FOSSILS
          </h2>
          <p className="text-amber-200/80 mb-4">
            Welcome to the Prehistoric Grill & Bar, where the spirit of the Mesozoic era roars to life! Founded in the heart of Jurassic City, our story began when a rogue paleontologist and a fiery chef unearthed a secret: the ancient art of grilling dino-sized feasts. Armed with primal recipes and a passion for flavor, they built a haven for carnivores, herbivores, and adventurers alike.
          </p>
          <p className="text-amber-200/80 mb-4">
            Nestled at 123 Dino Lane, our restaurant is a tribute to the giants that once roamed the Earth. From T-Rex-sized burgers to volcanic drinks that erupt with flavor, every dish is crafted to transport you back to a time when survival meant savoring the moment. Our electric fences keep the raptors at bay, but the real magic happens at your table.
          </p>
          <p className="text-amber-200/80">
            Join us to feast like kings, where every bite is a step back in time. But beware: never feed the dinosaurs!
          </p>
          <div className="mt-4 flex gap-2">
            <span className="text-2xl">🦴</span>
            <span className="text-2xl">🍖</span>
            <span className="text-2xl">🔥</span>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-amber-400 font-[Cinzel] mb-8 text-center">
            OUR EPOCHAL JOURNEY
          </h2>
          <div className="space-y-8">
            {[
              {
                year: '65M BC',
                title: 'The Spark of Flavor',
                desc: 'A meteor crash ignites the first primal grill, as early chefs discover fire-roasted delights.',
              },
              {
                year: '1993',
                title: 'Jurassic Revival',
                desc: 'Inspired by Jurassic Park, our founders unearth ancient recipes and open the first Prehistoric Grill.',
              },
              {
                year: '2000',
                title: 'Dino-Sized Expansion',
                desc: 'The Grill grows into a legendary bar, adding volcanic drinks and herbivore specials.',
              },
              {
                year: '2025',
                title: 'A Modern Feast',
                desc: 'Now a Jurassic City landmark, we serve epic feasts with cutting-edge flair.',
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-amber-600/50"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-amber-500 font-bold text-lg font-[Cinzel] min-w-[100px]">
                  {event.year}
                </div>
                <div>
                  <h3 className="text-amber-400 font-semibold mb-2">{event.title}</h3>
                  <p className="text-amber-200/80">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-amber-400 font-[Cinzel] mb-6">
            READY TO ROAR?
          </h2>
          <p className="text-amber-200/80 mb-8">
            Dive into our menu and unearth your next favorite dish!
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
