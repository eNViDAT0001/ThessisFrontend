import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderApi } from "../../api/OrderApi";
import { setListOrderInProvider } from "../slices/OrderSlice";
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

export const addNewOrder = (body) => {
  return OrderApi.AddNewOrder(body).then((res) => {
    toast("Add new Order Success", {
      type: "success",
      autoClose: 1000,
      onClose: setTimeout(() => {
        window.location.replace("/");
      }, 2000)
    });
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

export const changePropListItem = (listItem) =>{
  const result = [];
  listItem.forEach((data) => {
    const obj = {
      category_id: 1,
      product_id: data.product_id,
      product_option_id: data.option_id,
      provider_id: data.provider_id,
      name:data.name,
      option: data.option_name,
      price: data.price,
      quantity: data.quantity,
      discount: data.discount,
      image: data.media_path
    }
    result.push(obj);
  });
  return result;
}

export const getListIDCart= (listItem) =>{
  const result = [];
  listItem.forEach((data) => {
    result.push(data.id)
  })
  return result
}