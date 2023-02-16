import { AuthApi } from "../../api/AuthApi";
import { toast } from "react-toastify";

export const LoginHook = async (body) => {
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

export const Register = (body) => {
  AuthApi.RegisterUser(body);
};
