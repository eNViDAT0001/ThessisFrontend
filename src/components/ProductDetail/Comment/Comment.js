import { Divider } from "@mui/material";
import React from "react";
import { ListComment } from "./ListComment";

export const Comment = (props) => {
  return (
    <div className=" font-[Satoshi] my-20">
      <h1 className="text-xl font-semibold">List reviews:</h1>
      <div className="my-5">
        <Divider />
      </div>
      <ListComment id={props.id} />
    </div>
  );
};
