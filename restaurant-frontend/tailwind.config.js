/** @type {import('tailwindcss').Config} */




export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily: {
        Cinzel: ['"Cinzel Decorative"', 'serif'],
      },
      animation: {
        'pan-right': 'pan-right 30s linear infinite',
        'marquee': 'marquee 20s linear infinite',
        'raptor-scroll': 'raptor 3s ease-in-out infinite',
      },
      keyframes: {
        'pan-right': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
        raptor: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },

  plugins: [],
}
}