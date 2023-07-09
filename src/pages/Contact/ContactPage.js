import React, { useState } from "react";
import { sendFeedback } from "../../app/hook/FeedbackHook";
import { ToastContainer } from "react-toastify";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import { Button } from "@mui/material";
import { uploadFile } from "../../app/hook/FileHook";
import { truncateString } from "../../app/hook/CommonHook";

export const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState(null);
  const [subject, setSubject] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [listUrl, setListUrl] = useState([]);

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

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      uploadFile(formData).then((res) => {
        const newListUpload = listUrl;
        newListUpload.push(res.data[0].url);
        setListUrl(newListUpload);
      });
    }
  };

  const handleChangeOption = (e) => {
    switch (e.target.value) {
      case "shop":
        setType("SHOP");
        break;
      case "payment":
        setType("PAYMENT");
        break;
      case "order":
        setType("ORDER");
        break;
      case "feedback":
        setType("FEEDBACK");
        break;
      default:
        setType(null);
        return;
    }
  };

  const handleButtonSendMail = () => {
    const body = {
      type: type,
      email: email,
      name: name,
      subject: subject,
      descriptions: descriptions,
      attached_files: listUrl.join(", "),
    };
    sendFeedback(body);
  };
  return (
    <div className="flex flex-col font-['Josefin_Sans']">
      <ToastContainer position="top-right" newestOnTop />
      <div className="flex justify-center mt-[120px]">
        <div className="w-[65%] min-w-[500px] flex justify-center flex-col ">
          <div className="flex flex-row justify-between mb-[200px]">
            <div className="flex flex-col w-[50%] space-y-[47px] border p-10 shadow-md">
              <h1 className=" text-2xl">Feedback</h1>
              <select
                id="sort-options"
                className="border px-2 py-1"
                onChange={handleChangeOption}
              >
                <option value="shop">Open Shop</option>
                <option value="payment">Payment</option>
                <option value="order">Order</option>
                <option value="feedback">Feedback</option>
              </select>

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
              <Button
                variant="contained"
                component="label"
                onChange={handleButtonUploadFile}
              >
                Upload
                <input hidden accept="image/*" multiple type="file" />
              </Button>

              {listUrl.length !== 0 && (
                <div>
                  {listUrl.map((data) => (
                    <div>{truncateString(data, 50)}</div>
                  ))}
                </div>
              )}
              <button
                onClick={handleButtonSendMail}
                className="px-5 py-2 w-[35%] h-[10%] max-h-[15%] mt-20 bg-[#151875] text-white rounded-md transition-all duration-300 hover:bg-[#FF0573] focus:outline-none focus:ring-2 focus:ring-[#FF0573] focus:ring-opacity-50"
              >
                Send Mail
              </button>
            </div>
            <div className=" bg-[#1976D2] w-[50%] rounded-md p-10 text-white flex flex-col space-y-10">
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
                <div className=" flex flex-row space-x-9">
                  <div className="text-lg ">Phone:</div>
                  <div className="text-lg  ">
                    <h1>0945958952</h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-5 items-start">
                <MailIcon />
                <div className="flex flex-row space-x-10">
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
    </div>
  );
};
