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
        'PineTree': {
          DEFAULT: '#2C3528',
          '50': '#4D5C46',
          '100': '#495842',
          '200': '#424F3C',
          '300': '#3A4635',
          '400': '#333E2F',
          '500': '#2C3528',
          '600': '#252C21',
          '700': '#1E241B',
          '800': '#161B14',
          '900': '#0F120E'
        },
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

