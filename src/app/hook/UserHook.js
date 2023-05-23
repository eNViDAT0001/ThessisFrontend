import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserApi } from "../../api/UserApi";
import { setListUserInAdmin, setMetaUserInAdmin } from "../slices/UserSlice";
import { useEffect } from "react";

export const useUserInformation = () =>
  useSelector((state) => state.user.userInformation);
export const useUserID = () => JSON.parse(localStorage.getItem("UserID")) - 0;
export const useUserDetail = () =>
  JSON.parse(localStorage.getItem("UserInWeb"));
export const useListUser = () =>
  useSelector((state) => state.user.listUserInAdmin);
export const useMetaUserInAdmin = () =>
  useSelector((state) => state.user.metaUserInAdmin);
export const useFilterUserInAdmin = () =>
  useSelector((state) => state.query.filterUserTabAdmin);

export const useFetchListUser = async (filters) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchListUser(filters));
  }, [dispatch, filters]);
};

export const fetchListUser = (filters) => async (dispatch) => {
  try {
    const response = await UserApi.GetListUser(filters);
    const listUser =
      response.data.data &&
      response.data.data.map((data) => {
        return { ...data, isSelected: false };
      });
    dispatch(setListUserInAdmin(listUser));
    dispatch(setMetaUserInAdmin(response.data.meta));
  } catch (err) {
    console.log(err);
  }
};

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
    var userTemp = useUserID();
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

export const updateUserInAdmin = async (userID, body) => {
  await UserApi.UpdateUserInAdmin(userID, body).then(() => {
    toast("Update Type Success", {
      type: "success",
      autoClose: 1000,
    });
  });
};
export const resetPassword = async (userID, body) => {
  await UserApi.UpdateNewPassword(userID, body).then((res) => {
    switch (res.status) {
      case 200:
        toast("Change password successfully", {
          type: "success",
          autoClose: 1000,
          Close: setTimeout(() => window.location.reload(), 1000),
        });
        break;
      case 204:
        toast("Change password failed ", {
          type: "error",
          autoClose: 1000,
          Close: setTimeout(() => window.location.reload(), 1000),
        });
        break;
      default:
        toast("An unknown error", {
          type: "error",
          autoClose: 1000,
          Close: setTimeout(() => window.location.reload(), 1000),
        });
    }
  });
};

export const banListUser = (body) => async (dispatch) => {
  await UserApi.BanListUser(body).then(() => {
    toast("Ban list user successfully", {
      type: "success",
      autoClose: 1000,
      Close: setTimeout(() => window.location.reload(), 1000),
    });
  });
};

export const selectUser = (arr, userID) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((user) => {
    if (user.id === userID) {
      return {
        ...user,
        isSelected: !user.isSelected,
      };
    }
    return user;
  });
};
