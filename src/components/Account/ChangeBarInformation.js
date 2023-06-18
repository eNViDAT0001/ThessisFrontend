import Account from "../../asset/Account.png";
import Order from "../../asset/Order.png";
import Address from "../../asset/Address.png";
import LogOut from "../../asset/LogOut.png";
import Notification from "../../asset/Notification.png";

import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserDetail } from "../../app/hook/UserHook";
import { deleteAllCookies } from "../../app/hook/CommonHook";

const slideBarData = [
  {
    id: 1,
    title: "Account",
    img: Account,
    url: "/account-detail",
  },
  {
    id: 2,
    title: "Notification",
    img: Notification,
    url: "/user/notification",
  },
  {
    id: 3,
    title: "Order",
    img: Order,
    url: "/account-order",
  },
  {
    id: 4,
    title: "Address",
    img: Address,
    url: "/account-address",
  },
];
const ChangeBarInformation = (props) => {
  const userID = props.id;
  const userDetail = useUserDetail();

  const userInfo = {
    nickName: userDetail.username,
    fullName: userDetail.name,
  };

  const ResetToken = (e) => {
    localStorage.clear();
    deleteAllCookies();
    window.location.replace("/login");
  };
  return (
    <div className="flex flex-col w-[214px] mt-6 font-['Josefin_Sans']">
      <div className="ml-5 w-44 flex flex-row flex-nowrap mb-10">
        {userDetail.avatar ? (
          <img
            src={userDetail.avatar}
            alt="avatar"
            className="w-[55px] h-[55px] rounded-full"
          ></img>
        ) : (
          <AccountCircleIcon sx={{ width: 55, height: 55 }} />
        )}
        <div className=" ml-2 flex flex-col mt-2 text-left ">
          <h1 className="drop-shadow-2xl">{userInfo.nickName}</h1>
          <h1 className="drop-shadow-2xl">{userInfo.fullName}</h1>
        </div>
      </div>
      <div className="space-y-3 ">
        {slideBarData.map((data) => (
          <div key={data.id} className="flex flex-col ">
            <div className="hover:bg-[#D9D9D9]">
              <Link
                to={`${data.url}/${userID}`}
                className="w-full h-[30px] space-y-4 "
              >
                <div className="ml-4 flex flex-row items-center">
                  <img
                    src={data.img}
                    alt={`Account/${props.id}`}
                    className="w-[30px] h-[30px]"
                  ></img>
                  <h1 className="ml-3">{data.title}</h1>
                </div>
              </Link>
            </div>
          </div>
        ))}
        <div key="5" className="flex flex-col">
          <div
            onClick={ResetToken}
            className="w-full h-[30px] hover:bg-[#D9D9D9] space-y-4"
          >
            <div className="ml-4 flex flex-row items-center ">
              <img
                src={LogOut}
                alt="Account"
                className="w-[30px] h-[30px]"
              ></img>
              <h1 className="ml-3">Logout</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangeBarInformation;
