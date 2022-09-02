/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#0D1227',
        'blue-green': '#94A3B8',
        'blood': '#9C0004',
        'turqoise':'#38C5DD',
        'pale-gray':'#F3F4F6'
      }
    },
  },
  plugins: [

  ],
}
