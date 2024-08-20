/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      colors: {
        primary: "var(--color-primary)",
        text: "var(--color-text)",
      },
    },
  },
  plugins: [],
};
