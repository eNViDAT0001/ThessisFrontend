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
import { useCallback, useEffect, useRef } from "react";

export const LoginLayOut = () => {
  return (
    <div>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
export const UserLayout = () => {
  const dispatch = useDispatch();
  const isOpenButtonChat = useIsOpenButtonChat();
  const chatRef = useRef(null);

  const toggleChat = () => {
    dispatch(setIsOpenButtonChat(!isOpenButtonChat));
  };

  const handleClickOutside = useCallback((event) => {
    if (chatRef.current && !chatRef.current.contains(event.target)) {
      dispatch(setIsOpenButtonChat(false));
    }
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, isOpenButtonChat, handleClickOutside]);
  return (
    <div>
      <Header />
      <HeaderUser />
      <Outlet></Outlet>
      <div className="fixed bottom-0 right-0">
        <div className="w-full" ref={chatRef}>
          {isOpenButtonChat && <ChatGeneral />}
        </div>
        {!isOpenButtonChat && (
          <div className=" flex justify-end ">
            <div
              className=" flex flex-row-reverse px-5 items-center border bg-[#151875]  mr-[200px] shadow-xl hover:cursor-pointer "
              onClick={toggleChat}
            >
              <h1 className=" text-white">Chat</h1>
              <IconButton sx={{ color: "#FFFFFF" }} onClick={toggleChat}>
                <QuestionAnswerIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        )}
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
