import React from "react";
import HeaderBar from "../../components/Common/HeaderBar";
import { ListProductInCategory } from "../../components/Category/ListProductInCategory";
import { FilterCategory } from "../../components/Category/Filter/FilterCategory";
import { useFetchAllInCategory } from "../../app/hook/CategoryHook";
import { TopFilter } from "../../components/Category/Filter/TopFilter";

export const CategoryPage = () => {
  useFetchAllInCategory(1, null);

  return (
    <div>
      <HeaderBar name1="Home .Products ." name2="All" />
      <div className="flex justify-center font-['Josefin_Sans'] ">
        <div className="w-[78%]">
          <TopFilter />
          <div className="flex flex-row justify-between my-[100px] space-x-10 w-full">
            <div className="flex flex-col w-[30%]">
              <FilterCategory />
            </div>
            <div className="w-full">
              <ListProductInCategory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
