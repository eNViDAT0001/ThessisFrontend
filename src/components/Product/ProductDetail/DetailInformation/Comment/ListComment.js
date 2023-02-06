import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useCallback, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Divider, Pagination } from "@mui/material";
import {
  fetchCommentPaging,
  setFilter,
} from "../../../../../store/slices/CommentSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  checkObjectEmpty,
  convertDate,
  transformFilters,
} from "../../../../../stogare_function/listActions";

export const ListComment = (props) => {
  const dispatch = useDispatch();
  const Comment = useSelector((state) => state.comment.commentPaging);
  const filters = useSelector((state) => state.comment.filters);

  const [meta, setMeta] = useState({});
  const [listComment, setListComment] = useState([]);
  const productDetail = useSelector((state) => state.product.ProductDetail);
  const loadComment = useCallback(async () => {
    await dispatch(fetchCommentPaging(props.id, transformFilters(filters)));
  });
  
  useEffect(() => {
    if ((productDetail.status==200)) {
      if (Comment.status != "200" && Comment.status != "204") {
        loadComment();
      }
    }
    if (Comment.status == 200) {
      setListComment(Comment.data.data);
      setMeta(Comment.data.meta);
    }
  }, [
    productDetail,
    loadComment,
    dispatch,
    Comment,
    props.id,
    meta,
    listComment,
  ]);

  useEffect(() => {
    dispatch(fetchCommentPaging(props.id, transformFilters(filters)));
  }, [dispatch, props.id, filters]);

  const handlePaging = (e) => {
    const new_obj = { ...filters, marker: parseInt(e.target.textContent) };
    dispatch(setFilter(new_obj));
  };
  return (
    <div className="flex flex-col space-y-5 px-5 w-full min-w-[350px]">
      {Comment.status === "204" || !Comment ? (
        <div></div>
      ) : (
        <div>
          {!checkObjectEmpty(meta) ? (
            <div className="flex justify-center">
              <Pagination
                count={meta.paging.Pages}
                showFirstButton
                showLastButton
                onChange={handlePaging}
              />
            </div>
          ) : (
            <div></div>
          )}
          {listComment.map((data) => (
            <div
              key={data.id}
              className="border-2 border-[#FFFFFF] flex flex-row min-h-[120px] rounded-md p-2 shadow-md  items-start justify-between"
            >
              <div className="flex flex-row">
                {data.Avatar ? (
                  <img
                    src={data.Avatar}
                    alt="Avatar"
                    className="w-[60px] h-[60px] rounded-full"
                  ></img>
                ) : (
                  <AccountCircle sx={{ width: 60, height: 60 }} />
                )}
                <div className="flex flex-col ml-4 p-1 space-y-2">
                  <div className="flex flex-row space-x-1 ">
                    <h1 className=" text-sm font-bold">{data.Name}</h1>
                    <h1 className=" text-sm font-bold text-[#808080]">
                      - {convertDate(data.CreatedAt)}
                    </h1>
                  </div>
                  <Rating readOnly value={data.Rating} size="small" />
                  <Divider light />

                  <h1 className="mt-4 text-[#808080]">"{data.Description}"</h1>
                  <div className="flex flex-row space-x-1">
                    {data.Media ? (
                      data.Media.map((media) => (
                        <div>
                          <img
                            src={media.mediaPath}
                            alt="Anh san pham"
                            className="max-w-[200px] max-h-[200px]"
                          ></img>
                        </div>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
