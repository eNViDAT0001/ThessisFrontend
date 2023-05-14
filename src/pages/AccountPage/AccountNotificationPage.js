import React from "react";
import { useParams } from "react-router-dom";
import HeaderBar from "../../components/Common/HeaderBar";
import ChangeBarInformation from "../../components/Account/ChangeBarInformation";
import { NotificationInAccount } from "../../components/Account/Notification/NotificationInAccount";

export const AccountNotificationPage = () => {
  const { id } = useParams();

  return (
    <div className="font-['Josefin_Sans']">
      <div className="flex flex-col w-full">
        <HeaderBar name1="Home .Account" name2=" . Detail" />
        <div className="flex justify-center">
          <div className=" w-[85%] h-full flex flex-row ">
            <ChangeBarInformation id={id} />
            <NotificationInAccount id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
