/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Added to force dark mode only via class
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
