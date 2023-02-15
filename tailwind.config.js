/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      maxWidth: {
      },
      spacing: {

      },
      colors: {


      },
      fontFamily:{
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require("daisyui")
  ],
}
