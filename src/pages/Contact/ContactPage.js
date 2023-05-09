import React, { useState } from "react";
import { sendFeedback } from "../../app/hook/FeedbackHook";
import { ToastContainer } from "react-toastify";

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
        <div className="w-[65%] min-w-[500px] flex justify-center flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col mt-[46px] mb-[300px] w-[50%] space-y-[47px]">
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
                {" "}
                Send Mail{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
