/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        '1171px': '1171px'
      },
      spacing: {
        '5px': '5px',
        '9px': '9px',
        '10px': '10px',
        '11px': '11px',
        '10px': '10px',
        '14px': '14px',
        '17px': '17px',
        '18px': '18px',
        '25px': '25px',
        '27px': '27px',
        '30px': '30px',
        '45px': '45px',
        '46px': '46px',
        '47px': '47px',
        '50px': '50px',
        '51px': '51px',
        '52px': '52px',
        '55px': '55px',
        '60px': '60px',
        '61px': '61px',
        '69px': '69px',
        '76px': '76px',
        '87px': '87px',
        '100px': '100px',
        '151px': '151px',
        '155px': '155px',
        '183px': '183px',
        '200px':'200px',
        '214px': '214px',
        '230px': '230px',
        '270px': '270px',
        '340px': '340px',
        '362px': '362px',
        '375px': '375px',
        '404px': '404px',
        '453px': '453px',
        '487px': '487px',
        '547px': '547px',
        '649px':'649px',
        '815px': '815px',
        '921px': '921px',
        '1152px': '1152px',
        '1153px': '1153px',
        '1171px': '1171px',
        '1200px': '1200px',
      },
      colors: {
        'gray-header': '#F6F5FF',//gray
        'gray-input' : '#E7E6EF', //gray
        'gray-text-in-select': "#8A8FB9",//gray
        'gray-text-product-brand': "#7E81A2",//gray
        'gray-text-product-content': '#9295AA',//gray
        'gray-product-detail-information': '#F9F8FE',
        'gray-content-product-detail': '#A9ACC6',
        'gray-button-amount-product': '#E0EFF2',
        'gray-text-amount-product': '#BEBFC2',
        'purple-text': '#151875',//purple
        'purple-text-2': '#3F509E',//purple
        'purple-name-product': '#111C85',
        'purple-check-product-brand': '#603EFF',
        'purple-text-relatives' : '#101750',
        'yellow-check-rating-item': '#FFCC2E',
        'pink-price-sale': ' #FF2AAA',
        //PRODUCT DETAIL
        'purple-text-name-product-detail': '#0D134E',

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
