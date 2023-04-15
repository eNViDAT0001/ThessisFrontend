import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import Rating from "@mui/material/Rating";
import { Divider, Pagination } from "@mui/material";
import { checkObjectEmpty, convertDate } from "../../../app/hook/CommonHook";
import { useListComment, useMetaInComment } from "../../../app/hook/CommentHook";
import { useDispatch } from "react-redux";
import { setPageInComment } from "../../../app/slices/QuerySlice";
export const ListComment = () => {
  const dispatch = useDispatch()
  
  const metaInComment = useMetaInComment();
  const listComment = useListComment() || [];


  console.log(listComment)
  const handleChangePage = (e,value) => {
    dispatch(setPageInComment(value))
  };

  return (
    <div className="flex flex-col space-y-5 px-5 w-full min-w-[350px]">
      <div>
        {!checkObjectEmpty(metaInComment) ? (
          <div className="flex justify-center">
            <Pagination
              defaultPage={metaInComment.paging.Current}
              count={metaInComment.paging.Pages}
              showFirstButton
              showLastButton
              onChange={handleChangePage}
            />
          </div>
        ) : (
          <div></div>
        )}
        {listComment.map((data) => (
          <div
            key={data.id}
            className="bg-white my-6 border-2 border-[#FFFFFF] flex flex-row min-h-[120px] rounded-md p-2 shadow-md  items-start justify-between"
          >
            <div className="flex flex-row">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt="Avatar"
                  className="w-[60px] h-[60px] rounded-full"
                ></img>
              ) : (
                <AccountCircle sx={{ width: 60, height: 60 }} />
              )}
              <div className="flex flex-col ml-4 p-1 space-y-2">
                <div className="flex flex-row space-x-1 ">
                  <h1 className=" text-sm font-bold">{data.name }</h1>
                  <h1 className=" text-sm font-bold text-[#808080]">
                    - {convertDate(data.created_at)}
                  </h1>
                </div>
                <Rating readOnly value={data.rating} size="small" />
                <Divider light />

                <h1 className="mt-4 text-[#808080]">"{data.description}"</h1>
                <div className="flex flex-row space-x-1">
                  {data.media ? (
                    data.media.map((media) => (
                      <div>
                        <img
                          src={media.media_path}
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
    </div>
  );
};
