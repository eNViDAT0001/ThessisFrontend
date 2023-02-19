import { AuthApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
import { UserApi } from "../../api/UserApi";
import UserDetailModel from "../models/Read/User/UserDetailModel";

const saveUserDetailRegister = async (id) => {
  await UserApi.DetailUser(id)
    .then((res) => {
      localStorage.removeItem("UserInWeb");
      const data = res.data.data;
      const userDetail = new UserDetailModel(
        data.id,
        data.username,
        data.name,
        data.birthday,
        data.gender,
        data.email,
        data.phone,
        data.avatar,
        data.type
      );
      localStorage.setItem("UserInWeb", JSON.stringify(userDetail));
      toast("Register success", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => window.location.replace("/"), 1000),
      });
    })
    .catch((error) => {
      toast("Lỗi lưu thông tin", {
        type: "error",
        autoClose: 1000,
      });
    });
};

const saveUserDetailLogin = async (id) => {
  await UserApi.DetailUser(id)
    .then((res) => {
      localStorage.removeItem("UserInWeb");
      localStorage.setItem("UserInWeb", JSON.stringify(res.data.data));
      toast("Login success", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => window.location.replace("/"), 1000),
      });
    })
    .catch((error) => {
      toast("Lỗi lưu thông tin", {
        type: "error",
        autoClose: 1000,
      });
    });
};

export const loginHook = async (body) => {
  await AuthApi.LoginUser(body)
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("AccessTokenExpiry");
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("RefreshTokenExpiry");
        localStorage.setItem(
          "AccessToken",
          response.data.data.Token.access_token
        );
        localStorage.setItem(
          "AccessTokenExpiry",
          response.data.data.Token.access_token_expiry
        );
        localStorage.setItem(
          "RefreshToken",
          response.data.data.Token.refresh_token
        );
        localStorage.setItem(
          "RefreshTokenExpiry",
          response.data.data.Token.refresh_token_expiry
        );
        localStorage.setItem("UserID", response.data.data.UserID);
        saveUserDetailLogin(localStorage.getItem("UserID"));
      }
    })
    .catch((err) => {
      if (err.response) {
        toast(err.response.data.errors[0].message, {
          autoClose: 1000,
        });
      }
    });
};

export const registerHook = async (body) => {
  await AuthApi.RegisterUser(body)
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("AccessTokenExpiry");
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("RefreshTokenExpiry");

        localStorage.setItem(
          "AccessToken",
          response.data.data.Token.access_token
        );
        localStorage.setItem(
          "AccessTokenExpiry",
          response.data.data.Token.access_token_expiry
        );
        localStorage.setItem(
          "RefreshToken",
          response.data.data.Token.refresh_token
        );
        localStorage.setItem(
          "RefreshTokenExpiry",
          response.data.data.Token.refresh_token_expiry
        );
        localStorage.setItem("UserID", response.data.data.UserID);
        saveUserDetailRegister(localStorage.getItem("UserID"));
      }
    })
    .catch((err) => {
      if (err.response) {
        toast(err.response.data.errors[0].message, {
          type: "error",
          autoClose: 1000,
        });
      }
    });
};
