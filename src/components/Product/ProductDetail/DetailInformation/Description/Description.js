import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from 'remark-gfm'


export const Description = (props) => {
  const dataDescription = props.description;
  const [textDescription, setTextDescription] = useState("");
  useEffect(() => {
    const fetchFile = async () => {
      await axios
        .get(dataDescription.DescriptionsPath)
        .then((res) => {
          setTextDescription(res.data)
        });
    };
    fetchFile();
  }, [dataDescription]);
  return( 
  <div>
    <ReactMarkdown children={textDescription} remarkPlugins={[remarkGfm]}>
    </ReactMarkdown>
  </div>
  );
};
