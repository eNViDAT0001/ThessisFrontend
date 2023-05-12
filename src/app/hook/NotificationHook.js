import { useDispatch, useSelector } from "react-redux";
import { WebSocketApi } from "../../api/WebSocketApi";
import { setListNotification, setMetaInNotification } from "../slices/NotificationSlice";
import { useEffect } from "react";

export const useListNotification = () =>
  useSelector((state) => state.notification.listNotification);
export const useFilterNotification = () =>
  useSelector((state) => state.query.filterNotify);
export const useMetaInNotification = () =>  useSelector((state) => state.notification.metaInNotification);

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
    dispatch(setListNotification(response.data.data));
    dispatch(setMetaInNotification(response.data.meta))
  } catch (error) {
    console.log(error);
  }
};
