import React from "react";
import Divider from "@mui/material/Divider";
import {
  useBrandInProductDetail,
  useDescriptionProduct,
  useProductDetail,
} from "../../app/hook/ProductHook";
import { useListComment } from "../../app/hook/CommentHook";
import ChatIcon from "@mui/icons-material/Chat";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useUserID } from "../../app/hook/UserHook";
import { useDispatch } from "react-redux";
import { sendChat } from "../../app/hook/ChatHook";
import {
  checkNotLogin,
  checkObjectEmpty,
  checkTokenToLogin,
} from "../../app/hook/CommonHook";
import { WebSocketApi } from "../../api/WebSocketApi";

const ChatButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#D0011B"),
  backgroundColor: "#D0011B",
  "&:hover": {
    backgroundColor: "#D0011B",
  },
}));
const infoBrand = {
  id: 1,
  image_path:
    "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww&w=1000&q=80",
  name: " Shop sample",
  created_at: "11/01/2012",
};
export const SubInformation = () => {
  const productDetail = useProductDetail() || {};
  const brandDetail = useBrandInProductDetail() || {};

  const listDescription = useDescriptionProduct || [];
  const userID = useUserID();
  const dispatch = useDispatch();

  const handleChat = async (e) => {
    checkTokenToLogin();
    const toUserID = parseInt(e.currentTarget.id);
    const res = await WebSocketApi.CheckChatRoom(toUserID, userID);
    if (res.status === 200) {
      const chatRoomId = res.data.data.ChatRoom.id;
      const body = {
        chat_room_id: chatRoomId,
        from_user_id: toUserID,
        to_user_id: userID,
        content: `Chào bạn, bạn có gì thắc mắc về sản phẩm của shop ${brandDetail.provider.name} ạ?`,
        seen: false,
        type: "TEXT",
      };
      dispatch(sendChat(body));
    } else if (res.status === 204) {
      const body = {
        from_user_id: toUserID,
        to_user_id: userID,
        content: `Chào bạn, bạn có gì thắc mắc về sản phẩm của shop ${brandDetail.provider.name} ạ?`,
        seen: false,
        type: "TEXT",
      };
      dispatch(sendChat(body));
    }
  };
  //console.log("brandDetail", brandDetail);
  return (
    <div className="flex flex-row justify-around bg-white p-10">
      <div className=" mr-20">
        {!checkObjectEmpty(brandDetail) && (
          <div className="flex flex-row items-center space-x-10">
            <img
              src={brandDetail.provider.image_path}
              alt="anh brand"
              className="w-[65px] h-[65px] rounded-full"
            ></img>
            <div className="flex flex-col space-y-2">
              <div>
                <h1 className=" text-lg font-bold">
                  {brandDetail.provider.name}
                </h1>
                <h1 className=" text-[#A9ACC6]">{infoBrand.created_at}</h1>
              </div>

              <div className="">
                <ChatButton
                  variant="outlined"
                  size="small"
                  id={productDetail.user_id}
                  startIcon={<ChatIcon />}
                  onClick={handleChat}
                >
                  Chat now
                </ChatButton>
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider orientation="vertical" variant="middle" flexItem />
      <div className="pl-10 w-[60%]">
        <div className=" flex justify-start space-x-[10%]">
          <div className="flex flex-row space-x-5">
            <h1 className=" font-bold ">Reviews:</h1>
            <h1>{brandDetail.total_comment}</h1>
          </div>
          <div className="flex flex-row space-x-3">
            <h1 className=" font-bold ">Description:</h1>
            <h1>{listDescription.length}</h1>
          </div>
          <div className="flex flex-row space-x-3">
            <h1 className=" font-bold ">Average Comment:</h1>
            <h1>{brandDetail.average_comment}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
