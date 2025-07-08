/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#0f0f0f',
        maroon: '#5c1d1d',
        gold: '#d4af37',
      },
      boxShadow: {
        royal: '0 4px 8px rgba(212, 175, 55, 0.4)',
      },
    },
  },
  plugins: [],
}
