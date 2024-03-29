import React from "react";
import HeaderBar from "../../components/Common/HeaderBar";
import { ListProductInCategory } from "../../components/Category/ListProductInCategory";
import { FilterCategory } from "../../components/Category/Filter/FilterCategory";
import {
  useCategoryHandle,
  useFetchAllInCategory,
  useFilterCategory,
  useSortCategory,
} from "../../app/hook/CategoryHook";
import { TopFilter } from "../../components/Category/Filter/TopFilter";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { convertObjectToStringQuery } from "../../app/hook/CommonHook";
import debounce from "lodash.debounce";

export const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const filter = useFilterCategory();
  const sortCategory = useSortCategory();
  const categoryHandle = useCategoryHandle();

  useEffect(() => {
    const debouncedNavigate = debounce(() => {
      navigate({
        pathname: location.pathname,
        search:
          convertObjectToStringQuery(filter) +
          (convertObjectToStringQuery(sortCategory) &&
            `&${convertObjectToStringQuery(sortCategory)}`),
      });
    }, 300);

    debouncedNavigate();

    return () => {
      debouncedNavigate.cancel();
    };
  }, [filter, sortCategory, navigate, location]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useFetchAllInCategory(id, filter, sortCategory);

  return (
    <div>
      <HeaderBar
        name1="Home .Products ."
        name2={id == 0 || !categoryHandle ? "All" : categoryHandle.name}
      />

      <div className="flex justify-center font-['Josefin_Sans'] ">
        <div className="w-[78%]">
          <TopFilter id={id} />
          <div className="flex flex-row justify-between my-[100px] space-x-10 w-full">
            <div className="flex flex-col w-[30%]">
              <FilterCategory id={id} />
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
