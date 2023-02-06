
import axiosClient from "./Client";
export const AuthApi = {
    LoginUser:(body) =>{
        const url = "app/login"
        return axiosClient.post(url,{...body})
    },
    RegisterUser:(body) =>{
        const url = "app/register"  
        return axiosClient.post(url,{...body})
    },
}