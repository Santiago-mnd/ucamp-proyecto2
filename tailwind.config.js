/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./docs/*.html'],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
