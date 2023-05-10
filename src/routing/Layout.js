import { Outlet } from "react-router-dom";
import { Footer } from "../components/Common/Footer/Footer";
import { Header } from "../components/Common/Header";
import { HeaderUser } from "../components/Common/HeaderUser";
import { ChatGeneral } from "../components/WebSocket/ChatGeneral";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import IconButton from "@mui/material/IconButton";
import { useIsOpenButtonChat } from "../app/hook/ChatHook";
import { useDispatch } from "react-redux";
import { setIsOpenButtonChat } from "../app/slices/WSSlice";

export const LoginLayOut = () => {
  return (
    <div>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
export const UserLayout = () => {
  const dispatch = useDispatch()
  const isOpenButtonChat = useIsOpenButtonChat()

  const toggleChat = () => {
    dispatch(setIsOpenButtonChat(!isOpenButtonChat))
  };
  return (
    <div>
      <Header />
      <HeaderUser />
      <Outlet></Outlet>
      <div className="fixed bottom-0 right-0">
        <div className="w-full">{isOpenButtonChat && <ChatGeneral />}</div>
        <div className=" flex justify-end ">
          <div
            className=" flex flex-row-reverse px-5 items-center border bg-pink-500  mr-[200px] shadow-xl hover:cursor-pointer "
            onClick={toggleChat}
          >
            <h1 className=" text-white">Chat</h1>
            <IconButton sx={{ color: "#FFFFFF" }} onClick={toggleChat}>
              <QuestionAnswerIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export const AdminLayOut = () => {
  return (
    <div>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
