import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderApi } from "../../api/OrderApi";
import {
  setListItemsInOrder,
  setListOrderInAccount,
  setListOrderInAdmin,
  setListOrderInProvider,
  setMetaInOrderInAccount,
} from "../slices/OrderSlice";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export const useListOrderInProvider = () =>
  useSelector((state) => state.order.listOrderInProvider);
export const useListOrderInAccountDetail = () =>
  useSelector((state) => state.order.listOrderInAccount);
export const useOrderHandleDetail = () =>
  JSON.parse(localStorage.getItem("orderHandle"));

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

export const addNewOrder = async (body) => {
  const res = await OrderApi.AddNewOrder(body);
  return res.data.data;
};

export const fetchOrderInProvider = (id, filters) => async (dispatch) => {
  try {
    const response = await OrderApi.GetOrderFromProvider(id, filters);
    dispatch(setListOrderInProvider(response.data.data));
  } catch (err) {
    console.log(err);
  }
};

export const changePropListItem = (listItem) => {
  const result = [];
  listItem.forEach((data) => {
    const obj = {
      category_id: 1,
      product_id: data.product_id,
      product_option_id: data.option_id,
      provider_id: data.provider_id,
      name: data.name,
      option: data.option_name,
      price: data.price,
      quantity: data.quantity,
      discount: data.discount,
      image: data.media_path,
    };
    result.push(obj);
  });
  return result;
};

export const getListIDCart = (listItem) => {
  const result = [];
  listItem.forEach((data) => {
    result.push(data.id);
  });
  return result;
};

//Account
export const useFilterOrderInAccount = () =>
  useSelector((state) => state.query.filterOrderInAccountPage);
export const useMetaInOrderInAccount = () =>
  useSelector((state) => state.order.metaInOrderInAccount);

export const updateStatusInAccount = async (idHandle, body) => {
  await OrderApi.UpdateStatus(idHandle, body).then((res) => {
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

export const useFetchOrderInAccount = async (userId, filters) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchOrderInAccount(userId, filters));
  }, [dispatch, filters, userId]);
};

const fetchOrderInAccount = (userID, filters) => async (dispatch) => {
  try {
    const response = await OrderApi.GetOrderFromUser(userID, filters);
    dispatch(setListOrderInAccount(response.data.data));
    dispatch(setMetaInOrderInAccount(response.data.meta));
  } catch (err) {
    console.log(err);
  }
};

//order detail

export const useListItemsInOrder = () =>
  useSelector((state) => state.order.listItemsInOrder);

export const useFetchItemInOrder = async (orderID) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchItemInOrderDetail(orderID));
  }, [dispatch, orderID]);
};

const fetchItemInOrderDetail = (orderID) => async (dispatch) => {
  try {
    const response = await OrderApi.GetOrderItems(orderID);
    dispatch(setListItemsInOrder(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

//admin
export const useListOrderInAdmin = () =>
  useSelector((state) => state.order.listOrderInAdmin);

export const useFetchOrderInAdmin = async (userID) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrder(userID));
  }, [dispatch, userID]);
};

const fetchAllOrder = (userID) => async (dispatch) => {
  try {
    const response = await OrderApi.GetFullOrder(userID);
    dispatch(setListOrderInAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const afterProcessPayment = async (order, userID, dataID) => {
  try {
    const body = {
      id: order.id,
      account_id: order.payer.payer_id,
      email: order.payer.email_address,
      name: order.payer.name.given_name + " " + order.payer.name.surname,
      status: true,
    };
    await OrderApi.AddNewPayment(body)
      .then(async (res) => {
        const body = {
          order_ids: dataID,
          payment_id: res.data.data.id,
          payment_url: order.links[0].href,
        };
        await updateOrder(body);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (body) => {
  try {
    await OrderApi.UpdateOrder(body)
      .then(() => {
        toast("Your order created success", {
          type: "success",
          autoClose: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {}
};

export const verifyOrder = async (orderID, userID) => {
  try {
    await OrderApi.VerifyOrder(orderID, userID)
      .then(() => {
        toast("Verify success", {
          type: "success",
          autoClose: 1000,
          onClose: setTimeout(() => {
            window.location.replace(`/account-order/${userID}`);
          }, 1000),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {}
};
