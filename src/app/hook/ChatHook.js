import { useDispatch, useSelector } from "react-redux";
import { WebSocketApi } from "../../api/WebSocketApi";
import { useEffect, useRef } from "react";
import {
  addMessageSuccess,
  setListChannel,
  setListMessage,
} from "../slices/ChatSlice";
import { toast } from "react-toastify";
import { useUserDetail } from "./UserHook";

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

export const useFetchChat = (
  userID,
  filterChannel,
  user2ID,
  filterMessage,
  wsEvent,
  dataChat
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user2ID) {
          await dispatch(fetchListChannel(userID, filterChannel));
        } else {
          await dispatch(
            fetchListMessage(userID, user2ID, filterMessage, dataChat)
          );
        }
      } catch (err) {}
    };

    fetchData();
  }, [
    dispatch,
    user2ID,
    filterChannel,
    userID,
    filterMessage,
    wsEvent,
    dataChat,
  ]);
};

const fetchListMessageMerge =
  (user1ID, user2ID, filter, dataChat) => async (dispatch) => {
    try {
      const userDetail = useUserDetail();
      const response = await WebSocketApi.GetListMessage(
        user1ID,
        user2ID,
        filter
      );
      const originalData = response.data.data;
      const transformedData = originalData.map((message) => ({
        position: user1ID === message.user_id ? "right" : "left",
        type: "text",
        text: message.content,
        title: user1ID === message.user_id ? userDetail.name : dataChat.title,
      }));
      dispatch(addMessageSuccess(transformedData.reverse()));
    } catch (error) {
      console.log(error);
    }
  };

const fetchListMessage =
  (user1ID, user2ID, filter, dataChat) => async (dispatch) => {
    try {
      const userDetail = useUserDetail();
      const response = await WebSocketApi.GetListMessage(
        user1ID,
        user2ID,
        filter
      );
      const originalData = response.data.data;
      const transformedData = originalData.map((message) => ({
        position: user1ID === message.user_id ? "right" : "left",
        type: "text",
        text: message.content,
        title: user1ID === message.user_id ? userDetail.name : dataChat.title,
      }));
      dispatch(setListMessage(transformedData.reverse()));
    } catch (error) {
      console.log(error);
    }
  };

const fetchListChannel = (userID, filter) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListChannel(userID, filter);
    const originalData = response.data.data;
    dispatch(setListChannel(originalData));
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
