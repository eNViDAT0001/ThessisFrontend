import React from "react";
import { useCategoryRoof } from "../../app/hook/CategoryHook";

import { Link } from "react-router-dom";

export const CategoryRoof = () => {
  const categoryRoof = useCategoryRoof() || [];
  const displayedCategories = categoryRoof.slice(0, 4); // Get the first 4 items

  return (
    <div>
      {categoryRoof.length !== 0 && (
        <div className="flex justify-center mt-20">
          <div className="w-[80%] flex flex-col border p-10 space-y-6 bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF] rounded-2xl">
            <h1 className="text-xl font-['Poppins_Bold'] font-extrabold uppercase text-[#000000]">
              Category:
            </h1>
            <div className="flex flex-row flex-wrap justify-around">
              {displayedCategories.map((data) => (
                <Link
                  to={`/category/${data.id}`}
                  key={data.id}
                  id={data.id}
                  className="hover:shadow-xl hover:cursor-pointer border bg-white flex items-center justify-center w-[20%] p-10"
                >
                  <div className="flex flex-col items-center space-y-4  ">
                    <img
                      src={data.image_path}
                      alt="anh banner nho"
                      className=" h-[200px] object-cover aspect-w-1 aspect-h-1"
                    />
                    <h1 className="mt-2 font-bold text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {data.name}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
