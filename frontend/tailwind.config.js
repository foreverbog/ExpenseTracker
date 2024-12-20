/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateX(5px)" },
          "50%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.3s ease-in-out ",
      },
      screens: {
        xs: "425px",
      },
      colors: {
        base: "var(--color-base)",
        "base-100": "var(--color-base-100)",
        "base-200": "var(--color-base-200)",
        "base-300": "var(--color-base-300)",
        "base-text": "var(--color-base-text)",

        primary: "var(--color-primary)",
        "primary-darker": "var(--color-primary-darker)",
        "primary-lighter": "var(--color-primary-lighter)",
        "primary-text": "var(--color-primary-text)",

        secondary: "var(--color-secondary)",
        "secondary-darker": "var(--color-secondary-darker)",
        "secondary-lighter": "var(--color-secondary-lighter)",
        "secondary-text": "var(--color-secondary-text)",
      },
      fontFamily: {
        base: ["var(--font-family)", "sans-serif"],
      },
      fontSize: {
        normal: "16px",
      },
    },
  },
  plugins: [],
};
