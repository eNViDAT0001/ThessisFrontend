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
  filterMessage,
  wsEvent,
  handleChannel
) => {
  const dispatch = useDispatch();
  const prevFilterMessage = useRef(filterMessage);
  const prevWSEvent = useRef(wsEvent);
  const prevUserID = useRef(userID);
  const prevHandleChannel = useRef(handleChannel);

  const fetchData = useCallback(async () => {
    try {
      if (!handleChannel.to_user_id) {
        await dispatch(fetchListChannel(userID, filterChannel));
      } else {
        await dispatch(
          fetchListMessage(
            userID,
            handleChannel.to_user_id === userID
              ? handleChannel.from_user_id
              : userID,
            filterMessage,
            handleChannel
          )
        );
      }
    } catch (err) {
      // Handle errors here
    }
  });

  useEffect(() => {
    const fetchMessageMerge = async () => {
      try {
        await dispatch(
          fetchListMessageMerge(
            userID,
            handleChannel.to_user_id === userID
              ? handleChannel.from_user_id
              : userID,
            filterMessage,
            handleChannel
          )
        );
      } catch (err) {}
    };

    if (filterMessage !== prevFilterMessage.current) {
      fetchMessageMerge();
    }

    if (handleChannel !== prevHandleChannel.current) {
      dispatch(setListMessage([]));
      dispatch(setMarkerInFilterMessage(null));
      fetchData();
    }

    if (wsEvent !== prevWSEvent.current) {
      const newEvent = JSON.parse(wsEvent);
      if (newEvent.type === "ChatNewMessage") {
        const payload = newEvent.payload;
        const body = {
          chat_room_id: payload.chat_room_id,
          from_user_id: payload.from_user_id,
          content: payload.content,
          to_user_id: payload.to_user_id,
          seen: false,
          type: "TEXT",
        };
        beSentChat(body, handleChannel);
      }
    }
    prevFilterMessage.current = filterMessage;
    prevHandleChannel.current = handleChannel;
    prevWSEvent.current = wsEvent;
    prevUserID.current = userID;
  }, [dispatch, userID, filterChannel, handleChannel, filterMessage, wsEvent]);

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
