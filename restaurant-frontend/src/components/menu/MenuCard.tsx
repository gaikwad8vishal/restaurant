import { useState } from 'react';
import { FiPlus, FiMinus, FiShoppingCart, FiInfo } from 'react-icons/fi';
import { FaPepperHot } from 'react-icons/fa';
import { MenuCardProps } from './types/menu';

export default function MenuCard({
  item,
  onAddToCart,
  persistQuantity = false,
  fallbackImage = '/fallback-food.jpg',
  addButtonLabel,
  quickAddButtonLabel,
  className = '',
  theme = 'prehistoric',
  size = 'medium',
  maxDescriptionLines = 3,
}: MenuCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await onAddToCart({ ...item, quantity });
      if (!persistQuantity) {
        setQuantity(1);
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuickAdd = async () => {
    setIsAdding(true);
    try {
      await onAddToCart({ ...item, quantity: 1 });
    } finally {
      setIsAdding(false);
    }
  };

  const getSpiceIconCount = () => {
    switch (item.spiceLevel) {
      case 'Hot': return 3;
      case 'Medium': return 2;
      case 'Mild': return 1;
      case 'Volcanic': return 4;
      default: return 0;
    }
  };

  // Determine card dimensions based on size prop
  const sizeStyles = {
    small: 'min-h-[450px] max-w-[320px]',
    medium: 'min-h-[550px] max-w-[384px]',
    large: 'min-h-[650px] max-w-[448px]',
  };

  // Theme-specific styles
  const themeStyles = {
    prehistoric: 'bg-black/80 backdrop-blur-sm border-amber-600/50 text-amber-200',
    modern: 'bg-white border-gray-200 text-gray-800',
    minimal: 'bg-gray-100 border-transparent text-gray-700',
  };

  return (
    <div
      className={`w-full mx-auto rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border flex flex-col ${sizeStyles[size]} ${themeStyles[theme]} ${className}`}
    >
      {/* Image Section - Fixed Aspect Ratio */}
      <div className="relative h-48 w-full overflow-hidden group">
        <img
          src={item.image || fallbackImage}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => (e.currentTarget.src = fallbackImage)}
        />
        {/* Category Badge */}
        <span
          className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full shadow-md ${
            theme === 'prehistoric'
              ? 'bg-gradient-to-r from-amber-500 to-red-600 text-black'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {item.category}
        </span>
        {/* Best Seller Badge */}
        {item.isBestSeller && (
          <span
            className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse ${
              theme === 'prehistoric' ? 'bg-yellow-400 text-yellow-900' : 'bg-yellow-200 text-yellow-800'
            }`}
          >
            🔥 Best Seller
          </span>
        )}
        {/* Quick Info Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`absolute bottom-4 right-4 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all ${
            theme === 'prehistoric' ? 'bg-amber-900/80 backdrop-blur-sm hover:bg-amber-800' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          aria-label={`Toggle details for ${item.name}`}
        >
          <FiInfo size={18} className={theme === 'prehistoric' ? 'text-amber-200' : 'text-gray-700'} />
        </button>
      </div>

      {/* Details Section - Flexible but Constrained */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3
            className={`text-xl font-bold font-[Cinzel] truncate ${
              theme === 'prehistoric' ? 'text-amber-200' : 'text-gray-800'
            }`}
          >
            {item.name}
          </h3>
          <p
            className={`font-semibold text-lg ${
              theme === 'prehistoric' ? 'text-amber-400' : 'text-gray-600'
            }`}
          >
            ${item.price.toFixed(2)}
          </p>
        </div>

        {/* Description with Expandable Details */}
        <p
          className={`text-sm mb-4 transition-all duration-300 ${
            showDetails ? 'line-clamp-none' : `line-clamp-${maxDescriptionLines}`
          } ${theme === 'prehistoric' ? 'text-amber-300' : 'text-gray-600'}`}
        >
          {item.description}
        </p>

        {/* Veg/Non-Veg and Spice Level */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full mr-2 ${
                item.isVeg ? 'bg-green-500' : item.isVegan ? 'bg-lime-500' : 'bg-red-500'
              }`}
            ></div>
            <span className={`text-xs ${theme === 'prehistoric' ? 'text-amber-300' : 'text-gray-600'}`}>
              {item.isVegan ? 'Vegan' : item.isVeg ? 'Veg' : 'Non-Veg'}
            </span>
          </div>
          {item.spiceLevel && (
            <div className="flex items-center">
              {Array(getSpiceIconCount())
                .fill(0)
                .map((_, i) => (
                  <FaPepperHot key={i} size={14} className="text-red-500 mr-1" />
                ))}
              <span className={`text-xs ${theme === 'prehistoric' ? 'text-amber-300' : 'text-gray-600'}`}>
                {item.spiceLevel}
              </span>
            </div>
          )}
        </div>

        {/* Dietary Tags */}
        {item.dietaryTags && item.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.dietaryTags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs font-medium px-2.5 py-1 rounded-full shadow-sm ${
                  theme === 'prehistoric' ? 'bg-amber-900/50 text-amber-200' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Spacer to Push Buttons to Bottom */}
        <div className="flex-1"></div>

        {/* Quantity Selector and Buttons */}
        <div className="flex items-center justify-between gap-4">
          <div
            className={`flex items-center border rounded-xl shadow-sm ${
              theme === 'prehistoric' ? 'border-amber-600/50 bg-black/50' : 'border-gray-200 bg-white'
            }`}
          >
            <button
              onClick={handleDecrement}
              className={`px-4 py-2 transition-all rounded-l-xl ${
                quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-50'
              } ${theme === 'prehistoric' ? 'text-amber-200 hover:bg-amber-900/50' : 'text-gray-600 hover:bg-gray-100'}`}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <FiMinus size={16} />
            </button>
            <span
              className={`px-4 py-2 font-medium w-12 text-center ${
                theme === 'prehistoric' ? 'text-amber-200' : 'text-gray-800'
              }`}
            >
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className={`px-4 py-2 transition-all rounded-r-xl ${
                theme === 'prehistoric' ? 'text-amber-200 hover:bg-amber-900/50' : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Increase quantity"
            >
              <FiPlus size={16} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center font-semibold py-3 px-4 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 ${
              theme === 'prehistoric'
                ? 'bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-black'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            disabled={isAdding}
            aria-label={`Add ${item.name} to cart with quantity ${quantity}`}
          >
            {isAdding ? (
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <FiShoppingCart className="mr-2" size={18} />
            )}
            {isAdding ? 'Adding...' : (addButtonLabel || `Add ${quantity > 1 ? `(${quantity})` : ''}`)}
          </button>

          {/* Quick Add Button */}
          
        </div>
      </div>
    </div>
  );
}