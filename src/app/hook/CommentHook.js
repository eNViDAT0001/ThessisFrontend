import { useCallback, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { ProductApi } from "../../api/ProductApi";
import { setListComment, setMetaInComment } from "../slices/CommentSlice";

export const useListComment = () =>
  useSelector((state) => state.comment.listComment);
export const useMetaInComment = () =>
  useSelector((state) => state.comment.metaInComment);
export const useFilterInCommentInProductDetail = () =>
  useSelector((state) => state.query.filterCommentInProductDetail);
export const useFilesInAddCommentInProductDetail = () =>
  useSelector((state) => state.comment.addCommentForm.files);
export const useDescriptionsInAddCommentInProductDetail = () =>
  useSelector((state) => state.comment.addCommentForm.descriptions);

export const useFetchListCommentInProductDetail = async (id,filter) => {
    const dispatch = useDispatch();
    const loadDataHome = useCallback(async () => {
      dispatch(fetchCommentInProductDetail(id,filter));
    }, [id,filter, dispatch]);
    useEffect(() => {
      loadDataHome();
    }, [loadDataHome]);
}  


export const fetchCommentInProductDetail = (id,filter) => async (dispatch) => {
    try {
      await ProductApi.GetComment(id,filter).then((res) => {
        dispatch(setListComment(res.data.data));
        dispatch(setMetaInComment(res.data.meta));
      });
    } catch (err) {}
  };

  export const addNewComment = (productID, userID, body) => {
    return ProductApi.AddNewComment(productID, userID, body).then(() => {
      console.log("Status add new brand");
      toast("Add new Brand Success", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => {
          window.location.reload();
        }, 2000),
      });
    });
  };
