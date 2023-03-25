import { Divider } from "@mui/material";
import React, { useState } from "react";
import { AddBasicInformation } from "./AddBasicInformation";
import { AddImage } from "./AddImage";
import { AddSpecification } from "./AddSpecification";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ImageIcon from "@mui/icons-material/Image";
import ListIcon from "@mui/icons-material/List";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductApi } from "../../../api/ProductApi";
import { AddDescriptions } from "./AddDescriptions";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  useCategoryId,
  useDescriptionMD,
  useDescriptionName,
  useDiscount,
  useMedia,
  useName,
  useOptions,
  usePrice,
  useSpecificationName,
} from "../../../app/hook/ProductHook";

export const AddProductInBrand = () => {
  const { id } = useParams(); //provider
  const [openButon, setOpenButton] = useState(true);
  const name = useName();
  const category_id = useCategoryId();
  const price = usePrice();
  const discount = useDiscount();
  const media = useMedia();
  const options = useOptions();
  const specification_name = useSpecificationName();
  const description_name = useDescriptionName();
  const description_md = useDescriptionMD();

  const AddSpecificationProduct = async (idProduct, body) => {
    await ProductApi.AddSpecificationTreeInProduct(idProduct, body)
      .then((res) => {
        if (res.status == 200) {
          toast("Add new Product Success", {
            type: "success",
            autoClose: 1000,
          });
        }
        setOpenButton(true);
      })
      .catch((err) => {
        toast("Error add product in specification", {
          type: "error",
          autoClose: 1000,
        });
        setOpenButton(true);
      });
  };

  const AddBasicProduct = async (idProvider, idUser, body) => {
    await ProductApi.AddNewProduct(idProvider, idUser, body)
      .then((res) => {
        if (res.status == 200) {
          const body = {
            specification: {
              properties: specification_name,
            },
            options: options,
          };
          console.log(body);
          const response = JSON.parse(JSON.stringify(res.data.data));
          console.log(response);
          AddSpecificationProduct(response.ProductID, body);
        }
      })
      .catch((err) => {
        toast("Error add product", {
          type: "error",
          autoClose: 1000,
        });
        setOpenButton(true);
      });
  };

  const addNewProduct = (e) => {
    if (name == "") {
      toast("Missing name", {
        type: "warning",
        autoClose: 1000,
      });
    } else if (category_id == 0) {
      toast("Missing category", {
        type: "warning",
        autoClose: 1000,
      });
    } else if (price == "") {
      toast("Missing price", {
        type: "warning",
        autoClose: 1000,
      });
    } else if (specification_name == "") {
      toast("Missing name specification", {
        type: "warning",
        autoClose: 1000,
      });
    } else if (media.length == 0) {
      toast("Missing media", {
        type: "warning",
        autoClose: 1000,
      });
    } else if (description_name != "" && description_md.length == 0) {
      toast("Need upload file md ", {
        type: "warning",
        autoClose: 1000,
      });
    } else {
      const dataform = new FormData();
      setOpenButton(false);
      dataform.append("category_id", parseInt(category_id));
      dataform.append("name", name);
      dataform.append("price", parseInt(price));

      if (discount != 0) dataform.append("discount", parseInt(discount));
      if (media.length !== 0) {
        media.map((data) => {
          dataform.append("media", data);
        });
      }
      if (description_name == "") {
        dataform.append("descriptions_name", description_name);
        description_md.map((data) => {
          dataform.append("descriptions_md", data);
        });
      }
      AddBasicProduct(id, localStorage.getItem("UserID"), dataform);
    }
  };

  return (
    <div className="flex justify-center bg-[#F5F5F5] font-[Montserrat]">
      <ToastContainer position="top-right" newestOnTop />
      <div className="w-[65%] my-10 p-10 border rounded-2xl shadow-xl bg-white space-y-6">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className=" text-2xl font-bold">ADD YOUR PRODUCT</h1>
          <h1 className=" text-sm text-[#9096B2]">
            Please fill out the information completely{" "}
          </h1>
        </div>
        <div className="flex flex-row space-x-5">
          <LocalLibraryIcon />
          <h1 className="text-xl font-bold">Basic information :</h1>
        </div>
        <Divider />
        <AddBasicInformation />
        <div className="flex flex-row space-x-5">
          <ImageIcon />
          <h1 className="text-xl font-bold">Image :</h1>
        </div>
        <Divider />
        <AddImage />
        <div className="flex flex-row space-x-5">
          <ListIcon />
          <h1 className="text-xl font-bold">Specification :</h1>
        </div>
        <Divider />
        <AddSpecification />
        <div className="flex flex-row space-x-5">
          <DescriptionIcon />
          <h1 className="text-xl font-bold">Description :</h1>
        </div>
        <Divider />
        <AddDescriptions />

        <div className="flex flex-row-reverse">
          <Button
            disabled={!openButon}
            variant="contained"
            onClick={addNewProduct}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
