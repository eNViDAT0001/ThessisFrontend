import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderBar from "../../components/Common/HeaderBar";
import { AddComment } from "../../components/ProductDetail/Comment/AddComment";
import { ProductApi } from "../../api/ProductApi";
import { useUserID } from "../../app/hook/UserHook";
import { convertDate } from "../../app/hook/CommonHook";
import Rating from "@mui/material/Rating";
import { Divider } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export const AddCommentPage = () => {
  const { id } = useParams();
  const userId = useUserID();
  const [isCommented, setIsCommented] = useState(false);
  const [resComment, setResComment] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const filter = `fields[]=user_id_${userId}`;
      await ProductApi.GetComment(id, filter).then((res) => {
        if (res.status === 204) {
          setIsCommented(false);
        } else if (res.status === 200) {
          setIsCommented(true);
          setResComment(res.data.data[0]);
        }
      });
    };

    fetchComment();
  }, [id, userId]);

  return (
    <div>
      <HeaderBar name1="Home . Order . Detail" name2=" . Comment" />
      <div className="flex flex-col justify-center px-[15%] space-y-4 mt-4 mb-10">
        {!isCommented ? (
          <AddComment id={id} />
        ) : (
          <div className="bg-white my-6 border-2 border-[#FFFFFF] flex flex-row min-h-[120px] rounded-md p-2 shadow-md  items-start justify-between">
            <div className="flex flex-row">
              {resComment.avatar ? (
                <img
                  src={resComment.avatar}
                  alt="Avatar"
                  className="w-[60px] h-[60px] rounded-full"
                ></img>
              ) : (
                <AccountCircle sx={{ width: 60, height: 60 }} />
              )}
              <div className="flex flex-col ml-4 p-1 space-y-2">
                <div className="flex flex-row space-x-1 ">
                  <h1 className=" text-sm font-bold">{resComment.name}</h1>
                  <h1 className=" text-sm font-bold text-[#808080]">
                    - {convertDate(resComment.created_at)}
                  </h1>
                </div>
                <Rating readOnly value={resComment.rating} size="small" />
                <Divider light />

                <h1 className="mt-4 text-[#808080]">
                  "{resComment.description}"
                </h1>
                <div className="flex flex-row space-x-1">
                  {resComment.media &&
                    resComment.media.map((media) => (
                      <div key={media.id}>
                        <img
                          src={media.mediaPath}
                          alt="Anh san pham"
                          className="max-w-[200px] max-h-[200px]"
                        ></img>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
