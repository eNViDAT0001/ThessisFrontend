import React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link } from "react-router-dom";
const LinkInHeader = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Category",
    link: "/category",
  },
  {
    name: "Order",
    link: "/order",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Shop",
    link: "/shop",
  },
];
export const HeaderUser = () => {
  return (
    <div className="w-full bg-[#FFFFFF] flex justify-center border-b">
      <div className="w-[80%] py-[30px]">
        <div className="flex justify-between items-center">
          <div className="font-['Inter'] font-bold text-[#131313] text-lg uppercase ">
            <div className="flex flex-row space-x-[30px]">
              {LinkInHeader.map((data) => (
                <Link to={data.link}>
                  <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                    {data.name}
                  </h1>{" "}
                </Link>
              ))}
            </div>
          </div>
          <div className="hover:cursor-pointer ">
            <StorefrontIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
