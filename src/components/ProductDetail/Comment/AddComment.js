import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { uploadFile } from "../../../app/hook/FileHook";
import { useUserID } from "../../../app/hook/UserHook";
import { useDispatch } from "react-redux";
import { addFileInCommentFormInProductDetail, setDescriptionsInCommentAddFormInProductDetail } from "../../../app/slices/CommentSlice";
import { useFilesInAddCommentInProductDetail,useDescriptionsInAddCommentInProductDetail, addNewComment } from "../../../app/hook/CommentHook";
import { convertMediaToBody } from "../../../app/hook/ProductHook";

const labels = {
  1: "Very bad",
  2: "Bad",
  3: "Normal",
  4: "Good",
  5: "Excellent",
};

const getLabelText = (valueRating) => {
  return labels[valueRating];
};
export const AddComment = (props) => {
  const dispatch = useDispatch()

  const [disableButton, setDisableButton] = useState(false);
  const userID = useUserID()
  const [valueRating, setValueRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const description = useDescriptionsInAddCommentInProductDetail()
  const files = useFilesInAddCommentInProductDetail() || []

  const handleTextComment = (e) => {
    dispatch(setDescriptionsInCommentAddFormInProductDetail(e.currentTarget.value))
  };

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      uploadFile(formData).then(res=>{
        dispatch(addFileInCommentFormInProductDetail(res.data[0]))
      })
    }
  };

  const handleButtonSend = (e) => {
    const body={
      "rating": valueRating,
      "description": description,
      "media": convertMediaToBody(files)
    }
    const productID = props.id
    addNewComment(productID,userID,body)
  };
  return (
    <div className="flex flex-col space-y-5 px-5 w-full min-w-[350px] my-10">
      <ToastContainer position="top-right" newestOnTop />
      <h1 className=" text-xl font-bold">Add your comment:</h1>
      <div className="border space-y-6 p-4 rounded-md shadow-md bg-white">
        <div className="flex flex-row items-center space-x-4 ">
          <h1 className=" text-xl font-bold">Choose Rating:</h1>
          <Box
            sx={{
              width: 200,
              display: "flex",
            }}
          >
            <Rating
              name="hover-feedback"
              value={valueRating}
              precision={1}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValueRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            ></Rating>
            {valueRating !== null && (
              <Box sx={{ ml: 2 }}>
                {labels[hover !== -1 ? hover : valueRating]}
              </Box>
            )}
          </Box>
        </div>
        <div className="flex flex-row space-y-2 items-center">
          <h1 className=" text-xl font-bold">Comment:</h1>
          <div className="w-full px-10">
            <TextField
              sx={{
                width: 1,
              }}
              id="outlined-basic"
              label="Write comment here"
              size="small"
              onChange={handleTextComment}
              multiline
              maxRows={4}
            />
          </div>

          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onChange={handleButtonUploadFile}
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </div>
        <div className="flex justify-start space-x-2">
          {(files.map((data) => (
              <img
                src={data.url}
                alt="anh comment"
                className="w-[150px] h-[150px]"
              ></img>
            ))
          )}
        </div>
        <div className="flex flex-row-reverse">
          <Button
            variant="contained"
            onClick={handleButtonSend}
            disabled={disableButton}
          >
            {" "}
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
