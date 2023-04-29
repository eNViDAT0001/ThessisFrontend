import axiosClient from "./Client";
export const FeedbackApi = {
  AddNewFeedback: (body) => {
    const url = `mail/feedback`;
    return axiosClient.post(url,body);
  },

};
