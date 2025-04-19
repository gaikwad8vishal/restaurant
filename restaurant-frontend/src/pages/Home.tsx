import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import MenuCard from '../components/menu/MenuCard';






// Featured dishes
const featuredDishes = [
  {
    id: '1',
    name: 'T-Rex Steak',
    description: 'A massive grilled steak with volcanic BBQ sauce.',
    price: 24.99,
    category: 'Carnivore Specials',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
    isBestSeller: true,
    spiceLevel: 'Volcanic',
  },
  {
    id: '2',
    name: 'Cretaceous Salad',
    description: 'Fresh greens with prehistoric herbs.',
    price: 12.99,
    category: 'Herbivore Selection',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    isVegan: true,
  },
];

// Hero slider images
const sliderImages: { url: string; alt: string; caption: string }[] = [
    {
      url: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      alt: 'Cozy Restaurant Interior',
      caption: 'Step into the Prehistoric Grill & Bar Experience',
    },
    {
      url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
      alt: 'Grilled Steak Dish',
      caption: 'Indulge in Our Signature T-Rex Steak',
    },
    {
      url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      alt: 'Elegant Dining Setup',
      caption: 'Dine Like a Dinosaur with Our Cretaceous Feast',
    },
  ];


// Memoized MenuCard
const MemoizedMenuCard = memo(MenuCard);

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [cursorTrails, setCursorTrails] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const trailIdRef = useRef(0);




    // fixes the issue of autopage by history
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);




  // Auto-rotate hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % sliderImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate featured dishes carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredDishes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Throttle function
  const throttle = <T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean = false;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  // Cursor trail handler
  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      const newTrail = {
        id: trailIdRef.current++,
        x: e.clientX,
        y: e.clientY,
      };
      setCursorTrails((prev) => [...prev, newTrail].slice(-10)); // Limit to 10 trails
      setTimeout(() => {
        setCursorTrails((prev) => prev.filter((trail) => trail.id !== newTrail.id));
      }, 800);
    }, 100),
    []
  );

  // Play sound effect
  const playRoar = useCallback(() => {
    if (isSoundEnabled) {
      const audio = new Audio('/dinosaur-roar.mp3');
      audio.play();
    }
  }, [isSoundEnabled]);


  //@ts-ignore
  // Add to cart handler
  const handleAddToCart = useCallback(async (cartItem: CartItem): Promise<void> => {
    console.log('Added to cart:', cartItem);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden font-[Cinzel] bg-black"
      onMouseMove={handleMouseMove}
    >

        
      {/* Cursor Trails */}
      {cursorTrails.map((trail) => (
        <motion.div
          key={trail.id}
          className="fixed w-6 h-6 text-amber-400 pointer-events-none z-[9999]"
          initial={{ opacity: 0.7, scale: 1, x: trail.x - 12, y: trail.y - 12 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.8 }}
        >
          
        </motion.div>
      ))}

      {/* Hero Slider */}
      <div className="relative h-screen w-full z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentHeroSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${sliderImages[currentHeroSlide].url})` }}
          >
            {/* Parallax Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              animate={{ y: [-20, 20] }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 10 }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10"></div>
            </motion.div>
            {/* Dinosaur Silhouette */}
            <motion.div
              className="absolute bottom-0 right-0 opacity-20"
              animate={{ x: [-50, 50] }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 15 }}
            >
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-400">
                <path d="M12 2c-2 0-4 1-4 3s1 3 3 3 3-1 3-3-2-3-2-3z" />
                <path d="M17 6s-1-1-3-1-3 1-3 1-1 1-1 2 1 2 1 2" />
                <path d="M16 10s1 1 1 2-1 2-1 2" />
                <path d="M8 10s-1 1-1 2 1 2 1 2" />
                <path d="M7 18s-1-1-1-2 1-2 1-2" />
                <path d="M16 18s1-1 1-2-1-2-1-2" />
                <path d="M12 22v-6" />
              </svg>
            </motion.div>
            {/* Caption */}
            <motion.div
              className="absolute bottom-16 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-3xl md:text-4xl text-amber-200 font-semibold tracking-wider bg-black/50 px-6 py-3 rounded-lg">
                {sliderImages[currentHeroSlide].caption}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {/* Slider Controls */}
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-amber-600 text-black p-3 rounded-full z-10 shadow-lg"
            aria-label="Previous slide"
            >
            <FiArrowLeft size={24} />
            </motion.button>
            <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % sliderImages.length)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-amber-600 text-black p-3 rounded-full z-10 shadow-lg"
            aria-label="Next slide"
            >
            <FiArrowRight size={24} />
        </motion.button>
        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
          {sliderImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentHeroSlide(index)}
              className={`w-4 h-4 rounded-full ${
                index === currentHeroSlide ? 'bg-amber-400' : 'bg-amber-200/50'
              }`}
              whileHover={{ scale: 1.5 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 py-16 px-4 max-w-7xl mx-auto text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 md:mb-16 border-4 border-amber-400 p-8 md:p-12 bg-black/80 backdrop-blur-md rounded-xl shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-electric-pulse"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-electric-pulse delay-100"></div>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-electric-pulse-vertical"></div>
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-electric-pulse-vertical delay-100"></div>
          </div>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 tracking-wider leading-tight animate-text-glow"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            PREHISTORIC
          </motion.h1>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 tracking-wide"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            GRILL & BAR
          </motion.h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-amber-300 mb-12 flex items-center gap-4 justify-center"
        >
          <motion.span
            className="text-4xl"
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🦖
          </motion.span>
          <span className="text-shadow-lg shadow-black/50 font-medium tracking-wider">
            "WHERE CARNIVORES FEAST LIKE KINGS"
          </span>
          <motion.span
            className="text-4xl"
            animate={{ rotate: [10, -10, 10] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            🦕
          </motion.span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <motion.a
            href="/menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onMouseEnter={playRoar}
              className="relative bg-amber-600 hover:bg-amber-700 text-black font-bold px-10 py-5 text-xl rounded-lg border-2 border-amber-400 group overflow-hidden transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
            >
              <span className="relative z-10 flex items-center gap-3">
                EXPLORE OUR MENU
                <FiArrowRight className="w-6 h-6 group-hover:animate-bounce" />
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-400/50 via-amber-400/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              />
              <motion.span
                className="absolute -bottom-6 -right-6 text-5xl opacity-0 group-hover:opacity-30"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1 }}
              >
                🦖
              </motion.span>
            </button>
          </motion.a>
          <motion.a
            href="/reservations"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="relative bg-transparent border-2 border-amber-400 text-amber-400 font-bold px-10 py-5 text-xl rounded-lg group overflow-hidden transition-all duration-300 shadow-lg hover:bg-amber-400 hover:text-black">
              <span className="relative z-10 flex items-center gap-3">
                BOOK A TABLE
                <FiArrowRight className="w-6 h-6 group-hover:animate-bounce" />
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-amber-400/10 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              />
            </button>
          </motion.a>
        </motion.div>

          



        {/* About Section */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.8 }}
  className="mt-16 w-full max-w-4xl mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] text-center"
>
  <div>
    <h3 className="text-4xl font-bold text-amber-400 mb-8">Our Story</h3>
    <p className="text-amber-200 text-lg leading-relaxed bg-black/50 p-6 rounded-lg">
      Step into Prehistoric Grill & Bar, where the Cretaceous era roars to life! Our chefs harness the raw, untamed flavors of the dinosaur age, crafting dishes that ignite your senses in an atmosphere pulsing with primal adventure.
    </p>
  </div>
</motion.div>

        {/* Social Proof */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1 }}
  className="mt-16 w-full max-w-4xl mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] text-center"
