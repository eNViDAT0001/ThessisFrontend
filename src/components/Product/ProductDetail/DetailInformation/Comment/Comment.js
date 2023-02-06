import { Button, Divider } from "@mui/material";
import React, { useState } from "react";
import { AddComment } from "./AddComment";
import { ListComment } from "./ListComment";

export const Comment = (props) => {
  return (
    <div className=" font-[Satoshi]">
      <AddComment id={props.id} />
      <div className="my-5">
        <Divider />
      </div>

      <ListComment id={props.id} />
    </div>
  );
};
