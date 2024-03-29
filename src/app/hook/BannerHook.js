import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BannerApi } from "../../api/BannerApi";
import {
  setBannerDetail,
  setBannerDetailInUpdate,
  setListBannerInAdmin,
  setListProductInAddBanner,
  setListProductInUpdateBanner,
  setListProductOutInUpdateBanner,
  setMetaInProductInAddBanner,
  setMetaInProductInBannerDetail,
  setMetaInProductInUpdateBanner,
  setMetaInProductOutUpdateBanner,
  setProductInBannerDetail,
} from "../slices/BannerSlice";
import { toast } from "react-toastify";
import { ProductApi } from "../../api/ProductApi";
import { checkObjectEmpty } from "./CommonHook";

export const useListBanner = () =>
  useSelector((state) => state.banner.listBanner);
export const useBannerDetail = () =>
  useSelector((state) => state.banner.bannerDetail);
export const useBannerInAdmin = () =>
  useSelector((state) => state.banner.listBannerInAdmin);
export const useProductInBannerDetail = () =>
  useSelector((state) => state.banner.productInBannerDetail);
export const useMetaInProductInBannerDetail = () =>
  useSelector((state) => state.banner.metaInProductInBannerDetail);
export const useFilterProductInBannerDetail = () =>
  useSelector((state) => state.query.filterProductInBannerDetail);
export const useProductInAddBanner = () =>
  useSelector((state) => state.banner.listProductInAddBanner);
export const useFilterInProductInAddBanner = () =>
  useSelector((state) => state.query.productInAddBanner);
export const useMetaInProductInAddBanner = () =>
  useSelector((state) => state.banner.metaInProductInAddBanner);
export const useBannerDetailInUpdate = () =>
  useSelector((state) => state.banner.bannerDetailInUpdate);
export const useProductInUpdateBanner = () =>
  useSelector((state) => state.banner.listProductInUpdateBanner);
export const useFilterInProductInUpdateBanner = () =>
  useSelector((state) => state.query.productInUpdateBanner);
export const useMetaInProductInUpdateBanner = () =>
  useSelector((state) => state.banner.metaInProductInUpdateBanner);
export const useProductOutInUpdateBanner = () =>
  useSelector((state) => state.banner.listProductOutInUpdateBanner);
export const useMetaInProductOutUpdateBanner = () =>
  useSelector((state) => state.banner.metaInProductOutUpdateBanner);
export const useFilterOutUpdateBanner = () => {
  useSelector((state) => state.query.productOutUpdateBanner);
};
export const useFetchBannerDetail = async (bannerID, filter) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBannerDetail(bannerID)).then(() => {
      dispatch(fetchProductInBannerDetail(bannerID,filter));
    });
  }, [dispatch, bannerID,filter]);
};

export const fetchBannerDetail = (bannerID) => async (dispatch) => {
  try {
    const response = await BannerApi.GetBannerDetail(bannerID);
    dispatch(setBannerDetail(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductInBannerDetail = (bannerID,filter) => async (dispatch) => {
  try {
    const response = await BannerApi.GetProductPreview(bannerID,filter);
    dispatch(setProductInBannerDetail(response.data.data));
    dispatch(setMetaInProductInBannerDetail(response.data.meta))
  } catch (error) {
    console.log(error);
  }
};

export const useFetchListProductInAddBanner = async (filter) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchProductInAddBanner(filter));
  }, [dispatch, filter]);
};

export const fetchProductInAddBanner = (filter) => async (dispatch) => {
  try {
    const response = await ProductApi.GetProductPreview(filter);
    const listProductInAddBanner =
      response.data.data &&
      response.data.data.map((data) => {
        return { ...data, isSelected: false };
      });
    dispatch(setListProductInAddBanner(listProductInAddBanner));
    dispatch(setMetaInProductInAddBanner(response.data.meta));
  } catch (error) {
    console.log(error);
  }
};

export const useFetchListBannerInAdmin = async (filter) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchListBannerFromAdmin(filter));
  }, [dispatch, filter]);
};

export const fetchListBannerFromAdmin = (filter) => async (dispatch) => {
  try {
    const response = await BannerApi.GetAllFromAdmin(filter);
    const listBanners =
      response.data.data &&
      response.data.data.map((data) => {
        return { ...data, isSelected: false };
      });
    dispatch(setListBannerInAdmin(listBanners));
  } catch (error) {
    console.log(error);
  }
};

