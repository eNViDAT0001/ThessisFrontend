import { useDispatch, useSelector } from "react-redux";
import { WebSocketApi } from "../../api/WebSocketApi";
import { useEffect } from "react";
import { addMessageSuccess, setListChannel, setListMessage } from "../slices/ChatSlice";
import { toast } from "react-toastify";

export const useListChannel = () =>
  useSelector((state) => state.chat.listChannel);
export const useListMessage = () =>
  useSelector((state) => state.chat.listMessage);

export const useFetchChat = (userID, filterChannel, user2ID, filterMessage) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user2ID) {
          await dispatch(fetchListChannel(userID, filterChannel));
        } else {
          await dispatch(fetchListMessage(userID, user2ID, filterMessage));
        }
      } catch (err) {}
    };
    fetchData();
  }, [dispatch, user2ID, filterChannel, userID, filterMessage]);
};

const fetchListMessage = (user1ID, user2ID, filter) => async (dispatch) => {
  try {
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
      title: message.user_id,
    }));
    dispatch(setListMessage(transformedData));
  } catch (error) {
    console.log(error);
  }
};

const fetchListChannel = (userID, filter) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListChannel(userID, filter);
    const originalData = response.data.data;
    const transformedData = originalData.map((channel) => ({
      id: channel.channel_id,
      user_id: channel.user_id,
      title: channel.name,
      avatar: channel.avatar,
      subtitle: "Wanna some funny, you?",
      unread: 3,
    }));
    dispatch(setListChannel(transformedData));
  } catch (error) {
    console.log(error);
  }
};

export const sendChat =  (body) => async(dispatch) =>{
  await WebSocketApi.SendMessage(body)
    .then((res) => {
      const response = res.data.data
      const transformedData = {
        position: "right",
        type: "text",
        text: response.content,
        title: response.user_id,
      }
      dispatch(addMessageSuccess(transformedData))
    })
    .catch(() => {
      toast("Send failed", {
        type: "error",
        autoClose: 1000,
      });
    });
};
