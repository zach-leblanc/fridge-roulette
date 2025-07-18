/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files in src for Tailwind classes
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
