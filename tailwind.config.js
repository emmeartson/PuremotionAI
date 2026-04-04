/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7c602e", // The rich brown
        secondary: "#fdfcfb", // The off-white background
        accent: "#e5d5bc", // Light gold/beige
      },
      fontFamily: {
        sans: [
          "Roboto Flex",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
        ],
        serif: [
          "Playfair Display",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
