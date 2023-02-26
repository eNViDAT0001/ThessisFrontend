export const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 export const checkObjectEmpty = (object) => {
    return Object.keys(object).length === 0;
  };