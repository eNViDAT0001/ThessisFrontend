import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/AuthPages/LoginPage/LoginPage";
import AddressPage from "../pages/AccountPages/AddressPage";
import AddressDetailPage from "../pages/AccountPages/AddressDetailPage";
import AccountDetailPage from "../pages/AccountPages/AccountDetailPage";
import AccountOrderPage from "../pages/AccountPages/AccountOrderPage";
import RegisterPage from "../pages/AuthPages/RegisterPage/RegisterPage";
import CartPage from "../pages/CartPages/CartPage";
import CategoryPage from "../pages/CategoryPages/CategoryPages";
import HomePage from "../pages/HomePages/HomePages";
import OrderPage from "../pages/OrderPages/OrderPage";
import ProductPage from "../pages/Product/ProductPage";
import ContactPage from "../pages/StorePages/ContactPage";
import FAQPage from "../pages/StorePages/FAQPage";
import NotFoundPage from "../pages/StorePages/NotFoundPage";
import OrderCompletedPage from "../pages/StorePages/OrderCompletedPage";
//test git
import { AdminLayOut } from "./Layouts";
import { UserLayout,LoginLayOut } from "./Layouts";
import CreateAddressPage from "../pages/AccountPages/CreateAddressPage";
import { FixAddressPage } from "../pages/AccountPages/FixAddressPage";
import { AdminPages } from "../pages/AdminPages/AdminPages";
import { BrandPages } from "../pages/BrandPages/BrandGeneral";
import { BrandDetailPages } from "../pages/BrandPages/BrandDetailPages";
import { BannerDetailPage } from "../pages/HomePages/BannerDetailPage";
import { OrderDetailPages } from "../pages/OrderPages/OrderDetailPages";
import { AddProductInBrand } from "../components/Brand/AddProduct/AddProductInBrand";

function MainRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayOut />}>
          <Route path="/admin/:id" element={<AdminPages />} />
        </Route>

        <Route element={<LoginLayOut />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/detail/:id" element={<OrderDetailPages />} />

          <Route path="/shopping-cart" element={<CartPage />} />
          <Route path="/account-order/:id" element={<AccountOrderPage />} /> 
          <Route path="/address/:id" element={<AddressPage />} />
          <Route path="/detail/:id" element={<AccountDetailPage />} />
          <Route path="/address-detail/:id" element={<AddressDetailPage />} />
          <Route path="/address-fix/:id" element={<FixAddressPage />} />

          <Route path="/address-create" element={<CreateAddressPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="/completed" element={<OrderCompletedPage/>}/>
          <Route path="/brand" element={<BrandPages/>} />
          <Route path="/brand-detail/:id" element={<BrandDetailPages/>} />
          <Route path="/notification/:id" element={<NotFoundPage/>} />
          <Route path="/add-product-in-brand/:id" element={<AddProductInBrand />} />
          <Route path="/banner-detail/:id" element={<BannerDetailPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default MainRoute;