export const selectBanner = (arr, bannerID) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((banner) => {
    if (banner.id === bannerID) {
      return {
        ...banner,
        isSelected: !banner.isSelected,
      };
    }
    return banner;
  });
};

export const deleteListBanner = async (body) => {
  await BannerApi.DeleteListBanner(body).then(() => {
    toast("Delete list banner successfully", {
      type: "success",
      autoClose: 1000,
      Close: setTimeout(() => window.location.reload(), 1000),
    });
  });
};

export const addNewBanner = async (body) => {
  await BannerApi.AddNewBanner(body).then(() => {
    toast("Add banner successfully", {
      type: "success",
      autoClose: 1000,
      Close: setTimeout(() => window.location.reload(), 1000),
    });
  });
};

export const selectProductInAddBanner = (arr, productID) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((product) => {
    if (product.id === productID) {
      return {
        ...product,
        isSelected: !product.isSelected,
      };
    }
    return product;
  });
};

//update

export const selectProductInProductInUpdateBanner = (arr, productID) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((product) => {
    if (product.id === productID) {
      return {
        ...product,
        isSelected: !product.isSelected,
      };
    }
    return product;
  });
};

export const selectProductOutProductInUpdateBanner = (arr, productID) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((product) => {
    if (product.id === productID) {
      return {
        ...product,
        isSelected: !product.isSelected,
      };
    }
    return product;
  });
};

export const useFetchInBannerUpdate = (
  bannerID,
  filterInsert,
  filterRemove
) => {
  const dispatch = useDispatch();
  const prevFilterInsertRef = useRef(filterInsert);
  const prevFilterRemoveRef = useRef(filterRemove);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filterInsert !== prevFilterInsertRef.current) {
          await dispatch(fetchProductInUpdateBanner(bannerID, filterInsert));
        } else if (filterRemove !== prevFilterRemoveRef.current) {
          await dispatch(fetchProductOutUpdateBanner(bannerID, filterRemove));
        } else {
          await dispatch(fetchBannerDetailInUpdate(bannerID))
            .then(() => {
              return dispatch(
                fetchProductInUpdateBanner(bannerID, filterInsert)
              );
            })
            .then(() => {
              return dispatch(
                fetchProductOutUpdateBanner(bannerID, filterRemove)
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
        prevFilterRemoveRef.current = filterRemove;
        prevFilterInsertRef.current = filterInsert;
      } catch (err) {}
    };
    fetchData();
  }, [dispatch, filterInsert, bannerID, filterRemove]);
};

const fetchBannerDetailInUpdate = (bannerID) => async (dispatch) => {
  try {
    const response = await BannerApi.GetBannerDetail(bannerID);
    const originalData = response.data.data;

    const transformedData = checkObjectEmpty(originalData)
      ? {}
      : {
          title: originalData.title,
          collection: originalData.collection,
          discount: originalData.discount,
          image: originalData.image,
          endTime: originalData.endTime,
        };
    dispatch(setBannerDetailInUpdate(transformedData));
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductInUpdateBanner =
  (bannerID, filterInsert) => async (dispatch) => {
    const response2 = await BannerApi.GetProductPreviewNotExist(
      bannerID,
      filterInsert
    );
    const listProductInUpdateBanner =
      response2.data.data &&
      response2.data.data.map((data) => {
        return { ...data, isSelected: false };
      });
    dispatch(setListProductInUpdateBanner(listProductInUpdateBanner));
    dispatch(setMetaInProductInUpdateBanner(response2.data.meta));
  };

export const fetchProductOutUpdateBanner =
  (bannerID, filterRemove) => async (dispatch) => {
    try {
      const response = await BannerApi.GetProductPreview(
        bannerID,
        filterRemove
      );
      const listProductOutUpdateBanner =
        response.data.data &&
        response.data.data.map((data) => {
          return { ...data, isSelected: false };
        });

      dispatch(setListProductOutInUpdateBanner(listProductOutUpdateBanner));
      dispatch(setMetaInProductOutUpdateBanner(response.data.meta));
    } catch (error) {
      console.log(error);
    }
  };

export const updateTheBanner = async (bannerID, userID, body) => {
  await BannerApi.UpdateBanner(bannerID, userID, body).then(() => {
    toast("Update banner successfully", {
      type: "success",
      autoClose: 1000,
      Close: setTimeout(() => window.location.reload(), 1000),
    });
  });
};
