import { useDispatch, useSelector } from "react-redux";
import { CartShoppingApi } from "../../api/CartShopping";
import { toast } from "react-toastify";
import { useCallback, useEffect } from "react";
import { setListCart } from "../slices/CartSlice";

export const useListCart = () => useSelector((state) => state.cart.listCart);

export const useSelectedCart = () =>
  useSelector((state) => state.cart.selectedCart);

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
