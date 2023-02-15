import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/AuthPage/LoginPage";
import { RegisterPage } from "../pages/AuthPage/RegisterPage";
import { HomePage } from "../pages/Home/HomePage";
import { AdminLayOut, LoginLayOut, UserLayout } from "./Layout";

export const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayOut />}></Route>
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<LoginLayOut />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
