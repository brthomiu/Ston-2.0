/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ston: {
          brown: '#59493b',
          green: 'rgb(96, 108, 93)',
          tan: '#FFF4F4',
          yellow1: '#F7E6C4',
          yellow2: '#F1C376',
          button: '#9bd19f',
        },
      },
    },
  },
  plugins: [],
};
