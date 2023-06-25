import { toast } from "react-toastify";
import { API_BASE_URL_DEV } from "../../config";

export const uploadFile = async (body) => {
  try {
    const response = await fetch(`${API_BASE_URL_DEV}/files`, {
      method: "POST",
      body: body,
    });
    const data = await response.json();
    toast("Upload File Success", {
      type: "success",
      autoClose: 1000,
    });
    console.log("File uploaded successfully:", data.data[0].url);
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const uploadFileNotNotify = async (body) => {
  try {
    const response = await fetch(`${API_BASE_URL_DEV}/files`, {
      method: "POST",
      body: body,
    });
    const data = await response.json();
    return data;
  } catch (error) {}
};
