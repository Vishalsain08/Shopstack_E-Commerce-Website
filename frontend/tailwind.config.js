/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',     // blue-600
        accent: '#059669',      // green-600
        text: '#1f2937',        // gray-800
        background: '#f9fafb',  // gray-100
        danger: '#dc2626',      // red-600
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

