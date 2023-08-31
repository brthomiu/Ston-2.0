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
          brown: '#4f3629',
          green: '#7a6552',
          tan: '#FFF4F4',
          yellow1: '#F7E6C4',
          yellow2: '#F1C376'
        }
      }
    },
  },
  plugins: [],
}