/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        hdScreen: '1601px', //COULD ALSO BE 1536
        semihdScreen: '1367px',
        laptopScreen: '1281px',
        averageScreen: '1024px',
        xs: '450px',
        // => @media (min-width: 500px) { ... }

        /* BUGGY CODE BELOW
        'tall': { 'raw': '(min-height: 2048px)' },
        */
        // => @media (min-height: 2048px) { ... }
      },

      cursor: {
        brush:
          'url(https://github.com/johnl0renz01/codepen-images/blob/main/draw_icons/brush.png?raw=true), default',
        eraser:
          'url(https://github.com/johnl0renz01/codepen-images/blob/main/draw_icons/eraser.png?raw=true), default',
      },

      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      fontSize: {
        '1.5xl': '1.4rem',
        '2.5xl': '1.75rem',
        '3xl': '1.953rem',
        '3.25xl': '2.15rem',
        '3.5xl': '2.223rem',
        '4xl': '2.441rem',
        '4.5xl': '2.741rem',
        '5xl': '3.052rem',
        '6xl': '3.653rem',
        '7xl': '4.341rem',
        '8xl': '5.052rem',
      },

      scale: {
        200: '2',
        195: '1.95',
        190: '1.90',
        185: '1.85',
        180: '1.80',
        175: '1.75',
        170: '1.70',
        165: '1.65',
        160: '1.60',
        155: '1.55',
        150: '1.50',
        145: '1.45',
        140: '1.40',
        135: '1.35',
        130: '1.30',
        125: '1.25',
        120: '1.20',
        115: '1.15',
        110: '1.10',
        95: '0.95',
        92: '0.92',
        90: '0.90',
        85: '0.85',
        80: '0.80',
        70: '0.70',
        65: '0.65',
        60: '0.60',
        55: '0.55',
        45: '0.45',
        40: '0.40',
        35: '0.35',
        30: '0.30',
        25: '0.25',
        20: '0.20',
        15: '0.15',
        10: '0.10',
        5: '0.05',
      },
      inset: {
        '3px': '3px',
      },
      width: {
        120: '27rem',
        '65%': '65%',
      },
      height: {
        128: '32rem',
        '25%': '25%',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        12: 'repeat(12, minmax(0, 1fr))',
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
        15: 'repeat(15, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
        17: 'repeat(17, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        19: 'repeat(19, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
        21: 'repeat(21, minmax(0, 1fr))',
        22: 'repeat(22, minmax(0, 1fr))',
        23: 'repeat(23, minmax(0, 1fr))',
        24: 'repeat(24, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        // Simple 8 row grid
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
        11: 'repeat(11, minmax(0, 1fr))',
        12: 'repeat(12, minmax(0, 1fr))',
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
        15: 'repeat(15, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
        17: 'repeat(17, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        19: 'repeat(19, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
        21: 'repeat(21, minmax(0, 1fr))',
        22: 'repeat(22, minmax(0, 1fr))',
        23: 'repeat(23, minmax(0, 1fr))',
        24: 'repeat(24, minmax(0, 1fr))',
      },
      gridRow: {
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      gridColumn: {
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        mainBGBrown: '#b87928',
        mainBGGreen: '#d5f191',
        yes: '  #77ff08',
        no: '  #ff0d00',
        borderBr: ' #e4c1ac',
        brTwo: '#d39c70',
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        leagueSpartan: "'League Spartan', sans-serif",
        roboto: 'Roboto, sans-serif',
        bungee: 'Bungee, sans-serif',
        bakbak: 'Bakbak One, sans-serif',
        tauri: 'Tauri, sans-serif',
        jura: 'Jura, sans-serif',
        lato: 'Lato, sans-serif',
        roboto: 'Roboto, sans-serif',
      },
      borderWidth: {
        3: '3px',
        6: '6px',
        12: '12px',
        18: '18px',
        24: '24px',
        100: '100px',
        25: '25px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
        '8xl': '4rem',
        '9xl': '4.5rem',
        '10xl': '5rem',
        '11xl': '5.5rem',
        '12xl': '6rem',
        '13xl': '6.5rem',
        '14xl': '7rem',
      },
      maxHeight: {
        '31rem': '31rem',
      },
    },
    keyframes: {
      shimmer: {
        '100%': { transform: 'translateX(100%)' },
      },
    },
  },
  plugins: [],
};
