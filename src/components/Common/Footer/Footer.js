import { Divider } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
const layoutFirstFooter = [
  {
    id: 1,
    name: "Men's Fashion",
    url: "/category/1",
  },
  {
    id: 2,
    name: "Women's Fashion",
    url: "/category/2",
  },
  {
    id: 3,
    name: "Accessories",
    url: "/category/3",
  },
  {
    id: 4,
    name: "CategoryTest",
    url: "/category/32",
  },
];
export const Footer = () => {
  return (
    <div className="bg-gray-800 py-12 lg:py-16 px-7">
      <div className="container mx-auto px-4 lg:px-8 flex justify-center">
        <div className="w-[70%] flex justify-between ">
          <div className="text-gray-400 flex  flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Our new category</h2>
            <ul className="text-sm flex items-center flex-col">
              {layoutFirstFooter.map((data) => (
                <Link key={data.id} to={data.url}>
                  <h1>{data.name}</h1>
                </Link>
              ))}
            </ul>
          </div>
          <div className="text-gray-400 flex  flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Support</h2>
            <ul className="text-sm flex items-center flex-col">
              {/* <li className=" hover:text-white hover:underline">FAQ</li>
              <li className=" hover:text-white hover:underline">
                Warranty Policy
              </li>
              <li className=" hover:text-white hover:underline">
                Terms of Use
              </li>
              <li className=" hover:text-white hover:underline">
                Theme's Guide
              </li>
              <li className=" hover:text-white hover:underline">About Us</li> */}
              <Link to="/contact" className=" hover:text-white hover:underline">
                Contact Us
              </Link>
            </ul>
          </div>
          <div className="text-gray-400 mb-8 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Social</h2>
            <ul className="text-sm flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <TwitterIcon />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <InstagramIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
