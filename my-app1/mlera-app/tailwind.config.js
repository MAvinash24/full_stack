/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#1a0b2e",
          card: "#2e1065",
          accent: "#d946ef",
          text: "#e9d5ff",
          green: "#10b981",
          red: "#ef4444",
        },
      },
    },
  },
  plugins: [],
};