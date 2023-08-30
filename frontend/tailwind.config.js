/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ston: {
          brown: '#423E36',
          green: '#606C5D',
          tan: '#FFF4F4',
          yellow1: '#F7E6C4',
          yellow2: '#F1C376'
        }
      }
    },
  },
  plugins: [],
}