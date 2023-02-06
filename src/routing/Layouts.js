import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { HeaderMain } from "../components/Header/HeaderMain";

export const LoginLayOut = () => {
  return(
    <div>
      <HeaderMain />
        <Outlet></Outlet>
      <Footer />
    </div>
  )
}
export const UserLayout = () => {
  return (
    <div>
      <Header />
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
