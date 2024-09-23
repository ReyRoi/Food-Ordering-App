/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        custom:{
          'primary':'#ff6022',
          'secondary':'#ff9204',
          
        }
      }
    },
  },
  plugins: [],
}