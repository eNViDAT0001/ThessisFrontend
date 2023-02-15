import { AuthApi } from "../../api/AuthApi";

export const Login = (body) =>{
    AuthApi.LoginUser(body)
}

export const Register = (body) =>{
    AuthApi.RegisterUser(body)
}