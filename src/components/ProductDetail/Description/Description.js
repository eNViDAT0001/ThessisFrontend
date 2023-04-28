import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

export const Description = (props) => {
  const dataDescription = props.description;
  const [textDescription, setTextDescription] = useState("");

  useLayoutEffect(() => {
    const fetchFile = async () => {
      await axios.get(dataDescription.descriptions_path).then((res) => {
        setTextDescription(res.data);
      });
    };
    fetchFile();
  }, [dataDescription]);
  return (
    <div>
      <MDEditor.Markdown
        source={textDescription}
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
};
