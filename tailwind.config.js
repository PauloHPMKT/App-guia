/** @type {import('tailwindcss').Config} */

const customPallet = {
  primaryDark: '#161C24',
  secondaryDark50: '#212b36',
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  darkMode: 'class', // or 'media' or 'class' for sistem preferences
  theme: {
    extend: {
      height: {
        'full-minus-diff': 'calc(100% - 68px)',
      },
      backgroundColor: {
        'dark-blue': customPallet.primaryDark,
        'card-dark': customPallet.secondaryDark50,
      },
      colors: {
        'background-light': '#f9f8f9',
        'background-dark': customPallet.primaryDark,
        'text-light': '#000000',
        'text-dark': '#ffffff',
        'header-light': '#e5e5e5',
        'header-dark': '#333333',
        'card-dark': customPallet.secondaryDark50,
      },
      borderColor: {
        'dark-blue': customPallet.primaryDark,
        'border-dark': customPallet.secondaryDark50,
      },
    },
  },
  plugins: [],
}