import { useDispatch, useSelector } from "react-redux";
import { WebSocketApi } from "../../api/WebSocketApi";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  addBeginningInChannel,
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
import { convertObjectToStringQuery } from "./CommonHook";

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
  const prevFilterChannel = useRef(filterChannel);
  const prevFilterMessage = useRef(filterMessage);
  const prevWSEvent = useRef(wsEvent);
  const prevUserID = useRef(userID);
  const prevHandleChannel = useRef(handleChannel);

  const fetchData = useCallback(async () => {
    try {
      dispatch(setListMessage([]));
      dispatch(setMarkerInFilterMessage(null));
      if (!handleChannel.to_user_id) {
        await dispatch(fetchListChannel(userID, filterChannel));
      } else {
        await dispatch(
          fetchListMessage(
            userID,
            handleChannel.to_user_id === userID
              ? handleChannel.from_user_id
              : handleChannel.to_user_id,
            filterMessage,
            handleChannel
          )
        );
      }
    } catch (err) {
      // Handle errors here
    }
  });

  const fetchMessageMerge = async () => {
    try {
      await dispatch(
        fetchListMessageMerge(
          userID,
          handleChannel.to_user_id === userID
            ? handleChannel.from_user_id
            : handleChannel.to_user_id,
          filterMessage,
          handleChannel
        )
      );
    } catch (err) {}
  };
  useLayoutEffect(() => {
    if (filterChannel !== prevFilterChannel.current) {
      if (filterChannel.name.value !== prevFilterChannel.current.name.value) {
        dispatch(fetchListChannel(userID, filterChannel));
      } else if (
        filterChannel.marker.value !== prevFilterChannel.current.marker.value
      ) {
        dispatch(fetchMergeListChannel(userID, filterChannel));
      }
    }

    if (filterMessage !== prevFilterMessage.current) {
      fetchMessageMerge();
    }

    if (handleChannel !== prevHandleChannel.current) {
      dispatch(
        fetchListMessage(
          userID,
          handleChannel.to_user_id === userID
            ? handleChannel.from_user_id
            : handleChannel.to_user_id,
          filterMessage,
          handleChannel
        )
      );
    }

    prevFilterMessage.current = filterMessage;
    prevHandleChannel.current = handleChannel;
    prevUserID.current = userID;
    prevFilterChannel.current = filterChannel;
  }, [dispatch, userID, filterChannel, handleChannel, filterMessage]);

  useEffect(() => {
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
        beSentChat(body, handleChannel, dispatch);
      }
    }
    prevWSEvent.current = wsEvent;
  }, [wsEvent, dispatch, handleChannel]);
  useEffect(() => {
    fetchData(); // Call fetchData when the component is mounted
  }, []); // Empty dependency array ensures it runs only once on mount
};

const fetchMergeListChannel = (userID, filter) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListChannel(
      userID,
      convertObjectToStringQuery(filter)
    );
    const originalData = response.data.data;
    const meta = response.data.meta;

    dispatch(addBeginningInChannel(originalData));
    dispatch(setMetaInListChannel(meta));
  } catch (error) {
    console.log(error);
  }
};
const fetchListChannel = (userID, filter) => async (dispatch) => {
  try {
    const response = await WebSocketApi.GetListChannel(
      userID,
      convertObjectToStringQuery(filter)
    );

    const channelBot = {
      "id": "bot",
      "from_user_id": "bot",
      "to_user_id": 1,
      "content": "Chào bạn, bạn có sử dụng dịch vụ gì của trang web ạ?",
      "seen": true,
      "type": "TEXT",
      "created_at": "2023-06-26T02:50:56Z",
      "name": "Bot",
      "avatar": "https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw="
    }
    const originalData = response.data.data;
    originalData.push(channelBot)
    const meta = response.data.meta;

    dispatch(setListChannel(originalData));
    dispatch(setMetaInListChannel(meta));
  } catch (error) {
    console.log(error);
  }
};

const fetchListMessageMerge =
  (user1ID, user2ID, filter, handleChannel) => async (dispatch) => {
    try {
      const userDetail = useUserDetail();
      const response = await WebSocketApi.GetListMessage(
        user1ID,
        user2ID,
        convertObjectToStringQuery(filter)
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
        convertObjectToStringQuery(filter)
      );
      const messageIdSeen = response.data.data[0].id;
      await WebSocketApi.SeenMessage(messageIdSeen, user2ID, user1ID)
        .then(() => {
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
        })
        .catch(() => {
          toast("Update seen failed", {
            type: "error",
            autoClose: 1000,
          });
        });
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

export const beSentChat = async (body, handleChannel, dispatch) => {
  const transformedData = {
    position: "left",
    type: "text",
    text: body.content,
    avatar: handleChannel.avatar,
  };
  dispatch(addMessageSuccess(transformedData));
};
