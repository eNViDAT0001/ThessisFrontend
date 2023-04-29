import { FeedbackApi } from "../../api/FeedbackApi";
import { toast } from "react-toastify";

export const sendFeedback = async (body) => {
  await FeedbackApi.AddNewFeedback(body)
    .then(() => {
      toast("Your feedback be sent successful", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => {
          window.location.reload();
        }, 2000),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
