/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-primary': '#2b2c53',
        'medical-secondary': '#0da7bb',
        'medical-text': '#a3aab4',
      },
      fontFamily: {
        'overpass': ['Overpass', 'sans-serif'],
      },
    },
  },
  plugins: [],
}