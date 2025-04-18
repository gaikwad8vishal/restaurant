import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="bg-black shadow-xl sticky top-0 z-50 border-b-4 border-amber-600">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-3xl font-bold text-amber-400 font-[Cinzel] tracking-wider">DINO</h1>
          <span className="ml-2 text-xl font-bold text-amber-400 font-[Cinzel] tracking-wider">PREHISTORIC</span>
        </Link>

        {/* Desktop Menu - Jurassic Park Style */}
        <div className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className="text-amber-200 hover:text-amber-500 font-medium transition relative group"
          >
            HOME
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link 
            to="/menu" 
            className="text-amber-200 hover:text-amber-500 font-medium transition relative group"
          >
            MENU
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link 
            to="/about" 
            className="text-amber-200 hover:text-amber-500 font-medium transition relative group"
          >
            OUR HISTORY
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link 
            to="/contact" 
            className="text-amber-200 hover:text-amber-500 font-medium transition relative group"
          >
            EXPEDITION
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Menu Button - Dino themed */}
        <button className="md:hidden text-amber-400 focus:outline-none">
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🦖</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </button>
      </div>

      {/* Mobile Menu (Hidden by default) - Prehistoric Theme */}
      <div className="md:hidden bg-black py-2 px-4 space-y-2 hidden border-t border-amber-800">
        <Link to="/" className="block py-3 text-amber-200 hover:text-amber-500 border-b border-amber-900">
          <span className="mr-2">🏠</span> HOME
        </Link>
        <Link to="/menu" className="block py-3 text-amber-200 hover:text-amber-500 border-b border-amber-900">
          <span className="mr-2">🍖</span> MENU
        </Link>
        <Link to="/about" className="block py-3 text-amber-200 hover:text-amber-500 border-b border-amber-900">
          <span className="mr-2">🦴</span> OUR HISTORY
        </Link>
        <Link to="/contact" className="block py-3 text-amber-200 hover:text-amber-500">
          <span className="mr-2">📡</span> EXPEDITION
        </Link>
      </div>
    </nav>
  );
}