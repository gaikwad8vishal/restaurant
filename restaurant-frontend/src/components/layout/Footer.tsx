import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black text-amber-100 pt-12 pb-6 border-t-4 border-amber-800 relative overflow-hidden">
      {/* Fog Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="animate-fog w-full h-full bg-gradient-to-r from-gray-800/50 to-transparent" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <motion.h3
              className="text-xl font-bold mb-4 text-amber-500 font-[Cinzel] tracking-wider"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              PREHISTORIC GRILL & BAR
            </motion.h3>
            <motion.p
              className="text-amber-200/80 bg-black/60 p-2 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Where carnivores feast like kings since the Mesozoic era.
            </motion.p>
            <div className="mt-2 ml-4 flex gap-2">
              {[ '🦕' ].map((emoji, index) => (
                <motion.span
                  key={index}
                  className="text-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: index * 0.2 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4
              className="text-lg font-semibold mb-4 text-amber-400 border-b border-amber-800 pb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              EXPLORE
            </motion.h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Menu' },
                { to: '/about', label: 'Our History' },
                { to: '/contact', label: 'Expedition Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-amber-200/80 transition-all">
                    <motion.span
                      whileHover={{ color: '#f59e0b', scale: 1.05, textShadow: '0 0 10px rgba(245,158,11,0.7)' }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <motion.h4
              className="text-lg font-semibold mb-4 text-amber-400 border-b border-amber-800 pb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              SAFETY INFO
            </motion.h4>
            <motion.address
              className="text-amber-200/80 not-italic bg-black/60 p-2 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p>123, shamshan nagar</p>
              <p>Emergency: +1-800-DINO-HELP</p>
              <p>Email: info@shamshan.com</p>
              <p className="mt-2 text-xs text-amber-600">*Electric fences active 24/7</p>
            </motion.address>
          </div>

          {/* Social */}
          <div>
            <motion.h4
              className="text-lg font-semibold mb-4 text-amber-400 border-b border-amber-800 pb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              FOLLOW OUR EXPEDITION
            </motion.h4>
            <div className="flex space-x-4">
              {[
                { href: 'https://facebook.com/prehistoricgrill', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg> },
                { href: 'https://instagram.com/prehistoricgrill', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
              ].map(({ href, icon }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-200/80"
                  whileHover={{ scale: 1.2, color: '#f59e0b' }}
                  transition={{ duration: 0.2 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-xs text-amber-600">⚠️ Never feed the dinosaurs</p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="border-t border-amber-900 pt-6 text-center text-amber-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Prehistoric Grill & Bar. All rights reserved. | Jurassic Park™</p>
        </motion.div>
      </div>
      <style>{`
        @keyframes fog {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-fog {
          animation: fog 20s linear infinite;
        }
      `}</style>
    </footer>
  );
}