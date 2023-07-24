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
import { AccountOrderPage } from "../pages/AccountPage/AccountOrderPage";
import { AdminPage } from "../pages/AdminPage/AdminPage";
import { ResetPage } from "../pages/AuthPage/ResetPage";
import { OrderDetailPage } from "../pages/OrderPage/OrderDetailPage";
import { AddCommentPage } from "../pages/OrderPage/AddCommentPage";
import { BannerDetailPage } from "../pages/Home/BannerDetailPage";
import { FixProductInBrand } from "../components/Brand/FixProduct/FixProductInBrand";
import { UpdateBannerPage } from "../components/Admin/BannerComponentInAdmin/UpdateBannerPage";
import { AccountNotificationPage } from "../pages/AccountPage/AccountNotificationPage";
import { UpdateBrandPage } from "../pages/BrandPage/UpdateBrandPage";
import { UpdateCouponPage } from "../pages/CouponPage/UpdateCouponPage";

export const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayOut />}>
          <Route path="/admin/*" element={<AdminPage />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route
            path="/product/:id"
            element={<ProductDetailPage type="product" />}
          />
          <Route
            path="/product/:id/brand"
            element={<ProductDetailPage type="brand" />}
          />
          <Route path="/shop" element={<BrandPage />} />
          <Route path="/banner/:id" element={<BannerDetailPage />} />
          <Route path="/banner/:id/edit" element={<UpdateBannerPage />} />
          <Route path="/brand-detail/:id" element={<BrandDetailPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/shopping-order/:id" element={<ShoppingOrderPage />} />
          <Route path="/account-detail/:id" element={<AccountDetailPage />} />
          <Route path="/account-address/:id" element={<AccountAddressPage />} />
          <Route
            path="/account-address/create"
            element={<CreateAddressPage />}
          />
          <Route
            path="/user/order/:id"
            element={<OrderDetailPage type="user" />}
          />
          <Route
            path="/user/notification/:id"
            element={<AccountNotificationPage />}
          />
          <Route
            path="/brand-detail/order/:id"
            element={<OrderDetailPage type="brand" />}
          />
          <Route
            path="/admin/order/:id"
            element={<OrderDetailPage type="admin" />}
          />

          <Route path="/comment/:id" element={<AddCommentPage />} />
          <Route
            path="/account-address/:id/edit"
            element={<FixAddressPage />}
          />
          <Route path="/account-order/:id" element={<AccountOrderPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/add-product-in-brand/:id"
            element={<AddProductInBrand />}
          />
          <Route path="/product/:id/edit" element={<FixProductInBrand />} />
          <Route path="/brand-detail/:id/edit" element={<UpdateBrandPage />} />
          <Route path="/coupon/:id/edit" element={<UpdateCouponPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<LoginLayOut />}>
          <Route path="/forget-password" element={<ResetPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
