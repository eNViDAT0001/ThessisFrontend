import React, { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import { Button, Divider } from "@mui/material";
import { FormAddBrand } from "./FormAddBrand";
import { ListViewBrand } from "./ListViewBrand";
import { useLanguage } from "../../../../app/hook/LanguageHook";

export const BrandContain = () => {
  const language = useLanguage();
  const [openBrand, setOpenAddBrand] = useState(false);
  const handleButtonAdd = (e) => {
    if (!openBrand) setOpenAddBrand(true);
    else setOpenAddBrand(false);
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <div className="w-[80%] min-h-[200px] bg-white shadow-lg rounded-2xl px-5 pt-5 font-['Josefin_Sans']">
          <div className="flex flex-row justify-between  pr-4">
            <div className="flex flex-row items-center space-x-2">
              <ListIcon sx={{ width: 20, height: 20 }} />
              <h1 className="font-bold text-2xl ">
                {language ? "Danh sách cửa hàng" : "List Brand"}
              </h1>{" "}
            </div>
            {!openBrand ? (
              <Button variant="contained" onClick={handleButtonAdd}>
                {language ? "Thêm cửa hàng" : "+ Add new Brand"}
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleButtonAdd}>
                {language ? "Ẩn" : "Hide form"}
              </Button>
            )}
          </div>
          {openBrand ? <FormAddBrand /> : <div></div>}
          <div className="my-10">
            <Divider />
          </div>
          <ListViewBrand />
        </div>
      </div>
    </div>
  );
};
