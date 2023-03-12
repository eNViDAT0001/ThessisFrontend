import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderApi } from "../../api/OrderApi";
import { setListOrderInProvider } from "../slice/OrderSlice";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export const useListOrderInProvider = () =>
  useSelector((state) => state.order.listOrderInProvider);
export const useListOrderInAccountDetail = () =>
  useSelector((state) => state.order.listOrderInAccountDetail);

export const updateStatus = async (idOrder, body) => {
  await OrderApi.UpdateStatus(idOrder, body).then((res) => {
    if (res.status == 200) {
      toast("Update order success", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => {
          window.location.reload();
        }, 1000),
      });
    }
  });
};

export const useFetchOrderInProvider = async (id, filters) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchOrderInProvider(id, filters));
  }, []);
};

const fetchOrderInProvider = (id, filters) => async (dispatch) => {
  try {
    const response = await OrderApi.GetOrderFromProvider(id, filters);
    dispatch(setListOrderInProvider(response.data.data));
  } catch (err) {
    console.log(err);
  }
};
