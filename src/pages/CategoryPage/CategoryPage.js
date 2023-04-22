import React, { useState } from "react";
import HeaderBar from "../../components/Common/HeaderBar";
import { ListProductInCategory } from "../../components/Category/ListProductInCategory";
import { FilterCategory } from "../../components/Category/Filter/FilterCategory";
import {
  useCategoryHandle,
  useFetchAllInCategory,
  useFilterCategory,
} from "../../app/hook/CategoryHook";
import { TopFilter } from "../../components/Category/Filter/TopFilter";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { convertObjectToStringQuery } from "../../app/hook/CommonHook";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { resetFilterInCategory } from "../../app/slices/QuerySlice";

export const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [queryString,setQueryString] = useState(window.location.search.substring(1));
  const location = useLocation();
  const filter = useFilterCategory();
  const categoryHandle = useCategoryHandle()

  useEffect(() => {
    const debouncedNavigate = debounce(() => {
      navigate({
        pathname: location.pathname,
        search: convertObjectToStringQuery(filter),
      });
      
      setQueryString(convertObjectToStringQuery(filter))
    }, 500);

    debouncedNavigate();

    return () => {
      debouncedNavigate.cancel();
    };
  }, [filter, navigate, location]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetFilterInCategory());
    };
  }, [dispatch]);
  
  useFetchAllInCategory(id, queryString);

  return (
    <div>
      <HeaderBar name1="Home .Products ." name2={categoryHandle.name} />
      <div className="flex justify-center font-['Josefin_Sans'] ">
        <div className="w-[78%]">
          <TopFilter />
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
