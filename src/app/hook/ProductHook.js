import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setListBanner } from "../slices/BannerSlice";
import { setCategoryRoot } from "../slices/CategorySlice";
import { toast } from "react-toastify";
import {
  setDescriptionProduct,
  setImageProduct,
  setMetaInProductInHome,
  setProductDetail,
  setProductInHome,
  setSpecificationProduct,
} from "../slices/ProductSlice";
import { ProductApi } from "../../api/ProductApi";
import { fetchCommentInProductDetail } from "./CommentHook";

export const useProductInHome = () =>
  useSelector((state) => state.product.productInHome);
export const useMetaInProductInHome = () =>
  useSelector((state) => state.product.metaInProductInHome);
export const useImageProduct = () =>
  useSelector((state) => state.product.imageProduct);
export const useProductDetail = () =>
  useSelector((state) => state.product.productDetail);
export const useDescriptionProduct = () =>
  useSelector((state) => state.product.descriptionProduct);
export const useSpecificaionProduct = () =>
  useSelector((state) => state.product.specificationProduct);
export const useOptionHandle = () =>
  useSelector((state) => state.product.optionHandle);
export const useQuantityHandle = () =>
  useSelector((state) => state.product.quantityHandle);
export const useFilterProductInHome = () =>
  useSelector((state) => state.query.productInHome);

  
export const useFetchFullFromHomePage = async(filter) =>{
  const dispatch = useDispatch();
  const prevFilterRef = useRef(filter);
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        if (filter !== prevFilterRef.current) {
          await dispatch(fetchProductInHomePage(filter))
        } else {
          await dispatch(fetchBannerInHomePage())
            .then(() => {
              return dispatch(fetchCategoryRoofInHomePage());
            })
            .then(() => {
              return dispatch(fetchProductInHomePage(filter));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (err) {}
    };
    fetchData()
  }, [dispatch, filter,prevFilterRef]);
}

const fetchProductInHomePage = (filter) => async (dispatch) => {
  try {
    await ProductApi.GetProductPreview(filter).then((res) => {
      dispatch(setProductInHome(res.data.data));
      dispatch(setMetaInProductInHome(res.data.meta));
    });
  } catch (err) {}
};

const fetchCategoryRoofInHomePage = () => async (dispatch) => {
  try {
    await ProductApi.GetCategoriesRoof().then((res) => {
      dispatch(setCategoryRoot(res.data.data));
    });
  } catch (err) {}
};

const fetchBannerInHomePage = () => async (dispatch) => {
  try {
    await ProductApi.GetBanners().then((res) => {
      dispatch(setListBanner(res.data.data));
    });
  } catch (err) {}
};


export const useFetchFullFromProductDetail = async (id, filter) => {
  const dispatch = useDispatch();
  const prevFilterRef = useRef(filter);
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        if (filter !== prevFilterRef.current) {
          await dispatch(fetchCommentInProductDetail(id, filter))
        } else {
          await dispatch(fetchBasicInformationInProductDetailPage(id))
            .then(() => {
              return dispatch(fetchMediaInProductDetailPage(id));
            })
            .then(() => {
              return dispatch(fetchSpecificationInProductDetailPage(id));
            })
            .then(() => {
              return dispatch(fetchDescriptionInProductDetailPage(id));
            })
            .then(() => {
              return dispatch(fetchCommentInProductDetail(id, filter));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (err) {}
    };
    fetchData()
  }, [id, dispatch, filter,prevFilterRef]);
};

const fetchBasicInformationInProductDetailPage = (id) => async (dispatch) => {
  try {
    await ProductApi.GetDetailProduct(id).then((res) => {
      dispatch(setProductDetail(res.data.data));
    });
  } catch (error) {}
};

const fetchMediaInProductDetailPage = (id) => async (dispatch) => {
  try {
    await ProductApi.GetMedia(id).then((res) => {
      dispatch(setImageProduct(res.data.data));
    });
  } catch (error) {}
};

const fetchSpecificationInProductDetailPage = (id) => async (dispatch) => {
  try {
    await ProductApi.GetSpecification(id).then((res) => {
      dispatch(setSpecificationProduct(res.data.data));
    });
  } catch (error) {}
};

const fetchDescriptionInProductDetailPage = (id) => async (dispatch) => {
  try {
    await ProductApi.GetDescriptionFromProduct(id).then((res) => {
      dispatch(setDescriptionProduct(res.data.data));
    });
  } catch (error) {}
};

//add Product
export const useName = () => useSelector((state) => state.addProduct.name);
export const useCategoryId = () =>
  useSelector((state) => state.addProduct.category_id);
export const usePrice = () => useSelector((state) => state.addProduct.price);
export const useDiscount = () =>
  useSelector((state) => state.addProduct.discount);
export const useMedia = () => useSelector((state) => state.addProduct.media);
export const useOptions = () =>
  useSelector((state) => state.addProduct.options);
export const useSpecificationName = () =>
  useSelector((state) => state.addProduct.specification_name);
export const useDescriptionName = () =>
  useSelector((state) => state.addProduct.description_name);
export const useDescriptionMD = () =>
  useSelector((state) => state.addProduct.description_md);

const convertMediaToBody = (media) => {
  const listMedia = [];
  media.map((data) => {
    const newData = {
      public_id: data.public_id,
      media_path: data.url,
      media_type: "IMAGE",
    };
    listMedia.push(newData);
  });
  return listMedia;
};

export const convertBody = (
  category_id,
  name,
  discount,
  price,
  media,
  specification_name,
  options,
  description_name,
  description_md
) => {
  const body = {
    category_id: category_id,
    name: name,
    discount: discount,
    price: price,
    media: convertMediaToBody(media),
    specification: {
      properties: specification_name,
    },
    options: options,
  };

  return body;
};

export const addProduct = async (idProvider, userID, body) => {
  console.log(body);
  await ProductApi.AddNewProduct(idProvider, userID, body).then((res) => {
    toast("Add New Product Success", {
      type: "success",
      autoClose: 1000,
      onClose: setTimeout(() => {
        window.location.reload();
      }, 2000),
    });
  });
};

export const checkValidAdd = (
  name,
  category_id,
  price,
  specification_name,
  media,
  description_name,
  description_md
) => {
  if (name == "") {
    toast("Missing name", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else if (category_id == 0) {
    toast("Missing category", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else if (price == "") {
    toast("Missing price", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else if (specification_name == "") {
    toast("Missing name specification", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
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
    return false;
  } else {
    return true;
  }
};
