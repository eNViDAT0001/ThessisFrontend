import { toast } from "react-toastify";

export const uploadFile = async (body) => {
  try {
    const response = await fetch("http://localhost:8082/api/v1/files", {
      method: "POST",
      body: body,
    });
    const data = await response.json();
    toast("Up ảnh thành công", {
      type: "success",
      autoClose: 1000,
    });
    console.log("File uploaded successfully:", data.data[0].url);
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
