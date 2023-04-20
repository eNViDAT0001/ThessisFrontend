import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddProductInBrand } from "../components/Brand/AddProduct/AddProductInBrand";
import AccountDetailPage from "../pages/AccountPage/AccountDetailPage";
import { LoginPage } from "../pages/AuthPage/LoginPage";
import { RegisterPage } from "../pages/AuthPage/RegisterPage";
import { BrandDetailPage } from "../pages/BrandPage/BrandDetailPage";
import { BrandPage } from "../pages/BrandPage/BrandPage";
import { HomePage } from "../pages/Home/HomePage";
import { ProductDetailPage } from "../pages/ProductDetailPage/ProductDetailPage";
import { NotFound } from "../pages/SpecialPage/NotFound";
import { AdminLayOut, LoginLayOut, UserLayout } from "./Layout";
import { ContactPage } from "../pages/Contact/ContactPage";
import { AccountAddressPage } from "../pages/AccountPage/AccountAddressPage";
import CreateAddressPage from "../components/Account/Address/CreateNewAddress";
import { CartPage } from "../pages/Shopping/CartPage";
import { FixAddressPage } from "../components/Account/Address/FixAddress";
import ShoppingOrderPage from "../pages/ShoppingOrderPage/ShoppingOrderPage";
import { CategoryPage } from "../pages/CategoryPage/CategoryPage";

export const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayOut />}></Route>
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/shop" element={<BrandPage />} />
          <Route path="/brand-detail/:id" element={<BrandDetailPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/shopping-order/:id" element={<ShoppingOrderPage />} />
          <Route path="/account-detail/:id" element={<AccountDetailPage />} />
          <Route path="/account-address/:id" element={<AccountAddressPage />} />
          <Route path="/account-address/create" element={<CreateAddressPage />} />
          <Route path="/account-address/:id/edit" element={<FixAddressPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/add-product-in-brand/:id"
            element={<AddProductInBrand />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<LoginLayOut />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
