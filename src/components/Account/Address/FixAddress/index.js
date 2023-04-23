import React from "react";
import HeaderBar from "../../../Common/HeaderBar";
import ChangeBarInformation from "../../ChangeBarInformation";
import {
  useFetchAddressDetail,
} from "../../../../app/hook/AddressHook";
import { useUserID } from "../../../../app/hook/UserHook";
import { useParams } from "react-router-dom";
import { FixAddressForm } from "./FixAddressForm";

export const FixAddressPage = () => {
  const userID = useUserID();
  const { id } = useParams();

  useFetchAddressDetail(id, userID);
  return (
    <div>
      <HeaderBar name1="Home . Account . Address" name2=" . Detail" />
      <div className="flex justify-center">
        <div className="w-[85%] h-full flex flex-row ">
          <ChangeBarInformation id={userID} />
          <FixAddressForm />
        </div>
      </div>
    </div>
  );
};
