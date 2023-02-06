import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetListUser } from "../../../store/slices/AdminSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { AdminApi } from "../../../api/AdminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
export const UserList = () => {
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.admin.ListUser);

  const loadUser = useCallback(async () => {
    await dispatch(GetListUser());
  });

  useLayoutEffect(() => {
    if (listUser.status != 200 && listUser.status != 204) {
      loadUser();
    }
  }, [listUser, dispatch, loadUser]);

  const DeleteOneUser = async (body) => {
    await AdminApi.DeleteUser(body).then((res) => {
      toast("Delete address successful", {
        type: "success",
        autoClose: 1000,
        Close: setTimeout(
          () =>
            window.location.reload(),
            1000
        ),
      });
    });
  };
  const handleDelete = (e) => {
    const body = [];
    body.push(e.currentTarget.id);
    DeleteOneUser(body);
  };

  const emptyUser = () => {
    return listUser.status == 204 || listUser.status != 200;
  };

  return (
    <div className="w-[85vw] h-[100%] p-x-30 flex justify-start rounded-xl shadow-md font-[Verdana]">
      <ToastContainer position="top-right" newestOnTop />

      <div className="w-full ">
        <h1 className="ml-4 text-2xl text-[#1D3178] font-semibold">
          User List
        </h1>
        {emptyUser() ? (
          <div></div>
        ) : (
          <div>
            <div className="flex flex-auto flex-wrap space-x-10 mt-5 p-5 border">
              {listUser.data.data.map((data) => (
                <div
                  key={data.ID}
                  className="w-[20%] h-[200px] border my-[38px] ml-[36px] p-2  rounded-2xl shadow-xl"
                >
                  <div className="flex flex-row flex-nowrap">
                    <div>
                      {(!data.avatar) ? 
                      (<AccountCircleIcon sx={{ width: 50, height: 50 }} />)
                      : (
                      <img
                        src={data.avatar}
                        alt="Anh user"
                        className="w-[50px] h-[50px] rounded-full"
                      >
                      </img>)
}
                    </div>
                    <div className="flex flex-col ml-2">
                      <h1>{data.username}</h1>
                      <h1>{data.name}</h1>
                    </div>
                    {data.Type === "ADMIN" ? (
                      <div></div>
                    ) : (
                      <div className=" top-0 right-0">
                        {data.type == "ADMIN" ? (
                          <div></div>
                        ) : (
                          <IconButton
                            id={data.ID}
                            aria-label="delete"
                            onClick={handleDelete}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
