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
  updateProduct,
  useCategoryIdFix,
  useDescriptionsFix,
  useDiscountFix,
  useFetchProductDetailToFix,
  useHeightInFix,
  useLengthInFix,
  useMediaFix,
  useNameFix,
  useOptionsFix,
  usePriceFix,
  useSpecificationNameFix,
  useWeightInFix,
  useWidthInFix,
} from "../../../app/hook/ProductHook";

export const FixProductInBrand = () => {
  const { id } = useParams();

  useFetchProductDetailToFix(id);

  const name = useNameFix();
  const category_id = useCategoryIdFix();
  const price = usePriceFix();
  const discount = useDiscountFix();
  const media = useMediaFix();
  const options = useOptionsFix();
  const specification_name = useSpecificationNameFix();
  const descriptions = useDescriptionsFix();
  const height = useHeightInFix();
  const weight = useWeightInFix();
  const length = useLengthInFix();
  const width = useWidthInFix();

  const handleUpdateProduct = async (e) => {
    if (checkValidFix(name, category_id, price, specification_name)) {
      const body = await convertBodyFixProduct(
        category_id,
        name,
        discount,
        price,
        media,
        specification_name,
        options,
        descriptions,
        height,
        length,
        weight,
        width
      );
      console.log(body);
      updateProduct(id, body);
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
