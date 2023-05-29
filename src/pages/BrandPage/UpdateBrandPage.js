import React from "react";
import { useParams } from "react-router-dom";
import {
  useBrandDetailInUpdate,
  useFetchBrandDetailInUpdate,
} from "../../app/hook/BrandHook";
import { useUserID } from "../../app/hook/UserHook";
import { checkObjectEmpty } from "../../app/hook/CommonHook";
import { UpdateBrand } from "../../components/Brand/UpdateBrand/UpdateBrand";

export const UpdateBrandPage = () => {
  const { id } = useParams();
  const userId = useUserID();

  const brandDetail = useBrandDetailInUpdate() || {};
  useFetchBrandDetailInUpdate(id, userId);
  return (
    <div className="flex justify-center">
      <div className="w-[80%] my-10">
        <div className=" mb-10 flex flex-col justify-center items-center space-y-4">
          <h1 className=" text-2xl font-bold">Update Brand #{id}</h1>
          <h1 className=" text-sm text-[#9096B2]">
            Please fill out the information completely{" "}
          </h1>
        </div>
        {!checkObjectEmpty(brandDetail) && (
          <UpdateBrand id={id} brandDetail={brandDetail} />
        )}
      </div>
    </div>
  );
};
