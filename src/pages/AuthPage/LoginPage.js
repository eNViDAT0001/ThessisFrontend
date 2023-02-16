import React from "react";
import { LoginForm } from "../../components/Auth/LoginForm";
import LoginImage from "../../asset/LoginImage.png";

export const LoginPage = () => {
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col items-center justify-center w-[65%] w-max-[200px]">
        <img src={LoginImage} alt="Anh login" className="mt-10 mb-10"></img>
        <LoginForm />
      </div>
    </div>
  );
};
