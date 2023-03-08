import { FileApi } from "../../api/FileApi";
import { toast } from "react-toastify";

export const UploadFile = async (body) => {
  await FileApi.UploadNewPicture(body).then((res) => {
    toast("Up ảnh thành công", {
      type: "success",
      autoClose: 1000,
    });
    return res.data.data[0].url;
  });
};
