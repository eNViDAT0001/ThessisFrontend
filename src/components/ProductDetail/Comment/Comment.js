import { Divider } from "@mui/material";
import React from "react";
import { ListComment } from "./ListComment";
import { useDispatch } from "react-redux";
import { setRatingInComment } from "../../../app/slices/QuerySlice";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { AddComment } from "./AddComment";
import { useListComment } from "../../../app/hook/CommentHook";
export const Comment = (props) => {
  const dispatch = useDispatch();
  const listComment = useListComment() || [];

  const handleClickRating = (newValue) => {
    dispatch(setRatingInComment(newValue));
  };
  return (
    <div className=" font-[Satoshi] my-20">
      {listComment.length === 0 && (
        <div>
          {props.type === "brand" && <AddComment id={props.id} />}

          <div className="flex flex-row space-x-5 items-center">
            <h1 className="text-xl font-semibold">List reviews:</h1>
            <Box
              sx={{
                width: 200,
                display: "flex",
              }}
            >
              <Rating
                name="hover-feedback"
                precision={1}
                onChange={(event, newValue) => {
                  handleClickRating(newValue);
                }}
              ></Rating>
            </Box>
          </div>
          <div className="my-5">
            <Divider />
          </div>
          <ListComment id={props.id} />
        </div>
      )}
    </div>
  );
};
