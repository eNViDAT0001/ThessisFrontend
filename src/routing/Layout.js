import { Outlet } from "react-router-dom";
import { Footer } from "../components/Common/Footer/Footer";
import { Header } from "../components/Common/Header";
import { HeaderUser } from "../components/Common/HeaderUser";

export const LoginLayOut = () => {
  return (
    <div>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
export const UserLayout = () => {
  return (
    <div>
      <Header />
      <HeaderUser />

      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
export const AdminLayOut = () => {
  return (
    <div>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
