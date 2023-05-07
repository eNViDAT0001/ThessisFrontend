import { Divider } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export const Footer = () => {
  return (
    <div className="bg-gray-800 py-12 lg:py-16 px-7">
      <div className="container mx-auto px-4 lg:px-8 flex justify-center">
        <div className="w-[70%] flex justify-between ">
          <div className="text-gray-400 flex  flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Our new category</h2>
            <ul className="text-sm flex items-center flex-col">
              <li className=" hover:text-white hover:underline">
                Men's Fashion
              </li>
              <li className=" hover:text-white hover:underline">
                Women's Fashion
              </li>
              <li className=" hover:text-white hover:underline">
                Children's Fashion
              </li>
              <li className=" hover:text-white hover:underline">Food</li>
              <li className=" hover:text-white hover:underline">Drink</li>
            </ul>
          </div>
          <div className="text-gray-400 flex  flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Support</h2>
            <ul className="text-sm flex items-center flex-col">
              <li className=" hover:text-white hover:underline">FAQ</li>
              <li className=" hover:text-white hover:underline">
                Warranty Policy
              </li>
              <li className=" hover:text-white hover:underline">
                Terms of Use
              </li>
              <li className=" hover:text-white hover:underline">
                Theme's Guide
              </li>
              <li className=" hover:text-white hover:underline">About Us</li>
              <li className=" hover:text-white hover:underline">Contact Us</li>
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
