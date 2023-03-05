export const currencyFormat = (num) => {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const checkObjectEmpty = (object) => {
  return Object.keys(object).length === 0;
};

export const convertDate = (date) => {
  const newDate = new Date(date);
  return newDate.toISOString().split("T")[0];
};

export const transformFilters = (filters) => {
   if(filters==undefined) return ""
   var result = Object.keys(filters)
     .map((key) => {
       return "" + key + "=" + filters[key]; // line break for wrapping only
     })
     .join("&");
   return result;
 };
