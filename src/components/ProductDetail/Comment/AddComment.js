import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

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
export const AddComment = () => {
  return (
<div>ahihi</div>
  );  
}
