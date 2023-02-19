import React from 'react'
import { RegisterForm } from '../../components/Auth/RegisterForm'
import LoginImage from "../../asset/LoginImage.png";

export const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center mb-[250px] ">
            <div className="flex flex-col items-center justify-center w-[65%] w-max-[200px]">
                <img src={LoginImage} alt="Anh login"  className="mt-10 mb-10"></img>
                <RegisterForm />
            </div>
        </div>
  )
}
