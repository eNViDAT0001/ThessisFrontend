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
      <div className="sticky top-0 z-50 ">
        <Header />
        <HeaderUser />
      </div>

      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
export const AdminLayOut = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 ">
        <Header />
      </div>

      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
