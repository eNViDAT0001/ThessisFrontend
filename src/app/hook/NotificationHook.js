import { useDispatch, useSelector } from "react-redux";
import { WebSocketApi } from "../../api/WebSocketApi";
import {
  addBeginningInNotifySmall,
  addNotification,
  setListNotification,
  setListNotificationSmall,
  setMetaInNotification,
} from "../slices/NotificationSlice";
import { useEffect } from "react";
import { useRef } from "react";

export const useListNotification = () =>
  useSelector((state) => state.notification.listNotification);
export const useFilterNotification = () =>
  useSelector((state) => state.query.filterNotify);
export const useMetaInNotification = () =>
  useSelector((state) => state.notification.metaInNotification);
export const useNotificationSmall = () =>
  useSelector((state) => state.notification.listNotificationSmall);
export const useFetchNotification = (userID, filter) => {
  const dispatch = useDispatch();
  const prevFilter = useRef(filter);
  const prevUserID = useRef(userID);

  const fetchData = async () => {
    try {
      await dispatch(fetchListNotification(userID, filter));
    } catch (err) {}
  };

  const fetchFromFilter = async () => {
    try {
      await dispatch(fetchAddNotification(userID, filter));
    } catch (err) {}
  };
  useEffect(() => {
    if (prevFilter.current !== filter) {
      fetchFromFilter();
    }

    if (prevUserID.current !== userID) {
      fetchData();
    }
    prevFilter.current = filter;
    prevUserID.current = userID;
  }, [dispatch, userID, filter]);

  useEffect(() => {
    fetchData();
  }, []);
};

export const useFetchNotificationSmall = (userID, wsSocket) => {
  const dispatch = useDispatch();
  const prevSocket = useRef(wsSocket);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchListNotificationSmall(userID));
      } catch (err) {}
    };
    fetchData();

    if (wsSocket !== prevSocket.current) {
      if (wsSocket.type === "NotificationNew") {
        dispatch(addBeginningInNotifySmall(wsSocket.payload));
      }
    }
    prevSocket.current = wsSocket;
  }, [dispatch, userID, wsSocket]);
};
const fetchListNotification = (userID, filter) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListNotification(userID, filter);
    dispatch(setListNotification(response.data.data));
    dispatch(setMetaInNotification(response.data.meta));
  } catch (error) {
    console.log(error);
  }
};

const fetchListNotificationSmall = (userID) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListNotification(
      userID,
      "sorts[]=id_DESC&limit=6"
    );
    dispatch(setListNotificationSmall(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
const fetchAddNotification = (userID, filter) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListNotification(userID, filter);
    dispatch(addNotification(response.data.data));
    dispatch(setMetaInNotification(response.data.meta));
  } catch (error) {
    console.log(error);
  }
};
