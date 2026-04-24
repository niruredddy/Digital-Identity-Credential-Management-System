/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aureum: {
          400: '#FACC15',
          500: '#EAB308', // Gold
          600: '#CA8A04',
        },
        slate: {
          850: '#0F172A', // Identity Vault background panel
          900: '#0B0F19', // Main background
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
