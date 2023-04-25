import React from "react";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InventoryIcon from "@mui/icons-material/Inventory";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from "@mui/icons-material/Category";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserTab } from "./UserTab";
import { OrderTab } from "./OrderTab";
import { ProductTab } from "./ProductTab";

export const Layout = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    {
      id: 1,
      title: "User",
      img: <PersonIcon />,
      component: <UserTab />,
    },
    {
      id: 2,
      title: "Order",
      img: <MonetizationOnIcon />,
      component: <OrderTab />,
    },
    {
      id: 3,
      title: "Product",
      img: <InventoryIcon />,
      component: <ProductTab />,
    },
    {
      id: 4,
      title: "Shop",
      img: <StorefrontIcon />,
      component: <div>Tab 4 content</div>,
    },
    {
      id: 5,
      title: "Category",
      img: <CategoryIcon />,
      component: <div>Tab 5 content</div>,
    },
    {
      id: 6,
      title: "Banner",
      img: <AdUnitsIcon />,
      component: <div>Tab 6 content</div>,
    },
    {
      id: 7,
      title: "Log out",
      img: <LogoutIcon />,
      component: <div>Tab  content</div>,
    },
  ];

  return (
    <div className="flex space-x-4">
      <div className="w-[20%] bg-white">
        <Navigation
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      </div>
      <div className="w-full bg-white rounded-xl">
        {activeTab && activeTab.component}
      </div>
    </div>
  );
};

const NavItem = ({ tab, active, onClick }) => {
    const activeStyles = active
      ? "bg-[#FB2E86] bg-opacity-10 text-[#FB2E86]"
      : "hover:bg-[#FB2E86] hover:bg-opacity-10 text-gray-400 hover:text-[#FB2E86]";
  
    const handleClick = () => {
      if (tab.title === "Log out") {
        window.location.replace("/login");
      } else {
        onClick(tab);
      }
    };
  
    return (
      <button
        className={`flex justify-start py-2 px-4 my-2 rounded-md ${activeStyles} w-full`}
        onClick={handleClick}
      >
        <div className="flex flex-row space-x-4 ">
          {tab.img}
          <h1>{tab.title}</h1>
        </div>
      </button>
    );
  };

const Navigation = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="p-4">
      {tabs.map((tab) => (
        <NavItem
          key={tab.id}
          tab={tab}
          active={activeTab && activeTab.id === tab.id}
          onClick={onTabClick}
        />
      ))}
    </div>
  );
};
