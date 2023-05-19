import { useDispatch, useSelector } from "react-redux";
import { WebSocketApi } from "../../api/WebSocketApi";
import { useEffect, useRef } from "react";
import {
  addBeginningInMessage,
  addMessageSuccess,
  setListChannel,
  setListMessage,
  setMetaInListChannel,
  setMetaInListMessage,
} from "../slices/ChatSlice";
import { toast } from "react-toastify";
import { useUserDetail } from "./UserHook";
import { setMarkerInFilterMessage } from "../slices/QuerySlice";
import { useCallback } from "react";

export const useListChannel = () =>
  useSelector((state) => state.chat.listChannel);
export const useListMessage = () =>
  useSelector((state) => state.chat.listMessage);
export const useIsOpenButtonChat = () =>
  useSelector((state) => state.webSocket.isOpenButtonChat);
export const useHandleChannel = () =>
  useSelector((state) => state.chat.handleChannel);

export const useFilterChannel = () =>
  useSelector((state) => state.query.filterChannel);
export const useFilterMessage = () =>
  useSelector((state) => state.query.filterMessage);

export const useMetaInListMessage = () =>
  useSelector((state) => state.chat.metaInListMessage);
export const useMetaInListChannel = () =>
  useSelector((state) => state.chat.metaInListChannel);

export const useFetchChat = (
  userID,
  filterChannel,
  user2ID,
  filterMessage,
  wsEvent,
  handleChannel
) => {
  const dispatch = useDispatch();
  const prevFilterMessage = useRef(filterMessage);
  const prevUser2ID = useRef(user2ID);
  const prevWSEvent = useRef(wsEvent);

  const fetchData = useCallback(async () => {
    try {
      if (!user2ID) {
        await dispatch(fetchListChannel(userID, filterChannel));
      } else {
        await dispatch(
          fetchListMessage(userID, user2ID, filterMessage, handleChannel)
        );
      }
    } catch (err) {
      // Handle errors here
    }
  });

  useEffect(() => {
    const fetchMessageMerge = async () => {
      try {
        //alert("filter")
        await dispatch(
          fetchListMessageMerge(userID, user2ID, filterMessage, handleChannel)
        );
      } catch (err) {
        // Handle errors here
      }
    };

    if (filterMessage !== prevFilterMessage.current) {
      fetchMessageMerge();
    }

    if (user2ID !== prevUser2ID.current) {
      dispatch(setListMessage([]));
      dispatch(setMarkerInFilterMessage(null));
      fetchData();
    }
    //alert(wsEvent);

    if (wsEvent !== prevWSEvent.current) {
      const newEvent = JSON.parse(wsEvent);
      if (newEvent.type == "ChatNewMessage") {
        beSentChat(newEvent.payload, handleChannel);
      }
    }
    prevFilterMessage.current = filterMessage;
    prevUser2ID.current = user2ID;
    prevWSEvent.current = wsEvent;
  }, [dispatch, userID, user2ID, filterChannel, handleChannel, filterMessage]);

  useEffect(() => {
    fetchData(); // Call fetchData when the component is mounted
  }, []); // Empty dependency array ensures it runs only once on mount
};

const fetchListMessageMerge =
  (user1ID, user2ID, filter, handleChannel) => async (dispatch) => {
    try {
      const userDetail = useUserDetail();
      const response = await WebSocketApi.GetListMessage(
        user1ID,
        user2ID,
        filter
      );
      const originalData = response.data.data;
      const transformedData = originalData.map((message) => ({
        position: user1ID === message.from_user_id ? "right" : "left",
        type: "text",
        text: message.content,
        title:
          user1ID === message.from_user_id
            ? userDetail.name
            : handleChannel.name,
        avatar:
          user1ID === message.from_user_id
            ? userDetail.avatar
            : handleChannel.avatar,
      }));
      dispatch(addBeginningInMessage(transformedData.reverse()));
      dispatch(setMetaInListMessage(response.data.meta));
    } catch (error) {
      console.log(error);
    }
  };

const fetchListMessage =
  (user1ID, user2ID, filter, handleChannel) => async (dispatch) => {
    try {
      const userDetail = useUserDetail();
      const response = await WebSocketApi.GetListMessage(
        user1ID,
        user2ID,
        filter
      );
      const originalData = response.data.data;
      const transformedData = originalData.map((message) => ({
        position: user1ID === message.from_user_id ? "right" : "left",
        type: "text",
        text: message.content,
        title:
          user1ID === message.from_user_id
            ? userDetail.name
            : handleChannel.name,
        avatar:
          user1ID === message.from_user_id
            ? userDetail.avatar
            : handleChannel.avatar,
      }));
      const meta = response.data.meta;
      dispatch(setListMessage(transformedData.reverse()));
      dispatch(setMetaInListMessage(meta));
    } catch (error) {
      console.log(error);
    }
  };

const fetchListChannel = (userID, filter) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListChannel(userID, filter);
    const originalData = response.data.data;
    const meta = response.data.meta;

    dispatch(setListChannel(originalData));
    dispatch(setMetaInListChannel(meta));
  } catch (error) {
    console.log(error);
  }
};

export const sendChat = (body) => async (dispatch) => {
  const userDetail = useUserDetail();
  await WebSocketApi.SendMessage(body)
    .then((res) => {
      const response = res.data.data;
      const transformedData = {
        position: "right",
        type: "text",
        text: response.content,
        title: userDetail.name,
        avatar: userDetail.avatar,
      };
      dispatch(addMessageSuccess(transformedData));
    })
    .catch(() => {
      toast("Send failed", {
        type: "error",
        autoClose: 1000,
      });
    });
};

export const beSentChat = (body, handleChannel) => async (dispatch) => {
  await WebSocketApi.SendMessage(body)
    .then((res) => {
      const response = res.data.data;
      const transformedData = {
        position: "left",
        type: "text",
        text: response.content,
        avatar: handleChannel.avatar,
      };
      dispatch(addMessageSuccess(transformedData));
    })
    .catch(() => {
      toast("Send failed", {
        type: "error",
        autoClose: 1000,
      });
    });
};
