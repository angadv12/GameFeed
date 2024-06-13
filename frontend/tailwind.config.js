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
        bgDark: '#0F172A',
        
      }
    }
  },
  plugins: [],
}