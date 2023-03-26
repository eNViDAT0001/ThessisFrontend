import { useCallback, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductApi } from "../../api/ProductApi";
import { setListBanner } from "../slice/BannerSlice";
import { setCategoryRoot } from "../slice/CategorySlice";
import { toast } from "react-toastify";
import {
  setDescriptionProduct,
  setImageProduct,
  setProductDetail,
  setProductInHome,
  setSpecificationProduct,
} from "../slice/ProductSlice";

export const useProductInHome = () =>
  useSelector((state) => state.product.productInHome);
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

export const useFetchInHomePage = async () => {
  const dispatch = useDispatch();
  const loadDataHome = useCallback(async () => {
    dispatch(fetchInHomePage());
  });
  useEffect(() => {
    loadDataHome();
  }, [loadDataHome]);
};

const fetchInHomePage = () => async (dispatch) => {
  try {
    await Promise.all([
      ProductApi.GetBanners(),
      ProductApi.GetCategoriesRoof(),
      ProductApi.GetProductPreview(),
    ]).then((res) => {
      dispatch(setListBanner(res[0].data.data));
      dispatch(setCategoryRoot(res[1].data.data));
      dispatch(setProductInHome(res[2].data.data));
    });
  } catch (err) {}
};

export const useFetchInProductDetail = async (id) => {
  const dispatch = useDispatch();
  const loadDataProduct = useCallback(async () => {
    dispatch(fetchInProductDetailPage(id));
  });
  await useEffect(() => {
    loadDataProduct();
  }, [loadDataProduct]);
};

const fetchInProductDetailPage = (id) => async (dispatch) => {
  try {
    await Promise.all([
      ProductApi.GetDetailProduct(id),
      ProductApi.GetMedia(id),
      ProductApi.GetDescriptionFromProduct(id),
      ProductApi.GetSpecification(id),
    ]).then((res) => {
      dispatch(setProductDetail(res[0].data.data));
      dispatch(setImageProduct(res?.[1].data.data));
      dispatch(setDescriptionProduct(res?.[2].data.data));
      dispatch(setSpecificationProduct(res[3].data.data));
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
    specifications: [
      {
        specification: {
          properties: specification_name,
        },
        options: options,
      },
    ],
  };
  return body;
};

export const addProduct = async (idProvider, userID, body) => {
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
