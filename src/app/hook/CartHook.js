import { useDispatch, useSelector } from "react-redux";
import { CartShoppingApi } from "../../api/CartShopping";
import { toast } from "react-toastify";
import { useCallback, useEffect } from "react";
import { setListCart } from "../slices/CartSlice";

export const useListCart = () => useSelector((state) => state.cart.listCart);
export const useTotalPrice = () =>
  JSON.parse(localStorage.getItem("totalPrice"));
export const useSelectedCart = () =>
  useSelector((state) => state.cart.selectedCart);
export const useListItemInCartSelected = () =>
  JSON.parse(localStorage.getItem("itemInOrder"));
export const addToCart = async (productID, providerID, userID, body) => {
  await CartShoppingApi.AddNewCartShopping(
    productID,
    providerID,
    userID,
    body
  ).then((res) => {
    toast("Add to Cart Success", {
      type: "success",
      autoClose: 2000,
      onClose: setTimeout(() => {
        window.location.reload();
      }, 2000),
    });
  });
};

export const useFetchListCart = async (userID) => {
  const dispatch = useDispatch();
  const loadDataListCart = useCallback(async () => {
    dispatch(fetchListCart(userID));
  });
  useEffect(() => {
    loadDataListCart();
  }, [loadDataListCart]);
};

const fetchListCart = (userID) => async (dispatch) => {
  try {
    await CartShoppingApi.GetCartFromUser(userID).then((res) => {
      dispatch(setListCart(defaultListCart(res.data.data)));
    });
  } catch (err) {}
};

export const deleteCartShopping = async (idCart, idItemCart) => {
  await CartShoppingApi.DeleteItemInCart(idCart, idItemCart).then((res) => {
    if (res.status == 200) {
      toast("Delete Item success", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => {
          window.location.reload();
        }, 1500),
      });
    }
  });
};

export const defaultListCart = (listCart) => {
  const result = listCart.map((data) => {
    return {
      ...data,
      isSelected: false,
      items: data.items.map((dataItem) => {
        return {
          ...dataItem,
          isSelected: false,
        };
      }),
    };
  });
  return result;
};

export const changeListCartFromCheck = (listCart, id) => {
  const result = listCart.map((data) => {
    const updatedData = {
      ...data,
      items: data.items.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      }),
    };
    return updatedData;
  });
  return result;
};

export const getCostFromListCart = (listCart) => {
  var sum = 0;
  listCart.map((data) => {
    data.items.map((item) => {
      if (item.isSelected) {
        sum += (item.price * item.quantity * (100 - item.discount)) / 100;
      }
    });
  });
  return sum;
};

export const increaseQuantity = (listCart, itemId) => {
  const result = listCart.map((data) => {
    const updatedData = {
      ...data,
      items: data.items.map((item) => {
        if (item.id == itemId) {
          return {
            ...item,
            quantity: item.quantity+1,
          };
        }
        return item;
      }),
    };
    return updatedData;
  });
  return result;
};

export const decreaseQuantity = (listCart, itemId) => {
  const result = listCart.map((data) => {
    const updatedData = {
      ...data,
      items: data.items.map((item) => {
        if (item.id == itemId) {
          return {
            ...item,
            quantity: Math.max(1,item.quantity-1)
          };
        }
        return item;
      }),
    };
    return updatedData;
  });
  return result;
};

const getListInfoFromListCartToOrder = (listCart) => {
  const result = [];
  listCart.forEach((data) => {
    data.items.forEach((item) => {
      if (item.isSelected) {
        const obj = {
          ...item,
          provider_id: data.provider_id,
        };
        result.push(obj);
      }
    });
  });
  return result;
};

export const addCartToOrder = async (listCart, totalPrice, userID) => {
  const info = getListInfoFromListCartToOrder(listCart);
  localStorage.setItem("itemInOrder", JSON.stringify(info));
  localStorage.setItem("totalPrice", totalPrice);
  window.location.replace(`/shopping-order/${userID}`);
};
