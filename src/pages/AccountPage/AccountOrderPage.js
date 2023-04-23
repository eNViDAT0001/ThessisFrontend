import React from "react";
import HeaderBar from "../../components/Common/HeaderBar";
import ChangeBarInformation from "../../components/Account/ChangeBarInformation";
import { OrderTab } from "../../components/Account/Order/OrderTab";
import { useParams } from "react-router-dom";
import { useFetchOrderInAccount, useFilterOrderInAccount } from "../../app/hook/OrderHook";
import { convertObjectToStringQuery } from "../../app/hook/CommonHook";

export const AccountOrderPage = () => {
  const { id } = useParams();

  const filterOrderInAccountPage = useFilterOrderInAccount()

  useFetchOrderInAccount(id, convertObjectToStringQuery(filterOrderInAccountPage));       
  return (
    <div>
      <HeaderBar name1="Home .Account" name2=" . Orders" />
      <div className="flex justify-center">
        <div className=" w-[85%] h-full flex flex-row mb-[500px]">
          <ChangeBarInformation id={id} />
          <OrderTab />
        </div>
      </div>
    </div>
  );
};
