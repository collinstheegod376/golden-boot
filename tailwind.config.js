
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-gold': '#ffd700',
        'accent-green': '#00dc82',
        'accent-red': '#ef4444',
        'card-bg': '#121214',
        'text-secondary': '#9ca3af',
        'secondary': '#9ca3af',
      },
    },
  },
  plugins: [],
}
