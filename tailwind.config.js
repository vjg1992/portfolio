/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode toggling using class
  theme: {
    extend: {
      colors: {
        lightBg: "#f8f9fa", // Light mode background
        darkBg: "#111827",  // Dark mode background
        lightText: "#1f2937", // Light mode text color
        darkText: "#e5e7eb",  // Dark mode text color
        primaryLight: "#14b8a6", // Accent color for light mode
        primaryDark: "#06b6d4",  // Accent color for dark mode
      }
    },
  },
  plugins: [],
}

