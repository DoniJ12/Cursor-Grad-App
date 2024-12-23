/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'header-blue': '#1a237e',
        'hover-gray': '#f5f5f5',
      }
    },
  },
  plugins: [],
}