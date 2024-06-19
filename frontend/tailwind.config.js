/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        sans: ['system-ui', 'BlinkMacSystemFont', 'Roboto', 'Arial']
      },
      backgroundImage: {
        'bg404': "url('/src/assets/404bg.png')",
      },
      colors: {
        bgDark: '#161616',
        bgNavbar: '#1E1E1E',
        bgCards: '#3C3C3C',
        
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in',
        slideIn: 'slideIn 1.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    }
  },
  plugins: [],
}