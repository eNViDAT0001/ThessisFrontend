import { useDispatch, useSelector } from "react-redux";
import { WebSocketApi } from "../../api/WebSocketApi";
import {
  addBeginningInNotifySmall,
  addNotification,
  increaseUnseen,
  setListNotification,
  setListNotificationSmall,
  setMetaInNotification,
  setUnseen,
} from "../slices/NotificationSlice";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";

export const useListNotification = () =>
  useSelector((state) => state.notification.listNotification);
export const useFilterNotification = () =>
  useSelector((state) => state.query.filterNotify);
export const useMetaInNotification = () =>
  useSelector((state) => state.notification.metaInNotification);
export const useNotificationSmall = () =>
  useSelector((state) => state.notification.listNotificationSmall);
export const useUnSeen = () =>
  useSelector((state) => state.notification.totalUnseen);

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
        dispatch(increaseUnseen());
        dispatch(addBeginningInNotifySmall(wsSocket.payload));
      }
    }
    prevSocket.current = wsSocket;
  }, [dispatch, userID, wsSocket]);
};
const fetchListNotification = (userID, filter) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListNotificationFullView(
      userID,
      filter
    );
    dispatch(setListNotification(response.data.data));
    dispatch(setUnseen(response.data.extra_data.total_unseen));
    dispatch(setMetaInNotification(response.data.meta));
  } catch (error) {
    console.log(error);
  }
};

const fetchListNotificationSmall = (userID) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListNotificationFullView(
      userID,
      "sorts[]=id_DESC&limit=6"
    );
    dispatch(setListNotificationSmall(response.data.data));
    dispatch(setUnseen(response.data.extra_data.total_unseen));
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

export const seenNotification = async (data, notifyID, userID) => {
  try {
    await WebSocketApi.SeenNotification(notifyID, userID);
    return updateSeenStatus(data, notifyID); // Return the updated result
  } catch (error) {
    console.log(error);
  }
};

export const seenNotificationInAccount = async (notifyID, userID) => {
  try {
    await WebSocketApi.SeenNotification(notifyID, userID)
      .then()
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const seenAllNotificationInAccount = async (userID) => {
  try {
    await WebSocketApi.SeenAllNotification(userID)
      .then(() => {
        toast("You seen all notification success", {
          type: "success",
          autoClose: 1000,
          onClose: setTimeout(() => {
            window.location.reload();
          }, 2000),
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
function updateSeenStatus(data, id) {
  if (Array.isArray(data)) {
    return data.map((obj) => {
      if (obj.id === id) {
        return { ...obj, seen: true };
      }
      return obj;
    });
  }
}
