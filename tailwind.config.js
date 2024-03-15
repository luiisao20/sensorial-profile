/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      'background': '#DADADA',
      'main': '#F4F3F5',
      'nav': '#9F787C',
      'danger': '#F55A4E',
      'success': '#74A96C',
      'icons': '#A9AFBB',
      'info': '#2D2879'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

