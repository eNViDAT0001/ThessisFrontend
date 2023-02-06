import HeaderBar from "../../components/StoreOtherComponent/HeaderBar";
import OptionBar from "../../components/Product/Category/OptionBar";
import TreeCategory from "../../components/Product/Category/TreeCategory";
import RatingItem from "../../components/Product/Category/RatingItems";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useLayoutEffect } from "react";
import {
  FetchAllCategoryTree,
  FetchFullProductInCategory,
  FetchProductFromSelectCategory,
  setCategoryHandle,
  setProductPreviewInCategory,
} from "../../store/slices/ProductSlice";
import ListOfProducts from "../../components/Product/Category/ListOfProducts";
import { useParams } from "react-router-dom";
import { checkObjectEmpty } from "../../stogare_function/listActions";

const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const CategoryTree = useSelector((state) => state.product.CategoryTree);
  const ProductInCategory = useSelector((state) => state.product.ProductPreviewInCategory);
  const CategoryHandle = useSelector((state) => state.product.CategoryHandle);
  const ratingSelector = useSelector((state)=>state.product.numberRatingInCategory)

  const filter = {
     "limit": ratingSelector
  }
  const loadCategoryTree = useCallback(async () => {
    await dispatch(FetchAllCategoryTree());
  });

  const loadFullProductInCategory = useCallback(async () => {
    await dispatch(FetchFullProductInCategory(filter));
  });

  const loadProductInCategorySelected = useCallback(async () => {
    await dispatch(FetchProductFromSelectCategory(id,filter));
  });


  useEffect(()=>()=>{
    localStorage.removeItem("IDReloadCategory")
    localStorage.setItem("IDReloadCategory",id)
  },[id])

  useEffect(()=>{
    dispatch(setProductPreviewInCategory({}))
  },[id,dispatch])
  useLayoutEffect(() => {
    if((CategoryTree.status != 204) && (CategoryTree.status != 200)){
      loadCategoryTree();
    }
    if((ProductInCategory.status!=204) && (ProductInCategory.status!=200)){
      if (id == 0) {
        loadFullProductInCategory();
      } else {
        loadProductInCategorySelected(id);
      }
    }
    if (CategoryTree.status == 200) {
      const result = {CategoryChildren: CategoryTree.data.data}
      //thuat toan tim kiem cay dua theo de quy
      const searchNodeFromTree = (result)=>{
        if(result.CategoryChildren) result.CategoryChildren.map(data=>{
          if(data.ID==id){
            dispatch(setCategoryHandle(data))
          }
          else searchNodeFromTree(data)
        })
      }
      searchNodeFromTree(result)
    }
  }, [dispatch, CategoryHandle, ProductInCategory,id,loadCategoryTree,CategoryTree,loadFullProductInCategory,loadProductInCategorySelected]);

  
  return (
    <div>
      <HeaderBar
        name1="Home .Products ."
        name2={checkObjectEmpty(CategoryHandle) ? "All" : `${CategoryHandle.Name}`}
      />
      <OptionBar />
      <div className="flex justify-center font-['Josefin_Sans'] ">
        <div className="w-[78%]">
          <div className="flex flex-row justify-start my-[100px] space-x-10 w-full">
            <div className="flex flex-col w-[30%]">
              <TreeCategory id={id}/>
              {/* <RatingItem id={id}/> */}
            </div>
            <ListOfProducts id={id}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
