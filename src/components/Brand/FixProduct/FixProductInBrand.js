import { Divider } from "@mui/material";
import React from "react";
import { FixBasicInformation } from "./FixBasicInformation";
import { FixImage } from "./FixImage";
import { FixSpecification } from "./FixSpecification";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ImageIcon from "@mui/icons-material/Image";
import ListIcon from "@mui/icons-material/List";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useParams } from "react-router-dom";
import { FixDescriptions } from "./FixDescriptions";
import DescriptionIcon from "@mui/icons-material/Description";

import {
  checkValidFix,
  convertBodyFixProduct,
  deleteElement,
  updateProduct,
  useCategoryIdFix,
  useDescriptionOld,
  useDescriptionsFix,
  useDescriptionsIds,
  useDiscountFix,
  useFetchProductDetailToFix,
  useHeightInFix,
  useLengthInFix,
  useListMediaOld,
  setOptionOld,
  useMediaFix,
  useNameFix,
  useOptionsFix,
  usePriceFix,
  useShortDescriptionsFix,
  useSpecificationNameFix,
  useWeightInFix,
  useWidthInFix,
  useSpecificationIDFix,
  useOptionOld,
  useOptionIds,
} from "../../../app/hook/ProductHook";
import { useDispatch } from "react-redux";
import { useUserID } from "../../../app/hook/UserHook";
import { getSelectedIds } from "../../../app/hook/CommonHook";

export const FixProductInBrand = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useFetchProductDetailToFix(id);

  const name = useNameFix();
  const userID = useUserID();
  const category_id = useCategoryIdFix();
  const price = usePriceFix();
  const discount = useDiscountFix();
  const media = useMediaFix();
  const options = useOptionsFix();
  const specification_name = useSpecificationNameFix();
  const listMediaOld = useListMediaOld();
  const descriptionOld = useDescriptionOld();
  const descriptions = useDescriptionsFix();
  const height = useHeightInFix();
  const weight = useWeightInFix();
  const length = useLengthInFix();
  const width = useWidthInFix();
  const descriptions_ids = useDescriptionsIds();
  const short_descriptions = useShortDescriptionsFix();
  const specification_id = useSpecificationIDFix();
  const optionOld = useOptionOld();
  const optionIds = useOptionIds();
  const handleUpdateProduct = async (e) => {
    if (
      checkValidFix(
        name,
        category_id,
        price,
        specification_name,
        height,
        length,
        weight,
        width
      )
    ) {
      const body = await convertBodyFixProduct(
        category_id,
        name,
        discount,
        short_descriptions,
        price,
        media,
        specification_id,
        specification_name,
        options,
        descriptions,
        height,
        length,
        weight,
        width,
        listMediaOld,
        descriptionOld,
        optionOld,
        dispatch
      );
      if (body) {
        //console.log("body", body);
        await deleteElement(
          id,
          userID,
          descriptions_ids,
          optionIds,
          getSelectedIds(listMediaOld)
        );
        updateProduct(id, body);
      }
    }
  };

  return (
    <div className="flex justify-center bg-[#F5F5F5] font-[Montserrat]">
      <ToastContainer position="top-right" newestOnTop />
      <div className="w-[65%] my-10 p-10 border rounded-2xl shadow-xl bg-white space-y-6">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className=" text-2xl font-bold">UPDATE YOUR PRODUCT</h1>
          <h1 className=" text-sm text-[#9096B2]">
            Please fill out the information completely{" "}
          </h1>
        </div>
        <div className="flex flex-row space-x-5">
          <LocalLibraryIcon />
          <h1 className="text-xl font-bold">Basic information :</h1>
        </div>
        <Divider />
        <FixBasicInformation />
        <div className="flex flex-row space-x-5">
          <ImageIcon />
          <h1 className="text-xl font-bold">Image :</h1>
        </div>
        <Divider />
        <FixImage />
        <div className="flex flex-row space-x-5">
          <ListIcon />
          <h1 className="text-xl font-bold">Specification :</h1>
        </div>
        <Divider />
        <FixSpecification />
        <div className="flex flex-row space-x-5">
          <DescriptionIcon />
          <h1 className="text-xl font-bold">Description :</h1>
        </div>
        <Divider />
        <FixDescriptions />

        <div className="flex flex-row-reverse">
          <Button variant="contained" onClick={handleUpdateProduct}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};
