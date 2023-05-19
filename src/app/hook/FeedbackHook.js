import { FeedbackApi } from "../../api/FeedbackApi";
import { toast } from "react-toastify";

// const body = {
//   email: email,
//   name: name,
//   subject: subject,
//   descriptions: descriptions,
// };

export const sendFeedback = async (body) => {
  if((body.email==="") || (body.name==="") || (body.subject==="") || (body.descriptions==="")) {
    toast("Must fill all information", {
      type: "warning",
      autoClose: 1000,
    });
  }
  else{
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
  }
};
