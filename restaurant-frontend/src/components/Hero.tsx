import { Link } from "react-router-dom";
export default function Hero() {


    return (
      <section className="relative h-[70vh] bg-[url('/images/hero-bg.jpg')] bg-cover bg-center flex items-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Authentic Indian Cuisine</h1>
          <p className="text-xl md:text-2xl mb-8">Experience the taste of traditional spices</p>
          <div className="space-x-4">
            <Link to="/menu" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105">
              View Menu
            </Link>
            <Link to="/reservation" className="inline-block border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-full transition">
              Book Table
            </Link>
          </div>
        </div>
      </section>
    );
  }