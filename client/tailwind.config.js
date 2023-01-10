/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 1s ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: 0.9 },
          '100%': { opacity: 0 },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
}
