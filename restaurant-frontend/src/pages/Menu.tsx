import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowUp } from "react-icons/fi";
import MenuCard from "../components/menu/MenuCard";
import menuItems from "../data/menuItems.json";

interface MenuItem {
  id: number | string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg?: boolean;
  isVegan?: boolean;
  isBestSeller?: boolean;
  spiceLevel?: "Mild" | "Medium" | "Hot" | "Volcanic";
  isCarnivoreSpecial?: boolean;
}

interface FilterOptions {
  category: string;
  dietary: string[];
  spiceLevel: string[];
  specials: string[];
  search: string;
}

export default function Menu() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    dietary: [],
    spiceLevel: [],
    specials: [],
    search: "",
  });
  const [showFilters, setShowFilters] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const allCategories = [
    "All",
    "Carnivore Specials",
    "Herbivore Selection",
    "Primordial Appetizers",
    "Stone Age Desserts",
    "Volcanic Drinks",
  ];
  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free"];
  const spiceLevels = ["Mild", "Medium", "Hot", "Volcanic"];
  const specialOptions = ["Dino Bones", "Meteor Impact", "Fossil Find"];

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch = filters.category === "All" || item.category === filters.category;
    const dietaryMatch =
      filters.dietary.length === 0 ||
      (filters.dietary.includes("Vegetarian") && item.isVeg) ||
      (filters.dietary.includes("Vegan") && item.isVegan) ||
      (filters.dietary.includes("Gluten-Free") && item.dietaryTags?.includes("Gluten-Free"));
    const spiceMatch =
      filters.spiceLevel.length === 0 ||
      (item.spiceLevel && filters.spiceLevel.includes(item.spiceLevel));
    const specialMatch =
      filters.specials.length === 0 ||
      (item.isBestSeller && filters.specials.includes("Dino Bones")) ||
      (item.isCarnivoreSpecial && filters.specials.includes("Meteor Impact")) ||
      (item.isBestSeller && filters.specials.includes("Fossil Find"));
    const searchMatch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.description.toLowerCase().includes(filters.search.toLowerCase());

    return categoryMatch && dietaryMatch && spiceMatch && specialMatch && searchMatch;
  });

  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    setFilters((prev) => {
      if (filterType === "category") {
        return { ...prev, category: value };
      } else if (filterType === "search") {
        return { ...prev, search: value };
      } else {
        const currentFilters = [...prev[filterType]];
        const index = currentFilters.indexOf(value);
        if (index === -1) {
          currentFilters.push(value);
        } else {
          currentFilters.splice(index, 1);
        }
        return { ...prev, [filterType]: currentFilters };
      }
    });
  };



  
  const handleAddToCart = async (cartItem: MenuItem & { quantity: number }) => {
    console.log("Added to cart:", cartItem);``
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async
  };



  // fixes the issue of autopage by history
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

    // Scroll event to show/hide Back to Top button and Filters
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      setShowFilters(window.scrollY < 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-amber-100 py-16 relative overflow-hidden">
      {/* Animated Background (Fog Effect) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="animate-fog w-full h-full bg-gradient-to-r from-gray-800/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 border-b-4 border-amber-600 pb-6"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-amber-400 font-[Cinzel] tracking-widest drop-shadow-lg">
            PREHISTORIC FEAST
          </h2>
          <p className="text-amber-200 mt-3 text-lg flex justify-center items-center gap-3">
            <span className="text-2xl animate-pulse">🦖</span>
            <span>"Roar into Flavor with Dino-Sized Delights"</span>
            <span className="text-2xl animate-pulse">🦕</span>
          </p>
        </motion.div>

        {/* Sticky Filter Bar */}
        <motion.div
          animate={{ y: showFilters ? 0 : -100, opacity: showFilters ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="sticky top-0 z-20 bg-black/95 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-amber-600/50 mb-8"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" size={20} />
              <input
                type="text"
                placeholder="Search for dino-delicacies..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-amber-100 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Search menu items"
              />
            </div>
          </div>

          {/* Filter Categories */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-amber-400 text-lg tracking-wide">HUNTING GROUNDS</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {allCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleFilterChange("category", category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    filters.category === category
                      ? "bg-gradient-to-r from-amber-500 to-red-600 text-black shadow-lg shadow-amber-500/50"
                      : "bg-amber-900/70 text-amber-200 hover:bg-amber-800"
                  }`}
                  aria-pressed={filters.category === category}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Filter Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-amber-400 text-lg tracking-wide">DIETARY PREFERENCES</h3>
              <div className="space-y-3">
                {dietaryOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.dietary.includes(option)}
                      onChange={() => handleFilterChange("dietary", option)}
                      className="rounded text-amber-500 focus:ring-amber-500 focus:ring-offset-gray-900"
                      aria-label={`Filter by ${option}`}
                    />
                    <span className="text-amber-200">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-amber-400 text-lg tracking-wide">SPICE LEVEL</h3>
              <div className="space-y-3">
                {spiceLevels.map((level) => (
                  <label key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.spiceLevel.includes(level)}
                      onChange={() => handleFilterChange("spiceLevel", level)}
                      className="rounded text-amber-500 focus:ring-amber-500 focus:ring-offset-gray-900"
                      aria-label={`Filter by ${level} spice level`}
                    />
                    <span className="text-amber-200">{level}</span>
                    {level === "Volcanic" && <span className="text-xs text-amber-400 animate-pulse">🔥🔥</span>}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-amber-400 text-lg tracking-wide">SPECIAL MARKS</h3>
              <div className="space-y-3">
                {specialOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.specials.includes(option)}
                      onChange={() => handleFilterChange("specials", option)}
                      className="rounded text-amber-500 focus:ring-amber-500 focus:ring-offset-gray-900"
                      aria-label={`Filter by ${option}`}
                    />
                    <span className="text-amber-200">{option}</span>
                    {option === "Dino Bones" && <span className="text-xs text-amber-400">🦴</span>}
                    {option === "Meteor Impact" && <span className="text-xs text-amber-400">☄️</span>}
                    {option === "Fossil Find" && <span className="text-xs text-amber-400">🦖</span>}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-amber-200 font-medium flex items-center bg-black/50 backdrop-blur-sm p-4 rounded-xl"
        >
          <span className="bg-amber-500 text-black px-4 py-1 rounded-full mr-3 font-bold">
            {filteredItems.length}
          </span>
          {filteredItems.length === 1 ? "FOSSIL FOUND" : "FOSSILS DISCOVERED"}
          {filteredItems.length > 0 && (
            <button
              onClick={() =>
                setFilters({
                  category: "All",
                  dietary: [],
                  spiceLevel: [],
                  specials: [],
                  search: "",
                })
              }
              className="ml-auto text-amber-400 hover:text-amber-300 text-sm flex items-center transition-colors"
            >
              CLEAR DIG SITE
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </motion.div>

        {/* Menu Items Grid */}
        <AnimatePresence>
          {filteredItems.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <MenuCard
                    item={item}
                    onAddToCart={handleAddToCart}
                    theme="prehistoric"
                    className="border-amber-600/30 hover:border-amber-500 transition-all"
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 bg-black/50 backdrop-blur-md rounded-xl border-2 border-dashed border-amber-600"
            >
              <div className="text-7xl mb-6 animate-bounce">🦴</div>
              <h3 className="text-2xl font-medium text-amber-200 mb-4">
                NO FOSSILS UNEARTHED IN THIS DIG SITE
              </h3>
              <p className="text-amber-400 mb-6">Try adjusting your filters or explore all grounds!</p>
              <button
                onClick={() =>
                  setFilters({
                    category: "All",
                    dietary: [],
                    spiceLevel: [],
                    specials: [],
                    search: "",
                  })
                }
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-red-600 text-black rounded-full font-semibold hover:from-amber-600 hover:to-red-700 transition-all flex items-center mx-auto shadow-lg shadow-amber-500/50"
              >
                EXPLORE ALL GROUNDS
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 bg-amber-500 text-black p-4 rounded-full shadow-lg hover:bg-amber-600 transition-all"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={24} />
          </motion.button>
        )}
      </div>

      {/* Custom CSS for Fog Animation */}
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