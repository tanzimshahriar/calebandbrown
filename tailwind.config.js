const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'

  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      white: colors.white,
      black: colors.black,
      gray: colors.trueGray,
      sunflower: '#ffc800',
      evening: '#262228',
      irises: '#007849',
      aqua: '#0375b4',
      red: '#b11e31'
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },

  variants: {
    extend: {},
  },
  plugins: [],
}
