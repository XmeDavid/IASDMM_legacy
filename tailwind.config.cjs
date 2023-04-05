/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'ovl-sm': '0 0px 5px 1px',
        'ovl-md': '0 0px 10px 2px',
        'ovl-lg': '0 0px 25px 5px',
      },
      flexBasis:{
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        '3/8': '37.5%',
      },
      colors:{
        'c-tree-frog': '#2b8500',
        'c-ming': '#007f98',
        'c-bluejay-light': '#6699ff',
        'c-bluejay': '#2e6de7',
        'c-bluejay-dull': '#749be8',
        'c-bluejay-dark': '#1a3c80',
        'c-iris': '#9013fe',
        'c-lily': '#d41583',
        'c-scarlett': '#d0021b',
        'c-campfire': '#cd4900',
        'c-winter': '#717171',
        'c-forest': '#355724',
        'c-cave': '#255760',
        'c-denim': '#2f557f',
        'c-emperor': '#4b207f',
        'c-grapevine': '#712550',
        'c-velvet': '#782832',
        'c-earth': '#5e3929',
        'c-night': '#4A4A4A',
        'c-warm': '#ffa92d',
        'c-cool': '#4d7549',
      }
    },
  },
  plugins: [],
}
