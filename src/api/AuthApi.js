import axiosClient from "./Client";
export const AuthApi = {
  LoginUser: (body) => {
    const url = "app/login";
    return axiosClient.post(url, { ...body });
  },
  RegisterUser: (body) => {
    const url = "app/register";
    return axiosClient.post(url, { ...body });
  },
  ResetPasswordUseSMTP: (email) => {
    const url = `mail/reset?email=${email}`;
    return axiosClient.post(url);
  },
  ResetPassword: (email, body) => {
    const url = `users/reset_pass/${email}`;
    return axiosClient.put(url, body);
  },
};
