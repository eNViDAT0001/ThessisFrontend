import axiosClient from "./Client";
export const FileApi = {
  UploadNewPicture: (body) => {
    const url = `/files`;
    return axiosClient.post(url,body);
  },

};
