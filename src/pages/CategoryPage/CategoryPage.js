import React from 'react'
import HeaderBar from '../../components/Common/HeaderBar';
import { ListProductInCategory } from '../../components/Category/ListProductInCategory';
import { FilterCategory } from '../../components/Category/Filter/FilterCategory';

export const CategoryPage = () => {
    return (
        <div>
          <HeaderBar
            name1="Home .Products ."
            //name2={checkObjectEmpty(CategoryHandle) ? "All" : `${CategoryHandle.Name}`}
            name2="All"
          />
          <div className="flex justify-center font-['Josefin_Sans'] ">
            <div className="w-[78%]">
              <div className="flex flex-row justify-start my-[100px] space-x-10 w-full">
                <div className="flex flex-col w-[30%]">
                  <FilterCategory />
                </div>
                <ListProductInCategory />
              </div>
            </div>
          </div>
        </div>
      );
}
