export const currencyFormat = (num) => {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const checkObjectEmpty = (object) => {
  return !object || Object.keys(object).length === 0;
};

export const convertDate = (date) => {
  const newDate = new Date(date);
  return newDate.toISOString().split("T")[0];
};

export const transformFilters = (filters) => {
  if (filters == undefined) return "";
  var result = Object.keys(filters)
    .map((key) => {
      return "" + key + "=" + filters[key]; // line break for wrapping only
    })
    .join("&");
  return result;
};

export const changeAttributeForOption = (data) => {
  if (Array.isArray(data)) {
    const result = data.map(({ name: label, code: id, ...rest }) => ({
      label,
      id,
      ...rest,
    }));
    return result;
  }
};

export const convertObjectToObjectFilter = (object) => {
  if (!checkObjectEmpty(object)) {
    const queryString = Object.keys(object)
      .map((key) => {
        const queryType = object[key].type;
        const queryValue = object[key].value;

        if (queryType) {
          return `${queryType}=${key}_${queryValue}`;
        } else {
          return `${key}=${queryValue}`;
        }
      })
      .join("&");
      return queryString
  }
};
