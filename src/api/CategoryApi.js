import axiosClient from "./Client";
export const CategoryApi = {
  UpdateCategory: (categoryID,body) => {
    const url = `/categories/${categoryID}`;
    return axiosClient.patch(url,body);
  },

};
