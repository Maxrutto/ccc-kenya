/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#e6f4ff",
        "primary-red": "#dc2626",
      },
      fontFamily: {
        'Montserrat': ['Montserrat', 'Montserrat-fallback', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'Playfair_Display': ['"Playfair Display"', 'Playfair-fallback', 'Georgia', '"Times New Roman"', 'Times', 'serif'],
        'Cinzel': ['Cinzel', 'Georgia', '"Times New Roman"', 'Times', 'serif'],
        'Dancing_Script': ['"Dancing Script"', 'cursive', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
