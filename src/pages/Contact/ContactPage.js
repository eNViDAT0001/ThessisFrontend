import React, { useState } from "react";
import { sendFeedback } from "../../app/hook/FeedbackHook";
import { ToastContainer } from "react-toastify";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import WebIcon from "@mui/icons-material/Web";

export const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [descriptions, setDescriptions] = useState("");

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleInputSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleInputDescriptions = (e) => {
    setDescriptions(e.target.value);
  };

  const handleButtonSendMail = () => {
    const body = {
      email: email,
      name: name,
      subject: subject,
      descriptions: descriptions,
    };
    sendFeedback(body);
  };
  return (
    <div className="flex flex-col font-['Josefin_Sans']">
      <ToastContainer position="top-right" newestOnTop />
      <div className="flex justify-center mt-[120px]">
        <div className="w-[65%] min-w-[500px] flex justify-center flex-col ">
          <div className="flex flex-row justify-between mb-[200px]">
            <div className="flex flex-col mt-[46px] mb-[40px] w-[50%] space-y-[47px] border p-5 shadow-md">
              <h1 className=" text-2xl">Form contact</h1>
              <div className="flex flex-row justify-between">
                <input
                  onChange={handleInputName}
                  type="text"
                  placeholder="Your Name*"
                  className="w-[55%] h-[10%] min-h-[45px] px-2 py-3 border rounded-md"
                ></input>
                <input
                  type="text"
                  onChange={handleInputEmail}
                  placeholder="Your Email*"
                  className="w-[40%] h-[10%] min-h-[45px] px-2 py-3 border rounded-md"
                ></input>
              </div>
              <input
                type="text"
                onChange={handleInputSubject}
                placeholder="Subject*"
                className="h-[10%] min-h-[45px] px-2 py-3 border rounded-md"
              ></input>
              <textarea
                onChange={handleInputDescriptions}
                placeholder="Type your message*"
                className="w-full h-[25%] min-h-[150px] border mt-[45px] px-2 py-3 rounded-md"
              ></textarea>
              <button
                onClick={handleButtonSendMail}
                className="w-[35%] h-[10%] max-h-[15%] mt-20 bg-[#FF1788] text-white"
              >
                Send Mail
              </button>
            </div>
            <div className=" bg-[#FF69B4] w-[50%] rounded-md p-20 text-white flex flex-col space-y-10">
              <div className="text-3xl">Contact us</div>
              <div className="flex flex-row space-x-5 items-start">
                <PlaceIcon />
                <div className="text-lg">Address:</div>
                <div className="text-lg">
                  354 Phan Văn Trị, Bình Thạnh, TP.HCM
                </div>
              </div>
              <div className="flex flex-row space-x-5 items-start">
                <LocalPhoneIcon />
                <div className="text-lg">Phone:</div>
                <div className="text-lg">
                  <h1>0945958952</h1>
                </div>
              </div>
              <div className="flex flex-row space-x-5 items-start">
                <MailIcon />
                <div className="text-lg">Email:</div>
                <div>
                  <h1 className="text-lg">19521680@gm.uit.edu.vn</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
