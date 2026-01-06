/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // add other paths if needed
  ],
  darkMode: "class", // allows using dark: variants if you want (optional)
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", "Arial", "Helvetica", "sans-serif"],
      },
      // Optional: add your colors if you want Tailwind classes like bg-button
      colors: {
        button: "var(--button-bg)",
        card: "var(--card-bg)",
        navbar: {
          bg: "var(--navbar-bg)",
          text: "var(--navbar-text)",
        },
      },
    },
  },
  plugins: [],
};