>
  <div>
    <h3 className="text-4xl font-bold text-amber-400 mb-8">What Dinosaurs Say</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        className="p-6 bg-black/80 backdrop-blur-md rounded-lg border border-amber-600/50"
        whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(245, 158, 11, 0.3)' }}
      >
        <p className="text-amber-200 italic text-lg">"The T-Rex Steak was a roaring triumph!"</p>
        <div className="flex gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-amber-400" />
          ))}
        </div>
        <p className="text-amber-300 text-sm mt-3">— BlackPanther</p>
      </motion.div>
      <motion.div
        className="p-6 bg-black/80 backdrop-blur-md rounded-lg border border-amber-600/50"
        whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(245, 158, 11, 0.3)' }}
      >
        <p className="text-amber-200 italic text-lg">"Volcanic drinks that shake the Mesozoic!"</p>
        <div className="flex gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-amber-400" />
          ))}
        </div>
        <p className="text-amber-300 text-sm mt-3">— KillMonger</p>
      </motion.div>
    </div>
  </div>
</motion.div>
{/* Warning Marquee */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 1.2 }}
  className="mt-16 w-full overflow-hidden bg-gradient-to-r from-black/80 to-amber-900/50 py-2"
>
  <div className="animate-marquee whitespace-nowrap text-amber-300/90 font-bold text-xl md:text-2xl tracking-widest flex items-center space-x-6">
    <motion.span
      className="text-red-500 mr-6 text-3xl md:text-4xl"
      animate={{ 
        opacity: [1, 0.3, 1], 
        scale: [1, 1.2, 1], 
        rotate: [0, -5, 5, 0]
      }}
      transition={{ duration: 0.8, repeat: Infinity }}
    >
      ⚠️
    </motion.span>
    <span>
      DANGER • CARNIVORES PRESENT • DO NOT FEED THE RAPTORS • ELECTRIC FENCES ACTIVE •
      <motion.span
        className="text-red-500 ml-6 text-3xl md:text-4xl"
        animate={{ 
          opacity: [1, 0.3, 1], 
          scale: [1, 1.2, 1], 
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
      >
        ⚠️
      </motion.span>
    </span>
    <span aria-hidden="true">
      DANGER • CARNIVORES PRESENT • DO NOT FEED THE RAPTORS • ELECTRIC FENCES ACTIVE •
    </span>
  </div>
</motion.div>


        {/* Sound Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          className="fixed bottom-6 right-6 bg-amber-600 text-black p-4 rounded-full shadow-lg hover:bg-amber-700"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isSoundEnabled ? 'Disable sound' : 'Enable sound'}
        >
          {isSoundEnabled ? '🔊' : '🔇'}
        </motion.button>

        {/* Particle Animations */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

     {/* Preload Images */}
        <link rel="preload" href="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920" as="image" />
        <link rel="preload" href="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920" as="image" />
        <link rel="preload" href="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920" as="image" />

      {/* Styles */}
<style jsx global>{`
  @keyframes electric-pulse {
    0% { opacity: 0; transform: scaleX(0) translateX(-10px); }
    50% { opacity: 1; transform: scaleX(1.2) translateX(0); }
    100% { opacity: 0; transform: scaleX(0) translateX(10px); }
  }
  @keyframes electric-pulse-vertical {
    0% { opacity: 0; transform: scaleY(0) translateY(-10px); }
    50% { opacity: 1; transform: scaleY(1.2) translateY(0); }
    100% { opacity: 0; transform: scaleY(0) translateY(10px); }
  }
  @keyframes text-glow {
    0%, 100% { text-shadow: 0 0 10px rgba(245, 158, 11, 0), 0 0 20px rgba(255, 69, 0, 0); }
    50% { text-shadow: 0 0 30px rgba(245, 158, 11, 0.8), 0 0 40px rgba(255, 69, 0, 0.5); }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  .animate-electric-pulse {
    animation: electric-pulse 1.5s infinite;
    position: relative;
    z-index: 1;
  }
  .animate-electric-pulse-vertical {
    animation: electric-pulse-vertical 1.5s infinite;
    position: relative;
    z-index: 1;
  }
  .animate-text-glow {
    animation: text-glow 2.5s infinite;
    color: #f7c948;
  }
  .animate-marquee {
    animation: marquee 15s linear infinite;
    display: inline-block;
    white-space: nowrap;
  }
  /* Additional enhancement for prehistoric vibe */
  .pre-historic-bg {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(50, 20, 10, 0.5)), url('https://www.transparenttextures.com/patterns/rock-wall.png');
  }
`}</style>
    </div>
  );
}