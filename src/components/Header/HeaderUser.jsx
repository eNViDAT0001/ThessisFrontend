import { WindowRounded } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const ORDER = {
  LOGIN_ROUTE: "/login",
  ORDER_ROUTE: "/order",
};
export const HeaderUser = () => {
  const navigate = useNavigate()

  const [orderRoute, setOrderRoute] = useState("/login");

  const userID = localStorage.getItem("UserID")
  useEffect(() => {
    const changeRoute = () => {
      const token = localStorage.getItem("AccessToken");
      if(token===null)
         setOrderRoute(ORDER.LOGIN_ROUTE)
      else setOrderRoute(ORDER.ORDER_ROUTE);
    };
     changeRoute()
  }, []);
  const goToCategory = (e)=>{
    localStorage.removeItem("CategorySave")
    console.log(localStorage.getItem("IDReloadCategory"))
    if(localStorage.getItem("IDReloadCategory")==0) navigate('/category/0')
    else navigate(`/category/${localStorage.getItem("IDReloadCategory")}`)
  }

  const handleClickBrand = (e)=>{
    window.location.replace("/brand")
  }
  return (
    <div className="bg-white shadow-sm px-[10%] ">
      <div className="md:flex md:justify-start md  :items-center  bg-white py-2">
        <div className="md:flex justify-start md:items-center">
          <Link to="/" className="text-gray-800 text-4xl font-semibold mr-10 ">
            CES
          </Link>
          <div className="flex flex-row text-2xl space-x-10">
            <Link
              to="/"
              className="text-gray-800 hover:text-[#FB2E86] duration-300"
            >
              Home
            </Link>
            <div
              onClick={goToCategory}
              className="text-gray-800 hover:text-[#FB2E86] duration-300"
            >
              Products
            </div>
            <div>
              <Link
                to={orderRoute}
                className="text-gray-800 hover:text-[#FB2E86] duration-300"
              >
                Order
              </Link>
            </div>

            {/* <Link
              to="/contact"
              className="text-gray-800 hover:text-[#FB2E86] duration-300"
            >
              Contact
            </Link> */}
            {!(userID) ? (<div></div>) : 
            <div
            onClick={handleClickBrand}
            className="text-gray-800 hover:text-[#FB2E86] duration-300"
          >
            Brand
          </div>}
          </div>
        </div>

      
     
      </div>
    </div>
  );
};
