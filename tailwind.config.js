/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'KeyLime': '#EAEC76',
        'Gainsboro': '#D9D9D9',
        'DarkSeaGreen': '#97C085',
        'PineTree': '#2C3528',
        'BlackChocolate': {
          DEFAULT: '#191C17',
          '50': '#596352',
          '100': '#555F4E',
          '200': '#4E5747',
          '300': '#464E40',
          '400': '#3F4639',
          '500': '#373E33',
          '600': '#30352C',
          '700': '#282D25',
          '800': '#21241E',
          '900': '#191C17'
        },
      },

      maxWidth: {
        '8xl': '1920px'
      },
      borderWidth: {
        '1': '1px',
      },
      width: {
        '13': '52px',
        '70': '272px',
      },
      height: {
        '13': '52px',
      }
    },

  },
  plugins: [],
}

