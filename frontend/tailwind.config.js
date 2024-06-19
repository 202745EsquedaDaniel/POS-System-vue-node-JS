/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orangebg: '#fbdeda',
        orangetext: '#ed6a5a',
      }
    },
  },
  plugins: [],
}

