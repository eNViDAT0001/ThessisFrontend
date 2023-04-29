import React from "react";
import { useParams } from "react-router-dom";
import HeaderBar from "../../components/Common/HeaderBar";
import { AddComment } from "../../components/ProductDetail/Comment/AddComment";

export const AddCommentPage = () => {
  const { id } = useParams();
  return (
    <div>
      <HeaderBar name1="Home . Order . Detail" name2=" . Comment" />
      <div className="flex flex-col justify-center px-[15%] space-y-4 mt-4 mb-10">
        <AddComment id={id} />{" "}
      </div>
    </div>
  );
};
