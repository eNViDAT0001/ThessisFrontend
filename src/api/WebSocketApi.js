import axios from "axios";
import axiosClient from "./Client";
export const WebSocketApi = {
  GetListChannel: (userID, filter) => {
    const url = `/chats/channels/users/${userID}?${filter}`;
    return axiosClient.get(url);
  },
  GetListMessage: (user1ID, user2ID, filter) => {
    const url = `/chats/channels/user_a/${user1ID}/user_b/${user2ID}?${filter}`;
    return axiosClient.get(url);
  },
  SendMessage: (body) => {
    const url = `/chats`;
    return axiosClient.post(url, body);
  },

  GetListNotification: (userID, filter) => {
    const url = `/notifications/users/${userID}?${filter}`;
    return axiosClient.get(url);
  },
  SeenNotification: (notifyID, userID) => {
    const url = `/notifications/${notifyID}/user/${userID}`;
    return axiosClient.patch(url);
  },
  SeenAllNotification: (userID) => {
    const url = `/notifications/user/${userID}`;
    return axiosClient.patch(url);
  },
};
