import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#1a0b2e",       // Deep purple background
          card: "#2e1065",     // Lighter purple card
          accent: "#d946ef",   // Pink accent
          text: "#e9d5ff",     // Light purple text
          green: "#10b981",    // Pros/Checkmarks
          red: "#ef4444",      // Cons/X-marks
        },
      },
    },
  },
  plugins: [],
};
export default config;