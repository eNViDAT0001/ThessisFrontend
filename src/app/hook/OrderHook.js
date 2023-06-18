import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderApi } from "../../api/OrderApi";
import {
  addDataToShippingCost,
  setDataShippingCost,
  setDetailOrder,
  setListItemsInOrder,
  setListOrderInAccount,
  setListOrderInAdmin,
  setListOrderInProvider,
  setMetaInOrderInAccount,
  setMetaInOrderInAdmin,
} from "../slices/OrderSlice";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { AddressApi } from "../../api/AddressApi";
import { checkObjectEmpty, findMinimumVolumeBox } from "./CommonHook";
import { setMetaOrderInBrandDetail } from "../slices/BrandSlice";

export const useListOrderInProvider = () =>
  useSelector((state) => state.order.listOrderInProvider);
export const useListOrderInAccountDetail = () =>
  useSelector((state) => state.order.listOrderInAccount);
export const useOrderHandleDetail = () =>
  JSON.parse(localStorage.getItem("orderHandle"));
export const useCartForShipping = () =>
  JSON.parse(localStorage.getItem("cartForShipping"));
export const useDataShippingCost = () =>
  useSelector((state) => state.order.dataShippingCost);
export const updateStatus = async (idOrder, body) => {
  await OrderApi.UpdateStatus(idOrder, body).then((res) => {
    if (res.status == 200) {
      toast("Update order success", {
        type: "success",
        autoClose: 1000,
      });
    }
  });
};
export const updateStatusDelivered = async (idOrder, body) => {
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
  return res.data.data[0];
};

export const fetchOrderInProvider = (id, filters) => async (dispatch) => {
  try {
    const response = await OrderApi.GetOrderFromProvider(id, filters);
    dispatch(setListOrderInProvider(response.data.data));
    dispatch(setMetaOrderInBrandDetail(response.data.meta));
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
export const useDetailOrder = () =>
  useSelector((state) => state.order.detailOrder);
export const useListItemsInOrder = () =>
  useSelector((state) => state.order.listItemsInOrder);

export const useFetchItemInOrder = async (orderID) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchItemInOrderDetail(orderID)).then(() =>
      dispatch(fetchOrderDetail(orderID))
    );
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

const fetchOrderDetail = (orderID) => async (dispatch) => {
  try {
    const response = await OrderApi.GetOrderDetail(orderID);
    dispatch(setDetailOrder(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
//admin
export const useListOrderInAdmin = () =>
  useSelector((state) => state.order.listOrderInAdmin);
export const useMetaInOrderInAdmin = () =>
  useSelector((state) => state.order.metaInOrderInAdmin);
export const useFilterInOrderInAdmin = () =>
  useSelector((state) => state.query.filterOrderTabAdmin);

export const useFetchOrderInAdmin = async (userID, filter) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrder(userID, filter));
  }, [dispatch, userID, filter]);
};

const fetchAllOrder = (userID, filter) => async (dispatch) => {
  try {
    const response = await OrderApi.GetFullOrder(userID, filter);
    dispatch(setListOrderInAdmin(response.data.data));
    dispatch(setMetaInOrderInAdmin(response.data.meta));
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
          order_ids: [dataID],
          payment_id: res.data.data.id,
          payment_url: order.links[0].href,
        };

        await updateOrder(body, userID);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

export const addNewOrderCOD = async (body, userID) => {
  await OrderApi.AddNewOrder(body)
    .then((res) => {
      toast("Your order created success", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => {
          window.location.replace(`/account-order/${userID}`);
        }, 1000),
      });
    })
    .catch((err) => {
      alert(err);
    });
};
const updateOrder = async (body, userID) => {
  try {
    await OrderApi.UpdateOrder(body)
      .then(() => {
        toast("Your order created success", {
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

const getApiShippingFee = (body) => async (dispatch) => {
  await AddressApi.GetShippingCost(body)
    .then((res) => {
      dispatch(addDataToShippingCost(res.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const convertDataToShipping = (data) => {
  const transformedData = data.map((item) => {
    const transformedItems = item.items.map((innerItem) => {
      return {
        width: innerItem.width,
        height: innerItem.height,
        length: innerItem.length,
        weight: innerItem.weight,
      };
    });

    const minimumVolume = findMinimumVolumeBox(transformedItems);

    return {
      id: item.id,
      provider_id: item.provider_id,
      provider_district_id: item.provider_district_id,
      items: minimumVolume,
    };
  });

  return transformedData;
};

const getServiceId = async (from_district, to_district) => {
  const body = {
    shop_id: 4074093,
    from_district: from_district,
    to_district: to_district,
  };
  const response = await AddressApi.GetServiceAvailable(body);
  return response.data.data[0].service_id;
};

export const useShippingFee = async (
  cartForShipping,
  addressSelected,
  isClickSelected,
  addressFormCreated
) => {
  const dispatch = useDispatch();

  const prevAddressCreated = useRef(addressFormCreated);
  const prevAddressSelected = useRef(addressSelected);
  const newDataShipping = convertDataToShipping(cartForShipping);
  if (
    (!isClickSelected && prevAddressCreated.current !== addressFormCreated) ||
    (isClickSelected && prevAddressSelected.current !== addressSelected)
  ) {
    dispatch(setDataShippingCost([]));
  }

  //console.log("cartForShipping", newDataShipping);
  useEffect(() => {
    if (isClickSelected) {
      if (!checkObjectEmpty(addressSelected)) {
        newDataShipping.map(async (data) => {
          const body = {
            service_id: await getServiceId(
              data.provider_district_id,
              addressSelected.district_id
            ),
            insurance_value: 500000,
            from_district_id: data.provider_district_id,
            to_district_id: addressSelected.district_id,
            to_ward_code: addressSelected.ward_code,
            height: data.items.height,
            weight: data.items.weight,
            length: data.items.length,
            width: data.items.width,
          };
          console.log("body", body);
          return await dispatch(getApiShippingFee(body));
        });
      }
    } else {
      if (!checkObjectEmpty(addressFormCreated)) {
        //alert(JSON.stringify(addressFormCreated));
        newDataShipping.map(async (data) => {
          const body = {
            service_id: await getServiceId(
              data.provider_district_id,
              addressFormCreated.districtId
            ),
            insurance_value: 500000,
            from_district_id: data.provider_district_id,
            to_district_id: addressFormCreated.districtId,
            to_ward_code: addressFormCreated.wardId,
            height: data.items.height,
            weight: data.items.weight,
            length: data.items.length,
            width: data.items.width,
          };
          console.log("body", body);
          return await dispatch(getApiShippingFee(body));
        });
      }
    }
    prevAddressCreated.current = addressFormCreated;
    prevAddressSelected.current = addressSelected;
  }, [
    dispatch,
    newDataShipping,
    addressSelected,
    addressFormCreated,
    isClickSelected,
  ]);
};
