/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#e6f4ff",
        "primary-red": "#dc2626",
      },
    },
  },
  plugins: [],
};
