import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserApi } from "../../api/UserApi";

export const useUserInformation = () =>
  useSelector((state) => state.user.userInformation);

export const useUserID = () => String(JSON.parse(localStorage.getItem("UserID")));

export const useUserDetail = () => JSON.parse(localStorage.getItem("UserInWeb"));

export const updateUser = async (userID, body, birthday, avatar) => {
  await UserApi.UpdateUser(userID, body).then((res) => {
    var userTemp = JSON.parse(localStorage.getItem("UserInWeb"));
    userTemp["birthday"] = birthday;
    userTemp["avatar"] = avatar;

    localStorage.removeItem("UserInWeb");
    localStorage.setItem("UserInWeb", JSON.stringify(userTemp));
    toast("Update User Success", {
      type: "success",
      autoClose: 1000,
      Close: setTimeout(() => window.location.reload(), 1000),
    });
  });
};

export const updatePhoneUser = async (userID, body, phoneInformation) => {
  await UserApi.UpdateUser(userID, body).then((res) => {
    var userTemp = JSON.parse(localStorage.getItem("UserInWeb"));
    userTemp["phone"] = phoneInformation;
    localStorage.removeItem("UserInWeb");
    localStorage.setItem("UserInWeb", JSON.stringify(userTemp));
    toast("Update phone success", {
      type: "success",
      autoClose: 1000,
      Close: setTimeout(() => window.location.reload(), 1000),
    });
  });
};

export const updateEmailUser = async (userID, body, email) => {
  await UserApi.UpdateUser(userID, body).then((res) => {
    var userTemp = JSON.parse(localStorage.getItem("UserInWeb"));
    userTemp["email"] = email;
    localStorage.removeItem("UserInWeb");
    localStorage.setItem("UserInWeb", JSON.stringify(userTemp));
    toast("Update Email Success", {
      type: "success",
      autoClose: 1000,
      Close: setTimeout(() => window.location.reload(), 1000),
    });
  });
};
