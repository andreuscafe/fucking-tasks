/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"]
      },
      colors: {
        "card-gray": "#141414"
      },
      keyframes: {
        zoomOutIn: {
          "0%": {
            opacity: 0,
            transform: "scale(1.1)"
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)"
          }
        },
        zoomInOut: {
          "0%": {
            opacity: 0,
            transform: "scale(0.9)"
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)"
          }
        }
      },
      animation: {
        zoomOutIn: "zoomOutIn 0.5s cubic-bezier(0,.87,.5,.99)",
        zoomInOut: "zoomInOut 0.5s cubic-bezier(0,.87,.5,.99)"
      }
    }
  },
  plugins: []
};
