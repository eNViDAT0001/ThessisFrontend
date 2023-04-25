import React from 'react'
import LoginImage from "../../asset/LoginImage.png";
import { ResetPasswordForm } from '../../components/Auth/ResetPasswordForm';
export const ResetPage = () => {
  return (
    <div className="flex justify-center items-center mb-[250px] ">
    <div className="flex flex-col items-center justify-center w-[65%] w-max-[200px]">
        <img src={LoginImage} alt="Anh login"  className="mt-10 mb-10"></img>
        <ResetPasswordForm />
    </div>
</div>  )
}
