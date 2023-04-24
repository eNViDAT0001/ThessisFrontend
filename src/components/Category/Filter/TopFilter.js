import React from "react";
import {
  useCategoryHandle,
  useListProductInCategory,
} from "../../../app/hook/CategoryHook";
import { useDispatch } from "react-redux";
import { setLimitInFilterCategory} from "../../../app/slices/QuerySlice";

export const TopFilter = () => {
  const categoryHandle = useCategoryHandle();
  const listProduct = useListProductInCategory() || [];
  const dispatch = useDispatch()

  const handleChangePage = (e) =>{
    dispatch(setLimitInFilterCategory(e.currentTarget.value))
  }

  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }
  
  return (
    <div className="my-10 flex flex-row justify-between items-center">
      <div className="flex flex-col space-y-4">
        <h1 className=" text-[#151875] text-xl">{categoryHandle.name}</h1>
        <h1 className=" text-[#8A8FB9] text-base font-['Lato']">
          About {listProduct.length} results
        </h1>
      </div>
      <div className="space-x-20 flex flex-row">
        <div className="flex flex-row items-center space-x-2">
          <h1 className=" text-[#151875] text-base">Per page:</h1>
          <input
            type="text"
            onKeyPress={handleKeyPress}
            onChange={handleChangePage}
            className=" border-2 w-[55px] h-[25px] px-2 py-1"
          ></input>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <h1 className=" text-[#151875] text-base">Sort by:</h1>
          <input
            type="text"
            className=" border-2 w-[55px] h-[25px] px-2 py-1"
          ></input>
        </div>
      </div>
    </div>
  );
};
