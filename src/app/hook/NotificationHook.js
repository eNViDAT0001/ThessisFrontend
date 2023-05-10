import { useDispatch, useSelector } from "react-redux";
import { WebSocketApi } from "../../api/WebSocketApi";
import { setListNotification } from "../slices/NotificationSlice";
import { useEffect } from "react";

export const useListNotification = () =>
  useSelector((state) => state.notification.listNotification);

export const useFetchNotification = (userID, filter, wsEvent) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchListNotification(userID, filter));
      } catch (err) {}
    };
    fetchData();
  }, [dispatch, userID, filter, wsEvent]);
};

const fetchListNotification = (userID, filter) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListNotification(userID, filter);
    //   const originalData = response.data.data;
    //   const transformedData = {
    //     title: originalData.title,
    //     collection: originalData.collection,
    //     discount: originalData.discount,
    //     image: originalData.image,
    //     end_time: originalData.end_time,
    //     products: originalData.products.map((product) => product.id),
    //   };
    dispatch(setListNotification(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
