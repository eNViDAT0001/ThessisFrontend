import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkObjectEmpty } from "../../../stogare_function/listActions";
import { FetchProductInCategory } from "../../../store/slices/ProductSlice";

const OptionBar = () => {
  const dispatch = useDispatch();
  
  const ListProductPreview = useSelector((state) => state.product.ProductPreviewInCategory);
  const handleCategory = useSelector((state) => state.product.CategoryHandle);
  
  
  
  const getLengFromList = () => {
    if (checkObjectEmpty(ListProductPreview)) return 0;
    else if (ListProductPreview.status != 200) return 0;
    else if (ListProductPreview.status == 204) return 0;
    else return ListProductPreview.data.data.length;
  };
  return (
    <div className="flex justify-center flex-row">
      <div className="w-1171px h-11 mt-6 flex justify-between flex-nowrap whitespace-nowrap">
        <div className="flex flex-col">
          <div>
            <h1 className=" font-normal text-2xl text-purple-text">
              {checkObjectEmpty(handleCategory)
                ? "All"
                : `${handleCategory.Name}`}{" "}
            </h1>
            <h1 className="font-normal text-xs self-start mt-2">
              About {getLengFromList()} results
            </h1>
          </div>
        </div>
        {/* 
        <div className="ml-200px pt-2 flex items-center">
          <h1 className="font-normal text-purple-text-2 mr-2 ">Perpage:</h1>
          <input type="text" className=" w-55px h-25px border "></input>
          <h1 className="font-normal text-purple-text-2 ml-27px"> Sort by:</h1>
          <select className=" w-24 h-7 ml-2 border text-center text-xs text-gray-text-in-select">
            <option value="0">Best match</option>
          </select>
        </div>
        */}
        
      </div>
    </div>
  );
};

export default OptionBar;
