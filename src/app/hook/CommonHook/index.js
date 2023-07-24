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

export const convertObjectToStringQuery = (object) => {
  if (!checkObjectEmpty(object)) {
    const queryString = Object.keys(object)
      .sort()
      .map((key) => {
        const queryType = object[key].type;
        const queryValue = object[key].value;

        if (
          queryValue !== null &&
          queryValue !== undefined &&
          queryValue !== ""
        ) {
          if (queryType) {
            if (Array.isArray(queryValue)) {
              return queryValue
                .map((val) => `${queryType}=${key}_${val}`)
                .join("&");
            } else {
              return `${queryType}=${key}_${queryValue}`;
            }
          } else {
            return `${key}=${queryValue}`;
          }
        }
      })
      .filter((str) => str !== undefined && str !== null && str !== "")
      .join("&");
    return queryString;
  }
};
export const shortenString = (str) => {
  if (str.length > 7) {
    const start = str.slice(0, 4);
    const end = str.slice(-2);
    return start + "..." + end;
  }
  return str;
};

export const addSuffixToPrice = (number) => {
  const suffixes = {
    1: "k",
    2: "tr",
    3: "tỉ",
  };

  const magnitude = Math.floor(Math.log10(number) / 3);

  if (magnitude in suffixes) {
    const suffix = suffixes[magnitude];
    const abbreviated = (number / Math.pow(1000, magnitude)).toFixed(0);
    return abbreviated + suffix;
  } else {
    return number.toString();
  }
};
export const buildCategoryTree = (arr) => {
  let result = [];
  arr.forEach((item) => {
    let newItem = {
      id: item.id,
      name: item.name,
      isDisplay: false,
      children: null,
    };
    if (item.category_children) {
      newItem.children = buildCategoryTree(item.category_children);
    }
    result.push(newItem);
  });
  return result;
};

export const checkTextPassword = (text) => {
  const regex = /^(?=.*[A-Z]).{8,}$/;
  return regex.test(text);
};

export const checkTextPhone = (text) => {
  const regex = /^\d{10}$/;
  return regex.test(text);
};

export const checkEmailFormat = (text) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(text);
};
export const getSelectedIds = (arr) => {
  if (!Array.isArray(arr)) return [];
  const selectedIds = [];
  for (const obj of arr) {
    if (obj.isSelected) {
      selectedIds.push(obj.id);
    }
  }
  return selectedIds;
};

export const getSelectedIdsAndQuantity = (arr) => {
  if (!Array.isArray(arr)) return [];
  const selectedIds = [];
  for (const obj of arr) {
    if (obj.isSelected) {
      const newObj = {
        product_id: obj.id,
        total: obj.quantity,
      };
      selectedIds.push(newObj);
    }
  }
  return selectedIds;
};

export const convertVNDToUSD = (price) => {
  return (price * 0.0000426257).toFixed(1);
};

export const containsOnlyNumbers = (input) => {
  return /^\d+$/.test(input);
};

export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substr(0, maxLength) + "...";
};

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
};

function calculateContainerVolume(container) {
  return container.length * container.width * container.height;
}

export const findMinimumVolumeBox = (data) => {
  // Sort the data in non-increasing order of height
  data.sort((a, b) => b.height - a.height);

  // Initialize the dimensions of the larger box
  let maxLength = 0;
  let maxWidth = 0;
  let maxHeight = 0;
  let totalWeight = 0;
  // Iterate over each box and place it in the larger box
  for (let i = 0; i < data.length; i++) {
    const box = data[i];

    // Update the dimensions of the larger box if necessary
    maxLength = Math.max(maxLength, box.length);
    maxWidth = Math.max(maxWidth, box.width);
    maxHeight += box.height;
    totalWeight += box.weight;
  }

  // Create the larger box
  const largerBox = {
    length: maxLength,
    width: maxWidth,
    height: maxHeight,
    weight: totalWeight,
  };

  return largerBox;
};

export const checkTokenToLogin = () => {
  if (checkNotLogin()) window.location.href = "/login";
};

export const checkNotLogin = () => {
  return !localStorage.getItem("AccessToken");
};

export const containStringBan = (string, listBan) => {
  for (let i = 0; i < listBan.length; i++) {
    if (string.includes(listBan[i])) {
      return true;
    }
  }
  return false;
};
